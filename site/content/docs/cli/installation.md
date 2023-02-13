---
title: Installation
weight: 2
menu:
  docs:
    parent: "CLI"
---

To kickstart a new project with the CLI, we recommend running `npm create @checkly/cli`. But you can also add the CLI
from scratch with the following steps. 

First, install the CLI.

```bash
npm i --save-dev @checkly/cli
```

To use TypeScript, also install `ts-node` and `typescript`:

```bash
npm i --save-dev ts-node typescript
```

Create a minimal `checkly.config.ts` (or `checkly.config.js`) at the root of your project.

{{< tabs "config" >}}
{{< tab "TypeScript" >}}
 ```ts
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
    checkMatch: '**/*.check.js',
    browserChecks: {
      frequency: 10,
      testMatch: '**/*.spec.js',
    },
  },
  cli: {
    verbose: false,
    runLocation: 'eu-west-1',
  }
}

export default config
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
    checkMatch: '**/*.check.js',
    browserChecks: {
      frequency: 10,
      testMatch: '**/*.spec.js',
    },
  },
  cli: {
    verbose: false,
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

Now, let's create your first synthetic monitoring check, starting with a `@playwright/test` based Browser check. Create a file named `__checks__/home.spec.js`.

{{< tabs "check-example" >}}
{{< tab "TypeScript" >}}
```ts
import { expect, test } from '@playwright/test'

test('Playwright home page', async ({ page }) => {
  const response = await page.goto('https://playwright.dev/')
  expect(response.status()).toBeLessThan(400)
  expect(page).toHaveTitle(/Playwright/)
  await page.screenshot({ path: 'homepage.jpg' })
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```ts
const { expect, test } =  require('@playwright/test')

test('Playwright home page', async ({ page }) => {
  const response = await page.goto('https://playwright.dev/')
  expect(response.status()).toBeLessThan(400)
  expect(page).toHaveTitle(/Playwright/)
  await page.screenshot({ path: 'homepage.jpg' })
})
```
{{< /tab >}}
{{< /tabs >}}


Now run `npx checkly test` to do a dry run against the global Checkly infrastructure so we validate we didn't make any mistakes.
This should print the message:

```
Running 1 checks in eu-west-1.

__checks__/js/home.spec.js
  ✔ home.spec.js > home.spec.js (4s)

1 passed, 1 total
```

After you have validated the check does the right thing and has no bugs, deploy the check to your account:

```bash
npx checkly deploy
```

Et voilà, you have just created a synthetic monitoring check based on Playwright from your code base! Open up [your Checkly dashboard](https://app.checklyhq.com) and you should see your Check, ready to start monitoring
around the clock.

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
