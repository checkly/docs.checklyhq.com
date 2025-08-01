---
title: Add in Depth Monitoring With Checkly and Claude Code
description: >-
  By integrating AI into your development workflow, you can generate valid Checkly constructs—including URL monitors and Playwright-based browser checks—with minimal effort.
author: Nočnica Mellifera
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - FAQ
  - AI
---
AI-assisted coding promises to massively upgrade developer productivity, and with Checkly’s model of [Monitoring as Code](https://www.checklyhq.com/blog/monitoring-as-code-in-your-sdlc/), you can create monitoring coverage for all your services in minutes instead of days. This guide will show you how to create an AI development environment that lets you create and deploy all types of Checkly monitoring.

## Setup

If you haven’t already, start by [installing the Checkly CLI](https://www.checklyhq.com/docs/cli/installation/), then create a repository that will be the ‘project’ that contains all your Checkly monitors managed as code. If you don’t already have a project, create one with:

```bash
npm create checkly@latest
```

Next, install [Claude Code](https://www.anthropic.com/claude-code) globally with 

```bash
npm install -g @anthropic-ai/claude-code
```

and from the root folder of your project and start Code with the `claude` command.

You’ll be prompted to sign in to or sign up for an Anthropic account.

I recommend using [the Visual Studio Code plugin for Claude](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code), which will make it easier to connect Claude Code with the VS Code file browser with Claude’s context (the VS Code plugin does a lot more than just context, this is just the most convenient feature we’ll use for this tutorial).

Optionally, from the Claude Code prompt, run `/init` to scan your project and create an initial `CLAUDE.md` context file.

### Add the Playwright MCP

You can give Claude Code access to a browser by adding the [Playwright MCP](https://github.com/microsoft/playwright-mcp) to your local configuration with 

```bash
claude mcp add playwright npx @playwright/mcp@latest 
```

## Give Claude Code Some Context

To create your Checkly monitoring, you want Claude Code to create files and updates that make sense as a [Checkly construct](https://www.checklyhq.com/docs/cli/constructs-reference/). Let’s add [Checkly’s AI rules file](https://www.checklyhq.com/docs/ai//use-checkly-with-ai-ide/#claude-code) to our [CLAUDE.md](http://CLAUDE.md) context file:

```bash
mkdir -p .claude &&
curl -o .claude/checkly.rules.md https://www.checklyhq.com/docs/ai/checkly.rules.md -L 
echo "- examine checkly.rules.md for code generation rules" >> .claude/CLAUDE.md
```

After this you’ll need to exit and restart Claude Code for it to pick up changes to our context file.

## Create new URL Monitors

We’ll start with something easy. A URL monitor that will check an HTTP endpoint and alert if it doesn’t receive the right status code. With the context set from the section above, try a command like:

> Create a new URL pinger for the site [https://danube-webshop.herokuapp.com/](https://danube-webshop.herokuapp.com/) that runs every five minutes and doesn’t follow redirects

After a few seconds, Claude Code will produce this:

```ts
import { Frequency, UrlMonitor, UrlAssertionBuilder } from 'checkly/constructs'

new UrlMonitor('danube-web-shop-pinger', {
  frequency: Frequency.EVERY_5M,
  name: 'Danube Web Shop Pinger',
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

While we’re writing this simplest of monitors, it’s worth testing the limits of Claude Code’s context for writing valid Checkly configuration. One thing I tested while writing this article was whether picking the wrong prompt would result in invalid Checkly construct code. The Frequency class here doesn’t accept arbitrary values, so I wondered what would happen since the [source file for Frequency](https://github.com/checkly/checkly-cli/blob/main/packages/cli/src/constructs/frequency.ts) won’t be part of Claude’s context. I tried requesting a check that ran “every 17 seconds” and Claude Code prompted me to run a `find` on the project to identify valid values for `frequency`. In the end, Claude Code did create valid code with this note in the process feed.

![Feedback on the terminal](/guides/images/claude-monitoring-01.png)



## Create Playwright Synthetics checks with Claude Code

It would be nice to have Claude Code automatically create the Playwright scripts we need to test our site's features. However, without careful controls, any 2025-era coding agent tends to write Playwright code that is either out of date or doesn’t follow best practices. The best way to get high-quality output is through some prompt engineering and careful provision of context.

### 1. Create at least one test with Playwright Codegen

We can capture our behavior in the browser to script a test with [Playwright Codegen](https://www.checklyhq.com/learn/playwright/codegen/), available either as a standalone utility, browser plugin, or VS Code plugin. Once [Codegen is set up](https://www.checklyhq.com/learn/playwright/codegen/), start recording and record the following:

- Navigate to your homepage.
- Browse through multiple pages.
- Assert the visibility of 1-2 page elements.

Once you’re done, copy the resulting code and create a file in `/__checks__` called `homepage-browse.spec.ts`. It should look something like this:

```ts
//homepage-browse.spec.ts
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://danube-web.shop/');
  await page.getByText('Haben oder haben').click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('link').click();
  await page.locator('a').filter({ hasText: 'Fantasy' }).click();
  await expect(page.getByText('The Polar Turtle')).toBeVisible();
  await expect(page.getByText('$9').first()).toBeVisible();
});
```

Lets make sure our script is valid by running this test:

```bash
npx checkly test homepage-browse
```

*Without an exact file path, the `checkly test` command will run any test that matches this pattern.*

and making sure the test passes.

![Feedback on the terminal](/guides/images/claude-monitoring-02.png)

*Like always with the `checkly test` command, this test isn’t running from my laptop but rather the real Checkly network!*

Next we’ll want to create a `.check.ts` file for this browser check, which sets some check-specific settings and assigns the check’s logical ID. 

```ts
//homepage-browse.check.ts
import { AlertChannel, AlertEscalationBuilder, BrowserCheck, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('browse-danube-homepage-v1', {
  name: 'Browse Danube Homepage',
  code: {
    entrypoint: './homepage-browse.spec.ts',
  },
  activated: true,
  muted: false,
  shouldFail: false,
  locations: [
    'us-east-1',
    'us-west-1',
  ],
  frequency: 5,
  alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1, {
    amount: 0,
    interval: 5,
  }, {
    enabled: false,
    percentage: 10,
  }),
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
  runParallel: true,
})
```

These settings are all optional and any not specified will default back to the account or project default, but it’s good to include them as our model. 

If we want to check our formatting, we can run the `checkly deploy` command with the preview flag: 

```bash
npx checkly deploy -p
```

### 2. Add our new Check to Claude’s context

With these checks created, add their references to Claude’s context by giving Claude Code the prompt:

> update my [CLAUDE.md](http://claude.md/) file with the new code in /__checks__
> 

Let’s take one additional step, add the following lines to your updated [CLAUDE.md](http://CLAUDE.md) file:

```markdown
- When writing Playwright, don't set locators equal to const, rather just perform expect tests directly on locators
- When writing a spec.ts file, don't use locators based on CSS class
```

pro tip: from the Claude Code prompt just hit octothorp ‘#’ to add to Claude’s memory

### 3. Use Claude Code to create new checks

Now that we’ve got a working test and config, let’s let Claude Code create a check for us:

> Create a new browser check for [https://danube-web.shop/](https://danube-web.shop/) that clicks on a single button then checks the visibility of 10 different elements on
the page
> 

The importance of step 1 above is apparent during the output from this task, as Claude Code examines the known good.

![Feedback on the terminal](/guides/images/claude-monitoring-03.png)

In order to scan the URL provided, Claude Code will confirm that it can use the Playwright MCP to open a browser and access the site. The result is a nice clean test written to the spec:

```ts
//item-visibility.spec.ts
import { test, expect } from '@playwright/test';

test('item visibility check', async ({ page }) => {
  await page.goto('https://danube-web.shop/');
  
  // Click on the "Books" heading
  await page.getByRole('heading', { name: 'Books', exact: true }).click();
  
  // Check visibility of 10 different items on the page
  await expect(page.getByText('Haben oder haben')).toBeVisible();
  // removed 6 more for readability
  await expect(page.getByText('Fantasy')).toBeVisible();
  await expect(page.getByText('$9.95').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Top sellers' })).toBeVisible();
});
```

Claude Code will confirm before creating the check and spec files with the configuration and script, respectively.

You can prompt for multiple checks at the same time, as the output is relatively token-efficient. As you can imagine, this unlocks the creation of a large number of synthetic monitors relatively quickly. Another use case that may be useful for larger projects, try prompting Claude Code with something like:

> 
> 
> 
> update every `.check.ts` file for a check that touches [danube-web.shop](http://danube-web.shop/), and change
> the frequency to every 30 minutes.
> 

Not only did this request work, but I even got sensible feedback about the checks that currently had no frequency setting:

```bash
  The url.check.ts and api.check.ts files don't have individual frequency settings -
  they inherit the default frequency from the project configuration in
  checkly.config.ts.
```

Once we’re done creating new checks, it’s time to run them all with:

```bash
npx checkly test
```

When I ran a number of generated tests, the only issue I ran into was a failure with the message: `Error: expect.toBeVisible: Error: strict mode violation: getByText('Crime & Thrillers') resolved to 2 elements:`. As the error message implies, the issue is that this locator:

```ts
  await expect(page.getByText('Fantasy')).toBeVisible();
```

Found multiple results on the page. There are a number of ways to fix this with Claude Code, we could prompt Claude Code with:

> revise locators in item-visibility.spec.ts to look at only the first result
> 

This would change every locator, which may or may not be what you want! You could also paste in the error message to Claude and ask it to fix the script. Whatever route you take the result will be an edit to:

```ts
  await expect(page.getByText('Fantasy').first()).toBeVisible();
```

If you’re having trouble reading the generated tests, take a look at [Checkly’s Playwright documentation](https://www.checklyhq.com/learn/playwright/). Once Claude Code added a single `.first()` to my check, everything was passing:

![Feedback on the terminal](/guides/images/claude-monitoring-04.png)

## Deploy With the Checkly CLI

In our example, we want to create over 50 checks at once, so it’s worth checking whether the configuration is properly formatted before deployment. Many problems would have been revealed while running `test` but if, for example, the [logical IDs](https://www.checklyhq.com/docs/cli/constructs-reference/#synthetic-checks) of current and existing checks are colliding, we’ll need to run `deploy` to detect that. Run the `deploy` command with the `-p` preview flag:

```bash
npx checkly deploy -p
```

This command won’t deploy anything, just parse our project and show us what will be created when we run the command without the preview flag.

![Feedback on the terminal](/guides/images/claude-monitoring-05.png)

*We’ll get a long list of new checks that will be created*

If you’re getting strange results from a preview of `deploy` and you’re not sure why, it might be time to get in touch with the Checkly team, [join our Slack](https://checklyhq.com/slack) for deployment advice! 

Once we’re happy with what will be deployed, it’s time to run `npx checkly deploy` and create our checks!

## Conclusion

AI-assisted coding tools like Claude Code can significantly accelerate the creation and deployment of monitoring checks with Checkly’s Monitoring as Code approach. By integrating AI into your development workflow, you can generate valid Checkly constructs—including URL monitors and Playwright-based browser checks—with minimal effort. One of the superpowers that an AI workflow can unlock is the *mass updating of many files in your project.* Updating a large number of test files can go way faster with the help of Claude Code. 

While AI can handle much of the boilerplate work, human oversight remains essential for ensuring best practices, refining assertions, and maintaining high-quality monitoring scripts. By combining AI efficiency with developer expertise, teams can achieve comprehensive monitoring coverage in minutes rather than days.

## Further Reading

To learn more about Checkly’s capabilities, explore these resources:

- [Checkly CLI Documentation](https://www.checklyhq.com/docs/cli/) – Learn how to manage checks as code right from your command line.
- [Playwright Testing Guide](https://www.checklyhq.com/learn/playwright/) – Best practices for writing reliable browser checks.
- [What is monitoring as code?](https://www.checklyhq.com/guides/monitoring-as-code/) — A comprehensive guide to infrastructure-as-code principles for monitoring.
- [Checkly Community Slack](https://checklyhq.com/slack) – Join discussions and get support from the Checkly team and other users.

For more tutorials and advanced use cases, visit the [Checkly YouTube channel](https://www.youtube.com/@ChecklyHQ), where you can see great tutorials like this guide to the Playwright MCP server:

{{< youtube id="kzQu0Y_Nxjk" title="Generating Playwright Tests With AI: Let's Try the New Playwright MCP Server!">}}