---
title: E2E monitoring of crucial user flows
description: >-
  One of the primary reasons for Checkly's existence is to allow for monitoring of key transactions on your site. In this post we will reveal our cards and show how we test the account creation and deletion.  
author: Adam Wardecki
avatar: 'images/avatars/adam-wardecki.png'
---

## Crucial user flows

There's no dobut about signup and login being the most important transactions on your website. That's why these flows are usually the first candidates for test automation coverage. And while login is pretty straightforward, signup can turn out to be a bit more troublesome. That's because, apart from disabling sending events to analytics tools, we need to make sure to also remove the account afterwards. Lets see how did it at Checkly.

## Create / Delete account test

First, a quick overview of the steps we want to perform. The user should:
1. Go to the signup page
2. Fill in the email/password fields
3. Click Signup
4. Go to the account deletion section of the settings page
5. Click the delete account button
7. Type in the account name to confirm the intent 
6. Click the delete account button in the modal window

This is how the full script will look like when using Playwright:

{{< tabs "Signup" >}}
{{< tab "Playwright" >}}
```js
const { chromium } = require("playwright");
const expect = require('expect')
const uuid = require('uuid')

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const navigationPromise = page.waitForNavigation()

  await page.setViewportSize({ width: 1200, height: 1000 })
  await page.goto('https://app.checklyhq.com?utm_source=monitoring', { waitUntil: 'networkidle' });

  await page.waitForSelector('.auth0-lock-tabs a')
  await page.click('.auth0-lock-tabs a')
  // We need to construct a unique user for each test run. This is done by generating an id and appending to the email 
  const id = uuid.v1()

  // Fill in the email, password. Click the Signup button 
  await page.waitForSelector('[aria-label="Email"]')
  await page.click('[aria-label="Email"]')
  await page.type('[aria-label="Email"]', `racoon+${id}@checklyhq.com`)

  await page.waitForSelector('[aria-label="Password"]')
  await page.click('[aria-label="Password"]')
  await page.type('[aria-label="Password"]', id)

  await page.waitForSelector('[aria-label="Sign Up"]')
  await page.click('[aria-label="Sign Up"]')

  await navigationPromise

  // The user would land on the onboarding flow. We need to skip that
  await page.waitForSelector('[data-test-id="onboarding-skip-with-sample-checks"]')
  await page.click('[data-test-id="onboarding-skip-with-sample-checks"]')

  // At this point the user is signed up. Now we need to delete the account. We are navigating to the account deletion section.
  await page.waitForSelector('[data-test-id="navbard-menu-trigger"]')
  await page.click('[data-test-id="navbard-menu-trigger"]')

  await page.waitForSelector('[href="/settings/account/general"]')
  await page.click('[href="/settings/account/general"]')

  await page.waitForSelector('[data-test-id="delete-account-button"]')
  await page.click('[data-test-id="delete-account-button"]')

  // Here, we need to confirm the account deletion by typing the account name (which is the user email by default)
  await page.waitForSelector('[data-test-id="delete-account-name-input"]')
  await page.click('[data-test-id="delete-account-name-input"]')
  await page.type('[data-test-id="delete-account-name-input"]', `racoon+${id}@checklyhq.com`)

  await page.waitForSelector('[data-test-id="delete-account-modal-btn"]')
  await page.click('[data-test-id="delete-account-modal-btn"]')

  // Waiting for the account deletion confirmation text... 
  await page.waitForSelector('[data-test-id="account-deleted-title"]', { visible: true })
  const title = await page.textContent('[data-test-id="account-deleted-title"]');

  await expect(title).toEqual('Thanks for using Checkly. Goodbye 🖖')

  // There's a timeout in the app's code before the user is navigated back to checklyhq.com. We need to account for that
  await page.waitForTimeout(6000)
  await navigationPromise

  const targetUrl = await page.url()

  expect(targetUrl).toEqual('https://www.checklyhq.com/')

  await browser.close()
})();
```
{{< /tab >}}
{{< /tabs >}}

> This script can be run on our own machine without issues with {{< newtabref  href="https://playwright.dev/docs/intro" title="very little preparation" >}} with a simple `node script.js`.


## Filtering out the analytics tools

Alright, we've created our check, and tested it on staging environment. Everything works great so we enable it for production, high-five ourselves for doing a great job, and move on to other tasks. Couple of hours pass, and suddenly we notice a little message from our CEO on Slack:

{{< figure src="/guides/images/guides-testing-signup-flow-hannes.png" alt="CEO asking to disable account creation check flow" title="Not the slack thread we were looking for" >}}

Oops. Turns out we also need to filter out the check from the tracking tools. 
We'll need to alter the application code to do that. This will vary depending on the choice of the analytics tools though. Having said that, this is how we do it in our Vue frontend app where we use [Segment](https://segment.com/) as the events broker.


{{< tabs "Signup" >}}
{{< tab "analytics.js" >}}
```js
function isInternalEmail (email = '') {
  const domain = email.split('@')[1]

  return /checklyhq/.test(domain)
}

export const identify = (user) => {
  if (isInternalEmail(user?.email)) {
    return
  }

  const { id, email, name, created_at: createdAt } = user

  window.analytics.identify(id, {
    name,
    email,
    createdAt,
  })
}
```
{{< /tab >}}
{{< /tabs >}}

As you can see, It's pretty staightforward. We just skip the call to the analytics when the user is in our email domain. Other analytics methods (`page`, `group`, `track` in this case) are wrapped in a similar fashion.

There's one more thing. If you look at the url we target with the E2E check you'll notice it has the `utm_source="monitoring"` query param added. This is done to filter the check run out of google analytics. You can read more about it in [this guide](/docs/monitoring/whitelisting). 

## Tweaking to your needs

As you just saw, setting up a proper e2e monitoring of the imporant flows is more about making sure that you don't mess up the really imporant metrics™ or flood your DB with ghost accounts. What we described here is not a one-size-fits-all solution of course:

- You may find out that your test takes too long and times out. If that's the case you could think about having a test for an account creation where the delete account is handled by an API call (`axios` is available in the script [runtime](/docs/runtimes/specs/#npm-packages)). 
- In case there are several checks that would use the account creation flow, you could think of introducing reusability with [code snippets](/docs/browser-checks/partials-code-snippets/).

Happy E2E testing!
