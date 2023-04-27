---
title: Getting Started
weight: 1
slug: /
menu:
  platform:
    parent: "CLI"
    identifier: getting-started-cli
---

The Checkly CLI gives you a JavaScript/TypeScript-native workflow for coding, testing and deploying synthetic
monitoring at scale, from your code base. The Checkly CLI comes with **native `@playwright/test` support.** No lock-in, 
just write standard `*.spec.ts` files.

## Starting your first project

Get started by installing the CLI using the following command which will guide you through the required steps to
set up a fully working example.

```bash
npm create checkly
```

Now, login to your Checkly account or sign up for a new account right from the terminal.

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

Lastly, you deploy your Checks and related alert channels to Checkl,y so we run your Checks around the clock.

```bash
npx checkly deploy
```

You just created your entire synthetic monitoring setup with API and Playwright-based Browser Checks from your code base! 
Open up [your Checkly dashboard](https://app.checklyhq.com) and you should see your Check, ready to start monitoring around the clock.

For a custom installation check out [our installation docs](/docs/cli/installation/)

## Integrating with CI/CD

After kicking the tires, you should delegate the testing and deploying of your checks to your CI/CD pipeline. Check our
docs on [setting up the Checkly CLI with your favourite CI/CD platform](/docs/cicd/).

{{< markdownpartial "/_shared/main-cicd-cards.md" >}}

