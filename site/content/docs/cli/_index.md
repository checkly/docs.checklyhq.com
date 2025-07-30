---
title: Getting started with the Checkly CLI - Checkly Docs
displayTitle: Getting started with the Checkly CLI
navTitle: Getting started
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
npm create checkly@latest
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
Running 4 checks in eu-west-1.

src/__checks__/api.check.ts
  ✔ Books API (222ms)
src/__checks__/home.check.ts
  ✔ Home page (24s)
  ✔ Login Check (5s)
src/__checks__/multi-step-spacex.check.ts
  ✔ SpaceX MS (4s)

4 passed, 4 total
```

Lastly, you deploy your Checks and related alert channels to Checkly, so we run your checks around the clock.

```bash
npx checkly deploy
```

You just created your entire synthetic monitoring setup with API and Playwright-based Browser Checks from your code base! 
Open up [your Checkly dashboard](https://app.checklyhq.com) and you should see your check, ready to start monitoring around the clock.

For a custom installation check out [our installation docs](/docs/cli/installation/)

## Using AI IDEs and Copilots

Checkly is designed to work with AI IDEs and Copilots. You can use your preferred provider to generate code for API 
Checks, Browser Checks and all other constructs.

{{< markdownpartial "/_shared/ai-ide-copilot-cards.md" >}}

## Integrating with CI/CD

After kicking the tires, you should delegate the testing and deploying of your checks to your CI/CD pipeline. Check our
docs on [setting up the Checkly CLI with your favourite CI/CD platform](/docs/cicd/).

{{< markdownpartial "/_shared/main-cicd-cards.md" >}}

