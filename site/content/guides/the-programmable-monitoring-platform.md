---
title: A Guide to Checkly — The Programmable Monitoring Platform
description: >-
  The monitoring as code workflow enables developers to code, test and deploy your entire monitoring infrastructure. This guide explains how to leverage TypeScript/JavaScript to configure your monitoring setup dynamically.
author: Stefan Judis
avatar: 'images/avatars/stefan-judis.jpg'
tag: FAQ
---

With the release of [the Checkly CLI](https://www.checklyhq.com/docs/cli/), monitoring as code (Mac) enables you to **code, test, and deploy** your entire monitoring setup. Use the CLI to programmatically create monitoring resources, test these in CI/CD development workflows and then deploy them to the Checkly cloud to monitor your sites and APIs.

One of the CLI's key features is that it's not based on static configuration files but bets on dynamic JavaScript/TypeScript execution. **A Checkly monitoring as code flow is highly programmable** and unlocks tailored monitoring setups that live in your application code base.

Learn how to program your monitoring infrastructure in this guide or [watch the video below](https://www.youtube.com/watch?v=R-YqVfi8AxU).

{{< youtube id="R-YqVfi8AxU" title="monitoring as code launch event video" >}}

## Check files — the foundation of your monitoring setup

Every Checkly project is configured via a `checkly.config` file. It holds meta information such as the project name, default values for your API and browser checks, and, most importantly, your check files' location (`*.check.ts`).

```js
// checkly.config.ts
import { defineConfig } from "@checkly/cli";

export default defineConfig({
  projectName: "Boilerplate Project",
  logicalId: "boilerplate-project",
  checks: {
    tags: ["mac"],
    runtimeId: "2022.10",
    // your check file definitions
    checkMatch: "**/__checks__/*.check.ts",
  },
});
```

The `checks.checkMatch` property accepts a glob pattern to specify which files should be executed to test and deploy your monitoring infrastructure.

{{<info >}}
Find out more about [all the project configuration options in the docs](/docs/cli/constructs-reference/#project).
{{</info >}}

Place your check files next to your running application code or in a dedicated monitoring directory; it's up to you!

## How to use Checkly constructs

When the Checkly CLI executes a check file, the file must [import and initialize Checkly constructs](/docs/cli/constructs-reference/) to create resources such as browser and API checks, groups, and alert channels.

```js
// __checks__/monitoring.check.ts
import {
  ApiCheck,
  AssertionBuilder,
  CheckGroup,
} from "@checkly/cli/constructs";

// create a new group
const publicApiGroup = new CheckGroup("public-api-group", {
  name: "Public APIs",
  locations: ["eu-central-1"],
});

// create a new API check
new ApiCheck("public-stats", {
  name: "Public stats",
  group: publicApiGroup
  request: {
    url: "https://api.checklyhq.com/public-stats/",
    method: "GET",
    assertions: [AssertionBuilder.statusCode().equals(200)],
  },
  alertChannels,
});
```

The example above initializes [a `CheckGroup`](/docs/cli/constructs-reference/#checkgroup) that [an `ApiCheck`](/docs/cli/constructs-reference/#apicheck) references. These two resources can then be tested via `npx checkly test` and deployed to the Checkly cloud via `npx checkly deploy`.

{{<info >}}
If you want to see an opinionated Checkly CLI project example, [check our advanced CLI template](https://github.com/checkly/checkly-cli/tree/main/examples/advanced-project).
{{</info >}}

But what if you want to create your monitoring setup depending on configuration files or environment variables?

## Leverage the power of TypeScript/JavaScript

Checkly's TypeScript-first CLI workflow enables you to program your monitoring infrastructure.

**The monitoring as code workflow is based on TypeScript/JavaScript execution.** Import and read files, create monitoring resources conditionally, or iterate over data to not repeat yourself; it enables you to tailor your Checkly setup to your project's requirements.

Let's look at examples and monitoring as code patterns.

### Testing of preview environments

When adopting modern CI/CD development practices and using preview environments, leverage environment variables to test your resources with the Checkly cloud.

```js
// create a new API check
new ApiCheck("public-stats", {
  name: "Public stats",
  request: {
    url: process.env.ENVIRONMENT_URL || "https://api.checklyhq.com",
    method: "GET",
    assertions: [AssertionBuilder.statusCode().equals(200)],
  },
  alertChannels,
});
```

By using an `ENVIRONMENT_URL` environment variable and falling back to a production URL, your check files can be used to test preview deployments and monitor your production site and APIs.

```
# test a preview deployment locally or in CI/CD
# ↪ the API check tests https://fat-racoon-1a2b3c4d.checklyhq.com once
ENVIRONMENT_URL=https://fat-racoon-1a2b3c4d.checklyhq.com npx checkly test

# update your monitoring setup after a production deployment
# ↪ the API check monitors https://api.checklyhq.com
npx checkly deploy
```

Environment variables enable you to configure your monitoring resources, test them and then update your entire Checkly setup in a production deployment.

{{<info >}}
Before jumping all onto environment variables, [understand the difference between local and remote environment variables](/docs/cli/using-environment-variables/).
{{</info >}}

But monitoring as code isn't only about configuring your environment and interpolating values.

### Monitoring resources through iteration

Suppose you want to create Checkly resources in bulk; JavaScript/TypeScript enables you to define your entire monitoring setup programmatically. Creating multiple resources is only one JavaScript loop away.

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

Similarly, if you want to read and parse files to create monitoring resources, leverage the `fs` module and the JavaScript ecosystem.

```js
// __checks__/alert-channels.check.ts
import { ApiCheck } from "@checkly/cli/constructs";
import { join } from "path";
import YAML from "yaml";

// read and parse a yml config file
const file = readFileSync(join(__dirname, "./endpoints.yml"), "utf8");
const { endpoints } = YAML.parse(file);

for (const { id, url, name } of endpoints) {
  new ApiCheck(id, {
    name,
    request: {
      url,
      method: "GET",
      assertions: [AssertionBuilder.statusCode().equals(200)],
    },
  });
}
```

Reuse infrastructure as code configuration files (such as YAML) to configure your monitoring setup and avoid duplicated resource definitions.

{{<info >}}
If you're using a file-based routing framework such as Next.js, use the `fs` module to automatically read and parse directories to create monitors for the resulting routes and pages.
{{</info >}}

But in some cases, you must perform asynchronous JavaScript operations, such as requesting files from the network to define your monitoring.

Do check files allow asynchronous operations, too?

### Monitoring resources through async operations

Check files can wait for asynchronous operations. Export a promise or async function as default object from your check files, and the CLI will wait for your operations to finish.

```js
// __checks__/public-api.check.ts
import { getAllEndPoints } from './helpers'

export default async function createChecks() {
  // helper function performing async operations
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

The example above fetches an API definition from the network via a `getAllEndpoints` helper function and automatically creates the monitoring resources. Use `async` and `await` for perform any async operation.

## Conclusion

[Monitoring as code](https://www.checklyhq.com/guides/monitoring-as-code/) is more than writing config files. Read project code, iterate, or fetch data — the CLI's JavaScript and TypeScript execution enables you to tailor your monitoring setup to your existing application code (and not the other way around).

What are your preferred monitoring as code patterns? [Join the Checkly community](/slack), let me know and I'm happy to include your favorite pattern in this guide.

## Read More

<div class="cards-list">
{{< doc-card class="three-column-card" title="Checkly CLI" description="Understand monitoring as code (MaC) via our Checkly CLI." link="/guides/monitoring-as-code-cli/" >}}

{{< doc-card class="three-column-card" title="End to end monitoring" description="Learn end-to-end monitoring with puppeteer and playwright to test key website flows." link="/guides/end-to-end-monitoring/" >}}

{{< doc-card class="three-column-card" title="OpenAPI/Swagger Monitoring" description="OpenAPI and Swagger help users design and document APIs in a way that is readable from both humans and machines." link="/guides/openapi-swagger/" >}}
</div>