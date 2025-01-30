---
title: What to do when auto-waiting isn't working
description: >-
  Playwright's auto-waiting is a great feature, but in some situations it doesn't work as expected, what are the alternatives?
author: Nočnica Mellifera
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - FAQ
---

We all know that hard waits are generally to be avoided in Playwright. Here again is the list of problems hard waits can cause:

- Flaky tests
- Tests taking too long to execute
- Otherwise working tests that time out
- Tests that are harder to maintain

The reason not to add hard waits is pretty simple: Playwright has auto-waiting that handles most scenarios just fine, you should rely on that instead. Every time you tell Playwright to do something like:

```ts
  await page.waitForTimeout(10000);
```

you’re making a test that’s more likely to fail. In fact the Playwright documentation on `waitForTimeout` says: “never wait for timeout in production.”

But what abou those situations where waiting seems like the only solution? Auto-waiting isn’t working for whatever reason, and you just need to give the page a few seconds to catch up, to write a passing test. I’ve written a somewhat contrived scenario where waiting *seems* to be the best solution, and written some alternatives.

## When auto-waiting isn’t working, the page isn’t really ready

In the following contrived example, it takes five seconds for the modals behind each of these buttons to be ready:

*I know it seems odd that I’ve added a giant HTML file here with embedded JS, but we will want to refer to the page structure* 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-commerce Site</title>
    <style>
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .close {
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to Our E-commerce Site</h1>
    <div>
      <button onclick="showModal('modal1')">Toolbar 1</button>
      <button onclick="showModal('modal2')">Toolbar 2</button>
      <button onclick="showModal('modal3')">Toolbar 3</button>
    </div>

    <div id="modal1" class="modal">
      <div class="modal-content">
        <p>Toolbar 1 Content</p>
        <span class="close" onclick="hideModal('modal1')">Close</span>
      </div>
    </div>
    <div id="modal2" class="modal">
      <div class="modal-content">
        <p>Toolbar 2 Content</p>
        <span class="close" onclick="hideModal('modal2')">Close</span>
      </div>
    </div>
    <div id="modal3" class="modal">
      <div class="modal-content">
        <p>Toolbar 3 Content</p>
        <span class="close" onclick="hideModal('modal3')">Close</span>
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

Clicking any of the buttoms before that time gets us an error message.

![an alert telling the visitor that the modal isn't ready yet](/guides/images/auto-waiting-1.png)

but after those 5 seconds have passed, the modal loads as expected.

By default, a test pointed at this page will fail

```ts

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('site.example/modalLoader.html');
  await page.getByRole('button', { name: 'Toolbar 4' }).click();
  await page.locator('#modal4').getByText('Close').click();
});
```

Note that we don’t even have assertions added to this test yet, but when we try to close the modal, the test will fail.

We can make this test functional by adding a wait:

```ts
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('site.example/modalLoader.html');
  await page.waitForTimeout(10000);
  await page.getByRole('button', { name: 'Toolbar 4' }).click();
  await page.locator('#modal4').getByText('Close').click();
});
```

And the test will work!

I hate to flog a dead horse but just to go over the reasons that this probably isn’t ideal:

- Your users don’t know to wait this critical 5 seconds before the button because functional, so you may well be hiding a failure from yourself that users are quite aware of
- If this were a real world scenario, it’s likely that third party dependencies or other latency is what’s causing this modal to not be ready, if that’s the case, the arbitrary timeout we’ve added isn’t going to work every time
    
![a cartoon dialogue where a developer explains to a QA person that a modal not being ready when a user clicks isn't an error](/guides/images/auto-waiting-2.png)


What are the options to fix this issue *without* a hard wait?

## 1. Edit the page: give a role only when the modal is ready

As the team writing synthetic monitoring, testing the final rendered page, we may not have scope or even the access to edit the code underlying the page we’re monitoring. However it’s worth noting that some structural changes to the page would both fix this test and improve usability. In this case my recommendation would be to change the `<button>` elements above into `<div>` elements until the underlying modal is available. So each button would begin as:

```html
        <div id="box1" class="box">Toolbar 1</div>
```

in my contrived script we are just waiting 5 seconds to make the modals available, but if you do know the code point when the modals are avialble (for example when a request is completed) you could wait until that moment to change give the `button` role:

```ts
let modalsReady = false;

        function wait() {
            setTimeout(() => {
                modalsReady = true;
                console.log("Modals are ready.");

                // Enable boxes as buttons
                const boxes = document.querySelectorAll('.box');
                boxes.forEach(box => {
                    box.setAttribute('role', 'button');
                    // Add event listener for showing modals
                    box.addEventListener('click', () => {
                        const modalId = `modal${box.id.replace('box', '')}`;
                        showModal(modalId);
                    });
                });
            }, 30000);
        }
```

This page change isn’t just for the purposes of fixing this test, it has the knock-on benefit of making the page more accessible. Buttons should only exist in the page when they’re ready to receive input, so this change will improve the experience for low-bandwidth users and those using alternative browsing tools.

Once this change is made, Playwright auto-waiting will work as expected, since it’s waiting for a page element that doesn’t yet exist. This is the best solution all around, but in our premise we were probably already aware that a non-working button wasn’t ideal behavior, so we probably would have fixed this if we could!

## 2. Use a degraded state

This solution is fairly situational, but it’s worth considering if the modal you’re checking for isn’t completely necessary for your test to move forward, for example if you’re checking details on a modal, but the next step is to close the modal and move elsewhere on the page. If that’s the case, consider having the test enter a [degraded state](https://www.checklyhq.com/docs/browser-checks/degraded-state/) rather than failing. A full walkthrough of the code changes are [on our documentation site](https://www.checklyhq.com/docs/browser-checks/degraded-state/), but suffice to say that with soft assertions you can have a check enter a ‘yellow’ state on the Checkly dashboard without triggering the same alerts as a failing check. This is perfect for performance issues that are intermittent, and would otherwise cause constant downtime alerts.

To see a demo of how this state works in Checkly, take a look at Stefan’s tutorial video:

{{< youtube id="kzQu0Y_Nxjk" title="Degraded states in checkly" >}}

## 3. Interact with in-page Javascript with `page.evaluate`

In our somewhat contrived code scenario above, the modals we want don’t work because `modalsReady` is false. For the purposes of our test, we’d like run some JavaScript commands against the page, enabling our key modals.

Playwright provides us the ability to interact with the scripts running on the page with `page.evalute` . To get this test working we can just add a single line:

```ts
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('site.example/modalLoader.html');
  await page.getByRole('button', { name: 'Toolbar 3' }).click();
  await page.evaluate('modalsReady = true')
  await page.getByRole('button', { name: 'Toolbar 1' }).click();
  await page.locator('#modal1').getByText('Close').click();
});
```

This test now passes with no need to add an overlong `wait` to our test.

There are some fun extensions in usage for the `.evaluate()` method: for example if we wanted to debug this test to see if modals were ready, we could add `console.log(page.evaluate('modalsReady'))` to get that in-page script variable value. We can also use `.evaluate()` to remove pieces of the page we don’t want to be on the DOM during our test. 

This is all well and good for our example scenario, and it’s a great technique for advanced test writing, but the most likely reason this modal wouldn’t be ready in the real world is because it’s waiting on a network response that hasn’t returned when we click the button. For that scenario, what we really want is have our test wait for a certain network response. 

## 4. Monitor network traffic with `waitForResponse`

Playwright has inbuilt functions to wait for an event before continuing with execution. As long as the response comes back within timeouts, you can wait for a response before continuing to the next line, the simplest example just waits for any response matching the given pattern:

```ts
const responsePromise = page.waitForResponse('site.example/modalBackend');
await page.getByText('trigger response').click();
const response = await responsePromise;
```

We can now make assertions about this response that won’t be evaluated until we’ve gotten a response. Note that `waitForResponse()` isn’t limited to URL matching, as it also accepts a pattern.

All well and good but sometimes there will be multiple requests to a url, for example when polling to see if a transaction was succesful, and we’d like to evaluate the response and only return when it’s correct. 

```ts
const responsePromise = page.waitForResponse(response =>
  response.url() === 'site.example/modalBackend' && response.status() === 200
      && response.request().method() === 'PUT'
);
await page.getByText('trigger response').click();
const response = await responsePromise;
```

A note on code reading: for myself, and for many other users on Stack Overflow, apparently, it’s quite difficult to get the promise structure here right: there is no await in the `responsePromise` definition, rather `await` is used only when we create a variable with the return from `responsePromise`

See response body waiting in action as demonstrated by Stefan here:

https://www.youtube.com/watch?v=5CER0dKweyw

## Conclusions

In summary, while it may be tempting to use hard waits in your Playwright tests, they often create more problems than they solve. They can make your tests flaky, slow, and harder to maintain. Instead, Playwright provides many tools to handle dynamic scenarios:

1. **Rely on auto-waiting** whenever possible.
2. **Modify the page structure** to better reflect readiness if you have access.
3. **Use degraded states** for slow responses, rather than failing the test.
4. **Leverage `page.evaluate()`** to interact with in-page scripts.
5. **Monitor network traffic** with `waitForResponse` to sync with backend events.

By choosing smarter alternatives to hard waits, you'll make your tests more robust and maintainable, while reflecting real-world user interactions more accurately.