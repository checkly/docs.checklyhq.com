---
title: How to Bypass TOTP-Based 2FA Login Flows With Playwright
subTitle: Playwright for complex authentication tasks
date: 2024-10-30
author: Stefan Judis
githubUser: stefanjudis
tags:
  - testing

weight: 5
navTitle: TOTP Authentication
menu:
  learn:
    parent: "E2E examples"
---
Testing applications behind a login flow is cumbersome. And it gets even worse when there’s two-factor authentication (2FA)  involved. Many people work around this problem by disabling it or implementing wild hacks.

Automating a 2FA-based login flow is just too hard! I thought that for a long time, too. But I must admit — I was wrong. This tutorial explains how to write a [Playwright](https://playwright.dev/) automation script to log into github.com with an enabled time-based one-time password (TOTP) two-factor authentication.

But before getting into code, let’s look at how this 2FA method works!

## The goal: Make Playwright log into a 2FA-secured github.com account

Whether you’re building a fancy SaaS product or an e-commerce solution, security must be a major concern because you want to ensure (maybe even enforce) that your customers' accounts are safe.

Two-factor authentication is an additional way to secure all your user accounts. In a nutshell, 2FA pairs a username/password combination with another factor. This other factor could be something you know, have, or are. And while you could go the fancy route of looking into implementing iris scans or fingerprints (“something your users are”), I doubt people will appreciate your efforts.

That’s why the three most common 2FA methods are SMS, native apps, or authenticator apps with software tokens.

Following the flow, people log in with their credentials and are prompted with another confirmation dialog — the second factor. After receiving and entering the second-factor passcode, they can confirm that they really are the person they claim to be and access their account.

And indeed, testing a passcode coming from a mobile application or SMS is challenging, but as it turns out, authenticator apps don’t include as much magic as I initially thought!

### Authenticator apps and TOTP

Let’s look at GitHub’s 2FA flow. When setting up 2FA with an authenticator app, the service greets you with the following screen.

![an authentication QR code](/samples/images/totp-1.jpeg)

*Note that I blacked out the QR code not to leak any credentials.*

The displayed QR code encodes the following information:

otpauth://totp/GitHub:USERNAME?secret=SECRET&issuer=GitHub

This encoded URL includes:

- a protocol (`otpauth`) to signal that this URL should be opened with an authenticator app
- the type (`totp`)
- a label (`GitHub:USERNAME`) that is a colon-separated combination of issuer and username
- a secret (`SECRET`)
- the issuer (`GitHub`)

**The essential piece to logging in and automating the TOTP flow is the provided secret.** You can access this secret in the Github UI by clicking 'enter this text code' to view the plain text version of the secret.

![a two-factor secret](/samples/images/totp-2.jpeg)


But how will this secret be used?

The secret is paired with the current time to generate a one-time password in a TOTP flow.

If you scan the QR code that encodes the URL (`otpauth://totp/…`) with an authenticator app: the app stores the second-factor secret, displays the issuer and username, and generates a new passcode every 30 seconds (30 seconds is the default but can be changed). That’s all!

You then can use the passcode as a second login factor and GitHub, as our example, can be sure that it’s you accessing your account.

To be honest, I was a little underwhelmed when I learned how this works, but it also means that this flow can easily be automated. Let’s get into some browser automation with Playwright!

## Testing a TOTP login flow with Playwright

Now that you understand that TOTP flows are based on the current moment and a secret stored on a device, you can start automating it.

### Prerequisites

The following steps assume you have created a GitHub account, know its username and password combination, and have access to the account’s TOTP secret.

If you have all this, let’s go!

### Setting the foundation with code generation

The easiest way to [create a new Playwright script is by using its code generation feature](https://playwright.dev/docs/codegen).

`npx playwright codegen github.com`

When you run this command, it will open a new browser session, and all your interactions will be recorded in the Playwright Inspector.

![playwright codegen](/samples/images/totp-3.jpeg)

Using codegen, you can record the first steps in a breath.

```jsx
// tests/2fa.spec.js
import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('https://github.com/')
  await page.getByRole('link', { name: 'Sign in' }).click()
  await page.getByLabel('Username or email address').click()
  await page.getByLabel('Username or email address').fill('username')
  await page.getByLabel('Username or email address').press('Tab')
  await page.getByLabel('Password').fill('password')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.getByPlaceholder('XXXXXX').click()
})
```

The script above navigates to github.com, clicks the login button and enters the login credentials. But because the account is secured via 2FA, we’re now prompted to enter our one-time passcode.

Note [that thanks to Playwright’s auto-waiting feature](https://www.youtube.com/watch?v=j-QLpb6Tmg0&amp;list=PLMZDRUOi3a8NtMq3PUS5iJc2pee38rurc&amp;index=3), there is no need to wait for navigations or URL changes. Playwright handles all the waiting for you — magic!

![playwright codegen](/samples/images/totp-4.jpeg)

But how can you create the authentication code in your Playwright script?

### Using a TOTP library to generate the passcode

Luckily, the thriving npm ecosystem has a solution for every problem. The [OTP Auth library](https://www.npmjs.com/package/otpauth) has 40k weekly downloads and is in its 9th major version, which makes it a good choice that provides all the functionality to generate one-time passwords.

Install it via npm:

`npm install otpauth`

Then, initialize a new totp instance in your Playwright script…

```jsx
// generate a new totp instance
let totp = new OTPAuth.TOTP({
  issuer: "GitHub",
  label: "USERNAME",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: "XXXXXXXX",
})
```

And fill Github’s passcode input field with a newly generated token!

```jsx
// generate the passcode when filling the input field
await page.getByPlaceholder("XXXXXX").fill(totp.generate())
```

Note that GitHub automatically detects input field changes, so there’s no need to click the verify button.

And that’s it! Now you only have to clean up the hardcoded tokens and replace them with environment variables, and you just created a Playwright script that logs into GitHub and passes the 2FA check!

Here’s the final script.

```jsx
import { expect, test } from "@playwright/test"
import * as OTPAuth from "otpauth"

let totp = new OTPAuth.TOTP({
  issuer: "Raccoon",
  label: "GitHub",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: process.env.GITHUB_OTP,
})

test("GitHub 2FA works", async ({ page }) => {
  await page.goto("https://github.com/")
  await page.getByRole("link", { name: "Sign in" }).click()
  await page.getByLabel("Username or email address").click()
  await page
   .getByLabel("Username or email address")
   .fill(process.env.GITHUB_USER)
  await page.getByLabel("Username or email address").press("Tab")
  await page.getByLabel("Password").fill(process.env.GITHUB_PW)
  await page.getByRole("button", { name: "Sign in" }).click()
  await page.getByPlaceholder("XXXXXX").click()
  await page.getByPlaceholder("XXXXXX").fill(totp.generate())
  await expect(page).toHaveURL("https://github.com")
  await page.screenshot({ path: "home.png" })
})
```

## Conclusion

I’m still amazed at how far we’ve come with the recent tooling. Playwright continues pushing out monthly releases, and I can’t wait to see what they’ll come up with in the upcoming months.

But keep in mind end-to-end testing is only a tiny fraction of guaranteeing that your product is working. Third-party providers can go rogue, or your database can struggle days after you tested your deployment. That’s why I’m excited to announce that [the recently released Checkly runtime (2022.10)](https://www.checklyhq.com/docs/runtimes/specs/#2022.10) includes the “otpauth” package and allows you to test your products at all times — even the ones that are behind a 2FA secured login!

Do you want to be the first one to know when something’s off with your application? Give Checkly a try 😉.