---
title: Getting Started
weight: 1
slug: /
menu:
  docs:
    parent: "CLI"
    identifier: getting-started-cli
---

The Checkly CLI gives you a JavaScript/TypeScript-native **workflow** for creating, testing, deploying and life cycling
synthetic monitors (checks) at scale, from your code base. We call this workflow **Monitoring as Code**.

- **Unite E2E testing & monitoring in one workflow.** No more silos between Dev, QA and Ops.
- **Codeable, testable, reviewable.** Works with your dev pipeline. From your IDE, via PR to CI.
- **Native `@playwright/test` support.** No lock-in, just write standard `*.spec.ts` files.
- **Alerting baked in.** Set alerts for Slack, SMS and many more channels.
- **Typescript-first.** Fully typed for a stellar developer experience with code completion.
- **Run in the cloud or on-prem.** Run on the Checkly cloud or in your network using the [Private Locations](https://www.checklyhq.com/docs/private-locations/)

## Starting your first project

First, make sure you sign up for a [free Checkly account](https://app.checklyhq.com/signup).

Then, get started by installing the CLI using the following command:

```bash
npm create @checkly/cli
```
This command will guide you through some simple steps and set up a fully working example project for you. Should take
~1 minute.

For a custom installation check out [our installation docs](/docs/cli/installation/)
