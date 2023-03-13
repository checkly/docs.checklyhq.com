---
title: Environment variables
weight: 21
menu:
  docs:
    parent: "Browser checks"
    identifier: variables-browser-checks
---

When creating browser checks, you probably run some code locally, store it in a Git repo or copy and paste it around
a bit. This means the credentials in the script are at risk of being exposed.
You should therefore **replace any confidential data in your browser check scripts with environment variables.**

## Managing variables

For browser checks, you can create environment variables at three hierarchical levels:

- **Check** level
- **Group** level
- **Global** level

Check variables are added on the **Variables** tab for each browser check. 

![add local variables](/docs/images/browser-checks/add-local-variable.png)

Group variables are added on the **Variables** tab in a [group](/docs/groups). The variables stored here are accessible
only in the group context.

![add group variables](/docs/images/browser-checks/add-group-variable.png)

Global variables are added on the **Variables** tab. The variables stored here are globally accessible
throughout Checkly, hence the "Global environment variables" title.

![add global variables](/docs/images/browser-checks/add-global-variable.png)

{{<info >}}
Whenever possible, store variables at the global level. This DRY's up your code.
{{</info>}}

Any data you "lock" is encrypted at rest and in flight on our back end and is only decrypted when needed. 
Locked environment variables can only be accessed by team members with [Read & Write access](/docs/accounts-and-users/) or above.

Keep in mind, though, that Read Only team members will still have access to information on the [check results page](/docs/monitoring/check-results/#browser-check-results).
If you want to avoid team members with Read Only access from viewing environment variables, avoid logging secrets during your check.

## Accessing variables

Both check, group and global environment variables are accessible in your code using the standard Node.js `process.env.MY_VAR` notation.
For example, the code snippet below show how you can log into GitHub. We have more [examples of login scenarios on this page.](/docs/browser-checks/login-scenarios/)

{{< tabs "Variables example" >}}
{{< tab "TypeScript" >}}
```ts
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
```js
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

> You can access the current data center location using the implicit `process.env.REGION` variable. This resolve to the AWS region name, i.e. 'us-east-1'


## Variable hierarchy

As browser checks are scheduled, Checkly merges the check, group and global environment variables into one data set and exposes them
to the runtime environment. During merging, any check variable with the same name as a global or group variable **overrides that variable.**

Or in another words:

> **check** variables trump **group** variables trump **global** variables.

You can make use of this by providing a default value for a specific variable at the global or group level, but allow that variable to
be overridden at the check level.


## General built-in runtime variables

[The Browser Check runtime](/docs/runtimes/) also exposes a set of environment variables (e.g. process.env.CHECK_NAME)
to figure out what check, check type etc. you are running.

| property                  | description                                                | type   |
|---------------------------|------------------------------------------------------------|--------|
| `CHECK_NAME`              | The name of the check being executed.                      | String |
| `CHECK_ID`                | The UUID of the check being executed.                      | String |
| `CHECK_TYPE`              | The type of the check being executed, (`BROWSER`)          | String |
| `CHECK_RESULT_ID`         | The UUID of the result where the run result will be saved. | String |
