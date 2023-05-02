---
title: Handlebars Snippets (Legacy)
weight: 71
menu:
  resources:
    parent: "Snippets"
---

> We still support our legacy Handlebars syntax for referencing snippets in Browser check code but recommend using the **require**
> syntax discussed [here](/docs/snippets).

Snippets may also be imported using the [Handlebars](https://handlebarsjs.com/guide/partials.html) partial notation `{{> my_code_snippet }}`. When using the partials notation, code snippets are copied inline.

## Example: GitHub login

Say we want to validate some parts of the GitHub website only available to logged in users. We want to have separate, small
browser checks to have granular feedback whether each part functions.

1. Create a snippet named **github_login** in the "code snippets" section with the code below.

{{< tabs "github_login_legacy" >}}
{{< tab "Playwright" >}}
```javascript
const playwright = require('playwright')
const browser = await playwright.chromium.launch()
const page = await browser.newPage()

await page.goto('https://github.com/login')
await page.type('#login_field', process.env.GITHUB_USER)
await page.type('#password', process.env.GITHUB_PWD)
await page.click('[name="commit"]')
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```javascript
const puppeteer = require('puppeteer')
const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.goto('https://github.com/login')
await page.type('#login_field', process.env.GITHUB_USER)
await page.type('#password', process.env.GITHUB_PWD)
await page.click('[name="commit"]')
```
{{< /tab >}}
{{< /tabs >}}

Notice we are referencing the `GITHUB_USER` and `GITHUB_PWD` environment variables. All environment variables are available
in partials / snippets, just like in "normal" browser check scripts. Your snippet should look like the screenshot below.

![browser check code snippet](/docs/images/browser-checks/code-snippet.png)

2. Create a new browser check. Reference the code snippet you just created as a partial. After this, just continue with the normal check.
   During execution, the code snippet will be inlined before the script is run.

{{< tabs "github_login_referenced_legacy" >}}
{{< tab "Playwright" >}}
```javascript
    {{> github_login}}

    // your normal check code
    await page.click('.header-search-input')
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```javascript
    {{> github_login}}

    // your normal check code
    await page.waitForSelector('.application-main')
    await page.click('.header-search-input')
```
{{< /tab >}}
{{< /tabs >}}

## Passing variables to partials

You might want to create a partials that has a generic login routine and then pass it different username / password combinations
based on your script. Or you might want to pass other variables to your partials.

Under the hood, we use [Handlebars' partials](https://handlebarsjs.com/guide/partials.html#basic-partials) and it supports
passing variables. Let's look at the following example:

This is our partial. We call it **log_things**.

```js
console.log({{username}})
console.log({{password}})
console.log('{{extra}}')
```

This is our browser script, using the partial. We fly in two environment variables `USERNAME` and `PASSWORD`.

```js
{{> log_things username="process.env.USER" password="process.env.PWD" extra="text" }}
```
Notice three things:
1. All partial variables are passed in as key/value pairs, where the value is a "string".
2. The environment variables `process.env.xxx` are evaluated to a string in the partial.
3. A standard string like the `extra="text"` pair is passed as is. Notice the extra quotes in the partial.

## Using Handlebars helpers

We've extended the [Handlebars](https://handlebarsjs.com/) templating system with some handy helpers to make our webhooks
even more powerful.

You can find the [full list of helpers in the README.md file](https://github.com/checkly/handlebars) of the underlying library we are using.
