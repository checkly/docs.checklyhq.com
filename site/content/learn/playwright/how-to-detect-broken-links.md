---
title: How to detect broken links using Playwright
displayTitle: How to detect broken links using Playwright
date: 2024-11-07
author: Giovanni Rago
githubUser: ragog
tags:
  - e2e
  - assertions
weight: 3
navTitle: Detecting broken links
menu:
  learn:
    parent: "Basics"
---

One of our Slack community members recently asked if they could use Playwright and Checkly to detect broken links on their sites. They certainly can, and the answer to this question covers so many different Playwright concepts that it makes a perfect case for sharing Playwright features with the community. 

Let's unveil some links going nowhere!

If you prefer the video version of this tutorial, check the video below, and if you're only here to copy and paste a final implementation, find the final code on GitHub.

{{< youtube id="EJJ_PYK8YiM" >}}

## Let's break down the problem

To detect broken links in an automated Playwright script, we have to do two things:

- Detect and extract all links on a visited page.
- Make requests to all these URLs and evaluate their status code.

```js
test(`A page has no 404s`, async ({ page }, testInfo) => {
  // Navigate to the page you want to check for broken links
  await page.goto("https://your-url-to-test.com")

  // 1. Extract all the link URLs from a page
  // 2. Evaluate the URLs and check for proper status code
})
```

Let's tackle these two tasks step by step.

## How to extract the `href` attribute from all links on a page

To extract all these `href` values, you could think of calling a locator like `page.getByRole('link')` or `page.locator('a')`, iterate over all the link elements, and access the href attribute…

But unfortunately, this approach won't work because you can't iterate over a locator. Playwright locators are lazy and will only be evaluated when combined with an action or assertion.

```js
// Define a locator.
const cta = page.getByRole('button', {name: "Click me"})
// Evaluate the locator, reach into the DOM
// and click the resulting element.
await cta.click()
// Evaluate the locator, reach into the DOM
// and check if the matching element is visible.
await expect(cta).toBeVisible()
```

This locator behavior is why we can rely on Playwright's [auto-waiting](/learn/playwright/waits-and-timeouts) in end-to-end testing. You define a target element "blueprint", and when this blueprint is used with an action or assertion, Playwright will constantly query the DOM and wait for elements to match. It's a great concept!

In our case of extracting links, this lazy behavior isn't helpful, though. How could you immediately reach into the DOM and evaluate all the links?

### `locator.all()` — access the DOM right away

If you're going beyond the classical end-to-end testing case like we do right now, you can call the locator.all method to reach into the DOM and receive an Array of locators matching the currently present DOM elements.

With this method at hand, we can evaluate all the link target URL.

const links = page.locator("a")

```js
// Evaluate all available links.
const allLinks = await links.all()
// Wait for all the getAttribute() calls to resolve.
const allLinkHrefs = await Promise.all(
  // Extract the `href` attribute.
  allLinks.map((link) => link.getAttribute("href"))
) // ['https://example.com', '/something', '/something-else', ...]
```

After resolving the locator definition with .all() we can iterate over locators and map them to their attribute value with getAttribute(). Note that getAttribute() is an async operation returning another promise, so we must wrap everything into a Promise.all to wait for all the href values to be accessible.

With these few lines, we extracted all the href values. We could now evaluate if these URLs return will return a valid 200 status code when called, but let's add more features to our link extraction.

### Save requests and remove duplicate link targets

When we evaluated all the links, there's a high chance that the collection includes duplicates. For example, a link to home `(/)` will probably be included multiple times. And while these duplicates aren't a big deal, why should we check a target URL for a good status code multiple times?

Let's remove the duplicates by betting on a native JavaScript set. Sets have the wonderful characteristic that they only hold unique values. When we add the same value twice, it'll be automatically ignored. We don't have to check if a value is already in the set. Nice!

And when we already iterate over the link targets, we can also remove `mailto:` and anchor links (`#something`) in the same go!

```js
// Transform the array of link targets to a set to avoid duplicates.
const validHrefs = allLinkHrefs.reduce((links, link) => {
  // Filter out untruthy href, `mailto:` and `#` links.
  if (link && !link?.startsWith("mailto:") && !link?.startsWith("#"))
    links.add(link)
  return links
}, new Set<string>())
```

With these lines, we removed the duplicates, but did you notice that we're now filtering out links that don't have a truthy href value, too? The reason for this is that links could also just include an empty string (<a href="">). Clicking these links will only reload the page and shouldn't be on your pages either. But if we filter these out, we won't know the page has empty links.

Let's add a soft assertion to our link mapping to get notified about empty links!

### Add Playwright's soft assertions to collect errors but keep the test running

Whenever you use a Playwright assertion with `expect`, these assertions will throw an exception and prevent your test case from running. For end-to-end test cases, this behavior makes sense. When you click a button, expect a modal to appear to fill out an included form; if the modal doesn't show, the form-filling Playwright instructions will also fail. So why continue the test?

```js
// This exception will throw and stop a test case.
await expect(headline).toBeVisible()
```

But in our case of iterating and evaluating links, we don't want to throw failed assertions and keep the test running. Whenever we discover an invalid link target (or a bad status code later), we want to continue the test to check the remaining URLs and only fail the entire test case at the end. How could we do this?

For these cases, Playwright supports the concept of soft assertions `(expect.soft())`. Soft assertions work the same way as regular ones, but they won't throw on failure. Errors will be collected and displayed at the end of your test case.

```js
const validHrefs = allLinkHrefs.reduce((links, link) => {
  // Evaluate link target but don't throw a failed assertion error.
  expect.soft(link).toBeTruthy()

  if (link && !link?.startsWith("mailto:") && !link?.startsWith("#"))
    links.add(link)
  return links
}, new Set<string>())
```

So now we can collect all these empty link errors, too. There's one last piece missing!

### Normalize local link targets and guarantee absolute URLs

When we extract all the `href` values, we'll likely discover local links such as `/` or `/features`. If we want to check the status code of the resulting URLs, we can't request these because they need a proper protocol and domain.

To transform relative links to absolute URLs, we can use another native JavaScript goodie — the [URL() constructor](https://developer.mozilla.org/en-US/docs/Web/API/URL). I won't get into much detail here, but `URL()` is the powerhouse behind most JavaScript URL operations. You can pass it a URL (it doesn't matter if it's relative or absolute), and a base URL and `new URL()` will do all the URL parsing for you. It's pretty darn sweet!

```js
new URL(
  "https://checklyhq.com",
  "https://example.com"
).href
// 👆 "https://checklyhq.com"

new URL(
  "/raccoon",
  "https://checklyhq.com"
).href
// 👆 "https://checklyhq.com/raccoon"

new URL(
  "/raccoon",
  "https://checklyhq.com/some-path"
).href
// 👆 "https://checklyhq.com/raccoon"
```

With this knowledge we can tweak our link extracting a final time to ensure all found link target URLs will be absolute.

```js
const validHrefs = allLinkHrefs.reduce((links, link) => {
  expect.soft(link).toBeTruthy()


  if (link && !link?.startsWith("mailto:") && !link?.startsWith("#"))
    // Ensure that all URLs are absolute.
    links.add(new URL(link, page.url()).href)
  return links
}, new Set<string>())
```

By calling `new URL()` with the extracted link and the current page URL (`page.url().href`), we can normalize all link targets.

And now we're ready to check if all the URLs return a proper status code!

If you're looking for the final snippet to extract link target URLs, find it on GitHub.

## How to check for broken link URLs

Now that we have a set holding all the URLs, we can start making requests and check for green status codes. We could reach for Playwright's `request` fixture, but luckily, the page object also holds a request object for us.

But what's the difference between the two? `page.request` will make requests in the context of the current page. For example, if you have a test case that logs in a user, the current `page` object will hold some session cookies. And if you then make requests with `page.request`, the HTTP call will include these session cookies, too.

Whenever you want to make API calls on behalf of a logged-in user, `page.request` is the way to go!

```js
// Make a request using the current page's session data.
const response = await page.request.get(url)
From here, we can iterate over all the request URLs and check if they all return a green status code.

// Iterate over the URLs and check the status code.
for (const url of validHrefs) {
  try {
    const response = await page.request.get(url)
    expect
      .soft(response.ok(), `${url} has no green status code`)
      .toBeTruthy()
  } catch {
    expect.soft(null, `${url} has no green status code`).toBeTruthy()
  }
}
```

The loop includes soft assertions to keep running on failure, and we added custom error messages for easier debugging. And that's pretty much it!

You can now run Playwright in your CICD pipeline and check for broken links whenever you deploy your sites. Success!

Again, you can find the final snippet on [GitHub](https://github.com/checkly/playwright-examples/tree/main/404-detection).