---
title: Record Automation Scripts Using Playwright Codegen
subTitle: Automatically record playwright tests with codegen
date: 2025-02-20
author: Nočnica Mellifera
githubUser: serverless-mom
tags:
  - basics

weight: 40
navTitle: Codegen
menu:
  learn_playwright:
    parent: "Basics"
---

Did you know that you can use Playwright to generate your automation scripts automatically? Let's dive into how you can leverage Playwright's `codegen` feature to record scripts effortlessly.
<!-- more -->


### Step 1: Launch Playwright Codegen

To get started, you'll use the `codegen` command from the Playwright executable. Let's say you want to create a script for interacting with [Checkly](https://checklyhq.com/). You would run the following command in your terminal:

```bash
npx playwright codegen https://checklyhq.com
```

When you execute this command, two windows will open up. On the left, you have a browser window displaying the target site, and on the right, you see the Playwright inspector.

![Playwright codegen inspector](/learn/images/codegen-1.png)

Note that the inspector will populate with the basic code needed for a Playwright test, and start with the line needed to load the url you gave in the terminal.

Also, the browser will automatically highlight elements, and show you a locator for them in Playwright’s preferred [user-first selector](https://www.checklyhq.com/blog/playwright-user-first-selectors/) format. 

### Step 2: Interact with the Website

Now, you can start interacting with the website as you normally would. For example:

1. Accept cookies.
2. Click a few links.
3. Type "hello world" in a search box.

As you perform these actions, you'll notice that the Playwright inspector on the right is recording every interaction in real-time. Each action is converted into a line of code, creating a script as you go. For example the steps above would produce the code as follows:

```ts
test('test', async ({ page }) => {
  await page.goto('https://www.checklyhq.com/');
  await page.getByRole('button', { name: 'Accept All' }).click();
  await page.getByRole('button', { name: 'Developers' }).first().click();
  await page.getByRole('link', { name: 'Documentation Technical docs' }).click();
  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search docs').click();
  await page.getByPlaceholder('Search docs').fill('hello world');
});
```

Note that codegen will make a ‘best effort’ at emulating your actions and writing ‘best practice’ code, so you should always review it before deploying.

### Step 5: Add Assertions to your tests

Every action in the script above has implicit assertions about the elements we interact with. Playwright will expect these elements are stable, visible, and enabled; and if one isn’t then the test will fail we could call this done, but we generally want our tests to contain assertions beyond just navigating. There are a few reasons why you should have assertions in your test: It makes it clearer to future coders what your test was checking for, and the error message is more useful from a failed assertion rather than just failing to find an element. Right now all we’ll get if the test above fails is a timeout and a line which failed. 

To add assertions, use the little toolbar at the top of the Chromium browser:

![buttons at the top of the playwright codegen browser](/learn/images/codegen-2.png)

- The first button, ‘Record,’ is active at startup, and you can click it to pause the inspector’s recording of your every action in the browser
- Next is ‘Pick Locator,’ clicking this will make the locator for anything you click appear in the inspector, useful if you know how to write a test but are struggling to find a good locator for a particular element
- The 👁️ button in the middle is ‘Assert Visible’, clicking this and clicking a page element adds an assertion to our test. for example clicking the ‘book a demo’ link in the main [checklyhq.com](https://checklyhq.com) homepage gets this assertion in our test code: `await expect(page.getByRole('button', { name: 'Book a demo' }).first()).toBeVisible();`
- What if we just want to make sure that a particular string appears in an element? Click the ‘Match Text’ button and you’ll get a dialog box where to enter the text you want to check for.
    
![writing an assertion](/learn/images/codegen-3.png)

this will generate a `.toContainText(` assertion in the inspector
    
- Finally the ‘Assert Value’ generates a `.toHaveValue()` assertion, which is used to check that an [input field has a certain value](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-value), for pre-filled inputs or for example when a user’s data should automatically be filled out in a form.

Note that the assertions created by codegen are fairly basic, and while they could be the whole basis for a test suite, it’s a great idea to learn about [Playwright assertions](https://www.checklyhq.com/learn/playwright/assertions/) and write more complex ones yourself. You can write any calculable value into an assertion, so the sky is the limit.

### Step 4: Write tests in Java, Python, .Net or Javascript - Choose Your Target Environment

After you're done interacting with the website, you can choose the target environment for your script. Playwright allows you to generate scripts in various languages, such as JavaScript, Python, or Playwright's own test framework.

For this example, let's pick JavaScript. You can copy the generated script from the inspector.

### Step 5: Save and Run Your Script

With your script copied, you can drop the test into your Playwright spec file, and run it to see the results. Note that the script as generated contains no comments, and isn’t in steps. If you want to be considerate of your next coder, who let’s be honest is probably you in 6 months having forgotten everything about this test, add some comments, give the test a more helpful name than `'test'` and [divide the test into steps for readability](https://www.checklyhq.com/blog/improve-your-playwright-documentation-with-steps/).

### Step 5: Run Your Script in the Cloud

The script you generated works perfectly in your local environment. But if you want to take it a step further, you can copy and [paste the script into a Checkly browser check](https://www.checklyhq.com/docs/browser-checks/) to run it in the cloud on their infrastructure. This is especially useful for continuous monitoring and testing in different environments and from different geographies. If you’re not partial to a web interface, deploy your locally saved Playwright tests directly to Checkly with the [Checkly CLI](https://www.checklyhq.com/docs/cli/). With our CLI, you can work on tests locally and then run them through the Checkly system right from your command line.

### Bonus Step 1: Add Playwright to Visual Studio Code

Many developers are now comfortable using Microsoft’s Visual Studio Code as their IDE, and Playwright has a great plugin for Visual Studio Code. Install the [VS Code extension from the marketplace](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) or from the extensions tab in VS Code. 

![the VS code extensions tab](/learn/images/codegen-4.png)

With the plugin installed, you can record a new test directly into your script file, and even record individual steps with ‘record at cursor.’ 

The plugin has a lot of other neat features including being able to run your tests right from the code editor, and show a browser running your tests. If you’re already using Visual Studio Code, or thinking about adopting it as an IDE, the Playwright plugin is worth checking out!

### Bonus Step 2: Simulate a Mobile Browser Viewport with `--viewport`

Playwright can’t perfectly emulate a particular build of Mobile Opera running on a 10-year-old Android, but a good start is simulating a mobile viewport, to see if things render correctly and buttons are still visible. Start by setting your viewport size when you start up codegen:

```bash
npx playwright codegen --viewport-size=600,800 checklyhq.com

```

Your browser will start up showing the new, narrow viewport

![a narrow viewport](/learn/images/codegen-5.png)

You’ll also notice in the screenshot that the inspector automatically adds a `test.use` command to set the viewport. You can go quite a bit further with these settings, altering the user-agent for your test as needed to [emulate](https://playwright.dev/docs/emulation) different devices.

## See Codegen in action

To see the highly visual codegen tool in action, check out Stefan’s video below:

{{< youtube id="O-uS5wKKB30" >}}


### Go further with Playwright

You’ve just taken your first steps with creating Playwright tests. Playwright's `codegen` is a powerful tool that simplifies the process of creating automation scripts. As it produces assertions and locators that are industry standard, you should use anytime you need to make a clean, readable test or automation for your site.

If you’d like to dive deeper into Playwright and Checkly’s monitoring tools, join our [upcoming Kick-Start webinar](https://us02web.zoom.us/webinar/register/WN_gKYeJcMqQ_Kh31ziKM7uYw) to see how your end-to-end testing can grow into bullet-proof site monitoring to defend your SLA.