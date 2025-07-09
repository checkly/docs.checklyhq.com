---
title: Handling variables and secrets - Checkly Docs
displayTitle: Handling variables and secrets
navTitle: Variables and secrets
weight: 21
menu:
  resources:
    parent: "Browser checks"
    identifier: variables-browser-checks

---

When creating browser checks, you probably run some code locally, store it in a Git repo or copy and paste it around
a bit. This means the credentials in the script are at risk of being exposed.
You should therefore **replace any confidential data in your check scripts with variables or secrets.**

{{< markdownpartial "_shared/variables-and-secrets.md" >}}

## Managing variables

You can create variables at three hierarchical levels:

- **Check** level (Only supported by API, Browser, Multistep & Playwright checks)
- **Group** level
- **Global** level

Add variables specific to a Check variables on the **Variables** tab for each browser and multistep check.

![add local variables](/docs/images/browser-checks/check-environment-variables.png)

{{% markdownpartial "_shared/group-global-variables.md" %}}

> Whenever possible, store variables at the global level. This DRY's up your code.

Any data you "lock" is encrypted at rest and in flight on our back end and is only decrypted when needed. 
Locked environment variables can only be accessed by team members with [Read & Write access](/docs/accounts-and-users/) or above.

Keep in mind, though, that Read Only team members will still have access to information on the [check results page](/docs/monitoring/check-results/#browser-check-results).
If you want to avoid team members with Read Only access from viewing environment variables, avoid logging secrets during your check.

## Accessing variables

Check, group and global variables are accessible in your code using the standard Node.js `process.env.MY_VAR` notation.
For example, the code snippet below show how you can log into GitHub. We have more [examples of login scenarios on this page.](/docs/browser-checks/login-scenarios/)

{{< tabs "Variables example" >}}
{{< tab "TypeScript" >}}
```ts  {title="variables.spec.ts"}
import { test } from '@playwright/test'

test('Github login', async ({ page }) => {
  await page.goto('https://github.com/login')
  await page.getByLabel('Username or email address').type(process.env.GITHUB_USER)
  await page.getByLabel('Password').type(process.env.GITHUB_PWD)
  await page.getByRole('button', { name: 'Sign in' })
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js  {title="variables.spec.js"}
const { test } = require('@playwright/test')

test('Github login', async ({ page }) => {
  await page.goto('https://github.com/login')
  await page.getByLabel('Username or email address').type(process.env.GITHUB_USER)
  await page.getByLabel('Password').type(process.env.GITHUB_PWD)
  await page.getByRole('button', { name: 'Sign in' })
})
```
{{< /tab >}}
{{< /tabs >}}

You can access the current data center location using the implicit `process.env.REGION` variable. This resolve to the AWS region name, i.e. `us-east-1`


## Variable hierarchy

As browser checks are scheduled, Checkly merges the check, group and global environment variables into one data set and exposes them
to the runtime environment. During merging, any check variable with the same name as a global or group variable **overrides that variable.**

Or, in other words: **check** variables trump **group** variables trump **global** variables.

You can make use of this by providing a default value for a specific variable at the global or group level, but allow that variable to
be overridden at the check level.


## Built-in runtime variables

[The Browser Check runtime](/docs/runtimes/) also exposes a set of environment variables (e.g. `process.env.CHECK_NAME`)
to figure out what check, check type etc. you are running.

{{< markdownpartial "/_shared/runtime-env-vars.md" >}}
