---
title: Login scenarios
weight: 6
aliases:
- login-and-secrets
menu:
  docs:
    parent: "Browser checks"
---

Scenarios where a user provides credentials to get access to a web app are extremely common. They are also
a great candidate for a browser check as these site transactions tend to be very crucial.

## Username / password login

The code snippet below shows how you can log into GitHub.

{{< tabs "Basic login" >}}
{{< tab "Puppeteer" >}}
```javascript
const puppeteer = require('puppeteer')

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('https://github.com/login')
await page.type('#login_field', 'johndoe@example.com')
await page.type('#password', 'mypasswd')
await page.click('[name="commit"]')
await browser.close()
```
{{< /tab >}}

{{< tab "Playwright" >}}
```javascript
const playwright = require('playwright')

const browser = await playwright.chromium.launch()
const page = await browser.newPage()
await page.goto('https://github.com/login')
await page.type('#login_field', 'johndoe@example.com')
await page.type('#password', 'mypasswd')
await page.click('[name="commit"]')
await browser.close()
```
{{< /tab >}}
{{< /tabs >}}

However, notice we are hard coding the username and password into our script. That's never a good idea...
Better to replace them with some environment variables. Read more about [how to use environment variables in your browser checks.](/docs/browser-checks/variables/)

{{< tabs "Using environment variables" >}}
{{< tab "Puppeteer" >}}
```javascript
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
```javascript
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

## Social Login

Authenticating via social login providers like Facebook, Google and GitHub can be a bit tricky to script because of the
redirects involved. Also, many providers make their login pages "bot resistant" which makes scripting harder. The example
below uses the Google social login option on the Checkly login page.

{{< tabs "Social login" >}}
{{< tab "Puppeteer" >}}
```javascript
const puppeteer = require('puppeteer')

const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.setViewport({ width: 1280, height: 800 })
await page.goto('https://checklyhq.com/login')

const navigationPromise = page.waitForNavigation()
await page.goto('https://app.checklyhq.com/')

// Click Google login and wait for redirect
await page.click('a[data-provider="google-oauth2"]')
await navigationPromise

// provide email address and click next
await page.waitForSelector('input[type="email"]')
await page.type('input[type="email"]', process.env.GOOGLE_USER)
await page.click('#identifierNext')

// provide password, click next and wait for redirect back to Checkly
await page.waitForSelector('input[type="password"]', { visible: true })
await page.type('input[type="password"]', process.env.GOOGLE_PWD)

const navigationPromise2 = page.waitForNavigation()
await page.waitForSelector('#passwordNext', { visible: true })
await page.click('#passwordNext')
await navigationPromise2

await browser.close()
```
{{< /tab >}}
{{< tab "Playwright" >}}
```javascript
const playwright = require('playwright')

const browser = await playwright.chromium.launch()
const page = await browser.newPage()

await page.setViewportSize({ width: 1280, height: 800 })
await page.goto('https://app.checklyhq.com/')

// Click Google login
await page.click('a[data-provider="google-oauth2"]')

// provide email address and click next
await page.fill('input[type="email"]', process.env.GOOGLE_USER)
await page.click('#identifierNext')

// provide password, click next and wait for redirect back to Checkly
await page.fill('input[type="password"]', process.env.GOOGLE_PWD)
await page.click('#passwordNext')

await browser.close()
```
{{< /tab >}}
{{< /tabs >}}

Note the following:

- We create a `navigationPromise` ahead of time and wait for this promise to resolve as we navigate from domain to domain.
- We of course store our credentials in environment variables.
- We use the `visible: true`/`state: 'visible'` (for Puppeteer and Playwright, respectively) option when waiting for the buttons and input fields to appear. The script fails otherwise.

## Password-protected websites

In certain cases, for example with [Vercel password-protected deployments](https://vercel.com/blog/protecting-deployments), websites might require a password to be entered before the target page is made available. Much like login cases, this can be solved directly using Puppeteer or Playwright:

{{< tabs "Password-protected deployment" >}}
{{< tab "Puppeteer" >}}
```javascript
const puppeteer = require("puppeteer");

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // If the check is being triggered via GitHub deployments, you might
    // want to change the below environment variable to ENVIRONMENT_URL
    await page.goto(process.env.URL);

    await page.type('input', 'password')
    await page.click('button')

    // Your check logic here

    await browser.close();

})()
```
{{< /tab >}}
{{< tab "Playwright" >}}
```javascript
const {chromium} = require("playwright");

(async () => {

    const browser = await chromium.launch();
    const page = await browser.newPage();

    // If the check is being triggered via GitHub deployments, you might
    // want to change the below environment variable to ENVIRONMENT_URL
    await page.goto(process.env.URL);

    await page.type('input', 'password')
    await page.click('button')

    // Your check logic here

    await browser.close();

})()
```
{{< /tab >}}
{{< /tabs >}}

# More resources

- [Microsoft Live Login](/learn/headless/microsoft-live-login/)
- [Login with Google](/learn/headless/google-login/)
