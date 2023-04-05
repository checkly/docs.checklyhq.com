---
title: Installation
weight: 2
menu:
  docs:
    parent: "CLI"
---

To kickstart a new project with the CLI, we recommend running `npm create @checkly/cli`. But you can also add the CLI
from scratch with the following steps.

## Prerequisites

- Node.js `v16.x` or higher.
- A text editor like [Visual Studio Code](https://code.visualstudio.com/).

## Installation

First, install the CLI.

```bash
npm i --save-dev @checkly/cli
```

To use TypeScript, also install `ts-node` and `typescript`:

```bash
npm i --save-dev ts-node typescript
```

Create a minimal `checkly.config.ts` (or `checkly.config.js`) at the root of your project. We recommend using TypeScript.

{{< tabs "config" >}}
{{< tab "TypeScript" >}}
 ```ts
import { defineConfig } from '@checkly/cli'

export default defineConfig({
  projectName: 'Website Monitoring',
  logicalId: 'website-monitoring-1',
  repoUrl: 'https://github.com/acme/website',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10',
    frequency: 5,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website', 'api'],
    alertChannels: [],
    checkMatch: '**/__checks__/**/*.check.ts',
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: 10,
      testMatch: '**/__checks__/**/*.spec.ts',
    },
  },
  cli: {
    runLocation: 'eu-west-1',
  }
})
 ```
{{< /tab >}}
{{< tab "JavaScript" >}}
 ```js
const config = {
  projectName: 'Website Monitoring',
  logicalId: 'website-monitoring-1',
  repoUrl: 'https://github.com/acme/website',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10',
    frequency: 5,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website', 'api'],
    alertChannels: [],
    checkMatch: '**/__checks__/**/*.check.js',
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: 10,
      testMatch: '**/__checks__/**/*.spec.js',
    },
  },
  cli: {
    runLocation: 'eu-west-1',
  }
}

module.exports = config;
 ```
{{< /tab >}}
{{< /tabs >}}

Use the CLI to authenticate and pick a Checkly account. Make sure you have [signed up for a free account on checklyhq.com](https://www.checklyhq.com/).

```bash
npx checkly login
```

## Authentication

There are different ways to authenticate when using the CLI depending on the environment where you are running the CLI from.

### Interactive

When **running the CLI interactively** from your dev environment, just use the built-in `login` command. If you have multiple
Checkly accounts, it will prompt which account you want to target

```bash
npx checkly login
```

Once authenticated, you can switch between accounts using

```bash
npx checkly switch
```

or quickly find out which account you are currently targeting with

```bash
npx checkly whoami
```

### From CI

When **running the CLI from your CI pipeline** you will need to export two variables in the shell:
- `CHECKLY_API_KEY`
- `CHECKLY_ACCOUNT_ID`

Go to your Settings page in Checkly and grab a fresh API key from [the API keys tab](https://app.checklyhq.com/settings/user/api-keys) and your
Account ID from the [Account settings tab](https://app.checklyhq.com/settings/account/general).
