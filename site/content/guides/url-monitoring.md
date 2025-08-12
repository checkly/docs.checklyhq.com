---
title: Create Uptime Monitoring in minutes with Checkly
description: >-
  Use the power of Checkly to monitor hundreds of pages in minutes.
author: Nočnica Mellifera
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - FAQ
---
Checkly's Uptime Monitoring can ensure the reliability and availability of web applications and APIs by continuously checking their performance from multiple global locations. It allows users to set up simple yet scalable monitors that verify whether their endpoints are operational, measuring response times and status codes to detect downtime or slowdowns.

With configurable frequency and geographic distribution, Checkly's Uptime Monitoring helps businesses maintain optimal service performance, offering insights through detailed logs and analytics to track uptime trends and troubleshoot problems efficiently. This tool is particularly useful for DevOps and engineering teams looking to proactively monitor their digital infrastructure with minimal setup overhead.

This tutorial will use the Checkly CLI and the principle of [Monitoring as Code](https://www.checklyhq.com/guides/getting-started-with-monitoring-as-code/) to create a new project as a code repository to contain all your uptime monitoring.

## Set up your Checkly repository

Start by [installing the Checkly CLI](https://www.checklyhq.com/docs/cli/installation/), then create a repository that will be the project that contains all your Checkly monitors managed as code. If you don’t already have a project, create one with:

```bash
npm create checkly@latest
```
A project is a grouping of individual checks 

## Create URL Monitoring to check all your pages’ status codes

Checkly’s URL Monitors are the cheapest and fastest tool to just check the status code of a web page. They’re particularly useful for third-party services or pages that your service relies on. In general, a URL monitor will look like this (with comments on the config):

```ts {title="url-monitor.check.ts"}
import { Frequency, UrlMonitor, UrlAssertionBuilder } from 'checkly/constructs'

new UrlMonitor('url-monitor-1', { //the monitor's unique ID
  frequency: Frequency.EVERY_10S, //how often the check will run
  name: 'httpbin Monitor 1', //user readable name for the Checkly UI
  activated: true, //deactivated checks won't send requests
  muted: false, //muted checks still run and log history but don't send alerts
  maxResponseTime: 10000, //time before the check is marked failing
  degradedResponseTime: 5000, //time to mark the check as degraded
  request: {
    url: 'https://httpbin.org/get', //the URL to check
    skipSSL: true, //debug setting to skip SSL authentication
    followRedirects: true, //whether to allow redirects
    assertions: [ //only status code verification is supported for URL Monitors
      UrlAssertionBuilder.statusCode().equals(200), 
    ]
  }
})
```

Save this file in the `/__checks__` directory. A couple important notes about the configuration of a URL monitor:

- A check requires a logical ID, changing this will delete the old check and create a new check with no history. 
- The request object is a mandatory part of the monitor, every other setting, if not included in this file, will use the project default.

Read more in the full [documentation of the UrlMonitor](https://www.checklyhq.com/docs/cli/constructs-reference/#urlmonitor) class. 

Go ahead and create multiple URL monitors as separate files so we can try deploying more than one URL monitor at a time. 

![A line chart](/guides/images/url-monitoring-01.png)

## Test your monitors and deploy them to Checkly

With our monitors written, lets run them all with `npx checkly test` .

The Checkly CLI will scan for every `check.ts` file in the `/__checks__` folder and run them from the Checkly network. 

```bash
[...]
__checks__/service-availability.check.ts
  ✔ Service Availability Monitor (295ms)
__checks__/uptime-validator.check.ts
  ✔ Uptime Validator Monitor (284ms)
__checks__/url-monitor-2.check.ts
  ✔ httpbin Monitor 2 (281ms)
__checks__/url-monitor.check.ts
  ✔ httpbin Monitor 1 (2s)

9 passed, 9 total
```
*Terminal feedback from the `test` command

One of the immediate benefits of using Checkly is evident here: since these monitors don’t run from your local workstation, you’ll be running these checks exactly like your users do, you can even configure the CLI to run the tests from multiple locations!

Once we’re happy with our test results, it’s time to deploy. To check that this deployment will go as planned, we can run the deploy command first with the preview flag `-p` . The preview flag lets see what monitors **would be** created if you would deploy them to the Checkly infrastructure. Especially if you're creating monitoring resources dynamically, it's recommended checking your resulting monitoring setup.

```tsx
npx checkly deploy -p
```

![A terminal](/guides/images/url-monitoring-03.png)
*We’ll get a list of new URL monitors that will be created*

Since we’re only adding URL Monitors in a new project, this should show only monitors being created. If anything else shows up, review your [project settings](https://www.checklyhq.com/docs/cli/project-structure/) before deploying.

When everything’s ready, deploy with

```bash
npx checkly deploy
```

You’ll see a report very like the preview above, showing new monitors created. As the checks run, you’ll generate a dashboard in the Checkly UI.

![A Checkly dashboard](/guides/images/url-monitoring-04.png)
*See past performance of your monitor in the Checkly dashboard.*

## Conclusion

With just a few commands, you've created a robust monitoring system that runs from Checkly's global network rather than your local machine. This approach gives you the real user perspective your application monitoring needs. The Monitoring as Code methodology keeps your checks version-controlled and easily reproducible across environments.

Your URL monitors are now running continuously, providing immediate alerts when issues arise and historical data to track your site's reliability over time. The Checkly dashboard gives you centralized visibility into all your endpoints, making it simple to spot patterns and respond quickly to outages.

As your monitoring needs grow, you can expand this foundation with [browser checks](https://www.checklyhq.com/docs/browser-checks/) or [Playwright check suites](https://www.checklyhq.com/docs/playwright-checks/reference/) for complex user flows, API monitoring for backend services, and bulk monitor creation for large-scale deployments. The CLI-first approach ensures your monitoring infrastructure scales alongside your applications.

## Further Reading: Complete Uptime Monitoring

- To learn about all the new monitors offered by Checkly Uptime monitoring, check our [complete guide on Uptime Monitoring](https://www.checklyhq.com/guides/uptime-monitoring/).
- With this project you’ve started your Monitoring as Code journey, learn more in our [guide to the Checkly CLI](https://www.checklyhq.com/docs/cli/)
- With these basic monitors set up, start creating synthetics checks in [Playwright using Playwright Codegen](https://www.checklyhq.com/learn/playwright/codegen/).