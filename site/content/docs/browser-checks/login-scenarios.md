---
title: Monitoring a login scenario with browser checks - Checkly Docs
displayTitle: Monitoring a login scenario with browser checks
navTitle: Login scenarios
weight: 20
aliases:
- login-and-secrets
menu:
  resources:
    parent: "Browser checks"
cli: true
---

Scenarios where a user provides credentials to get access to a web app are extremely common. They are also
a great candidate for a browser check as these site transactions tend to be very crucial.


{{<info>}}
Using Vercel deployment protection? Read [this section](/docs/cicd/vercel-deployment-protection/#vercel-authentication) on how to make this work with Checkly.
{{</info>}}

To get started, check out the video below 👇

{{<youtube R6ERKKr9D9Y >}}

## Username / password login

The code snippet below shows how you can log into GitHub.

{{< tabs "Basic login" >}}
{{< tab "Typescript" >}}
```ts
import { expect, test } from '@playwright/test'

test('Login into Github', async ({ page }) => {
    // Go to login page
    await page.goto('https://github.com/login')

    // Fill in credentials
    await page.getByLabel('Username or email address').type('janedoe@example.com')
    await page.getByLabel('Password').type('mypasswd')
    await page.getByRole('button', { name: 'Sign in' })

    // Verify successful login
    await expect(page.locator('#login-message')).toBeVisible()
})
```
{{< /tab >}}
{{< tab "Javascript" >}}
```js
const { expect, test } = require('@playwright/test')

test('Login into Github', async ({ page }) => {
    // Go to login page
    await page.goto('https://github.com/login')

    // Fill in credentials
    await page.getByLabel('Username or email address').type('janedoe@example.com')
    await page.getByLabel('Password').type('mypasswd')
    await page.getByRole('button', { name: 'Sign in' })

    // Verify successful login
    await expect(page.locator('#login-message')).toBeVisible()
})
```
{{< /tab >}}
{{< /tabs >}}

In certain cases, for example with [Vercel password-protected deployments](https://vercel.com/blog/protecting-deployments), websites might require a password to be entered before the target page is made available. Much like login cases, this can be solved directly using Playwright Test following the example above.

However, notice we are hard coding the username and password into our script. That's never a good idea...
Better to replace them with some environment variables. Read more about [how to use environment variables in your browser checks.](/docs/browser-checks/variables/)

{{< tabs "Using environment variables" >}}
{{< tab "Typescript" >}}
```ts
import { expect, test } from '@playwright/test'

test('Login into Github', async ({ page }) => {
    // Go to login page
    await page.goto('https://github.com/login')

    // Fill in credentials
    await page.getByLabel('Username or email address').type(process.env.GITHUB_USER)
    await page.getByLabel('Password').type(process.env.GITHUB_PWD)
    await page.getByRole('button', { name: 'Sign in' })

    // Verify successful login
    await expect(page.locator('#login-message')).toBeVisible()
})
```
{{< /tab >}}
{{< tab "Javascript" >}}
```js
const { expect, test } = require('@playwright/test')

test('Login into Github', async ({ page }) => {
    // Go to login page
    await page.goto('https://github.com/login')

    // Fill in credentials
    await page.getByLabel('Username or email address').type(process.env.GITHUB_USER)
    await page.getByLabel('Password').type(process.env.GITHUB_PWD)
    await page.getByRole('button', { name: 'Sign in' })

    // Verify successful login
    await expect(page.locator('#login-message')).toBeVisible()
})
```
{{< /tab >}}
{{< /tabs >}}

## Social Login

Authenticating via social login providers like Facebook, Google and GitHub can be a bit tricky to script because of the
redirects involved. Also, many providers make their login pages "bot resistant" which makes scripting harder. The example
below uses the Google social login option on the Checkly login page.

{{< tabs "Social login" >}}

{{< tab "Typescript" >}}
```ts
import { expect, test } from '@playwright/test'

test('Login into Checkly with Google social login', async ({ page }) => {
    await page.goto('https://app.checklyhq.com/')

    // Click Google login
    await page.getByText('Sign in with Google').click()

    // Provide email address and click 'next' button
    await page.locator('input[type="email"]').type(process.env.GOOGLE_USERNAME)
    await page.getByRole('button', { name: 'Next' }).click()

    // Provide password, click 'sign in' button
    await page.locator('input[type="password"]').type(process.env.GOOGLE_PASSWORD)
    await page.getByRole('button', { name: 'Sign in' }).click()

    // Verify successful login
    await expect(page.getByTestId('home-dashboard-table')).toBeVisible()
})
```
{{< /tab >}}
{{< tab "Javascript" >}}
```js
const { expect, test } = require('@playwright/test')

test('Login into Checkly with Google social login', async ({ page }) => {
    await page.goto('https://app.checklyhq.com/')

    // Click Google login
    await page.getByText('Sign in with Google').click()

    // Provide email address and click 'next' button
    await page.locator('input[type="email"]').type(process.env.GOOGLE_USERNAME)
    await page.getByRole('button', { name: 'Next' }).click()

    // Provide password, click 'sign in' button
    await page.locator('input[type="password"]').type(process.env.GOOGLE_PASSWORD)
    await page.getByRole('button', { name: 'Sign in' }).click()

    // Verify successful login
    await expect(page.getByTestId('home-dashboard-table')).toBeVisible()
})
```
{{< /tab >}}
{{< /tabs >}}

Note the following:

- We of course store our credentials in environment variables.
- Playwright Test's locators will wait for your elements to be visible until the test times out (which will make the check fail).

## More resources

- [Microsoft Live Login](/learn/headless/e2e-microsoft-live-login/)
- [Login with Google](/learn/headless/e2e-google-login/)
- [How to Bypass TOTP-Based 2FA Login Flows](/blog/how-to-bypass-totp-based-2fa-login-flows-with-playwright/)
