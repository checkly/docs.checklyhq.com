---
title: Playwright vs Selenium - Detailed Comparison for 2024
subTitle: Key features, and pros & cons of each framework
description: Explore the key differences between Playwright and Selenium in web testing. Discover the examples, pros and cons, and learn how to run the tests.
date: 2024-10-17
author: Nocnica Mellifera
githubUser: serverless-mom
tags:
  - basics
weight: 5
displayTitle: Playwright vs Selenium
navTitle: Playwright vs Selenium
menu:
  learn:
    parent: "Getting started"
---

When considering automated testing tools for web applications, the choice between Playwright and Selenium is common. Both tools offer robust capabilities, but they cater to different needs and expertise levels. This article provides a detailed comparison to help you decide which solution is best for your project or organization.

## Playwright Overview

Playwright is a relatively new browser automation framework that has gained popularity due to its modern approach to web testing. It supports multiple programming languages, but it is particularly well-suited for JavaScript and TypeScript users.

### Playwright Key Features

- **Out-of-the-box Test Framework**: Playwright comes bundled with Playwright Test, providing a comprehensive test automation framework that handles test execution, reporting, assertions, and more.
- **Auto-Wait Mechanism**: Playwright intelligently waits for elements to be ready before interacting with them, reducing the need for manual wait statements.
- **Cross-Browser Testing**: It supports Chromium, Firefox, and WebKit, making it useful for testing across different browsers.
- **Parallel Execution**: Built-in support for running tests in parallel to speed up execution time.
- **Trace Viewer**: A powerful debugging tool that records test execution, allowing you to inspect the behavior and identify issues.
- **Headless Mode**: Ability to run tests in headless mode for faster execution and CI/CD pipelines.

### How to Run Playwright Tests

1. Install Playwright using npm:
    
    ```bash
    npm install --save-dev playwright
    ```
    
2. Set up a test script using `@playwright/test`:
    
    ```ts
    import { test, expect } from '@playwright/test'
    
    test('example test', async ({ page }) => {
      await page.goto('<https://example.com>')
      const title = await page.title()
      expect(title).toBe('Example Domain')
    })
    ```
    
3. Run the test with the Playwright CLI:
    
    ```bash
    npx playwright test
    ```
    

## Selenium Overview

Selenium has been a mainstay in browser automation for over a decade. It is widely used across the industry and supports multiple languages, including Java, Python, C#, and JavaScript. Selenium is a browser automation tool rather than a full-fledged testing framework, which means you’ll need to add additional libraries for assertions, reporting, and parallel test execution.

### Selenium Key Features

- **Multi-Language Support**: Selenium supports many programming languages, making it flexible for teams with diverse tech stacks.
- **Cross-Browser Testing**: It works with all major browsers, including Chrome, Firefox, Safari, and Edge.
- **WebDriver Protocol**: Selenium uses the WebDriver protocol, which is a standard for browser automation.
- **Support for Real Devices**: It integrates well with cloud services for testing on real devices.
- **Large Ecosystem**: There are many plugins, libraries, and resources available for Selenium.

### Setting up and running Selenium tests

Here’s how to run a Selenium test in NodeJS

1. **Install Selenium WebDriver**
    
    You can add Selenium WebDriver to your project using NPM:
    
    ```bash
    npm install selenium-webdriver
    ```
    
    Selenium WebDriver is the library that allows your tests to interact with browsers.
    

### Writing a Basic Selenium Test

1. **Import the Selenium WebDriver Module**
    
    In your test file (e.g., `test.js`), import the `selenium-webdriver` package:
    
    ```js
    const { Builder, By, until } = require('selenium-webdriver');
    ```
    
2. **Set Up the Browser Driver**
    
    Use the `Builder` to configure your test environment. Here is a simple example:
    
    ```ts
    async function exampleTest() {
      // Initialize a new browser instance
      const driver = await new Builder().forBrowser('chrome').build();
    
      try {
        // Navigate to a website
        await driver.get('https://www.example.com');
    
        // Perform actions or assertions
        const title = await driver.getTitle();
        console.log('Page Title:', title);
    
        // Find an element and interact with it
        const element = await driver.findElement(By.name('exampleInput'));
        await element.sendKeys('Test Input');
    
        // Wait for some condition, if necessary
        await driver.wait(until.titleIs('Expected Title'), 5000);
      } finally {
        // Clean up and close the browser
        await driver.quit();
      }
    }
    
    // Run the test
    exampleTest();
    ```
    

### Running the Test

To run your test, execute `node test.js` in your terminal

This command launches a browser, performs the specified actions, and then closes the browser. You should see any console output you added, such as the page title.

## Playwright vs Selenium: Key Differences

While Playwright and Selenium are both used for similar roles as test automation. And both are focused on operating a browser automatically, the difference in their backgrounds, core userbase, and ages show up in a number of implementation details.

| **Feature** | **Playwright** | **Selenium** |
| --- | --- | --- |
| **Language** | Primarily used with JavaScript/TypeScript; also supports Python, Java, and .NET. | Supports a wider range of languages, suitable for diverse tech stacks. |
| **Test Runner Frameworks** | Comes with Playwright Test, a built-in test runner. | Does not include a test runner; requires integration with frameworks like JUnit, TestNG, or PyTest. |
| **Element Locators** | Uses modern CSS selectors and locators like `getByRole`, `getByText`, `getByTestId`. | Uses traditional locators such as `id`, `class`, `xpath`, `cssSelector`. |
| **Waits** | Automatic waiting for elements, reducing the need for manual `sleep` statements. | Requires explicit or implicit waits, leading to more complex synchronization issues. |
| **Ease of Installation** | Easy to install with a single npm command. | Requires installing browser drivers and additional setup components. |
| **Trace Viewer** | Includes a built-in trace viewer for debugging. | No built-in trace viewer; debugging requires additional tools. |
| **Prerequisites** | Basic knowledge of JavaScript or TypeScript. | More flexibility with languages but requires additional setup. |
| **Operating Systems** | Supports Windows, macOS, and Linux. | Supports Windows, macOS, and Linux. |
| **Open Source** | Actively gaining traction and evolving rapidly. | Established community, but some resources may be outdated. |
| **Parallel Testing** | Built-in support for parallel test execution. | Requires a third-party framework for parallel runs. |
| **Architecture** | Modern architecture optimized for speed and reliability. | Based on the WebDriver protocol, which is older. |
| **Browsers Supported** | Chromium, Firefox, WebKit. | Chrome, Firefox, Safari, Edge, and more. |
| **Documentation & Community** | Well-documented; community support is growing. | Established community with extensive resources. |
| **Real Devices Support** | Limited real device testing options. | Better integration with cloud-based real device testing services. |
| **Plugins** | Fewer plugins but growing support. | Rich ecosystem of plugins for various purposes. |
| **Visual Testing** | Native support for visual regression testing. | Requires third-party libraries for visual testing. |
| **Test Recording & Screenshots** | Built-in support for test recording and screenshots. | Screenshots supported; test recording needs external tools. |
| **Assertions** | Comes with built-in assertions. | Needs an external assertion library. |
| **Test Reporting** | Built-in test reporting features. | Needs external reporting libraries. |
| **API Automation** | Supports API testing natively. | Focused on browser automation only. |
| **Performance** | Generally faster, especially in headless mode. | Slower due to the WebDriver protocol overhead. |

## 

## Selenium Examples

Here’s a test that simulates a user logging in and loading recent transactions. The automation then takes a screenshot.

```js
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

async function loginAndCaptureScreenshot() {
  // Initialize the browser driver
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Step 1: Navigate to the login page
    await driver.get('https://www.example-service.com/login');

    // Step 2: Enter login credentials
    await driver.findElement(By.id('username')).sendKeys('your-username');
    await driver.findElement(By.id('password')).sendKeys('your-password');

    // Step 3: Click the login button
    await driver.findElement(By.id('login-button')).click();

    // Step 4: Wait until the transactions page is loaded
    await driver.wait(until.elementLocated(By.id('recent-transactions')), 10000);

    // Step 5: Load recent transactions
    const transactionsElement = await driver.findElement(By.id('recent-transactions'));

    // Verify transactions are visible (optional)
    const isDisplayed = await transactionsElement.isDisplayed();
    console.log('Transactions loaded:', isDisplayed);

    // Step 6: Take a screenshot
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('screenshot.png', screenshot, 'base64');
    console.log('Screenshot taken and saved as screenshot.png');

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Step 7: Close the browser
    await driver.quit();
  }
}

// Run the test
loginAndCaptureScreenshot()
```

## Playwright Examples

Here’s the same test in Playwright:

```js
const { chromium } = require('playwright');

async function loginAndCaptureScreenshot() {
    // Step 1: Navigate to the login page
    await page.goto('https://www.example-service.com/login');
    
    // Step 2: Enter login credentials
	  await page.getByLabel('Username or email address').fill('username');
	  await page.getByLabel('Password').fill('password');
	  
    // Step 3: Click the login button
	  await page.getByRole('button', { name: 'Sign in' }).click();
	  
	  // Step 4: Click recent transactions
	  await page.getByLabel('Transactions').click()
	  
	  // Step 5: Take a screenshot
	  await page.screenshot({ path: 'screenshot.png', fullPage: true });
}

// Run the test
loginAndCaptureScreenshot()
```

Some key differences in the two examples:

- Playwright uses modern css locators rather than finding by ID or class. ID and class can shift on an element when all that’s happening is a visual refresh of the site. We don’t want our tests to break in this situation!
- Playwright includes auto-waiting, so there’s no need to add manual timeouts to our code.

## Playwright vs Selenium: Pros & Cons

### Playwright

**Pros**: Easy to get started, built-in test framework, faster execution, modern architecture, better support for JavaScript/TypeScript.
**Cons**: Fewer legacy languages supported (e.g. C), limited real device testing.

### Selenium

**Pros**: Established tool with a large community, supports many languages, better integration with real device testing.
**Cons**: More setup required, slower execution, higher learning curve for productivity.

## Playwright vs Selenium: Which Solution to Choose?

### When to Use Playwright

- If you’re starting a new project and want fast productivity.
- If your team is experienced with JavaScript or TypeScript.
- If you need built-in features like auto-waiting, test recording, and API testing.

### When to Use Selenium

- If you’re joining an established project that already uses Selenium.
- If you require deep device simulation

## Conclusion

**If you’re starting a new project, you want to use Playwright.** You’ll get exposure to JS or Typescript, plug in to a great existing community, write tests and other automations faster, and your tests will be more consistent and reliable. You can adopt Playwright without needing to become a “Playwright specialist” and the skills you learn will encourage solid front-end engineering and language skills in other areas.

If you’re already using Selenium, it’s a framework with a lot of strengths! All other factors being equal, you don’t need to rip out your Selenium workflow just to adopt Playwright.

Engineers building testing and automation have more options than ever, and they can simulate a broader range of user actions with great tool suites. For now, our pick for new projects is Playwright, and we’re excited to see what new features are added to the project in the coming years.
