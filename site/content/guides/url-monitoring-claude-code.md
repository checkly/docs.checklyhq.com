---
title: Create Uptime Monitoring in minutes with Claude Code and Checkly
description: >-
  
author: Nočnica Mellifera
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - FAQ
---
This guide will show you how to monitor all the pages of your site, creating URL monitors automatically using Claude Code, and then deploying those checks with the Checkly CLI.

In the final steps of this tutorial, you’ll use Claude Code to create a script to regularly update your URL Monitors based on any change in your sitemap.

## Set up Claude Code and your Checkly

Start by [installing the Checkly CLI](https://www.checklyhq.com/docs/cli/installation/), then create a repository that will be the ‘project’ that contains all your Checkly monitors managed as code. If you don’t already have a project, create one with:

`npm create checkly@latest`

If you’d like to follow the tutorial examples below, clone the [uptime monitoring demo](https://github.com/serverless-mom/uptimeMonitoring) repository, and copy everything in the `/**__checks__`** folder to your own project.

Next, install [Claude Code](https://www.anthropic.com/claude-code) globally with 

`npm install -g @anthropic-ai/claude-code`

and from the root folder of your project and start Code with the `claude` command.

You’ll be prompted to sign in to or sign up for an Anthropic account.

I’d recommend using the Visual Studio Code plugin for Claude, which will make it easier to connect Claude Code with the VS Code file browser with Claude’s context (the VS Code plugin does a lot more than just context, this is just the most convenient feature we’ll use for this tutorial).

Optionally, from the Claude Code prompt, run `/init` to scan your project and create an initial `CLAUDE.md` context file.

### Optional: add the Playwright MCP

The instructions given here do not require that Claude Code access a browser and scrape websites, but you may want to add details to your prompts that scan specific pages for further URLs to monitor. In that case, you can give Claude Code access to the browser by adding the [Playwright MCP](https://github.com/microsoft/playwright-mcp) to your local configuration with `claude mcp add playwright npx @playwright/mcp@latest`

## Give Claude Code Some Context

You want Claude to create files and updates that make sense as a [Checkly construct](https://www.checklyhq.com/docs/cli/constructs-reference/). The most token-efficient path would be to add only an existing URL monitor as context, but we want an approach that’s a bit more robust for all our future Checkly work, let’s add [Checkly’s AI rules file](https://www.checklyhq.com/docs/ai/use-checkly-with-ai-ide/) to our `CLAUDE.md` context file:

```bash
mkdir \p .claude &&
curl -o .claude/checkly.rules.md https://www.checklyhq.com/docs/ai/checkly.rules.md 
echo "- examine checkly.rules.md for code generation rules" >> .claude/CLAUDE.md
```

After this you’ll need to exit and restart Claude Code for it to pick up changes to our context file.

![the VSCode IDE with Claude Code active](/guides/images/url-monitor-claude-01.png)

*Claude Code is ready to write a new URL monitor based on the current file’s structure*

## Create new URL Monitors

For starters, let’s try creating a single new URL monitor with a few changes from the current file. The context we gave Claude Code was this monitor:

```ts
import { Frequency, UrlMonitor, UrlAssertionBuilder } from 'checkly/constructs'

new UrlMonitor('url-pinger-1', {
  frequency: Frequency.EVERY_10S,
  name: 'URL pinger 1',
  activated: true,
  request: {
    url: 'https://httpbin.org/get',
    skipSSL: false,
    followRedirects: true,
    assertions: [
      UrlAssertionBuilder.statusCode().equals(200),
    ]
  }
})
```

with the file open as context, try a command like:

> Create a new URL pinger for the site [https://danube-webshop.herokuapp.com/](https://danube-webshop.herokuapp.com/) that runs every five minutes and doesn’t follow redirects
> 

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
    followRedirects: true,
    assertions: [
      UrlAssertionBuilder.statusCode().equals(200),
    ]
  }
})
```

One thing I tested while writing this article was whether picking the wrong prompt would result in invalid Checkly construct code. The Frequency class here doesn’t accept arbitrary values, so I wondered what would happen since the [source file for Frequency](https://github.com/checkly/checkly-cli/blob/main/packages/cli/src/constructs/frequency.ts) won’t be part of Claude’s context. I tried requesting a check that ran “every 17 seconds” and Claude prompted me to run a `find` on the project to identify valid values for `frequency`. In the end, Claude Code did create valid code with this note in the process feed.

![feedback from Claude Code ](/guides/images/url-monitor-claude-02.png)


## Create Monitors en Masse

It’s great to use Claude to create a single new monitor, but we haven’t saved much time versus just copying and pasting code by hand. Let’s try to save some serious time by creating a large number of URL monitors all at once. Let’s say we want to monitor every page of the Anthropic AI website. We can see every page URL on Anthropic’s [sitemap.xml](https://www.anthropic.com/sitemap.xml), shouldn’t there be an easy way to create a URL monitor for every single page? Sure enough there is! After saving the sitemap down to a local file, try the following in Claude Code:

> create a single check.ts file that creates URL monitors for every URL listed in sitemap.xml
> 

I requested a single file since we don’t want to muck about with dozens and dozens of check.ts files. With my run of Claude Code I got the following output:

```ts
//sitemapMonitors.check.ts - comments added by the author
//In this bulk monitoring example we'll monitor 50 URLs from one file
//this will create 50 URL monitors in your Checkly dashboard

import { Frequency, UrlMonitor, UrlAssertionBuilder } from 'checkly/constructs'

//grepped a sitemap.xml file for an array of URLs
const sitemapUrls = [
//removed for brevity
]

//create paths and friendly names for each monitor
sitemapUrls.forEach((url, index) => {
  const urlPath = new URL(url).pathname.replace(/\//g, '-').replace(/^-+|-+$/g, '') || 'root'
  const monitorId = `checkly-${urlPath}-${index}`
  const monitorName = `Checkly ${urlPath.replace(/-/g, ' ')} Monitor`

//create each monitor with a five minute interval
  new UrlMonitor(monitorId, {
    frequency: Frequency.EVERY_5M,
    name: monitorName,
    activated: true,
    request: {
      url: url,
      skipSSL: false,
      followRedirects: true,
      assertions: [
        UrlAssertionBuilder.statusCode().equals(200),
      ]
    }
  })
})
```

The only edits I’d recommend are to the `monitorName` and the configuration for the monitors as needed.

Once you’re happy with the configuration, you can deploy and run these new monitors.

## Deploy With the Checkly CLI

Claude Code can create or update your codebase at high speed, but it’s Checkly’s ability to deploy monitors right from your codebase that give us the power to monitor large numbers of endpoints quickly. With your project updated with a new check file, it’s time to use the Checkly CLI to deploy your check. 

Since we have written a large number of tests, let's run them once with `npx checkly test`.

As these monitors were written based on a recent scrape of the sitemap, we’d expect all these tests to pass.

![Running multiple tests](/guides/images/url-monitor-claude-03.png)

However, sometimes sitemaps are out of date, so it’s possible that a few of these will fail! As long as the results look generally correct, it’s time to deploy.

In our example, we want to create over 50 URL monitors at once, so it’s worth checking whether components like the logical ID of these checks are properly formatted before deployment. Run the `deploy` command with the `-p` preview flag:

```bash
npx checkly deploy -p
```

This command won’t deploy anything, just parse our project and show us what will be created when we run the command without the preview flag.

![A Preview of our deployment](/guides/images/url-monitor-claude-04.png)

*We’ll get a long list of new URL monitors that will be created*

Once we’re happy with what will be deployed, it’s time to run `npx checkly deploy` and create the URL monitors!

## Go further: automatically update our monitors when sitemap.xml is updated

The process above is a good ‘first step’, but it’s a one-shot creation of URL monitors: when our sitemap updates, we’re not picking up those changes. We could run the whole process over from scratch, but this has two significant drawbacks:

- A process of regular updates shouldn’t rely on AI for your deploy process. Right now, we might only deploy a few times a month, but process shifts could mean hundreds of deployments in a day, hammering our model access bills.
- Re-generating URL monitor code will mean slight differences in monitor naming and logical IDs, meaning duplicate url monitor creation

Rather, let’s use Claude Code to write a stable and reliable script to update the monitors based on the live sitemap. You can create an update script with the prompt:

> Create a typescript file that downloads the xml from [https://www.anthropic.com/sitemap.xml](https://www.anthropic.com/sitemap.xml) and parses the contents into a JSON array containing every URL listed in the sitemap. Save that array as urlArray.json


When I ran this prompt, I sometimes got a script file that spent a number of lines on deduplicating the list and looking for sub-sitemaps, so you may need to tweak your prompt a bit.

The resultant script file (and the rewritten check file to use a local file) is in the [‘examples’ folder of the url monitoring demo repository](https://github.com/serverless-mom/uptimeMonitoring/tree/main/__checks__/examples). In your own version, it’s not necessary to write the sitemap or the URL array to disk, these are just debug steps for our demonstration.

Note the line:

```tsx
  const monitorId = `pinger-${urlPath}-${index}`
```

must remain as stable as possible; changing the logical ID of a monitor will delete the old monitor and its history.

After this script is verified to be working, we can use these scripts as part of a [GitHub Action](https://www.checklyhq.com/docs/cicd/github-actions/) to update our URL Monitors whenever we deploy to our service’s repository.

## Conclusion

With Checkly’s uptime monitoring as code, you can now effortlessly monitor every critical endpoint of your application—scaling from a single URL to hundreds with just a few prompts. By combining AI-assisted code generation with Checkly’s Monitoring as Code approach, you ensure that your monitoring setup is as dynamic and up-to-date as your application itself.

The process is simple:

1. **Define your monitoring needs**—whether it’s a single endpoint or an entire sitemap.
2. **Let Claude Code generate the checks**—saving hours of manual coding.
3. **Deploy instantly with Checkly CLI**—ensuring real-time monitoring without delays.

And with automated sitemap updates, your monitors evolve alongside your application, keeping your uptime guarantees strong without extra manual effort.

By integrating AI-powered development with robust monitoring tools like Checkly, teams can shift from reactive debugging to proactive reliability—catching issues before users do. Start deploying smarter uptime monitoring today, and never miss an outage again.

Ready to automate your monitoring? [Try Checkly now](https://www.checklyhq.com/) and see how Claude Code can streamline your workflow. 🚀