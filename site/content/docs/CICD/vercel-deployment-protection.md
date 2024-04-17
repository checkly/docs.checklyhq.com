---
title: Vercel Deployment Protection
weight: 1
menu:
  integrations:
    parent: "Vercel"
    identifier: vercel-deployment-protection
cli: true
---

In some cases, you will need to provide authentication credentials to your Vercel deployment in order to run your browser
checks. Vercel calls this [**Deployment Protection**](https://vercel.com/docs/security/deployment-protection). 

To make optimal use of Checkly's Vercel integration, Checkly will need access to Preview deployments and Production deployments,
so we can validate your preview branches before they reach production and continuously monitor your production deployments.

Vercel has a few different ways to authenticate your deployments. Each work a bit different. We will go over each of them below.

{{<info>}}
You can bypass any Vercel deployment protection using their [protection bypass for automation feature](#bypass-for-automation).
{{</info>}}

## Vercel Authentication

Vercel has a few different ways to authenticate your deployments. Each work a bit different and require a different approach
to make them work with Checkly.

{{<info>}}
Vercel enables **Standard Protection** by default on all new deployments.
{{</info>}}

### Standard Protection
[Standard Protection](https://vercel.com/docs/concepts/deployments/deployment-protection#vercel-authentication)
works by prompting the user to log in to Vercel with their normal Vercel user before they can access the deployment. 

You can tweak this setting in the Vercel dashboard under *Settings > General > Deployment Protection*.

![vercel deployment protection](/docs/images/cicd/vercel/vercel_deployment_protection.png)



#### How to make this work with Checkly?
1. You can completely disable Standard Protection in the Vercel dashboard. This will make your deployments publicly accessible.
2. You can add some extra code to a browser check to actually log in to Vercel. Here is an example of how that would work 
if you are authenticating using GitHub. Note: if you have 2FA enabled on your GitHub account, this will not work.

{{<tabs "vercel-authentication-1" >}}
{{< tab "TypeScript" >}}
```ts
import { expect, test } from '@playwright/test'
test('visit protected deployment', async ({ page }) => {
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://my-production-url.vercel.app/')

  // Auth dialog is a pop up
  const popupPromise = page.waitForEvent('popup');
  await page.getByText('Continue with GitHub').click()
  const popup = await popupPromise;
  await popup.waitForLoadState();
  await popup.locator('input[name="login"]').type(process.env.GITHUB_USER)
  await popup.locator('input[name="password"]').type(process.env.GITHUB_PASSWORD)
  await popup.getByText('Sign in', {exact: true}).click()
    
  await page.screenshot({ path: 'screenshot.jpg' })
  expect(response.status(), 'should respond with correct status code').toBeLessThan(400)
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { expect, test } = require('@playwright/test')
test('visit protected deployment', async ({ page }) => {
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://my-production-url.vercel.app/')
  
  // Auth dialog is a pop up
  const popupPromise = page.waitForEvent('popup');
  await page.getByText('Continue with GitHub').click()
  const popup = await popupPromise;
  await popup.waitForLoadState();
  await popup.locator('input[name="login"]').type(process.env.GITHUB_USER)
  await popup.locator('input[name="password"]').type(process.env.GITHUB_PASSWORD)
  await popup.getByText('Sign in', { exact: true }).click()

  await page.screenshot({ path: 'screenshot.jpg' })
  expect(response.status(), 'should respond with correct status code').toBeLessThan(400)
})
```
{{< /tab >}}
{{< /tabs >}}

You will have to supply your GitHub username and password as environment variables (e.g. `GITHUB_USER` and `GITHUB_PASSWORD` in 
the code example) to your Checkly account or as part of the [browser check's environment variables](/docs/browser-checks/variables/).


### Only Preview Deployments

[Only Preview Deployments](https://vercel.com/docs/concepts/deployments/deployment-protection#vercel-authentication)
is the same as Standard Protection, but only applies to Preview deployments. This means that we need to tweak the above code
a bit to check if we are targeting a Preview deployment or not.

#### How to make this work with Checkly?

We just need to check if the automatically injected `ENVIRONMENT_URL` environment variable is set. If it is,
we know we are checking a Preview deployment and we can run the authentication code. If it is not set, we just proceed as normal.

{{<tabs "vercel-authentication-2" >}}
{{< tab "TypeScript" >}}
```ts
import { expect, test } from '@playwright/test'
test('visit protected deployment', async ({ page }) => {
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://my-production-url.vercel.app/')

  if (!!process.env.ENVIRONMENT_URL) {
    // Auth dialog is a pop up
    const popupPromise = page.waitForEvent('popup');
    await page.getByText('Continue with GitHub').click()
    const popup = await popupPromise;
    await popup.waitForLoadState();
    await popup.locator('input[name="login"]').type(process.env.GITHUB_USER)
    await popup.locator('input[name="password"]').type(process.env.GITHUB_PASSWORD)
    await popup.getByText('Sign in', {exact: true}).click()
  }
    
  await page.screenshot({ path: 'screenshot.jpg' })
  expect(response.status(), 'should respond with correct status code').toBeLessThan(400)
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { expect, test } = require('@playwright/test')
test('visit protected deployment', async ({ page }) => {
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://my-production-url.vercel.app/')

  // If we 
  if (!!process.env.ENVIRONMENT_URL) {
    // Auth dialog is a pop up
    const popupPromise = page.waitForEvent('popup');
    await page.getByText('Continue with GitHub').click()
    const popup = await popupPromise;
    await popup.waitForLoadState();
    await popup.locator('input[name="login"]').type(process.env.GITHUB_USER)
    await popup.locator('input[name="password"]').type(process.env.GITHUB_PASSWORD)
    await popup.getByText('Sign in', { exact: true }).click()
  }

  await page.screenshot({ path: 'screenshot.jpg' })
  expect(response.status(), 'should respond with correct status code').toBeLessThan(400)
})
```
{{< /tab >}}
{{< /tabs >}}

{{<warning>}}
If you have 2FA enabled on your GitHub or other Vercel authentication methods, the above example will not work. You can
explore bypassing 2FA using the `otpauth` library. [Check our blog post for more info](https://www.checklyhq.com/blog/how-to-bypass-totp-based-2fa-login-flows-with-playwright/).
{{</warning>}}

## Bypass for Automation

You can fully bypass any deployment protection using Vercel's [Protection Bypass for Automation feature](https://vercel.com/docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation).
With this feature, you can provide a secret in an HTTP header or query parameter to bypass any deployment protection.

### How to make this work with Checkly?


For any Playwright-powered check, like browser checks and Multistep checks, you can add the secret to the required HTTP header 
using the `test.use()` method.

```ts
test.use({
    extraHTTPHeaders: {
        'x-vercel-protection-bypass': process.env.VERCEL_BYPASS_TOKEN
    }
})
```

Alternatively, when using the `request` API, you can add the header to the request.

```ts
await request.get('https://my-production-url.vercel.app/', {
  'x-vercel-protection-bypass': process.env.VERCEL_BYPASS_TOKEN
})
```

For an API check you can do something similar

1. Just add a `x-vercel-protection-bypass` header to the request with the token
2. Add a query parameter to the request with the token.
3. Or use a setup script to manipulate the request before it is sent.

```bash
request.headers['x-vercel-protection-bypass'] = process.env.VERCEL_BYPASS_TOKEN
```


## Password Protection
Vercel's [Password Protection](https://vercel.com/docs/concepts/deployments/deployment-protection#password-protection) is a paid
addon that allows you to set a dedicated password for your deployments and specifically bypass protection for E2E tests / automation.
You can accomplish this using the resources referenced in the docs for [browser checks](/docs/browser-checks/login-scenarios#username--password-login) 
or [API requests](https://www.checklyhq.com/docs/api-checks/setup-script-examples/#dismiss-password-protection-prompt-on-vercel-deployment).


- [IP Allowlisting](https://vercel.com/docs/concepts/deployments/deployment-protection#ip-allowlisting)



