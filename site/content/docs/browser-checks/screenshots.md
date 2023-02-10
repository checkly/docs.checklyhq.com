---
title: Taking screenshots
weight: 19
menu:
  docs:
    parent: "Browser checks"
---

You can take up to ten screenshots per browser check. This is really handy when debugging a failure situation or just
in general to get a comfy feeling everything is OK.  

Using Playwright or Playwright Test add a screenshot anywhere by using the following syntax in your script:

```js
await page.screenshot({ path: 'my_screenshot.png' })
```

> While screenshots are a great way to capture a specific moment of your check, we highlight recommend using it together with `@playwright/test` to record videos of your entire check run and enable step-by-step trace views.

Screenshots will show up while editing your browser check in the editor on the "screenshots" tab and as part of the 
check results on every check run. You can download the full size screenshot by clicking on the thumbnail.

Screenshots need to stick to the following specs:

- Either `.png`, `jpeg` or `jpg` suffix.
- Allowed characters are `a-z A-Z 0-9 - _ @` So no whitespaces in the filename.

![take screenshots with Puppeteer](/docs/images/browser-checks/screenshots.png)


Read more about the options for `page.screenshot()` like transparency, clipping and quality settings in the official docs for [Playwright](https://playwright.dev/docs/screenshots).


{{< warning >}}
The experimental video recording added in [Playwright 
1.4.0](https://github.com/microsoft/playwright/releases/tag/v1.4.0) 
is not supported by Checkly - instead use video recordings with Playwright Test.
{{</ warning >}}

## Full page screenshots

Playwright allows you to capture a full-page screenshot, including the content below the fold. This is very handy for taking
snapshots of a long landing page or blog site. Just add the `fullPage: true`. The framework will scroll and stitch the images together.

```js
await page.screenshot({ path: 'my_screenshot.png', fullPage: true })
```

## Screenshots of specific elements

You can target any specific page element and generate a screenshot just of that part of the screen. You first need to grab the element using Playwright Test's locator and then call the `screenshot` method on that element.

{{< tabs "Element screenshot example" >}}
{{< tab "Typescript" >}}
```ts
import { test } from '@playwright/test'

test('Visit Checkly homepage and take a screenshot', async ({ page }) => {
  await page.goto('https://www.checklyhq.com/')
  const mainHeadline = page.locator('#landing h1')

  // Take a screenshot of the headline
  await mainHeadline.screenshot({ path: 'main-headline.jpg' })
})
```
{{< /tab >}}
{{< tab "Javascript" >}}
```js
const { test } = require('@playwright/test')

test('Visit Checkly homepage and take a screenshot', async ({ page }) => {
  await page.goto('https://www.checklyhq.com/')
  const mainHeadline = page.locator('#landing h1')

  // Take a screenshot of the headline
  await mainHeadline.screenshot({ path: 'main-headline.jpg' })
})
```
{{< /tab >}}
{{< /tabs >}}

The code above snaps a picture of the headline on the Checkly homepage.

![take screenshot of page element with Playwright](/docs/images/browser-checks/element_screenshot.gif)

## More resources

- Learn [how to mask dynamic elements with Playwright screenshots](https://www.youtube.com/watch?v=f_u8PZvmYUo) on our YouTube channel