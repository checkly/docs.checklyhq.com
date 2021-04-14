---
title: Environment variables
weight: 5
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

Check variables are added on the **Variables** tab for each browser check. Any data you "lock" is
encrypted at rest and in flight on our back end and is only decrypted when needed.

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

## Accessing variables

Both check, group and global environment variables are accessible in your code using the standard Node.js `process.env.MY_VAR` notation. 
For example, the code snippet below show how you can log into GitHub. We have more [examples of login scenarios on this page.](/docs/browser-checks/login-scenarios/)

{{< tabs "Variables example" >}}
{{< tab "Puppeteer" >}}
```js
const puppeteer = require('puppeteer')
const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.goto('https://github.com/login')
await page.type('#login_field', process.env.GITHUB_USER)
await page.type('#password', process.env.GITHUB_PWD)
await page.click('[name="commit"]')

await browser.close()
```

{{< /tab >}}
{{< tab "Playwright" >}}
```js
const playwright = require('playwright')
const browser = await playwright.chromium.launch()
const page = await browser.newPage()

await page.goto('https://github.com/login')
await page.type('#login_field', process.env.GITHUB_USER)
await page.type('#password', process.env.GITHUB_PWD)
await page.click('[name="commit"]')

await browser.close()
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


