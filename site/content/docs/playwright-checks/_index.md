---
title: Getting started with Playwright Monitoring - Checkly Docs
displayTitle: Getting started with Playwright Monitoring
navTitle: Overview
weight: 14
slug: /
menu:
  resources:
    parent: "Playwright checks (Alpha)"

---

With Checkly, you can convert your Playwright tests directly into scheduled monitors. 

You can schedule checks from different locations and trigger alerts for your team to act on when a critical flow fails in production.

## What's a Playwright Check?
A Playwright check offers all of Playwright's features, natively: 

* Dependencies between checks one way or another → `StorageState`, `projects`, `dependencies`, `globalSetup`, `globalTeardown`, `test.beforeEach`...
* Test level retries.
* Flaky tests.
* Fake media access: whether it's a QR in a video you are parsing or access to a microphone, you got it.
* Control over traces, video and screenshots generation. 
* Multiple browsers and viewports: Chrome, Firefox, Webkit, Mobile Chrome.

On top of these, a Playwright Check provides: 

* Custom code dependencies, read directly from your `package.json` file
* Several world-wide locations to run your check from.
* Alerts to your preferred channel: Slack, Incident.io... 
  
## Before you begin
What you need:
* a repository using Playwright for E2E tests
  * One that has a playwright configuration file.
  
## Steps

0. Install the Checkly CLI using a dev version:

```bash
npm install -D checkly@0.0.0-pr.1042.f6e060e
```
​
Confirm the version is correctly set by running: `npx checkly --version`

1. Test and create a monitor with all your tests

```bash
npx checkly test --record

npx checkly deploy
```

2. Cherry-pick which tests should become checks

Of course, you can have a big monitor that checks your whole suite, but it's likely only some tagged tests or Playwright projects need to become monitors. You can update your `checkly.config.ts` to select the tests to become monitors, with their own schedule, location and configuration. This is  full working example

```typescript
// checkly.config.ts
import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

export default defineConfig({
  projectName: 'Cool Website Checks',
  logicalId: 'cool-website-monitoring',
  repoUrl: 'https://github.com/acme/website',
  checks: {
    playwrightConfigPath: './playwright.config.ts', //specify a custom playwright config file here
    playwrightChecks: [
      {
        // Create a check that runs the essential pw project every 5 mins in EU west region
        name: 'Essential-projects',
        pwProjects: 'essential', // Reference the project in your playwright.config.ts
        frequency: Frequency.EVERY_5M,
        locations: ['eu-west-1'],
      },
      {
        // Create a check that runs the critical tagged tests every 10M in EU west region
        name: 'Critical-tagged',
        pwTags: 'critical', // Reference an existing tag in your tests
        frequency: Frequency.EVERY_10M,
        locations: ['eu-west-1'],
      },
    ],
  },
  // also include, only one can be set at any given time:
  cli: {
    runLocation: 'eu-west-1',
    retries: 0, // full check retries, available in different locations
  },
})
```

Confirm it works by testing and deploying your updated monitors:

```bash
npx checkly test --record

npx checkly deploy
```

  