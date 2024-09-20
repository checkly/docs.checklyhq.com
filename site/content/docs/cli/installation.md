---
title: Installation
weight: 2
menu:
  platform:
    parent: "CLI"
---

To kickstart a new project with the CLI, we recommend running `npm create checkly`. But you can also add the CLI
from scratch with the following steps.

## Prerequisites

- Node.js `v16.x` or higher.
- A text editor like [Visual Studio Code](https://code.visualstudio.com/).

## Installation

First, install the CLI.

```bash
npm i --save-dev checkly
```

To use TypeScript, also install `ts-node` and `typescript`:

```bash
npm i --save-dev ts-node typescript
```

Create a minimal `checkly.config.ts` (or `checkly.config.js`) at the root of your project. We recommend using TypeScript.

{{< tabs "config" >}}
{{< tab "TypeScript" >}}
 ```ts
import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

export default defineConfig({
  projectName: 'Website Monitoring',
  logicalId: 'website-monitoring-1',
  repoUrl: 'https://github.com/acme/website',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10',
    frequency: Frequency.EVERY_5M,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website', 'api'],
    checkMatch: '**/__checks__/**/*.check.ts',
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: Frequency.EVERY_10M,
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
    frequency: Frequency.EVERY_5M,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website', 'api'],
    checkMatch: '**/__checks__/**/*.check.js',
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: Frequency.EVERY_10M,
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

Use the CLI to authenticate and pick a Checkly account. Make sure you have [signed up for a free account on checklyhq.com](https://www.checklyhq.com/)
before hand or just sign up for a new account straight from the terminal.

```bash
npx checkly login
```
## Direct download

If you cannot access the npm registry directly, you can also download the Checkly CLI via our CDN.

- [MacOS / Darwin](https://cdn.checklyhq.com/downloads/checkly-cli/4.9.0/darwin/checkly-cli.zip)
- [Windows](https://cdn.checklyhq.com/downloads/checkly-cli/4.9.0/windows/checkly-cli.zip)
- [Linux](https://cdn.checklyhq.com/downloads/checkly-cli/4.9.0/linux/checkly-cli.tar.gz)

The download is a zipped folder containing a full installation of [the boilerplate example project](https://github.com/checkly/checkly-cli/tree/main/examples/boilerplate-project).
You will find the following files and folders:
- a `checkly.config.ts` file.
- a `package.json` file including the necessary Typescript dependencies.
- a `node_modules` directory with all dependencies pre-installed.
- a `__checks__` folder with some example checks.

{{< info >}}
If you want to move the CLI and its constructs to a different, already existing Node.js project, just copy the full contents
of the `node_modules` folder to your project and manually add a `checkly.config.ts` file.
{{< /info >}}


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

## Using a Proxy Server

The CLI respects the common `HTTP_PROXY` environment variable for any outbound traffic, like running `npx checkly test`
or `npx checkly deploy`. 

```bash
HTTP_PROXY=https://proxy-url npx checkly test
```

The CLI communicates with the following domains if you need to allow-list them in your proxy:
- `api.checklyhq.com`
- `events.checklyhq.com`
