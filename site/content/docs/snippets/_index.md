---
title: Snippets Overview
weight: 70
slug: /
aliases:
- "/docs/snippets"
- "/docs/browser-checks/partials-code-snippets/"

menu:
  docs:
    parent: "Snippets"
---

Snippets are JavaScript files which can be reused across [Browser checks](/docs/browser-checks/), as well as [setup and teardown scripts](/docs/api-checks/setup-teardown-scripts/) for API checks. By reusing code with snippets, checks can be made more maintainable and easier to develop.

Snippets can be useful for:

- a common login procedure
- a common navigation flow
- a common setup or teardown procedure

## How to use snippets

To create a snippet, access <a href="https://app.checklyhq.com/snippets" target="_blank">the snippets section on the left side of the UI</a>.

When creating a snippet, note that the snippet name will be used as its filename. It's not necessary to name the snippet with the `.js` file extension since this will be added automatically.

A snippet can be imported in Browser checks as well as setup and teardown scripts using the Node.js `require` function. When a check or script runs, snippets will be available in the `./snippets` directory.

Find simplified file and directory structures for API and Browser checks below.

```
├── script.js (the Browser check script or the API check setup / teardown script)
└── snippets
    ├── snippet1.js
    └── snippet2.js
```

Snippets work like any Javascript file on your local disk in Node.js, making it possible to expose functions and properties on the `module.exports` object.

Require a snippet named `setup-library` from within a Browser check, a setup or teardown script as follows:

{{< tabs "snippet_within_browser_check" >}}
{{< tab "TypeScript" >}}
```ts
import setupLibrary from './snippets/setup-library.js'
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const setupLibrary = require('./snippets/setup-library.js')
```
{{< /tab >}}
{{< /tabs >}}

Snippets can also import other snippets. Since snippets are stored in the same directory, it isn't necessary to include `./snippets` in the path when requiring.

For example, to import a snippet named `setup-library` from another snippet:

{{< tabs "snippet_within_other_snippet" >}}
{{< tab "TypeScript" >}}
```ts
import setupLibrary from './setup-library.js'
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const setupLibrary = require('./setup-library.js')
```
{{< /tab >}}
{{< /tabs >}}


{{<info >}}
Do you use [reusable code snippets for a setup or teardown script](/docs/api-checks/setup-teardown-scripts/#reusable-code-snippets)?

In this case, the setup / teardown snippet will be executed as `script.js` rather than be placed in the snippets directory. To import other snippets, the setup / teardown snippet should include the `snippets` directory in the path.

For example, import a snippet named `setup-library` using  `require('./snippets/helper.js')`.
{{</info >}}

## Example: GitHub login

Say we want to validate some parts of the GitHub website only available to logged in users. We want to have separate, small
Browser checks to have granular feedback whether each part functions.

Create a snippet named `github_login` in the "code snippets" section with a function that executes the login routine.

{{< tabs "github_login" >}}
{{< tab "TypeScript" >}}
```ts
async function gitHubLogin (page, username, password) {
  await page.goto('https://github.com/login')
  await page.locator('#login_field').type(username)
  await page.locator('#password').type(password)
  await page.locator('[name="commit"]').click()
}

module.exports = {
  gitHubLogin
}
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
async function gitHubLogin (page, username, password) {
  await page.goto('https://github.com/login')
  await page.locator('#login_field').type(username)
  await page.locator('#password').type(password)
  await page.locator('[name="commit"]').click()
}

module.exports = {
  gitHubLogin
}
```
{{< /tab >}}
{{< /tabs >}}

Notice three things:

- We created a standard `async` function that expects three parameters: the `page` object, a `username` and a `password` variable.
- We exported this function on the standard `module.exports` object.
- You now have a function you can call in any of your Browser checks to perform a login on GitHub.

Your snippet should look like this now.

![github login snippet example](/docs/images/browser-checks/github_login_snippet_example.png)

Create a new Browser check and import the code snippet you just created.

{{< tabs "github_login_referenced" >}}
{{< tab "TypeScript" >}}
```ts
import { test } from '@playwright/test'
import { gitHubLogin } from './snippets/github_login.js'

test('Github login', async ({ page }) => {
  await gitHubLogin(page, process.env.GITHUB_USER, process.env.GITHUB_PWD)

  // your normal check code
  await page.click('.header-search-input')
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { test } = require('@playwright/test')
const { gitHubLogin } = require('./snippets/github_login.js')

test('Github login', async ({ page }) => {
  await gitHubLogin(page, process.env.GITHUB_USER, process.env.GITHUB_PWD)

  // your normal check code
  await page.click('.header-search-input')
})
```
{{< /tab >}}
{{< /tabs >}}

Notice we are referencing the `GITHUB_USER` and `GITHUB_PWD` environment variables and passing them to the `gitHubLogin()` function.
You should store these in [your environment variables](/docs/browser-checks/variables/).
