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
synthetic monitors (Checks) at scale, from your code base. We call this workflow **Monitoring as Code**.

- **Unite E2E testing & monitoring in one workflow.** No more silos between Dev, QA and Ops.
- **Programmable, testable, reviewable.** Works with your dev pipeline. From your IDE, via PR to CI.
- **Native `@playwright/test` support.** No lock-in, just write standard `*.spec.ts` files.
- **Alerting baked in.** Set alerts for Slack, SMS and many more channels.
- **Typescript-first.** Fully typed for a stellar developer experience with code completion.
- **Run in the cloud or on-prem.** Run on the Checkly cloud or in your network using the [Private Locations](https://www.checklyhq.com/docs/private-locations/)

## Starting your first project

First, make sure you sign up for a [free Checkly account](https://app.checklyhq.com/signup).

Then, get started by installing the CLI using the following command which will guide you through the required steps to
set up a fully working example.

```bash
npm create @checkly/cli
```

Now, login to your Checkly account.

```bash
npx checkly login
```

After this, let's dry run the Checks in your new project against the global Checkly infrastructure.

```bash
npx checkly test
```

This should report the following output to your terminal 

```
Running 5 checks in eu-west-1.

src/__checks__/group.check.ts
  ✔ Homepage - fetch stats (43ms)
src/__checks__/home.check.ts
  ✔ 404 page (7s)
  ✔ Homepage (7s)
src/services/api/api.check.ts
  ✔ Homepage - fetch stats (50ms)
src/services/docs/__checks__/docs-search.spec.ts
  ✔ docs-search.spec.ts (11s)

5 passed, 5 total
```

Lastly, you deploy your Checks and related alert channels to Checkly so we run your Checks around the clock.

```bash
npx checkly deploy
```

✨Et voilà, you have just created your entire synthetic monitoring setup with API and Playwright-based Browser Checks from your code base! Open up [your Checkly dashboard](https://app.checklyhq.com) and you should see your Check, ready to start monitoring
around the clock. ✨


For a custom installation check out [our installation docs](/docs/cli/installation/)
