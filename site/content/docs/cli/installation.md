---
title: Installation
weight: 2
menu:
  docs:
    parent: "CLI"
---

First, install the CLI.

```bash
npm i --save-dev @checkly/cli
```

To use TypeScript, also install `ts-node` and `typescript`:

```bash
npm i --save-dev ts-node typescript
```

Create a `checkly.config.js` (or `checkly.config.ts`) at the root of your project.

```js
const config = {
  projectName: 'My First Checkly Project',
  logicalId: 'checkly-project-1',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10',
    frequency: 5,
    locations: ['us-east-1', 'eu-west-1'],
    browserChecks: {
      testMatch: '**/*.spec.js',
    },
  }
}

module.exports = config;
```

Use the CLI to authenticate and pick a Checkly account. Make sure you have [signed up for a free account on checklyhq.com](https://www.checklyhq.com/).

```bash
npx checkly login
```

Now, let's create your first synthetic monitoring check, starting with a `@playwright/test` based Browser check. Create a file named `__checks__/home.spec.js`.

```js
const { expect, test } = require('@playwright/test')

test('Playwright home page', async ({ page }) => {
  const response = await page.goto('https://playwright.dev/')
  expect(response.status()).toBeLessThan(400)
  expect(page).toHaveTitle(/Playwright/)
  await page.screenshot({ path: 'homepage.jpg' })
})
```

Now run `npx checkly test` to do a dry run against the global Checkly infrastructure so we validate we didn't make any mistakes.
This should print the message:

```
Running 1 checks in eu-central-1.

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
