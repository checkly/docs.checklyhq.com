---
title: The programmable monitoring infrastructure
description: >-
  The monitoring as code workflow enables developers to code, test and deploy their entire monitoring infrastructure. This guide explains how to use the Checkly CLI to dynamically create your monitoring setup.
author: Stefan Judis
avatar: 'images/avatars/stefan-judis.jpg'
---

With the release of [the Checkly CLI](https://www.checklyhq.com/docs/cli/), monitoring as code (Mac) enables you to **code, test and deploy** their entire monitoring setup. The CLI allows developers to programmatically create monitoring resources, test these in CI/CD development workflows and then deploy them to the Checkly cloud to monitor their sites and APIs.

One of the CLI's key features is that it's not based on static configuration files, but bets on dynamic JavaScript / TypeScript execution. A Checkly monitoring setup is entirely programmable which unlocks taylored monitoring setups that live in your application code base.

Learn how to program your monitoring infrastructure in this guide or watch the video below.

{{< youtube id="R-YqVfi8AxU" title="monitoring as code launch event video" >}}

## Check files — the core of your monitoring setup

Every Checkly project is configured with a project-based `checkly.config.ts` file. It holds meta information such as the project name, default values for your API and browser checks, and most importantly the location of your check files (`*.check.ts`).

```js
// checkly.config.ts
import { defineConfig } from "@checkly/cli";

export default defineConfig({
  projectName: "Boilerplate Project",
  logicalId: "boilerplate-project",
  checks: {
    tags: ["mac"],
    runtimeId: "2022.10",
    // definition of your check files
    checkMatch: "**/__checks__/*.check.ts",
  },
});
```

The `checks.checkMatch` property accepts a glob pattern

## How to use constructs



## How to programmatically

```js
// __checks__/alert-channels.check.ts
const NAMES = ["stefan", "raccoon"];
const alertChannels = NAMES.map(
  (name) =>
    new EmailAlertChannel(`email-alert-${name}`, {
      address: `${name}@checklyhq.com`,
    })
);
```

## Dynamic and async creation

```js
// something with readfile
```

```js
// __checks__/public-api.check.ts
import { getAllEndPoints } from './helpers'

export default async function createChecks() {
  const apiEndpoints = await getAllEndpoints();

  for (const { url, name, id } of apiEndpoints) {
    new ApiCheck(id, {
      name,
      request: {
        url,
        method: "GET",
        headers: [
          {
            key: "Authorization",
            value: process.env.AUTH_TOKEN!,
          },
        ],
        assertions: [AssertionBuilder.statusCode().equals(200)],
      },
    });
  }
}
```
