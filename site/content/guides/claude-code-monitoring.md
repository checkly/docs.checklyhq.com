---
title: Add In-Depth Monitoring With Checkly and Claude Code
description: >-
  By integrating AI into your development workflow, you can generate valid Checkly constructs—including URL monitors and Playwright-based browser checks—with minimal effort.
author: Nočnica Mellifera
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - AI
---
AI-assisted coding promises to massively upgrade developer productivity, and with Checkly's model of [Monitoring as Code](https://www.checklyhq.com/blog/monitoring-as-code-in-your-sdlc/), you can create monitoring coverage for all your services in minutes instead of days. This guide will show you how to create an AI development environment that lets you create and deploy several types of Checkly monitoring.

## Setup

If you haven't already, start by [installing the Checkly CLI](https://www.checklyhq.com/docs/cli/installation/), then create a repository that will be the 'project' that contains all your Checkly monitors managed as code. If you don't already have a project, create one with:

```bash
npm create checkly@latest
```

Next, install [Claude Code](https://www.anthropic.com/claude-code) globally with 

```bash
npm install -g @anthropic-ai/claude-code
```

and from the root folder of your project,  start Claude Code with the `claude` command.

You'll be prompted to sign in to or sign up for an Anthropic account.

### Add the Playwright MCP

You can give Claude Code access to a browser by adding the [Playwright MCP](https://github.com/microsoft/playwright-mcp) to your local configuration with:

```bash
claude mcp add playwright npx @playwright/mcp@latest 
```
This will let us ask Claude Code to do things like crawling a particular website and interacting with pages.

## Give Claude Code Some Context
Everything we write into the CLI interface is part of a 'prompt,' and by default, Claude Code will add a bit of information to what we submit as 'context' on that prompt. Ideally, our requests written into Claude Code would include context about our specific project: its structure, language, and even its purpose. Because of the `npm create` command we ran above, our folder already has a boilerplate version of a Checkly project. We can't feed in all of these files as context, but we can add a summary of our whole project as context by opening Claude Code and running [the slash command](https://docs.anthropic.com/en/docs/claude-code/slash-commands):

```{title="Prompt:"}
/init
```

Claude Code will scan the whole project, write a summary, and then store that summary in a local `CLAUDE.md` file. Claude Code will read that file and add it to our prompt every time it's run within this project from now on.

Let's add a bit more to this context, we want test files that make sense as a [Checkly construct](https://www.checklyhq.com/docs/cli/constructs-reference/). Let's add [Checkly's AI rules file](https://www.checklyhq.com/docs/ai//use-checkly-with-ai-ide/#claude-code) to our `CLAUDE.md` context file:

```bash
mkdir -p .claude &&
curl -o .claude/checkly.rules.md https://www.checklyhq.com/docs/ai/checkly.rules.md -L 
echo "- examine checkly.rules.md for code generation rules" >> .claude/CLAUDE.md
```

After this you'll need to exit and restart Claude Code for it to pick up changes to our context file.

## Create new URL Monitors

We'll start with something easy. A URL monitor that will check an HTTP endpoint and alert if it doesn't receive the right status code. With the context set from the section above, try a command like:

```{title="Prompt:"}
Create a new URL monitor for the site https://danube-webshop.herokuapp.com/ that runs every five minutes and doesn't follow redirects.
```

After a few seconds, Claude Code will produce this:

```ts
import { Frequency, UrlMonitor, UrlAssertionBuilder } from 'checkly/constructs'

new UrlMonitor('danube-web-shop-monitor', {
  frequency: Frequency.EVERY_5M,
  name: 'Danube Web Shop URL monitor',
  activated: true,
  request: {
    url: 'https://danube-web.shop/',
    skipSSL: false,
    followRedirects: false,
    assertions: [
      UrlAssertionBuilder.statusCode().equals(200),
    ]
  }
})
```

While we're writing this simplest of monitors, it's worth testing the limits of Claude Code's context for writing valid Checkly configuration. One thing we tested while writing this article was whether picking the wrong prompt would result in invalid Checkly construct code. The `Frequency` class here doesn't accept arbitrary values, so we wondered if the context provided in `CLAUDE.md` was enough for the tool to identify valid values for the check. We tried requesting a check that ran “every 17 seconds” and Claude Code prompted to run a `find` on the project to identify valid values for `frequency`. In the end, Claude Code did create valid code with this note in the process feed.

```{title="Reply from Claude Code:"}
Based on the search results, 17 seconds is NOT a valid frequency value for Checkly monitors. The closest valid option was selected: 20 seconds.
```

## Create Playwright Synthetics Checks With Claude Code

With our context set up, and a browser available via the Playwright MCP, we can create more complex Playwright scripts for browser monitoring of our site. With specific instructions and clear prompting, you can get consistent performance of Claude Code writing our Browser checks.

### 1. Start With a single test

First you'll want to write a single check that does straightforward browsing and checking for page elements. With some context engineering, you can instruct Claude to navigate a page while recording the taken actions to generate a Playwright test. Read more about this approach and [extensive prompt guidelines on our blog](https://www.checklyhq.com/blog/generate-end-to-end-tests-with-ai-and-playwright/).

```{title="Prompt:"}
You are a Playwright test generator and an expert in TypeScript, Frontend development, and Playwright end-to-end testing.
- You are given a scenario, and you need to generate a Checkly spec.ts test for it.
- Navigate to the homepage https://danube-web.shop/
- Browse through multiple pages.
- Assert the visibility of 1-2 page elements.
```

Claude will then open a browser using the Playwright MCP server, perform the actions, and create a short Playwright script that will look something like the following.

```ts {title="book-detail-visibility.spec.ts"}
import { test, expect } from '@playwright/test'

test.describe('Danube WebShop Book Detail Page', () => {
  test('click book link and verify three elements are visible', async ({ page }) => {
    await page.goto('https://danube-web.shop/')
    
    await page.getByText('Parry Hotter').click()    
    await expect(page.getByRole('heading', { name: 'Parry Hotter' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible()
    await expect(page.locator('img').first()).toBeVisible()
  })
})
```

Lets make sure our script is valid by running this test:

```bash
npx checkly test book-detail
```
*Without an exact file path, the `checkly test` command will run any test that matches this pattern.*

and making sure the test passes.

```bash
Bundling project resources... ✅

Running 1 checks in eu-west-1.

__checks__/book-detail-visibility.spec.ts
  ✔ book-detail-visibility.spec.ts (7s)

1 passed, 1 total
```

*Like always with the `checkly test` command, this test isn't running from our workstation but rather from the Checkly's monitoring infrastructure.*

Next we'll want to create a `.check.ts` file for this browser check, which sets some check-specific settings and assigns the check's logical ID. 

```{title="Prompt:"}
Write a .check.ts file for book-detail-visibility that runs the check from a US and EU region and defines a linear retry strategy.
```
This should result in a complete `.check.ts` file generated by Claude, implementing the Checkly construct configuration. For better understanding of the configuration, you can ask for code comments:

```{title="Prompt:"}
Add comments to the check.ts file defining how each line configures the checkly construct.
```
The result is a nicely commented version of and a good tour of this construct:
```ts {title="book-detail-visibility.check.ts"}
// Import Checkly constructs for browser checks, alert escalation, and retry strategies
import { AlertEscalationBuilder, BrowserCheck, RetryStrategyBuilder } from 'checkly/constructs'

// Create a new browser check with unique logical ID
new BrowserCheck('book-detail-visibility-check-v1', {
  // Human-readable name displayed in Checkly dashboard
  name: 'Book Detail Page Visibility Check',
  // Configuration for the test code to execute
  code: {
    // Path to the Playwright test file relative to this check file
    entrypoint: './book-detail-visibility.spec.ts',
  },
  // Whether the check is enabled and will run according to schedule
  activated: true,
  // Whether alerts are suppressed (false = alerts will be sent)
  muted: false,
  // Whether the check is expected to fail (false = failure will trigger alerts)
  shouldFail: false,
  // Geographic regions where the check will run
  locations: [
    'us-east-1', // US East (N. Virginia)
    'eu-west-1', // EU West (Ireland)
  ],
  // How often the check runs in minutes
  frequency: 30,
  // Alert escalation policy defining when and how alerts are sent
  alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1, {
    // Number of failed runs before sending alert (0 = immediate)
    amount: 2,
    // Time interval between escalation checks in minutes
    interval: 5,
  }, {
    // Whether percentage-based escalation is enabled
    enabled: false,
    // Percentage threshold for escalation (when enabled)
    percentage: 10,
  }),
  // Retry strategy configuration for failed checks
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    // Initial wait time before first retry in seconds
    baseBackoffSeconds: 30,
    // Maximum number of retry attempts
    maxRetries: 2,
    // Maximum total time for all retries in seconds
    maxDurationSeconds: 300,
    // Whether retries should use the same region as original check
    sameRegion: true,
  }),
  // Whether to run checks in multiple locations simultaneously
  runParallel: true,
})
```

Alternatively, you can deploy a Playwright check without a `.check.ts` configuration file, and the file name will be used as the logical ID.

### 2. Add our new Check to Claude's Context

With this check created, let's add the following lines to your updated `CLAUDE.md` file:

```markdown
- When writing Playwright, don't set locators equal to const, rather just perform expect tests directly on locators
- When writing a spec.ts file, don't use locators based on CSS class
Oh that's smart. yeah I'll add something like:
- Before creating more check files scan `__checks__` for more info and base setup
```

Pro tip: from the Claude Code prompt, just hit octothorp "#" to add to Claude's memory. Each entry will be a new line in `CLAUDE.md`.

### 3. Use Claude Code to create multiple Browser Checks

Now that we've got a working test and, let's let Claude Code create another check for us:

```{title="Prompt:"}
Create a new browser check for https://danube-web.shop/ that clicks on a single button then checks the visibility of 10 different elements on the page.
```

As the prompt didn't specify which button to click, Claude Code will select one. In this case it picked a the signup button. The result is a nice clean test written to the spec, even the title is specific to the button that Claude Code decided to click:

```ts {title="signup-form-elements.spec.ts"}
import { test, expect } from '@playwright/test'

test.describe('Danube WebShop Signup Form Elements', () => {
  test('click signup button and verify ten form elements are visible', async ({ page }) => {
    await page.goto('https://danube-web.shop/')
    
    await page.getByRole('button', { name: 'Sign up' }).click()
    
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Name' }).first()).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Surname' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Company (optional)' })).toBeVisible()
    await expect(page.getByRole('radio', { name: 'Myself' })).toBeVisible()
    await expect(page.getByRole('radio', { name: 'My business' })).toBeVisible()
    await expect(page.getByRole('checkbox', { name: 'I would like to receive promotional emails' })).toBeVisible()
    await expect(page.getByRole('checkbox', { name: 'I have read and accept the privacy policy' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible()
  })
})
```

Claude Code will confirm before creating the script file. If you've followed these tutorial steps in a single conversation with Claude Code, the tool will likely offer to `create signup-form-elements.check.ts` to configure the check.

You can prompt for multiple checks at the same time. As you can imagine, this unlocks the creation of a large number of synthetic monitors relatively quickly. 

```{title="Prompt:"}
Load the page https://danube-web.shop/ and create several separate .spec.ts checks, one for each page linked off of danube-web.shop. Each created check should check for multiple page elements.
```
If you haven't watched the responses from Claude Code already, it can be helpful to see how the tool breaks down our request:

```{title="Reply from Claude Code:"}
⏺ Update Todos
  ⎿  ☐ Load danube-web.shop and identify all linked pages           
     ☐ Explore each linked page to understand available elements
     ☐ Create .spec.ts files for each linked page with multiple
       element checks
```
Every file output from this command isn't included here for brevity, but Claude Code did create five new check scripts based on the five heading links at danube-web.shop. To test all these new checks quickly, run

```bash
npx checkly test
```
*With no file name argument, this will try to run everything in the `__checks__` folder*

```bash
2 failed, 5 passed, 7 total
```
*If you've followed every step in this tutorial, you may have different numbers for the number of tests run here.*

When running a number of generated tests, the only issue we ran into was a failure with the message: `Error: expect.toBeVisible: Error: strict mode violation: getByText('Crime & Thrillers') resolved to 2 elements:`. As the error message implies, the issue is that this locator:

```ts
  await expect(page.getByText('Fantasy')).toBeVisible();
```

Found multiple results on the page. There are a number of ways to fix this with Claude Code. We could prompt Claude Code with:

```{title="Prompt:"}
Revise locators in item-visibility.spec.ts to look at only the first result.
```

This would change every locator in the check, which may or may not be what you want! You could also paste in the error message to Claude and ask it to fix the script, or specify which locator you want to add `first()` to. Whatever route you take the result will be an edit to:

```ts
  await expect(page.getByText('Fantasy').first()).toBeVisible();
```
Once Claude Code added a single `.first()` to the checks written above, everything was passing. If you're having trouble reading the generated tests, take a look at [Checkly's Playwright documentation](https://www.checklyhq.com/learn/playwright/). 

### 4. Going Further: Edit Multiple Checks and Configurations

Updating checks is another use case that may be useful for larger projects. Try prompting Claude Code with something like:

```{title="Prompt:"}
Update every `.check.ts` file for a check that touches [danube-web.shop](http://danube-web.shop/), and change the frequency to every 30 minutes.
```

Not only do requests to update monitoring configuration work, sometimes they even produce sensible feedback and information about the checks that currently had no frequency setting:

```{title="Reply from Claude Code:"}
The url.check.ts and api.check.ts files don't have individual frequency settings - they inherit the default frequency from the project configuration in checkly.config.ts.
```

Once we're done creating new checks, we can test them with `npx checkly test` like we did above. Then it's time to run them all.


## Deploy With the Checkly CLI

In our example, we want to deploy a couple of checks at once, so it's worth checking whether the project is properly set up before deployment. Many problems would have been revealed while running `test`, but if, for example, some checks were unintentionally removed from our project, we'll need to use `deploy` to detect that. Run the `deploy` command with the `-p` preview flag:

```bash
npx checkly deploy -p
```

This command won't deploy anything, just parse our project and show us what will be changed when we run the command without the preview flag. When you first run `deploy -p` you should just see a long list of created checks in the deployment command. For this tutorial, here's the preview of a more complex project state:

```bash
Bundling project resources... ✅

Create:
    BrowserCheck: __checks__/crime-category.spec.ts
    BrowserCheck: __checks__/fantasy-category.spec.ts
    BrowserCheck: __checks__/homepage-elements.spec.ts
    BrowserCheck: __checks__/navigation-menu.spec.ts
    BrowserCheck: __checks__/search-functionality.spec.ts
    BrowserCheck: book-detail-visibility-check-v1
    BrowserCheck: signup-form-elements-check-v1

Delete:

    Check: danube-web-shop-monitor

Update and Unchanged:
    BrowserCheck: __checks__/homepage.spec.ts
```

Let's discuss the output of this preview command in detail, as it's critical to understand how Checkly handles deployments from your project:
* Checks that have no `.check.ts` config file are listed by their filename and will be named for their file name in the Checkly web UI. In general, it's better to include a config file for every check since it gives you explicit control of the check's logical ID. We've left out the config for five checks for demonstration purposes.
* Checks with a config file are shown by their logical ID. 
* Checks previously deployed from this project that are not present in this deployment will be deleted.
* Checks with a matching logical ID from a previous deployment will be listed as "Update and Unchanged".

If you're getting strange results from a preview of `deploy` and you're not sure why, it might be time to get in touch with the Checkly team. [Join our Slack](https://checklyhq.com/slack) for deployment advice! 

Once we're happy with what will be deployed, it's time to run `npx checkly deploy` and create our checks!

## Conclusion

AI-assisted coding tools like Claude Code can significantly accelerate the creation and deployment of monitoring checks with Checkly's Monitoring as Code approach. By integrating AI into your development workflow, you can generate valid Checkly constructs—including URL monitors and Playwright-based browser checks—with minimal effort. One of the superpowers that an AI workflow can unlock is the *mass updating of many files in your project.* Updating a large number of test files can go much faster with the help of Claude Code. 

While AI can handle much of the boilerplate work, human oversight remains essential for ensuring best practices, refining assertions, and maintaining high-quality monitoring scripts. By combining AI efficiency with developer expertise, teams can achieve comprehensive monitoring coverage in minutes rather than days.

### Further Reading

Throughout this tutorial, we added a few lines to the CLAUDE.md context file. In all, those additions were (rewritten for clarity):

```markdown
## Memories and Best Practices
- Follow the rules in .claude/checkly.rules.md
### When writing checkly playwright tests
- load the target page in a browser
- don't set locators equal to const, rather just perform expect tests directly on locators
- don't use locators based on CSS class
```

To learn more about Checkly's capabilities, explore these resources:

- [Generating end-to-end tests with AI and Playwright MCP](https://www.checklyhq.com/blog/generate-end-to-end-tests-with-ai-and-playwright/) - Stefan's blog post makes a great starter for generalized Playwright development with an AI toolkit.
- [Checkly CLI Documentation](https://www.checklyhq.com/docs/cli/) – Learn how to manage checks as code right from your command line.
- [Playwright Testing Guide](https://www.checklyhq.com/learn/playwright/) – Best practices for writing reliable browser checks.
- [What is monitoring as code?](https://www.checklyhq.com/guides/monitoring-as-code/) — A comprehensive guide to infrastructure-as-code principles for monitoring.
- [Checkly Community Slack](https://checklyhq.com/slack) – Join discussions and get support from the Checkly team and other users.

For more tutorials and advanced use cases, visit the [Checkly YouTube channel](https://www.youtube.com/@ChecklyHQ), where you can see great tutorials like this guide to the Playwright MCP server:

{{< youtube id="MIlcVo1x3Is" title="Generating Playwright Tests With AI: Let's Try the New Playwright MCP Server!">}}