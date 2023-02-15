---
title: Using environment variables
weight: 5
menu:
  docs:
    parent: "CLI"
---

There are two types of environment variables (env vars) in the Checkly CLI context.

- Local environment variables.
- Remote environment variables.

## Local Environment Variables

Local environment variables exist on your local machine, your CI environment, or anywhere you run the Checkly CLI. They
normally are part of your shell session or stored in a `.env` file in your app's Git repo. Here is what you need to
remember:

1. Use local environment variables to replace values in your constructs before `test` and `deploy` invocations.
2. Local environment variables are not interpreted in code dependencies like `.spec.ts` files or setup and teardown scripts.

Use local environment variables to inject or replace values in your `Check`, `AlertChannel` or other constructs at 
**build time** when the CLI compiles your constructs for testing and deploying.

Here is an example of setting up an `SmsAlertChannel` where we pass in the actual phone number from a local environment
variable. Note the exclamation mark `!` at the end. This is to tell the Typescript compiler the value will be set.
Alternatively you can use a string template.

```ts
import { SmsAlertChannel } from '@checkly/cli/constructs'

export const smsChannel = new SmsAlertChannel('sms-channel-1', {
  phoneNumber: process.env.PHONE_NUMBER!
  // phoneNumber: `${process.env.PHONE_NUMBER}` this also works
})
```
Now, when you execute `test` or `deploy` the variable needs to part of the parent process `env` object. This is typically
done by just prepending the variable to the command.

```
PHONE_NUMBER=0987654321 npx checkly deploy
```

The above command will replace `process.env.PHONE_NUMBER` with the actual `PHONE_NUMBER` you prepended and then create
that SMS channel in your Checkly account.

## Remote Environment Variables

Checkly also stores environment variables in your Checkly account. These can exist at the 
[Account, Group or Check level](/docs/browser-checks/variables/). Here is what you need to remember:

1. Use remote environment variables to dynamically inject or replace values during runtime of a check.
2. Remote variables can be set and overridden when invoking the `test` command.

You will typically use remote environment variables inside the code dependencies you write, e.g. Playwright tests, setup
 and teardown scripts. The point is that the `process.env.SOME_VARIABLE` stays in your code and are only interpreted when
a check executes on the Checkly cloud.

Here is an example of a Playwright script using an `ENVIRONMENT_URL` variable to define the page to visit. We also added
a fallback value in case that variable is not defined for some reason.

```ts
import { test } from '@playwright/test'

test('Check Home Page', async ({ page }) => {
  const response = await page.goto(process.env.ENVIRONMENT_URL! || 'https://wwww.checklyhq.com')
  await page.screenshot({ path: 'home.jpg' })
})
```

You can now test this check and temporarily set the environment variable as follows. 

```
npx checkly test -e ENVIRONMENT_URL="https://staging.checklyhq.com"
```

- Notice that we pass in the variable using the `-e` flag. This means it will be passed to the cloud environment and made 
available during runtime.
- After deploying this check, the `ENVIRONMENT_URL` needs to be set at the Account, Group or Check level. If not set, the Check
will use the fallback URL.
- Prepending the variable like `ENVIRONMENT_URL="https://staging.checklyhq.com" npx checkly test` has no effect as local
environment variables are not replaced in code dependencies.

## Securing Environment Variables

For storing and securing environment variables, we advise the following:

1. Store local environment variables in your shell or in `.env` files that are not committed to your git repo. Add those
files to your `.gitignore` file.
2. In a CI context, e.g. GitHub Actions, store sensitive variables as secrets. Almost all CI providers have such a feature.
3. For remote variables, store sensitive secrets at the Account level and click the lock icon so Read Only users cannot view them. 
All variables are stored encrypted at rest and in transfer.
