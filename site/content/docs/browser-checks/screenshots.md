---
title: Taking screenshots
weight: 4
menu:
  docs:
    parent: "Browser checks"
---

You can take up to ten screenshots per browser check. This is really handy when debugging a failure situation or just
in general to get a comfy feeling everything is OK.  

Add a screenshot anywhere by using the following syntax in your script:
 
{{< tabs "Basic screenshot example" >}}
{{< tab "Puppeteer" >}}
```js
await page.screenshot({ path: 'my_screenshot.png' })
```
{{< /tab >}}
{{< tab "Playwright" >}}
```js
await page.screenshot({ path: 'my_screenshot.png' })
```
{{< /tab >}}
{{< /tabs >}}

Screenshots will show up while editing your browser check in the editor on the "screenshots" tab and as part of the 
check results on every check run. You can download the full size screenshot by clicking on the thumbnail.

Screenshots need to stick to the following specs:

- Either `.png`, `jpeg` or `jpg` suffix.
- Allowed characters are `a-z A-Z 0-9 - _ @` So no whitespaces in the filename.

![take screenshots with Puppeteer](/docs/images/browser-checks/screenshots.png)


Read more about the options for `page.screenshot()` like transparency, clipping and quality settings in the official 
for   
[Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v2.0.0&show=api-pagescreenshotoptions), or
[Playwright](https://playwright.dev/#version=v1.4.0&path=docs%2Fapi.md&q=pagescreenshotoptions).

{{< warning >}}
The experimental video recording added in [Playwright 
1.4.0](https://github.com/microsoft/playwright/releases/tag/v1.4.0) 
is not supported by Checkly. 
{{</ warning >}}

## Full page screenshots

Both Puppeteer and Playwright allow you to capture a full-page screenshot, including the content below the fold. This is very handy for taking
snapshots of a long landing page or blog site. Just add the `fullPage: true`. The framework will scroll and stitch the images together.


{{< tabs "Full page screenshot example" >}}
{{< tab "Puppeteer" >}}
```js
await page.screenshot({ path: 'my_screenshot.png', fullPage: true })
```
{{< /tab >}}
{{< tab "Playwright" >}}
```js
await page.screenshot({ path: 'my_screenshot.png', fullPage: true })
```
{{< /tab >}}
{{< /tabs >}}

## Screenshots of specific elements

You can target any specific page element and generate a screenshot just of that part of the screen. You first need to 
grab the element with the `$` selector and then call the `screenshot` method on that element. 

{{< tabs "Element screenshot example" >}}
{{< tab "Puppeteer" >}}
```js
await page.goto('https://checklyhq.com/')
const element = await page.$('a.btn-lg')
await element.screenshot({ path: 'button.png' })
```
{{< /tab >}}
{{< tab "Playwright" >}}
```js
await page.goto('https://checklyhq.com/')
const element = await page.$('a.btn-lg')
await element.screenshot({ path: 'button.png' })
```
{{< /tab >}}
{{< /tabs >}}

The code above snaps a picture of just the big call to action button on the Checkly homepage.

![take screenshot of page element with Puppeteer](/docs/images/browser-checks/element_screenshot.png)
