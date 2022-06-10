---
title: Using Snippets
weight: 21
aliases:
- partials-code-snippets
menu:
  docs:
    parent: "Browser checks"
---

You can reuse commonly used parts of code by importing code snippets in any Browser check. To do this, you use the standard
`require(./snippets/my-snippet.js)` syntax supported in the Node.js runtime.

This comes in very handy when you have multiple browser checks targeting the same site or web app that share a:
 
- common login procedure 
- common navigation flow
- common setup and/or teardown procedures

## How to use snippets in Browser checks

Using snippets is very straightforward.

1. Create a snippet.
2. Import the snippet by referencing it from the `./snippets/` root folder.

You can treat snippets just like any Javascript file you would have on your local disk in a Node.js context, including the option to expose
functions and properties on the `module.exports` object.

> Note: we use to recommend the Handlebars syntax, but we do not recommend this anymore. Use the `require` syntax and use exported functions to DRY up your code.

## Example: GitHub login

Say we want to validate some parts of the GitHub website only available to logged in users. We want to have separate, small
browser checks to have granular feedback whether each part functions.  

Create a snippet named **github_login** in the "code snippets" section with a function that executes the login routine.

   {{< tabs "github_login" >}}
   {{< tab "Playwright" >}}
```javascript
async function gitHubLogin (page, username, password) {
  await page.goto("https://github.com/login")
  await page.type("#login_field", username)
  await page.type("#password", password)
  await page.click('[name="commit"]')
}

module.exports = {
  gitHubLogin
}
```
    {{< /tab >}}   
    {{< tab "Puppeteer" >}}
```javascript
async function gitHubLogin (page, username, password) {
  await page.goto("https://github.com/login")
  await page.type("#login_field", username)
  await page.type("#password", password)
  await page.click('[name="commit"]')
}

module.exports = {
  gitHubLogin
}
```
    {{< /tab >}}
    {{< /tabs >}}

Notice three things:

- We are creating a standard `async` function that expects three parameters: the `page` object, a `username` and a `password` variable. 
- We are exporting this function on the standard `module.exports` object.
- You now have a function you can call in any of your Browser checks to perform a login on GitHub.

Your snippet should look like this now

![github login snippet example](/docs/images/browser-checks/github_login_snippet_example.png)

Create a new browser check and `require` the code snippet you just created. 

   {{< tabs "github_login_referenced" >}}
   {{< tab "Playwright" >}}
```javascript
const playwright = require('playwright')
const { gitHubLogin } = require('./snippets/github_login.js')

const browser = await playwright.chromium.launch()
const page = await browser.newPage()

await gitHubLogin(page, process.env.GITHUB_USER, process.env.GITHUB_PWD)

// your normal check code
await page.click('.header-search-input')
```
    {{< /tab >}}   
    {{< tab "Puppeteer" >}}
```javascript
const puppeteer = require('puppeteer')
const { gitHubLogin } = require('./snippets/github_login.js')

const browser = await puppeteer.launch()
const page = await browser.newPage()

await gitHubLogin(page, process.env.GITHUB_USER, process.env.GITHUB_PWD)

// your normal check code
await page.waitForSelector('.application-main')
await page.click('.header-search-input')
```
    {{< /tab >}}
    {{< /tabs >}}

Notice we are referencing the `GITHUB_USER` and `GITHUB_PWD` environment variables and passing them to the `gitHubLogin()` function.
You should store these in [your environment variables](/docs/browser-checks/variables/).

## Legacy: Handlebars Syntax

> We still support our legacy Handlebars syntax for referencing snippets in Browser check code but recommend using the **require**
syntax discussed at the beginning of this document.


You can reuse commonly used parts of code by referencing code snippets in any browser check. To do this, you use the
[Handlebars](https://handlebarsjs.com/guide/partials.html) partial notation `{{> my_code_snippet }}`.

This comes in very handy when you have multiple browser checks targeting the same site or web app that share a:

- common login procedure
- common navigation flow
- common setup and/or teardown procedures

Using partials is very straightforward. Any code snippets are just copied inline as is.

### Example: GitHub login

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

### Passing variables to partials

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

### Using Handlebars helpers

We've extended the [Handlebars](https://handlebarsjs.com/) templating system with some handy helpers to make our webhooks
even more powerful.

You can find the [full list of helpers in the README.md file](https://github.com/checkly/handlebars) of the underlying library we are using.
