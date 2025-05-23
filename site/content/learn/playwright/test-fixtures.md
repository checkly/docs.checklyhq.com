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
  learn_playwright:
    parent: "Best practices"
---

Playwright's test fixtures are a powerful feature for sharing setup and logic across tests, promoting code reuse and maintainability. With custom fixtures, you can share code across multiple tests, resulting in a test base that is easier to expand and easier to maintain.

## Understanding Playwright Test Fixtures

At their core, fixtures in Playwright are predefined components like `page`, `context`, `browser`, and `browserName` that you can use across different test cases. They encapsulate functionality into modular blocks, simplifying test code.

When writing multiple tests for a single site or service, you're likely to end up performing the same tasks over and over, so we'd like to add fixtures to our Playwright tests that developers can re-use, rather than copying and pasting big blocks of code. This helps us follow the DRY principle: don't repeat yourself when writing code!

## Why we need custom fixtures
In our web shop, we've got a login process that we want to simulate and test before doing further account actions:

![A web shop login dialog](/samples/images/webshop-login.png)

To open this dialog and log in, we might use some lines like the following:

```ts
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://danube-webshop.herokuapp.com/');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('robert@moresby.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('@!#KLjwsWe4@');
  await page.getByRole('button', { name: 'Sign In' }).click();
});
```

This is a fine practice for a single test, but if we have dozens that all require login as a first step, we'll find ourself copying and pasting this code several times. This means a lot of copied code, such that if we ever tweak the login process, we'll have to update this copied code in dozens of places, not good!


## Playwright and Fixtures

Playwright and its test runner Playwright Test, were designed with a broader testing scope and includes first-class support for fixtures. This design choice streamlines the setup and teardown process, making tests cleaner and reducing redundancy.

### Built-in Support

Playwright's test runner provides a rich set of predefined fixtures, such as `browser`, `context`, `page`, and `request`, and allows for easy customization and extension of these fixtures. This built-in support enables more structured and maintainable tests, with less manual setup required.

```js
import { test, expect } from '@playwright/test';

// Configure the native `page` fixture with pre-defined state
test.use({ storageState: 'authenticated-state.json' });

test('My authenticated test', async ({ page }) => {
  // Test actions using the authenticated page
});
```

The ability to extend and customize fixtures in Playwright not only reduces boilerplate but also enhances test isolation and reusability across your test suite.


## Create a Custom Test Fixture in Playwright Test

Imagine testing a web application where multiple tests require logging in. Repeating login logic in every test is inefficient and violates the DRY (Don't Repeat Yourself) principle.

Let's implement __a fixture to reuse and share code across Playwright test cases__.

### Step 1: Extend the Test Object

First, create a new test file or use an existing one. Here, we're testing a web application with Playwright, accessing environment variables, and performing UI interactions.

To create a custom fixture, extend the `test` object provided by Playwright:

```js {title="fixture.js"}

import { test as baseTest } from '@playwright/test';

const test = baseTest.extend({
  webApp: async ({ page }, use) => {
    // Your setup logic here
    // Logging into the web application, etc...
    // ...
    console.log('setup');

    // After logging in, pass the `page`
    // object to the test cases
    //
    // Whatever you call `use` with
    // will be available in your test cases
    await use(page);

    // Teardown logic, if any
    console.log('teardown');
  },
});
```

By using custom fixtures, test cases can reuse code defined in the `test.extend` call. In this case, all tests using the extended `test` method can rely on the `webApp` fixture.

### Step 2: Use the Custom Fixture

With the `webApp` fixture defined, you can use it in your tests. The fixture code will only run when a test "requests" to use it. For example, the custom `webApp` fixture will only be executed if a test case uses it.

Replace `page` with `webApp` and use the fixture in your test cases:

```js
test('My webApp test', async ({ webApp }) => {
  // Your test code here, using the already logged in webApp fixture
});
```

The `webApp` fixture encapsulates the login logic, making it accessible to any test that requires it.

### Step 3: Debugging and Validation

Debugging is crucial to ensure your fixture works as expected. Playwright's inspector is invaluable here, allowing you to step through test execution and verify the setup and teardown processes.

### Step 4: Sharing Across Tests

To share your custom fixture across different test files, encapsulate it in a separate module:

```js {title="setup.js"}

import { test as baseTest, expect } from '@playwright/test';

export const test = baseTest.extend({ /* Your fixture definition */ });
export { expect };
```

Then, in your test files, import this extended `test` and use the custom fixtures:

```js {title="tests/your-test.spec.js"}
import { test, expect } from './setup';
```

This approach keeps your tests clean and focused, with shared logic abstracted into fixtures.

## Replace `beforeEach` / `afterEach` Hooks with Automatic Fixtures

As explained in the previous section, fixtures enable the sharing and distributing of code across Playwright tests. By default, fixture code is only executed when a test case accesses a fixture. But there are scenarios in which you always want to run your fixture code, like global `beforeEach` and `afterEach` hooks.

Let's implement __an automatic fixture to log the current time before and after every test case__.

### Define an Automatic Fixture

If you want to run code before and after each test case, you can reach for the commonly known `beforeEach` and `afterEach` hooks.

In the following example, we log the current time before and after every test to the console.

```js
test.beforeEach(async ({}) => {
  console.log(`Start time: ${new Date()}`);
});

test('my test', async ({ page }) => {
  expect(page.url()).toBe('https://my.start.url/');
});

test.afterEach(async ({}) => {
  console.log(`End time: ${new Date()}`);
});
```

This approach works fine, but if you want to run the same code for **every test**, you must place these `beforeEach` and `afterEach` calls in every `spec` file. Additionally, `beforeEach` and `afterEach` don't share the same function scope. This behavior leads to unexpected errors in some scenarios.

A more convenient way to implement global test hooks is relying on automatic fixtures. Like the `webApp` fixture defined in the previous section, you must extend the `test` object to use automatic fixtures.

```js {title="base.js"}
import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend({
  // Define an automatic fixture
  // Note: `timelogger` is defined as any array to provide an options object
  timeLogger: [
    async ({}, use) => {
      // Do something before every test
      // ...
      console.log(`Start time: ${new Date()}`);

      // Start the test case
      //
      // Note: `use` is called without any arguments because
      // automatic fixtures run regardless if they're requested or not
      await use();

      // Do something after every test
      // ...
      console.log(`End time: ${new Date()}`);
    },
    // Specify that this fixture should be an automatic fixture
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
```

The main difference between default and automatic fixtures is that automatic fixtures run regardless. In our example, the `timeLogger` fixture will be executed for every running test.

Note that you'll want to update your other test spec files to import `test` from our `base.js`, they probably have something like:

```js
import { test, expect } from '@playwright/test';
```
You'll want to update them to read something like:

```js
import { test } from './fixtures';
import { expect } from '@playwright/test';
```

## Conclusion

Custom test fixtures in Playwright streamline test setup and teardown, fostering code reuse and reducing boilerplate. Encapsulating common functionality, such as user logins or global setups, into fixtures ensures your tests are cleaner, more maintainable, and easier to read.

### Playwright Fixtures Explained on YouTube

To discover more practical fixture examples, check out our [YouTube playlist](https://www.youtube.com/watch?v=hegZS46J0rA&list=PLMZDRUOi3a8N067UNvkxXEThKlTII_OJ-), which covers fixtures in even more depth.

{{< youtube-gallery id="PLMZDRUOi3a8N067UNvkxXEThKlTII_OJ-" >}}
