---
title: What to do when auto-waiting isn't working
description: >-
  Playwright's auto-waiting is a great feature to avoid test flakiness, but in some situations it doesn't work as expected, what are the alternatives?
author: Nočnica Mellifera
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - FAQ
---

Hard waits and artificual timeouts should be avoided in Playwright because they lead to tests that:

- are flaky.
- take longer than necessary to execute.
- are hard-to-maintain.

The reason not to add hard waits is simple: Playwright provides better ways to test UI. [Web-first assertions with auto-waiting](https://playwright.dev/docs/best-practices#use-web-first-assertions) and [actions based on actionability checks](https://playwright.dev/docs/actionability) handle most end-to-end testing scenarios just fine, and you should rely on them whenever possible.

Every time you tell Playwright to do something like:

```ts
  await page.waitForTimeout(10000);
```

you’re creating a test that’s more likely to fail.

In fact, [the Playwright documentation on `waitForTimeout`](https://playwright.dev/docs/api/class-page#page-wait-for-timeout) says:

> **Never wait for timeout in production.** Tests that wait for time are inherently flaky. Use Locator actions and web assertions that wait automatically.

But what about those situations where manual waiting seems like the only solution?

I’ve created a somewhat contrived scenario where waiting *seems* to be the best solution, and will explain why it's not while providing more maintainable alternatives in this guide.

## When auto-waiting isn’t working, the page isn’t really ready

In the following contrived example, a UI that looks fully loaded and functioning **starts reacting to user interactions only after five seconds**. Buttons that should open a modal, open it after this artificially added delay.

> [!NOTE]
> While this scenario might seem extreme, the pattern of unresponsive UI is very common.
>
> Modern Frontend Frameworks often deliver static and unresponsive HTML that starts functioning after loading the required JavaScript. This adding of functionality is called hydration, and websites often appear unresponsive and broken before all code is loaded.

*I know it seems odd that I’ve added a giant HTML file here with embedded JS, but we will want to refer to the page structure*

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-commerce Site</title>
    <style>/* ... */</style>
  </head>
  <body>
    <h1>Welcome to Our E-commerce Site</h1>
    <div>
      <button onclick="showModal('modal1')">Toolbar 1</button>
    </div>

    <div id="modal1" class="modal">
      <div class="modal-content">
        <p>Toolbar 1 Content</p>
        <span class="close" onclick="hideModal('modal1')">Close</span>
      </div>
    </div>

    <script>
      // Simulate a delay of 5 seconds before modals are ready
      let modalsReady = false

      function wait() {
        setTimeout(() => {
          modalsReady = true
        }, 5000)
      }

      function showModal(modalId) {
        if (!modalsReady) {
          alert('Please wait, the modals are not ready yet.')
          return
        }

        const modal = document.getElementById(modalId)
        if (modal) {
          modal.style.display = 'flex'
        }
      }
      function hideModal(modalId) {
        const modal = document.getElementById(modalId)
        if (modal) {
          modal.style.display = 'none'
        }
      }
      window.onload = wait
    </script>
  </body>
</html>
```

Clicking the button before this artificial delay opens an error alert.

![an alert telling the visitor that the modal isn't ready yet](/guides/images/auto-waiting-1.png)

But if you try again after five seconds, the modal opens as expected.

A test relying on Playwright's auto-waiting will fail with this page.

```ts

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('site.example/modalLoader.html');
  // Playwright clicks the button "too early"...
  await page.getByRole('button', { name: 'Toolbar 1' }).click();
  // And the modal will never become visible
  // so that there's nothing to click.
  await page.locator('#modal1').getByText('Close').click();
});
```

As a quick fix, we might be tempted to make this test functional by adding a hardcoded timeout:

```ts
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('site.example/modalLoader.html');
  // "Fix" the hydration issue
  await page.waitForTimeout(10000);
  await page.getByRole('button', { name: 'Toolbar 1' }).click();
  await page.locator('#modal1').getByText('Close').click();
});
```

And the test will work!

I hate to flog a dead horse, but this approach isn’t ideal because:

- Your users don’t know to wait this critical five seconds before the button becomes functional. The user experience is broken and you may well be hiding or disabling features to avoid user frustration and rage clicking.
- If this were a real-world scenario, it’s likely that third-party dependencies or other latency causes the modal to not be ready. If that’s the case, an arbitrary timeout isn't going to work every time. It will be either too short (leads to test failure) or too long (leads to slow tests).

![a cartoon dialogue where a developer explains to a QA person that a modal not being ready when a user clicks isn't an error](/guides/images/auto-waiting-2.png)


There are many approaches to overcome this issue *without* hard waits. Let's dive in!

## 1. Edit the page: give a role only when the modal is ready

As the team writing synthetic monitoring, testing the final rendered page, we may not have the scope or even the access to edit the code underlying the page we’re monitoring. However it’s worth noting that some structural changes to the page would  fix this test **and** improve usability.

In this case, I recommend disabling the `<button>` until the underlying modal is available.

```html
<button onclick="showModal('modal1')" disabled>Toolbar 1</button>
```

This approach avoids telling users that they can click the button, but also "fixes" the end-to-end test because Playwright's actions will rely on auto-waiting and won't click disabled UI elements.

For example, `locator.click()` will wait for the button to be enabled and only click it once it's ready.

```ts
let modalsReady = false;

function wait() {
  setTimeout(() => {
    modalsReady = true;
    console.log("Modals are ready.");

    // Enable the buttons
    const boxes = document.querySelectorAll('button');
    boxes.forEach(box => {
      box.disabled = false;
    });
  }, 30000);
}
```

This change isn’t just fixing the end-to-end test; it has the knock-on benefit of making the page more accessible and improving user experience. Buttons should only be enabled when they’re ready to receive input.

Once this change is made, Playwright's auto-waiting will work as expected, since it’s waiting for the buttons to become active and enabled.

```ts
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('site.example/modalLoader.html');
  // Playwright will only click this button
  // once it's enabled and clickable
  await page.getByRole('button', { name: 'Toolbar 1' }).click();
  await page.locator('#modal1').getByText('Close').click();
});
```

Removing and tackling the poor hydration patterns is the best solution all around.

But what should you do if you can't fix the underlying application code?

## 2. Use a degraded state

This solution is fairly situational, but it’s worth considering if the modal you’re checking for isn’t completely necessary for your test to move forward.

For example, if you’re checking modal details, but the next step is to close the modal and move elsewhere on the page, consider having the test enter a [degraded state](/docs/browser-checks/degraded-state/) rather than failing.

A full walkthrough of the code changes is [on our documentation site](/docs/browser-checks/degraded-state/), but suffice to say that with soft assertions you can have a check enter a ‘yellow’ state on the Checkly dashboard without triggering the same alerts as a failing check. This is perfect for performance issues that are intermittent, and would otherwise cause constant [downtime alerts](https://www.checklyhq.com/learn/incidents/detection-best-practices/).

To see a demo of how this state works in Checkly, take a look at Stefan’s tutorial video:

{{< youtube id="kzQu0Y_Nxjk" title="Degraded states in checkly" >}}

## 3. Monitor network traffic with `waitForResponse`

Playwright has built-in functions to wait for an event before continuing with execution. Waiting for the network is a good example; you can wait for any request or response before continuing.

This example waits for any response matching the given pattern:

```ts
// Attach network event listener
const responsePromise = page.waitForResponse('site.example/modalBackend');
// Trigger network request
await page.getByText('trigger response').click();
// Wait until the response arrived
const response = await responsePromise;
```

We can now make assertions about this response when it arrives.

> [!NOTE]
> Note that `waitForResponse()` isn’t limited to URL matching, as it also accepts patterns.

But sometimes, there will be multiple requests to a URL. For example, when polling to see if a transaction was successful, and we probably want to evaluate many responses and only continue the test when the transaction came through.

In these cases, `waitForResponse` lets us access and wait for response details, too.

```ts
// Attach network event listener and
// wait for PUT requests receiving a 200 status code
const responsePromise = page.waitForResponse(response =>
  response.url() === 'site.example/modalBackend' && response.status() === 200
      && response.request().method() === 'PUT'
);
// Trigger network request
await page.getByText('trigger response').click();
// Wait until the response arrived
const response = await responsePromise;
```

> [!NOTE]
> A note on code reading: for myself, and many other users on Stack Overflow, it’s quite difficult to get the promise structure here right: there is no await in the `responsePromise` definition, rather `await` is used only when we create a variable with the return from `responsePromise`.

See response body waiting in action as demonstrated by Stefan here:

{{< youtube id="5CER0dKweyw" title="Response body waiting in Playwright" >}}

## 4. Implement your own auto-waiting and retry mechanism

If there's no way to change the application code and no obvious network request to wait for, you could also make your tests pass by implementing you own retry mechanisms.

If we consider the modal example, you can try to repeat your actions until they pass. If your first button click doesn't yield the expected results (showing the modal), try it again until it does.

Playwright's `toPass` assertion allows you to implement precisely this functionality.

```ts
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('site.example/modalLoader.html');

  // Retry this code block until actions and assertions succeed
  // or timeouts are hit and the test fails
  await expect(async () => {
    await page.getByRole('button', { name: 'Toolbar 1' }).click();
    await page.locator('#modal1').getByText('Close').click();
  }).toPass()
});
```

By placing the initial instructions for opening and closing the modal in the `toPass` method, Playwright will retry these actions until they pass. If the modal isn't opening after the first click, it will try again until it is able to close it again or timeout and fail your test entirely.

This approach won't fix the application's UI/UX issues but allows you to "work around" them in your end-to-end tests.

Stefan explains it in detail on YouTube if you want to learn more about this approach.

{{< youtube id="8g7FvoRToGo" title=" Avoid flaky end-to-end tests due to poorly hydrated Frontends with Playwright's toPass()" >}}

## Conclusions

In summary, while it may be tempting to use hard waits in your Playwright tests, they often create more problems than they solve. They can make your tests flaky, slow, and harder to maintain. Instead, Playwright provides many tools to handle dynamic scenarios:

1. **Rely on auto-waiting** whenever possible.
2. **Modify the page structure** to better reflect readiness if you have access.
3. **Use degraded states** for slow responses, rather than failing the test.
4. **Monitor network traffic** with `waitForResponse` to sync with backend events.
5. **Implement specific auto-waiting mechanisms** with `toPass`.

Choosing smarter alternatives to hard waits will make your tests more robust, maintainable, and less flaky while accurately reflecting real-world user interactions. Win win!
