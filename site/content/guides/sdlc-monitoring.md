---
title: Reusing Playwright Monitors Across Every Phase of your Software Development Life Cycle
displayTitle: Reusing Monitors Across Every Phase of your SDLC
description: >-
  The same Playwright code you write for end-to-end testing before deployment, can also test code earlier as part of the dev process, and end-to-end tests can be run on a cadence in Checkly to turn test code into monitoring code.
author: Nočnica Mellifera
date: 2025-03-07
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - FAQ
---

Recently I had a chance to write about going from Playwright testing, [using Playwright to run e2e tests against your staging/pre-deploy environment, and Checkly to monitor your production envrionment](https://www.checklyhq.com/guides/playwright-testing-to-monitoring/). Once you’re using the power of Playwright and Checkly together to monitor your production environment, it’s time to go one step further: use the powerful tools from Checkly to monitor all your environments, from local development on your laptop, to a staging environment, to production. With this guide, the same code you wrote in Playwright for your initial tests on your laptop will get re-used (as appropriate) to monitor Staging, and finally Production to let you know that everything’s working, and find problems before your users do.

## The Problem: A Fractured Picture of Your Code

If you’re already excited about Playwright and/or Checkly, you probably don’t need much convincing that it’s good to use both to monitor more environments, if so feel free to skip this section. 

In short, we’re all aware that the software development life cycle (SDLC) often breaks down when it comes to finding bugs and solving outages.

![a diagram showing the ideal vs the real SDLC](/guides/images/sdlc-monitoring-01.png)

Ideally development should only be getting requirements from planning and design, with any feedback (issues that need fixing) coming in the QA stages before deployment to production. In reality a huge list of failures can result in developers having to fix failures and re-engineer code to keep production running. There are two significant concerns that a more unified testing and monitoring approach can help us address:

1. When bugs are found post deployment, feedback is often given without full context, with the first reports going to someone other than the developer.

2. Any fixes have to be delivered out-of-band of the normal development cycle, either coded in haste during [incident response](https://www.checklyhq.com/learn/incidents/what-is-incident-response/), or written and deployed during time that was supposed ot be spent on new features.


By unifying around Checkly, **feedback is delivered directly to developers**, with developers working on their own tests, which then offer direct feedback with all the context that product teams need to diagnose root causes. The many unforeseen failures caused by the interaction of application code and the production environment should be monitored with **the same quality of tests that scruitinized our code pre-deployment.**

## The Solution: Unified Checkly & Playwright Monitoring

Why do we need to test after staging? After all, if a bug gets through to production, it just means we need to do more testing and better testing before production right?

![a diagram showing the ideal vs the real SDLC](/guides/images/sdlc-monitoring-02.png)

In reality no matter how much effort we put into simulating a production environment in our pre-deployment testing (hereafter we’ll refer to the environment before production as ‘Staging’ even though your team might call it something else), there are always large gaps between our testing and production environments. Things like third-party API’s, the real resource requirements of production data, and users abilities to find edge cases where we thought none existed, all serve to keep us well supplied with failures that only happen on production.

All of this doesn’t mean the work we did on testing before deployment was without value. Local testing gives the fastest possible feedback, often in seconds. And testing on Staging provides a consistent environment with detailed feedback. 

![a diagram showing the ideal vs the real SDLC](/guides/images/sdlc-monitoring-03.png)

Each phase of the SDLC is a valuable place to run testing. What Checkly adds to the equation is running in-depth end-to-end tests on a cadence, meaning you can monitor your own production app as thoroughly as you do pre-deploy code. How does Checkly integrate throughout the process? The map looks something like this:

![a diagram showing Checkly integrated in dev, deploy, and monitor phases of code diaployment](/guides/images/sdlc-monitoring-04.png)

*In this diagram, Checkly uses the power of Playwright and OpenTelemetry to give you insight into how your code is running at every stage of the software development life cycle*

Checkly serves as both a runner of your Playwright tests throughout the process, and place to see the results of your tests (Playwright Traces) and to collate your test results with backend data (through Checkly Traces, more on this in section 2 below). The result is a process that’s more integrated, that finds problems more proactively, and involves developers in the observability process from day 1.

## 1. Local testing - Playwright on the laptop

In the first phase, our test build is running on our local workstation, and we want test feedback as quickly as possible. The few seconds it takes to run a basic Playwright test might be the most time acceptable, if a developer is checking her test feedback every time she writes a few lines of code.

### Local testing with Playwright

The process starts with developers working with their test code at the same time they’re writing features. Some devs may use tests written by QA or other teams, and should make use [test fixtures](https://www.checklyhq.com/blog/how-to-implement-custom-test-fixtures-in-playwright/) to automate repeated tasts within their Playwright tests. 

### Example: Creating a Custom Fixture for Logging In

Let’s say you want to log in to your application before running a set of tests. Instead of repeating the login code in every test, you can create a custom fixture that handles the login process.

**Step 1: Define the Custom Fixture**

Create a `fixtures.js` file to define your custom fixture. This fixture will extend the base `test` object provided by Playwright.

```ts
// fixtures.js
import { test as base } from '@playwright/test';

// Define a custom fixture that includes a logged-in page
export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    // Perform login steps
    await page.goto('<https://example.com/login>');
    await page.fill('input#username', 'testuser');
    await page.fill('input#password', 'password123');
    await page.click('button#login');

    // Wait for the login to complete (e.g., redirect to the dashboard)
    await page.waitForURL('<https://example.com/dashboard>');

    // Pass the logged-in page to the test
    await use(page);
  },
});

export { expect } from '@playwright/test';

```

**Step 2: Use the Custom Fixture in Tests**

Now that the fixture is defined, you can use it in your tests. Import the custom `test` object from `fixtures.js` and write your tests as usual.

```ts
// example.spec.js
import { test, expect } from './fixtures';

test('Test 1: Verify dashboard loads', async ({ loggedInPage }) => {
  // Use the logged-in page provided by the fixture
  await expect(loggedInPage).toHaveTitle('Dashboard');
  await expect(loggedInPage.locator('h1')).toHaveText('Welcome, testuser!');
});

test('Test 2: Verify user profile link', async ({ loggedInPage }) => {
  // Navigate to the profile page
  await loggedInPage.click('a#profile-link');
  await expect(loggedInPage).toHaveURL('<https://example.com/profile>');
  await expect(loggedInPage.locator('h1')).toHaveText('User Profile');
});
```

---

With test fixtures you can share test code across your team, saving them time as they write local tests. 

### Test your laptop from all over the globe with the Checkly CLI

After you’ve done the first extremely-high-speed iterative testing while writing new code, you may want to see how your local build handles requests sent from one or more real-world locations. This would require that your build is available to the internet either through a dev server or a reverse proxy tool like [ngrok](https://ngrok.com/). 

With Checkly you can write your Playwright tests and then run them through the Checkly system, running your test from multiple geographic locations right from your local terminal with the [Checkly CLI](https://www.checklyhq.com/docs/cli/). 

After setting up your tests in a Checkly repisitory, a simple `npx checkly test` will run your Playwright tests, not from your laptop but from the geographic locations defined in your `checkly.config.ts` file.

![The Checkly CLI running playwright tests from the Checkly network](/guides/images/sdlc-monitoring-05.png)

*With the Checkly CLI your tests run from all the geographic locations in your configuration.*

After you’re happy with your Playwright tests run through Checkly, you’ll be ready to deploy your tests as monitors to the checkly system, and store that code in a shared repository. All of this is part of the monitoring as code standard that Checkly supports. More on this in the following sections.

## 2. Staging - Monitoring pre-deploy code with Checkly

Once you’ve gathered code changes into a pull request, and the updates go on from your local or deve environments, it’s time to do some further phases of the testing pyramid, namely integration testing, contract testing, and e2e testing. With tests running on Checkly you get:

- Tests run from real locations with full geographic coverage
- Consistent runtime environments - the same containers that run your Playwright tests against production will be used for staging tests
- Easily accessible results - use the Checkly dashboards to view test results and traces

In this section we’ll cover the necessary tools for running your code in Staging, with the appropriate configuration before it moves to production.

### Monitoring as Code

This guide can’t provide a complete tutorial of the monitoring as code (MaC) workflow, but in general this will look something like:

- Write tests locally from a shared repository
- Update and expand your tests via source control
- Deploy from your shared repository to Checkly
- Manage configuration via config file in your repository
- integrate ad-hoc test runs within your CI/CD tools

[A complete map to MaC is on our documentation site](https://www.checklyhq.com/guides/monitoring-as-code/), and with these tools you can easily share monitoring code and configuration with your own team.

### Local Environment Variables

Local environment variables are used **at build time**. This means they are available when you run commands like `checkly test` or `checkly deploy`. These variables are tied to your local environment, whether it’s your laptop, or a CI/CD pipeline.

**Example:**

Imagine you have an email alert channel in your Checkly setup. You can define the email address using `process.env` in your code:

```jsx
const email = process.env.EMAIL || 'stefan@checklyhq.com';

```

If you want to override this email address locally, you can set an environment variable in your terminal before running the Checkly CLI:

```bash
EMAIL=raccoon@checklyhq.com npx checkly deploy

```

When you deploy, Checkly will use the local variable (`raccoon@checklyhq.com`) instead of the default value.

---

### Remote Environment Variables

Remote environment variables are used **at runtime** in the Checkly cloud. These variables are accessible when your checks (like browser checks or API checks) are running in Checkly’s infrastructure. Local variables won’t work here because the Checkly cloud doesn’t have access to your local environment.

**Example:**

Let’s say you have a browser check that visits a URL defined by a remote environment variable:

```jsx
const url = process.env.SCREENSHOT_URL || '<https://www.checklyhq.com>';

```

If `SCREENSHOT_URL` isn’t set remotely, the check will default to `checklyhq.com`. To set this variable in the Checkly cloud, you can use the Checkly CLI:

```bash
npx checkly env add SCREENSHOT_URL <https://docs.checklyhq.com>

```

Now, when the browser check runs in the Checkly cloud, it will use the updated URL (`https://docs.checklyhq.com`).

---

**Overriding Remote Variables**

Sometimes, you might want to override remote environment variables temporarily, like during a preview deployment. The Checkly CLI makes this easy with the `-e` flag:

```bash
npx checkly test -e SCREENSHOT_URL=https://google.com --record --verbose

```

This command overrides the `SCREENSHOT_URL` variable for that specific test run, allowing you to test different configurations without changing your remote settings permanently.

### Optional: Private locations for running Checkly within your cloud

For enterprise users, you may want to run Checkly monitors from within your cloud. This is especially helpful if your API isn’t available on the public internet, or you want to run checks from a geographic location not covered by the Checkly system. If your development and staging locations are running on private clouds, a [Checkly Private Location](https://www.checklyhq.com/docs/private-locations/) makes testing easier.

![a diagram showing A container on your cloud running a Checkly Private Location](/guides/images/sdlc-monitoring-06.png)

*A container on your cloud running a Checkly Private Location*

Requirements:

- A Checkly enterprise accounts
- A container runtime (we test using Docker, but other runtimes should work)
- Outbound internet access for the Agent to [https://agent.checklyhq.com](https://agent.checklyhq.com/) (proxy configuration is supported)
- Access to your API or browser-based applications and services from the Private Location network

Once you’ve set up your private location, pick your private location when creating checks. If no agents run for 10 minutes, the location turns off until agents reconnect.

### Checkly Traces for OpenTelemetry insights

At any layer of running tests against your services, it’s helpful to connect the information from synthetic testing with backend trace data. With [Checkly Traces](https://www.checklyhq.com/docs/traces-open-telemetry/), it’s possible to export backend data captured with [OpenTelemetry](https://www.checklyhq.com/learn/opentelemetry/getting-started-with-observability/) and gather trace data from your backend services as they’re handling the requests sent during a Checkly Test. 

Implementation is straightforward and results in a highly efficient observability setup that doesn’t use bandwidth for 
unnecessary monitoring data. In most cases the setup will look like this:

1. Configure Checkly to send a header with its requests, which will be picked up and propagated by OpenTelemetry instrumentation
2. Add a configuration to the [OpenTelemetry collector](https://www.checklyhq.com/learn/opentelemetry/what-is-the-otel-collector/) to send only relevant traces to Checkly
3. Enjoy information on database requests, compute time, third party requests, and other backend processes right in your Checkly dashboard 

![a dashboard showing back-end requests](/guides/images/sdlc-monitoring-06.png)

*With Checkly Traces you can see the database calls and other timespans as your backend services handle requests kicked off by a Checkly test.*

Checkly Traces is easy to implement even if you aren’t currently using OpenTelemetry, [check out our documentation](https://www.checklyhq.com/docs/traces-open-telemetry/) on how to get started.

## 3. Production - Finding failures in real time with Playwright & Checkly

### Moving to Production cadence

Once you’ve moved to production, it’s time to run your tests on a cadence, creating a monitor that tell you within minutes if any part of your service goes down. The process for setting this cadence looks like:

1. [Determine the right check frequency](https://www.checklyhq.com/blog/check-frequency/) based on SLA
2. Configure your tests either in the web UI or by editing your [test repository’s config](https://www.checklyhq.com/docs/cli/project-structure/) file
3. [Group or tag tests](https://www.checklyhq.com/docs/groups/#organizing-checks-with-groups---checkly-docs) by criticality to have consistent cadence for high value services - this also makes it easier to see checks together in the web UI

With alerts running on a cadence, you can ensure that you’re hearing about failures before your users report them. The final step is setting up the alerting your team receives when a monitor detects problems.

### Alerting on failures

Finally, now that we’re monitoring production with Checkly, we’ll need to send alerts to an on-call team and/or key stakeholders when something is detected as not working. [Checkly supports multiple alert channels](https://www.checklyhq.com/docs/alerting-and-retries/#alerting-and-retries-with-checkly---checkly-docs), with configuration available either for a single check, at the group level, or all checks. Some best practices:

- Configure retry logic for minimal alert fatigue - Checkly offers fine-grained retries on checks, and it’s important to double-check that failures aren’t transitory. Balance alert fatigue with time efficiency, as multiple retries can significantly impact time to detection.
- Don’t rely on a single alert channel, always have at least one backup like a slack message or email to make sure that a delivery failure doesn't aggravate an outage.
- Use soft assertions and degraded states for more depth - not every behavior counts as total failure. For slowly-loading graphics or error messages that don’t block the user, [use the degraded state](https://www.checklyhq.com/blog/never-miss-alerts/#use-soft-assertions-to-reduce-alert-fatigue) to flag the problem without sending high priority alerts.

There’s also a general factor of time and team culture: if you do the work now to ensure checkly alerts are timely and informative, your team will grow a culture of taking alerts from Checkly seriously, and either resolving or investigating every high priority notification.

## Conclusions: from dev to production with Checkly

With Checkly and Playwright, you can test and monitor every stage—from local development to production—using the same powerful tools. This unified approach catches issues early, keeps your team informed, and helps you deliver a better experience to users.

Start small with local tests, expand to staging, then monitor production with confidence. Checkly makes it easy to stay ahead of problems before they reach your users.