---
title: How to Click, Type, and Hover with Playwright
subTitle: Basic page interactions
date: 2020-06-15
author:
  - Giovanni Rago
  - Tim Nolet
githubUser:
  - ragog
  - tnolet
tags:
  - basics

weight: 70
navTitle: Clicking and typing
menu:
  learn_playwright:
    parent: "Interaction"
---

Users normally access most website functionality through clicks, keystrokes etc. Playwright allows us to replicate these events by referencing elements on the page using [User-first Selectors](https://www.checklyhq.com/blog/playwright-user-first-selectors/).

<!-- more -->

## Clicking

Clicking is the default way of selecting and activating elements on web pages, and will appear very often in most headless scripts.

 ```ts {title="basic-click.spec.ts"}
import { test, expect } from '@playwright/test'

test('can click log in', async ({ page }) => {
  await page.goto('https://danube-web.shop/')
  await page.getByRole('button', { name: 'Log in' }).click()
})
 ```


For the times when even the humble click fails, you can try the following alternatives:
1. `await page.click('#login', { force: true })` to force the click even if the selected element appears not to be accessible
2. `await page.$eval('#login', elem => elem.click())` to run the click inside the webpage
3. `await page.dispatchEvent('#login', 'click')` to directly dispatch the click event on the element

## Hovering

A popular pattern among web pages is exposing additional information or functionality when the user hovers the mouse cursor over a specific item. Examples include, menus, previews and dialogs containing extra information on the item.

 ```ts {title="basic-hover.spec.ts"}
import { test, expect } from '@playwright/test'

test('hover over sign in', async ({ page }) => {
  await page.goto('https://danube-web.shop/')
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByRole('button', { name: 'Sign In' }).hover()
});
 ```
*Note that in this example we're not asserting anything, since our web example doesn't do any element updates on hover.*

## Focussing

Focussing on specific UI elements allows the user to interact with them without clicks. It can also result in a proactive reaction from the webapp, such as displaying suggestions.

 ```ts {title="basic-focus.spec.ts"}
import { test, expect } from '@playwright/test'

test('Focus on email field', async ({ page }) => {
  await page.goto('https://danube-web.shop/')
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByPlaceholder('Email').focus()
});
 ```
## Typing

We can simulate typing on a real keyboard using `page.type()`:

```ts {title="basic-type.spec.ts"}
 import { test, expect } from '@playwright/test'

test('testAlpha', async ({ page }) => {
  await page.goto('https://danube-web.shop/')
  await page.getByRole('textbox').focus()
  await page.getByRole('textbox').fill('catcher')
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.locator('#app-content')).toContainText('Rye')
});
 ```

Single key presses can also be executed. For example, to press the Enter key:
- Playwright: `await page.press('Enter')`

Key presses can also be sent to a specific element:

`await (await page.$('input[type="text"]')).press('Enter')`

We can also hold down and release one or more keys, possibly combining them to use keyboard shortcuts:

```ts
await page.keyboard.down('Control')
await page.keyboard.press('V')
await page.keyboard.up('Control')
```

You can run (from the terminal) the above examples as follows:
```sh
npx playwright test basic-click-type.ts
```

## Further reading
1. The related official documentation of [Playwright](https://playwright.dev/docs/input#mouse-click) 
2. [Finding effective selectors](/learn/playwright/selectors/)
