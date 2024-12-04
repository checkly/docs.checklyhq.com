---
title: How to Work with Selectors in Playwright
displayTitle: How to Work with Selectors in Playwright
description: 
  Learn to write solid scripts using Playwright. Discover how to choose stable selectors and start enhancing your skills today.
subTitle: Techniques and pointers
date: 2020-06-22
author: Nočnica Mellifera
githubUser: serverless-mom
tags:
  - basics

weight: 3
navTitle: UI selectors
menu:
  learn:
    parent: "Interaction"
---

When testing and monitoring websites end to end with Playwright, choosing the right locators is crucial. Proper locators help create tests that are less flaky and more reliable. Let's explore user-first locators and how to filter locators for more robust tests.

## Example Scenario

Consider a simple web page with a headline, a button, and a status update box. Clicking the button updates the status and throws confetti. Here's how we can test this.

![a demo page](/samples/images/user-first1.png)

## Why we don't want to find a page element with CSS selectors
If you're used to some older systems for automation and page manipulation like JQuery, we might be tempted to use CSS selectors. If we inspect this page we'll find, sure enough, that there is a class applied to this button that should select it in the page.

![examining the page with an inspector](/samples/images/user-first2.png)

We could click this button in a test with a line like `await page.locator("button.button-frontpage-style").click()` and that would work, but it's not recommended.

What is the problem with this approach?

Our users look at the page and want to find a button, they don't look for a CSS class, so our test is no longer emulating a user path.
If a frontend engineer changes the class for style reasons to read `button-hero-panel-style` then our test will return a false positive: showing a problem where there is none.
If our button text is coming from a CMS, and it breaks, the button text could change to "HEROBUTTON_TXT" and our test would still pass, despite the UI being broken for the user, a false negative.
Due to the reasons above, the Playwright project encourages you to not use CSS locators, and it's a good idea to follow the standards set down in the project!

### Instead of CSS selectors, try User-First Locators
Playwright offers a number of locators that are based on page role, a more functional view of the page than finding by CSS or HTML. Use built-in locators like `getByRole`, `getByText`, and `getByLabel`, which will all work the same in the test that they will for the user, even if the user is using an unusual browser build, mobile device, or even a screen reader!

## User-First Locators in Action
Let's replace `page.locator` with `getByRole` to locate the button by its role and accessible name:

```ts
await page.getByRole('button', { name: 'click me' }).click()
```

Inspect elements using Chrome DevTools to find their accessibility roles and names.

![showing the element's role](/samples/images/user-first3.png)

This method ensures that tests remain stable even if class names or HTML structure change.

As an added bonus, the name matching done by Playwright is case-insensitive, and matches by substring so you could change your selector to `{ name: 'click' }` and the test would pass, with no failures even if your marketing team relabels the button to read "Click me now!"

This change means that if the button label changes to something like "HEROBUTTON_TXT" the test will fail as expected.

### What to do when `getByRole` and `getByLabel` won't work on your page

One of the reasons I support using user-first locators is what happens when you realize that these selectors don't work on your page. If role and label aren't set for many of your page items, or you find that all your page items have the same labels and roles, it indicates that your page has some serious accessibility issues. After all, if nothing has unique labels it means that screen readers and keyboard navigation tools won't work correctly on the page, meaning many users won't be able to navigate your pages. That should start a conversation among developers and QA people about improving the structure of your pages, which will fix testing and the experience for all users.

In the short term, take a look at all of Playwright's locators, as there are definitely techniques that will find any element on your page, but I encourage you to use this as a jumping off point for tech debt conversations in the future.

### Handling Multiple Matching Elements
If a locator matches multiple elements, Playwright's strict mode will fail. For example, using `getByRole('button')` might match several buttons. You'll get an error that reads something like:

`Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'click' }) resolved to 2 elements:`


Note that in strict mode this test will fail even if the first result, or all the results, passes the rest of the test. Resolve this by specifying the position or filtering elements.

### Position-Based Selection
When we first run into this error, the easiest solution is just to specify a position in a list. The simplest being to take the first result:

```ts
await page.getByRole('button').first().click()
```

I run into the error listed above so often, I get in the habit of adding first() to my locators almost every time I write a locator. 😅

If you want to be more specific about list position, use:

```ts
await page.getByRole('button').nth(3).click()
```

The .nth() function is zero-indexed, so .nth(3) will select the fourth item in the results. Positional selectors work, but they can be brittle, if we have dynamic page content, selecting anything but the first result may present a false positive. To be really sure that we're pointing to the correct element in a dynamic list, do a bit of element filtering.

## Element Filtering in Playwright
If we imagine an e-store interface, with a number of results only some of which are available, we can see that a position selector isn't going to test reliably.

![too many matches](/samples/images/user-first4.png)

If we inspect the page we'll see that these are list items, so a selector that makes sure the item is available before checking for the button would read as follows:

```ts
const button = page.getByRole('listitem')
  .filter({ hasText: 'available' })
  .getByRole('button', { name: 'buy' })

await button.click()
```

This test would now fail about when the user would expect it to: when they see a list of items, all marked as sold out.

## Best Practices for Page Locators

There is no one-size-fits-all solution for locators. Here are some tips:

- **Avoid Implementation Details**: Use locators that reflect user actions rather than HTML structure.
- **Use Built-In Locators**: `getByRole`, `getByText`, and similar locators improve test stability and maintainability.
- **Data Test IDs**: For complex scenarios, using data test IDs can simplify locators and improve test reliability.

## See user-first locators in action

Putting all these pieces together, [check out Stefan’s video for a demonstration of user-first locators.](https://www.youtube.com/watch?v=9RJMNU4eNEc)

### Conclusion

Choosing the right locators is key to creating stable and maintainable Playwright tests. User-first locators reduce flakiness and encourage good development practices. If you're interested in joining a community of Playwright developers, join us on the [Checkly Slack](https://www.checklyhq.com/slack/).  And if you use Playwright for end-to-end testing, consider using Checkly for monitoring your production site, we’ve got a great story for empowering your developers with [Monitoring as Code](https://www.checklyhq.com/docs/cli/).
