---
title: How to Manage Authentication in Playwright
subTitle: Speeding up tests by skipping login, and more
description: Learn how to handle authentication in Playwright, including SSO, 2FA, Passkeys and more. Reuse authentication state across tests with storageState.
displayDescription: Learn how to handle authentication in Playwright, including SSO, 2FA, Passkeys and more. Reuse authentication state across tests with storageState.
date: 2024-12-10
author: Tim Nolet
githubUser: tnolet
tags:
  - authentication
  - storageState
  - 2fa
  - cookies
weight: 3
navTitle: Authentication
menu:
  learn_playwright:
    parent: Basics
category: Playwright
aliases:
  - managing-cookies
---

When testing or monitoring web applications like e-commerce sites, SaaS applications or anything that lives behind a 
login, you will have to deal with authentication. Playwright takes care of a lot of the heavy lifting here, meaning 
you don’t have to manually get, set and persist cookies or manage local storage data.

In this article we will look at some typical authentication scenarios, explain how using Playwright’s `storageState` 
works under the hood and give some best practices when dealing with authentication data.

# Handling authentication flows

For web and applications and APIs, you will typically have to run through some interactive authentication flow. Here are the top, common flows.

> Use Playwright’s built-in [code generator](https://playwright.dev/docs/codegen-intro#running-codegen) to quickly get a script of your login steps. It will do the right thing in 90% of the cases. Just run `npx playwright codegen <mysite>`

## Basic Auth / Username & Password

Any flow that relies on the Basic Authentication standard or typing in a username and password will tend to look 
very similar to example test below.

```ts {title="basic-auth.spec.ts"}
import { test, expect } from '@playwright/test'

test('login', async ({ page }) => {
  await page.goto('https://danube-web.shop/')
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByPlaceholder('Email').fill(process.env.USER_EMAIL as string)
  await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD as string)
  await page.getByRole('button', { name: 'Sign In' }).click()
  await expect(page.locator('#login-message'))
    .toContainText(`Welcome back, ${process.env.USER_EMAIL as string}`)
})
```

Notice the following:
1. We are using the `getBy` locators where we can.
2. The username and password are referenced as environment variables. Never store them in your `.spec.ts` file!
3. At the end, we assert that the login actually worked, by checking for a user specific piece of content on the page.
4. All handling of cookies, hashing of username and password and other things your browser typically takes care of are handled here transparently.

## SSO & Social Login

Any SSO or social login — think Google, GitHub, Microsoft, SAML-based solutions or any 3rd party auth provider 
like Okta— works pretty much the same as basic authentication / username & password from the perspective of the test 
you are writing.

You will probably see some extra redirects as the login attempt is executed on a second domain, but in 99% of the 
cases Playwright is smart enough to handle these redirects. Awesome.

Here is an example of using Google login on stackoverflow.com. 👇

```ts {title="google-login.spec.ts"}
import { test } from '@playwright/test'

test('Google login', async ({ page }) => {
  await page.goto('https://stackoverflow.com/users/login')

  await page.getByRole('button', { name: 'Log in with Google' }).click()
  await page.getByLabel('Email or phone').fill(process.env.GOOGLE_USER as string)
  await page.getByRole('button', { name: 'Next' }).click()

  await page.getByLabel('Enter your password').fill(process.env.GOOGLE_PWD as string)
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
})
```

[Check the full  article on Google Login.](https://www.notion.so/Move-learn-headless-to-learn-playwright-7670a08b85274b0992adaa977eb7864c?pvs=21)

## Two-Factor Authentication / TOTP

Things get a little harder when using Two-Factor Authentication (2FA) and / or Time Based One Time Passwords (TOTP).
You will probably be familiar with providing an extra “factor” like a code from an SMS message, a authenticator app 
or email to a login flow. How do we access a text message (or any of the other options) in Playwright? In short, we 
don’t. To solve this we need to use the excellent [otpauth NPM package](https://www.npmjs.com/package/otpauth).

We wrote a full article on [using the `otpauth` package to login to a GitHub account protected by 2FA](https://www.notion.so/Authentication-in-Playwright-158ec050b06e80fa8f85e6ca611abbb9?pvs=21), so please check out that article for all the details. Below is the eventual `.spec.ts` file you will end up with.

```ts {title="2fa.spec.ts"}
import { expect, test } from '@playwright/test'
import * as OTPAuth from 'otpauth'

const totp = new OTPAuth.TOTP({
  issuer: 'Raccoon',
  label: 'GitHub',
  algorithm: 'SHA1',
  digits: 6,
  period: 30,
  secret: process.env.GITHUB_OTP,
})

test('GitHub 2FA login', async ({ page }) => {
  await page.goto('https://github.com/')
  await page.getByRole('link', { name: 'Sign in' }).click()
  await page.getByLabel('Username or email address').click()
  await page
   .getByLabel('Username or email address')
   .fill(process.env.GITHUB_USER)
  await page.getByLabel('Username or email address').press('Tab')
  await page.getByLabel('Password').fill(process.env.GITHUB_PW)
  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.getByPlaceholder('XXXXXX').click()
  await page.getByPlaceholder('XXXXXX').fill(totp.generate())
  await expect(page).toHaveURL("https://github.com")
})
```

Notice the following in this code example:

1. We call the `OTPAuth.TOTP()` function and pass in a secret token we previously got from the GitHub UI.
2. In our test, we run through a fairly normal login routine. In the end, we focus on the field filled with the `XXXXXX` placeholder and call `totp.generate()` to create the 2FA token.

As mentioned, there is some prep you need to do. Refer to our full [article on 2FA login](https://www.notion.so/Authentication-in-Playwright-158ec050b06e80fa8f85e6ca611abbb9?pvs=21) for all instructions.

## Passkey & **WebAuthn**

Passkeys are a fairly recent authentication scheme. Passkeys are passwordless, so passwords can’t be stolen or phished. There is also no need to memorize a passkey. Often, a passkey is tied to biometric data: every time you authenticate on some app or service with Face ID or Touch ID or using [YubiKey](https://www.yubico.com/) you are using a passkey.

You can see how this is problem when running Playwright. However, under the hood all passkeys are an implementation based on the [Web Authentication API (WebAuthn)](https://webauthn.guide/#about-webauthn) spec and all Chrome Devtools Protocol (CDP) based browsers like Chrome and Edge ship with a WebAuthn Virtual Authenticator. This virtual authenticator allows you to automate the user interactions normally done by an actual human being. This [excellent write up from the folks at Corbado](https://www.corbado.com/blog/passkeys-e2e-playwright-testing-webauthn-virtual-authenticator#webauthn-virtual-authenticator-e2e-passkey-testing) goes into a lot more detail.

Let’s look at an E2E example. We will use the [https://webauthn.io/](https://webauthn.io/) site as our testing target and perform the following actions.

1. Enabled WebAuthn.
2. Sign up with a username + passkey.
3. Login with that passkey.

```ts {title="webauthn.spec.ts"}
import { test, expect } from '@playwright/test'

test('test webauthn', async ({ page }) => {
  const client = await page.context().newCDPSession(page)
  await client.send('WebAuthn.enable')
  const authenticator = await client.send('WebAuthn.addVirtualAuthenticator', {
    options: {
      protocol: 'ctap2',
      transport: 'internal',
      hasResidentKey: true,
      hasUserVerification: true,
      isUserVerified: true,
      automaticPresenceSimulation: true,
    },
  })

  await page.goto('https://webauthn.io/')
  await page.getByPlaceholder('example_username').fill('felixacademia')
  await page.getByRole('button', { name: 'Register' }).click()
  await page.waitForSelector('text=Success! Now try to authenticate...')
	
  await page.getByPlaceholder('example_username').fill('felixacademia')
  await page.getByRole('button', { name: 'Authenticate' }).click()
  await expect(page.getByRole('heading', { name: 'You\'re logged in!' }))
    .toBeVisible({ timeout: 15000 })
})
```

Notice how we first have to set up the WebAuthn virtual authenticator via the CDP session. This allows us to simulate 
the passkey authentication flow that would normally require user interaction.

The code is quite straightforward after that - we just fill in a username and click through the registration and 
authentication steps.

## API tokens

When working with APIs, you most often need to authenticate using some Bearer token / API key. There is no magic here, 
as Playwright makes it easy to include these tokens in your request headers.

```ts {title="api-token.spec.ts"}
import { test, expect } from '@playwright/test'

test('API token auth', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`
    }
  })
	expect(response).toBeOK()
})
```

Just like with username and password authentication, make sure to store your API tokens securely using environment 
variables.

# Reusing authentication state with storageState

All of the above examples work fine if you are running just one test that requires authentication. However, the 
moment you will run more tests — either in parallel or in sequence — you will exercise your authentication 
endpoint / provider over and over again. This will cause issues with rate limiting and just make your tests 
run unnecessarily long.

Ideally, you can authenticate once and reuse the authenticated state across multiple tests. 
[Playwright has this feature baked in](https://playwright.dev/docs/auth) and leverages something called `storageState`. 
It requires a little setup 👇

## Setting up the playwright.config.ts file

The recommended way to reuse auth state is by setting up **projects** in your `playwright.config.ts` file and defining a `setup` step that references file — `auth.setup.ts` for example — that takes care of the necessary authentication flow.

```ts {title="playwright.config.ts"}
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
})
```

## Writing a `auth.setup.ts` file

The code in `auth.setup.ts` stores the eventual authenticated state (cookies and local storage) on disk in a user 
defined file. Any other projects declare an explicit dependency on the `setup` step and read the auth state from disk, 
defined by the `storageState` property. Playwright then makes sure the cookies and local storage items are handled 
correctly in subsequent tests.

The example below shows how to use the basic authentication login flow from above in the `auth.setup.ts` file.

```ts {title="auth.setup.ts"}
import { test as setup, expect } from '@playwright/test'
import path from 'path'

const authFile = path.join(__dirname, '../playwright/.auth/user.json')

setup('authenticate', async ({ page }) => {
  await page.goto('https://danube-web.shop/')
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByPlaceholder('Email').fill(process.env.USER_EMAIL as string)
  await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD as string)
  await page.getByRole('button', { name: 'Sign In' }).click()
  await expect(page.locator('#login-message'))
    .toContainText(`Welcome back, ${process.env.USER_EMAIL as string}`)
  await page.context().storageState({ path: authFile })
});
```

Notice that:

- We just run a normal `test` , renamed to `setup` .
- We store the all cookies and local storage items in the `authFile` by calling `.storageState()` . How this happens doesn’t interest us. Playwright takes care of it.

<aside>
💡

Make sure to add the `/playwright/.auth/user.json` file to your `.gitignore` file so you don’t commit any authenticated state to your git repo.

</aside>

## Reusing authentication in tests

Now, on each invocation of `npx playwright test` , the `auth.setup.ts` routine gets called first. This means we can just create a new test as normal and magically the normal `page` fixture is authenticated.

```tsx
import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://danube-web.shop/') // already authenticated
})
```

Have a look at the [official Playwright documentation for more advanced scenarios.](https://playwright.dev/docs/auth#advanced-scenarios)

# Best practices for authentication

When writing automation scripts that deal with authentication, there are some general principles you should stick to:

1. Use the Playwright Code Generator, `npx playwright codegen example.com` to get the boilerplate code for any authentication flows. Saves time and let’s you focus on the difficult parts.
2. Never, ever store credentials in your tests. Not even during writing and debugging. Always use environment variables like `process.env.MY_PASSWORD` . Use them right at the beginning as you will forget about them and then accidentally `git push` them.
3. Try to always use dedicated test users, not your own account or — god forbid — a customer’s account. This way you can control the test data more easily, not accidentally trigger a lock out due to bot detection.
4. Always add any `.env` files and the `/playwright/.auth/user.json` to your `.gitignore` file.

# Further reading

- [How to automate Google login with Playwright.](https://www.notion.so/Authentication-in-Playwright-158ec050b06e80fa8f85e6ca611abbb9?pvs=21)
- [How to bypass Time-Based 2FA login flows with Playwright.](https://www.notion.so/Authentication-in-Playwright-158ec050b06e80fa8f85e6ca611abbb9?pvs=21)
