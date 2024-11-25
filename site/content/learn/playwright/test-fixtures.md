---
title: Reuse code with custom test fixtures in Playwright
subTitle: Implement DRY practices by customizing your test environment
date: 2024-03-16
author: Nocnica Mellifera
githubUser: serverless-mom
tags:
  - basics
  - scraping
  - assertions

weight: 7
navTitle: Test Fixtures
menu:
  learn:
    parent: "Best practices"
---

Playwright's test fixtures are a powerful feature for sharing setup and teardown logic across tests, promoting code reuse and maintainability. This guide walks you through creating a custom test fixture, demonstrating its utility in a practical scenario.

## Understanding Playwright Test Fixtures

At their core, fixtures in Playwright are predefined components like page, context, browser, and browserName that you can use across different test cases. They encapsulate functionality into modular blocks, simplifying test setup and teardown.

## Fixtures: Puppeteer vs Playwright

Both [Playwright](https://www.checklyhq.com/learn/headless/basics-playwright-intro/) and [Puppeteer](https://www.checklyhq.com/learn/headless/basics-puppeteer-intro/) are open source projects to help you simulate user behavior with a browser on your site. Their approach to fixtures—reusable pieces of code for setting up and tearing down tests—differs significantly. While fixtures are a basic component in Playwright, Puppeteer doesn’t offer native fixture support, relying on manually coded helper functions.

### Puppeteer and Fixtures

Puppeteer, developed by the Chrome DevTools team, focuses on simplicity and direct control over the Chrome or Chromium browser. It doesn't natively support fixtures in the same way Playwright does. Instead, setup and teardown routines must be manually coded within each test or abstracted into reusable functions by the developer. This approach offers flexibility but can lead to more boilerplate code and a higher chance of inconsistency across tests.

### Custom Test Fixture Implementation

To use fixtures in Puppeteer, developers typically create helper functions or classes that encapsulate setup and teardown logic. This method requires more upfront work and a good understanding of asynchronous JavaScript patterns.

```js
async function withPage(test) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await test(page);
  } finally {
    await page.close();
    await browser.close();
  }
}

// Usage
withPage(async (page) => {
  // Test actions using the page
});
```

This pattern mimics fixture behavior but lacks the built-in, framework-level support found in Playwright, potentially leading to more complex and less maintainable test suites.

## Playwright and Fixtures

Playwright, on the other hand, was designed with a broader testing scope and includes first-class support for fixtures. This design choice streamlines the setup and teardown process, making tests cleaner and reducing redundancy.

### Built-in Support

Playwright's test runner provides a rich set of predefined fixtures, such as browser, context, page, and request, and allows for easy customization and extension of these fixtures. This built-in support enables more structured and maintainable tests, with less manual setup required.

```js
import { test, expect } from '@playwright/test';

test.use({ storageState: 'authenticated-state.json' });

test('My authenticated test', async ({ page }) => {
  // Test actions using the authenticated page
});
```

The ability to extend and customize fixtures in Playwright not only reduces boilerplate but also enhances test isolation and reusability across your test suite.

## Choosing between Puppeteer and Playwright

While both Puppeteer and Playwright offer powerful capabilities for browser automation, their approach to fixtures represents a significant difference in philosophy. Puppeteer offers flexibility and direct control, requiring developers to implement their own fixture-like functionality. Playwright, in contrast, integrates fixtures deeply into its testing framework, promoting code reuse, maintainability, and ease of use.

Choosing between Puppeteer and Playwright will depend on your project's specific needs, the complexity of your tests, and your team's familiarity with JavaScript testing patterns. If fixtures and test structure are a priority, Playwright might be the more suitable choice. However, for projects that require fine-grained browser control and are less concerned with test setup and teardown complexity, Puppeteer remains a strong option.

## Creating a Custom Test Fixture

### Scenario

Imagine testing a web application where multiple tests require logging in. Repeating login logic in every test is inefficient and violates the DRY (Don't Repeat Yourself) principle. This scenario is ripe for a custom fixture.

### Step 1: Extend the Test Object

First, create a new test file or use an existing one. Here, we're testing a web application with Playwright, accessing environment variables, and performing UI interactions.

To create a custom fixture, extend the test object provided by Playwright:



```js
//fixture.js
import { test as baseTest } from '@playwright/test';

const test = baseTest.extend({
  webApp: async ({ page }, use) => {
    console.log('setup');
    // Your setup logic here, e.g., logging into the web application
    await use(page);
    console.log('teardown');
    // Teardown logic, if any
  },
});
```

### Step 2: Use the Custom Fixture

With the fixture defined, you can use it in your tests. Replace the standard test with your extended version:

```js
test('My webApp test', async ({ webApp }) => { 
  // Your test code here, using the webApp fixture 
  });
```

The webApp fixture encapsulates the login logic, making it accessible to any test that requires it.

### Step 3: Debugging and Validation

Debugging is crucial to ensure your fixture works as expected. Playwright's inspector is invaluable here, allowing you to step through test execution and verify the setup and teardown processes.

### Step 4: Sharing Across Tests

To share your custom fixture across different test files, encapsulate it in a separate module:


```js
// setup.js
import { test as baseTest, expect } from '@playwright/test';

export const test = baseTest.extend({ /* Your fixture definition */ });
export { expect };
```


Then, in your test files, import this extended test:

`import { test, expect } from './setup';`

This approach keeps your tests clean and focused, with shared logic abstracted into fixtures.

## Conclusion

Custom test fixtures in Playwright streamline test setup and teardown, fostering code reuse and reducing boilerplate. By encapsulating common functionality, such as user login, into fixtures, you ensure your tests are cleaner, more maintainable, and easier to read. If you’d like to see fixtures in action, check out Stefan’s video tutorial on fixtures in Playwright:

{{< youtube id="2O7dyz6XO2s" >}}