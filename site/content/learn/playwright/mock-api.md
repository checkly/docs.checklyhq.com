---
title: Test Dynamic Content by Mocking API Responses
subTitle: Manipulating and mocking API responses
date: 2025-03-12
author:
  - Nočnica Mellifera
githubUser:
  - serverless-mom
tags:
  - network
weight: 5
navTitle: Mocking API Responses
menu:
  learn_playwright:
    parent: "Basics"
---

Playwright is built to interact with web pages the way your users would. Playwright’s flexible [selectors](https://www.checklyhq.com/learn/playwright/selectors/) and assertions mean that any automated test will dynamically find elements on the page even if they’ve slightly shifted visually. But how do you test dynamic content on your page? If the page content shifts constantly, we’d still like to be able to check that a certain version of the page is rendering correctly. In this article we’ll learn how to ‘fix’ dynamic content with API mocking, which lets you edit API responses while leaving the rest of the response dynamic.
<!-- more -->
## The problem, dynamic content on a critical page

For this test we’re using the demo Danube web shop, testing a book’s detail page for the correct product information.

![Our e-commerce storefront](/learn/images/mock-api-01.png)

We started with a very simple test that a particular book’s detail page has all the correct information, but I ran into a problem with dynamic content:

```typescript
import { test, expect } from '@playwright/test';

test('Book has correct details', async ({ page }) => {
  await page.goto('https://danube-webshop.herokuapp.com/books/23');
  //Removed for brevity: checks of the book's title, genre, etc.
  await expect(page.locator('#app-content')).toContainText('Left in stock: 1');
});
```

There are some ways to ‘fake’ the other dynamic components like price or rating: perhaps I could test only records that have a very stable price and rating. But you can imagine the trouble with trying to check a stock number: it shifts constantly! 

It’s no surprise that this stock number is set on the page by a call to our books API. Let’s look at a few options to move forward with testing this page.

## Options for testing dynamic content

Here are some of the paths we could take with dynamic information like a book’s rating or stock number on our demo site. All of these approaches are workable for some subset of dynamic content on pages we want to test, but we want to understand all four to create stable tests in every situation:

1. Don’t test the dynamic content - only test things that should remain constant like the book title. This is often our default approach, but obviously means that we miss testing big chunks of the page.
2. Populate our test assertions with an API call - if details like price are constantly shifting, it may make sense to have our test start with a request to our API, loading in details from that API, and using that response to create our assertion dynamically. One problem with this approach: if we make assertions based on the same API as the page, we’re no longer ‘testing’ that this API response looks right to us, since the response sets the requirements. For example if the API responded  `stock:"potato"`, both the page and the test would just check for “Left in stock: potato” and the test would pass.
3. Make our assertion dynamic with a regular expression - right now our final assertion is
    
    `await expect(page.locator('#app-content')).toContainText('Left in stock: 1');`
    
    but the `toContainText` assertion will accept a regex, so we could write a passing test with:
    
    `await expect(page.locator('#app-content')).toContainText(/Left in stock: \d/);`
    
    Numbers other than 1 would now pass, but if the page rendered “Left in stock: potato” the test would fail. Solving this (and most other) dynamic content problems with a regex has two major drawbacks:
    
    - When writing easy-to-maintain testing, a regex should not be the tool we use first. Not every developer finds regex patterns easy to read or edit.
    - Not everything is particularly easy to test with regex, for example the `rating` api response here comes back as Unicode stars like “★★★★☆,” which isn’t as straightforward to test with regex as a digit.
4. Modify the API response - Finally the option that gives us high consistency in what we’re testing and what we expect in response. By modifying the API response we can set only the key value pairs that concern us to fixed values, letting the others remain dynamic. We test how the page renders with fixed data, *and* we’re still testing that the API is available.

## The Solution: Modify an API response with `await *page*.route()`

Let’s start by looking at the API response in full, from the network tab of either our browser or the Playwright UI mode. The body looks as follows

```json
{
  "id": 23,
  "title": "Achilles",
  "author": "Jayce Jomes",
  "genre": "novel",
  "price": "9.95",
  "rating": "★★★★☆",
  "stock": "1"
}
```

What we’d like to do is fix that `"stock"` value to be the same every time. The process is easy.

Before we load this page, let’s add a call to `page.route()` to modify the network requests made by the page:

```typescript
import { test, expect } from '@playwright/test';

test('Book has correct details', async ({ page }) => {
  await page.route('*/**/api/books/23', async route => {
    const response = await route.fetch();
    const json = await response.json();
    json.stock="12"
    // Fulfill using the original response, while patching the response body
    // with the given JSON object.
    await route.fulfill({ response, json });
  });
  await page.goto('https://danube-webshop.herokuapp.com/books/23');
  //Removed for brevity: checks of the book's title, genre, etc.
  await expect(page.locator('#app-content')).toContainText("Left in stock: 12");
});
```

Now we can run this check as often as we like and be sure that the current stock will always be 12. 

Note that, if you’re using the Playwright UI, this mocking behavior will show up in the UI, as the API request will have two lines in the ‘Network’ tab

![Our e-commerce storefront](/learn/images/mock-api-02.png)

The ‘fulfilled’ listing will show the patched version of your response that went to the page.

## Going Further: Mocking Whole APIs

If we’re able to intercept a request and change a single key/value pair, can we replace an entire payload from an API request? Sure, in fact we don’t need to wait for the real API to respond. the new version would look something like this:

```typescript
import { test, expect } from '@playwright/test';

test('Book has correct details', async ({ page }) => {
  await page.route('*/**/api/books/23', async route => {
    const json = {
      "id": 22,
      "title": "Does the Sun Also Rise?",
      "author": "Ernst Doubtingway",
      "genre": "crime",
      "price": "9.95",
      "rating": "★★★★☆",
      "stock": "12"
    }
    await route.fulfill({json});
  });
  await page.goto('https://danube-webshop.herokuapp.com/books/23');
  //Removed for brevity: checks of the book's title, genre, etc.
  await expect(page.locator('#app-content')).toContainText("Left in stock: 12");
});
```

Now we no longer wait for this API response to come back and supply the whole response. As mentioned in the section above this has the benefit of delivering consistent results and removing the dependency on the API. In the Checkly UI, we can actually see that removing this API request and supplying a response significantly [speeds up](https://www.checklyhq.com/blog/speed-up-playwright-scripts-request-interception/) the overall test execution. 

![Our e-commerce storefront](/learn/images/mock-api-03.png)

*Removing the API call makes this test take less than half the time*

The distinct disadvantage is that we’re no longer checking that this API is available. If we’re [testing against production](https://www.checklyhq.com/guides/playwright-testing-to-monitoring/) it would be a good idea to still check that this API is returning data.

## Going Further: Replacing API responses to stress test our page

The last use case for API mocking and response editing is simulating an unusual circumstance on a live page. For example, on our page we expect that a book with zero remaining stock should show up as sold out.

![Our e-commerce storefront](/learn/images/mock-api-04.png)

*Correct UI behavior when an item has zero stock*

However, how can we test this behavior without setting up special ‘test’ conditions in the database? With our ability to patch API responses, we can force the stock response to be zero, and make sure the ‘add to cart’ button is *not* visible.

```typescript
import { test, expect } from '@playwright/test';

test('Book has correct details', async ({ page }) => {
  await page.route('*/**/api/books/23', async route => {
    const response = await route.fetch();
    const json = await response.json();
    json.stock="0"
    await route.fulfill({ response, json });
  });
  await page.goto('https://danube-webshop.herokuapp.com/books/23');
  //Removed for brevity: checks of the book's title, genre, etc.
  await expect(page.getByRole('button', { name: 'Add to cart' })).not.toBeVisible();
  await expect(page.locator('#app-content')).toContainText("Left in stock: 0");
});
```

Sure enough, the behavior of our web store isn’t correct, with an out-of-stock item still showing as available to add to the cart.

![Our e-commerce storefront](/learn/images/mock-api-05.png)

*Whatever happens when you click ‘Add To Cart’ here it won’t be satisfying for the user*

We can also stress test the UI in other ways: returning very large numbers for the data fields, or very long text blobs to make sure the UI still renders correctly. 

### Editing API responses and visual regression tests

As we find ourselves testing correct rendering of a page under unusual conditions, this does suggest a [visual regression test](https://www.checklyhq.com/docs/browser-checks/visual-regression-snapshot-testing/) to make sure a page looks correct. Visual regression tests shouldn’t be a default mode for functionality testing, but they are part of our toolkit and editing dynamic API responses can be an effective way of making sure that a page is always rendering with identical data for visual comparison.

![Our e-commerce storefront](/learn/images/mock-api-06.png)

*With fixed responses for dynamic page components, a visual regression test can create a golden file with a screenshot that isn’t expected to change*

To go further, see our full documentation on [visual regression checks in Playwright and Checkly](https://www.checklyhq.com/docs/browser-checks/visual-regression-snapshot-testing/#visual-regression--snapshot-testing).

## Results and Conclusions: Playwright Mocking and Testing in Production

With Playwright mocking you can remain tightly in control of API responses your page is using to render pages for users. This tool can help you in testing against production by ensuring that even with your production pages and data sources, your testing always sees consistent results. The result is more in-depth testing with higher reliability and fewer false alarms. And when a feature isn’t working correctly for users, you can find out before they complain.

With Playwright's powerful API mocking capabilities, you gain precise control over the responses your web pages use to render content for users. This functionality is particularly valuable when testing against production environments, as it ensures consistent results even when dealing with dynamic data sources. By leveraging tools like `page.route()`, you can simulate various scenarios—such as out-of-stock items, unusual data inputs, or edge cases—without needing to alter your production database or backend systems.

### Key Takeaways:

1. **Consistency in Testing**: By mocking API responses, you can create stable and reliable tests that are not affected by fluctuating data, such as stock numbers or ratings. This reduces false positives and ensures your tests are always accurate.
2. **Flexibility**: Playwright allows you to modify specific parts of an API response or replace the entire payload, giving you the flexibility to test a wide range of scenarios, from stress testing to edge cases.
3. **Speed and Efficiency**: Mocking API responses can significantly speed up test execution by eliminating the need to wait for real API calls. This is especially useful for large-scale testing or when testing under time constraints.
4. **Improved Debugging**: By controlling API responses, you can isolate and test specific UI behaviors, making it easier to identify and fix issues in your application.
5. **Visual Regression Testing**: Mocking dynamic content ensures that visual regression tests are consistent, allowing you to create reliable "golden files" for comparison.

### When to Use API Mocking:

- **Testing Dynamic Content**: Use mocking to stabilize tests for elements that frequently change, such as stock levels, prices, or ratings.
- **Stress Testing**: Simulate unusual or extreme conditions (e.g., zero stock, large numbers, or long text) to ensure your UI handles them gracefully.
- **Edge Case Testing**: Test how your application behaves under rare or unexpected conditions without needing to replicate those conditions in your production environment.
- **Visual Regression Testing**: Ensure consistent screenshots for visual comparisons by fixing dynamic content in place.

### Limitations and Considerations:

- **Real API Availability**: While mocking is powerful, it’s important to occasionally test against real API responses to ensure your production APIs are functioning correctly.
- **Maintenance**: Mocked responses need to be updated if the structure of your API changes, so keep your mocks in sync with your API contracts.
- **Over-Mocking**: Avoid mocking everything, as this can lead to tests that don’t reflect real-world behavior. Use mocking strategically to complement, not replace, real API testing.

Playwright’s API mocking capabilities empower you to create robust, reliable, and efficient tests for dynamic web applications. By combining mocking with other testing strategies—such as visual regression testing and production monitoring—you can ensure your application delivers a consistent and high-quality user experience. Whether you’re testing edge cases, improving test speed, or ensuring UI consistency, Playwright provides the tools you need to build confidence in your application’s behavior.