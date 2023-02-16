---
title: Scraping & asserting on page elements
description: How to scrape web page elements like texts, buttons and forms with Google Chrome and Playwright Test.
weight: 15
menu:
  docs:
    parent: "Browser checks"
---

Any standard Node.js script that successfully finishes an execution is a valid, passing browser check. However, in
many cases, you want to validate whether the session shows the right stuff to the user.

This is a two-step process:

1. Identify the relevant element on the current page.
2. Assert that it shows what you expect.

Playwright Test offers many ways to scrape elements like buttons, forms or any arbitrary HTML element. We've listed the most
common ones below, together with some tips on how to use them effectively.

When it comes to assertions, Playwright Test uses Jest's [expect](https://jestjs.io/docs/expect) library. Playwright also extends the `expect` library with it's own, recommended web-first assertions. These will re-fetch the element and check it until the condition is met or the test times out. The full list of web-first assertions can be found [here.](https://playwright.dev/docs/test-assertions#list-of-assertions)

## Scraping text values

For the text assertions, you can use `expect().toHaveText()` or `expect().toContainText()`. The first one will look for an exact match, while the latter will check for a substring match. Both methods accept regex patterns too. The example below shows how these could be used in a real-world scenario:


{{< tabs "Scraping text values" >}}
{{< tab "TypeScript" >}}
 ```ts
import { test, expect } from '@playwright/test'

test('Checkly API Docs search input has a keyboard shortcut info', async ({ page }) => {
  await page.goto('https://developers.checklyhq.com/') // 1

  const searchBox = page.getByRole('button', { name: 'Search' }) // 2

  await expect(searchBox).toContainText('CTRL-K') // 3
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
 ```js
const { test, expect } = require('@playwright/test')

test('Checkly API Docs search input has a keyboard shortcut info', async ({ page }) => {
  await page.goto('https://developers.checklyhq.com/') // 1

  const searchBox = page.getByRole('button', { name: 'Search' }) // 2

  await expect(searchBox).toContainText('CTRL-K') // 3
})
 ```
{{< /tab >}}
{{< /tabs >}}

Ok, let's break this down:

1. We require `@playwright/test` library, declare a test block and go to the Checkly docs page.
2. We use `page.getByRole()` and pass it two arguments:
  - A role of the element
  - An object with `name` property - it will narrow the search to an element with a matching text, or in this case, `aria-label` attribute 
3. We expect the `searchBox` element to contain `CTRL-K` text (a keyboard shortcut info)


## Scraping a list of values

Playwright Test makes it easy to work with [lists of elements](https://playwright.dev/docs/locators#lists). The `getByX()` methods will return a list, if multiple elements match the parameters. You could then assert the count, text or perform additional filtering on the elements:

{{< tabs "Scraping list values" >}}
{{< tab "TypeScript" >}}
```ts
import { expect, test } from '@playwright/test'

test('Find "Advanced" sections on playwright docs page', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro')

  const advancedSections = page.locator('.menu__link').filter({ hasText: /Advanced.+/i }) // 1, 2

  await expect(advancedSections).toHaveCount(2) // 3
  await expect(advancedSections).toHaveText(['Advanced: configuration', 'Advanced: fixtures']) // 4
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { expect, test } = require('@playwright/test')

test('Find "Advanced" sections on the playwright docs page', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro')

  const advancedSections = page.locator('.menu__link').filter({ hasText: /Advanced.+/i }) // 1,2

  await expect(advancedSections).toHaveCount(2) // 3
  await expect(advancedSections).toHaveText(['Advanced: configuration', 'Advanced: fixtures']) // 4
})
```
{{< /tab >}}
{{< /tabs >}}

1. We select all elements that have the CSS class `menu__link`. 
2. In the same line, we filter these elements to those that contain `Advanced` word
3. We assert the elements count
4. We assert that the exact text of these elements (`expect().toHaveText()` accepts arrays too!)


## Scraping form input elements

### Text input fields

Use the `locator.inputValue()` method to get the text from a standard text input field.

{{< tabs "locator.inputValue()" >}}
{{< tab "TypeScript" >}}
```ts
import { expect, test } from '@playwright/test'

test('Search "playwright" on the Duckduckgo search page', async ({ page }) => {
  await page.goto('https://duckduckgo.com/')

  const searchInput = page.locator('#search_form_input_homepage')

  await searchInput.type('Playwright')
  await expect(searchInput).toHaveValue('Playwright')
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { expect, test } = require('@playwright/test')

test('visit page and take screenshot', async ({ page }) => {
  await page.goto('https://duckduckgo.com/')

  const searchInput = page.locator('#search_form_input_homepage')

  await searchInput.type('Playwright')
  await expect(searchInput).toHaveValue('Playwright')
})
```
{{< /tab >}}
{{< /tabs >}}

### Checkboxes, radio buttons and dropdown selects

Scraping the values of other common form elements is pretty similar to scraping text inputs, with a few quirks here and
there.

#### Checkboxes:

{{< tabs "Checkboxes" >}}
{{< tab "TypeScript" >}}
```ts
import { expect, test } from '@playwright/test'

test('Test Bootstrap checkbox element', async ({ page }) => {
  await page.goto('https://getbootstrap.com/docs/4.3/components/forms/#checkboxes-and-radios')

  const checkbox = page.getByLabel('Default checkbox')

  await expect(checkbox).not.toBeChecked()
  await checkbox.check()
  await expect(checkbox).toBeChecked()
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { expect, test } = require('@playwright/test')

test('Test Bootstrap checkbox element', async ({ page }) => {
  await page.goto('https://getbootstrap.com/docs/4.3/components/forms/#checkboxes-and-radios')

  const checkbox = page.getByLabel('Default checkbox')

  await expect(checkbox).not.toBeChecked()
  await checkbox.check()
  await expect(checkbox).toBeChecked()
})
```
{{< /tab >}}
{{< /tabs >}}


#### Radio buttons: 

{{< tabs "Radio buttons" >}}
{{< tab "TypeScript" >}}
```ts
import { expect, test } from '@playwright/test'

test('Test Bootstrap radio element', async ({ page }) => {
  await page.goto('https://getbootstrap.com/docs/4.3/components/forms/#checkboxes-and-radios')

  const defaultRadio = page.getByRole('radio', { name: 'Default radio', exact: true })
  const secondDefaultRadio = page.getByRole('radio', { name: 'Second default radio', exact: true })

  await expect(defaultRadio).toBeChecked()
  await secondDefaultRadio.check()
  await expect(secondDefaultRadio).toBeChecked()
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { expect, test } = require('@playwright/test')

test('Test Bootstrap radio element', async ({ page }) => {
  await page.goto('https://getbootstrap.com/docs/4.3/components/forms/#checkboxes-and-radios')

  const defaultRadio = page.getByRole('radio', { name: 'Default radio', exact: true })
  const secondDefaultRadio = page.getByRole('radio', { name: 'Second default radio', exact: true })

  await expect(defaultRadio).toBeChecked()
  await secondDefaultRadio.check()
  await expect(secondDefaultRadio).toBeChecked()
})
```
{{< /tab >}}
{{< /tabs >}}

#### Select menu: 

{{< tabs "Select dropdown" >}}
{{< tab "TypeScript" >}}
```ts
import { expect, test } from '@playwright/test'

test('Test Bootstrap select menu', async ({ page }) => {
  await page.goto('https://getbootstrap.com/docs/4.3/components/forms/#select-menu')

  const select = page.locator('.bd-example > select.custom-select.custom-select-lg.mb-3')

  await expect(select).toHaveValue('Open this select menu')
  await select.selectOption('1')
  await expect(select).toHaveValue('1')
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { expect, test } = require('@playwright/test')

test('Test Bootstrap select menu', async ({ page }) => {
  await page.goto('https://getbootstrap.com/docs/4.3/components/forms/#select-menu')

  const select = page.locator('.bd-example > select.custom-select.custom-select-lg.mb-3')

  await expect(select).toHaveValue('Open this select menu')
  await select.selectOption('1')
  await expect(select).toHaveValue('1')
})
```
{{< /tab >}}
{{< /tabs >}}

Key takeaways are:

1. You can use `locator.check()` and `locator.isChecked()` methods to interact with checkboxes and radio buttons
2. Using `locator.inputValue()` will return the selected value of a dropdown. `locator.selectOption()` will select a new value

## Built-in shortcuts

Playwright Test offers some built-in shortcuts to access common elements of a typical webpage which you can use in Checkly. For the full details see
[the Playwright docs](https://playwright.dev/docs/api/class-page).

{{< tabs "page.viewport" >}}
{{< tab "TypeScript" >}}
 ```ts
import { test } from '@playwright/test'

test('Go to google.com', async ({ page }) => {
  await page.goto('https://www.google.com/')

  // grabs the page title
  const title = await page.title()

  // grabs the page's URL
  const url = page.url()

  // return an object with the page's viewport setting
  const viewport = page.viewportSize()
  console.log('Page width is:', viewport.width)
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { test } = require('@playwright/test')

test('Go to google.com', async ({ page }) => {
  await page.goto('https://www.google.com/')

  // grabs the page title
  const title = await page.title()

  // grabs the page's URL
  const url = page.url()

  // return an object with the page's viewport setting
  const viewport = page.viewportSize()
  console.log('Page width is:', viewport.width)
})
```
{{< /tab >}}
{{< /tabs >}}

## More resources

- [Scraping guides](/learn/headless/basics-scraping/)
