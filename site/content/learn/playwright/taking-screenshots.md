---
title: Playwright Screenshots - How to Take and  Automate Screenshots
subTitle: Leveraging images for troubleshooting and more
date: 2020-06-23
author: Giovanni Rago
githubUser: ragog
tags:
  - basics

weight: 1
navTitle: Taking screenshots
menu:
  learn:
    parent: "Basics"
---

Headless browsers are fully capable of taking screenshots, which is very useful in troubleshooting failures or faulty scripts. Using additional libraries and tools, it is also possible to automate visual comparisons.

<!-- more -->

## Generating and saving screenshots

The `page.screenshot` command allows us to save one or more screenshots of the current page to a specified path. Without any additional options, the size of the screenshot depends on the viewport size:

```js
{{% readfile filename="samples/playwright/basic-screenshot.js" %}}
```
{{< run-in-checkly "/samples/playwright/basic-screenshot.js" "playwright"  >}}

## Full page screenshots

Adding the `fullPage: true` option allows for the capture of full page screenshots, overriding the `height` parameter specified for our viewport:

```js
await page.screenshot({ path: 'my_screenshot.png', fullPage: true })
```

## Clipped screenshots

Having our screenshot limited to a smaller portion of the viewport is also possible. All we need to do is specify the coordinates of the top left corner of the screenshot, plus `width` and `height`. We then pass these options to:

```js
{{% readfile filename="samples/playwright/basic-screenshot-clipped.js" %}}
```
{{< run-in-checkly "/samples/playwright/basic-screenshot-clipped.js" "playwright"  >}}

The above examples can be run as follows:
```sh
$ node basic-screenshots.js
```

## Use in visual regression testing

Screenshots can be fed to image comparison libraries, such as [Resemble.js](https://github.com/rsmbl/Resemble.js), [pixelmatch](https://github.com/mapbox/pixelmatch), [Rembrandt.js](http://rembrandtjs.com/) or others in order to determine whether our latest sets of screenshots contains significant differences when measured against a baseline.


## Further reading
1. Official documentation for taking screenshots with [Playwright](https://playwright.dev/docs/verification?_highlight=screenshot#screenshots)
2. Blog post from baseweb.design on the whys and hows of [visual regression testing](https://baseweb.design/blog/visual-regression-testing/)
3. Blog post from Gideon Pyzer looking at different visual [regression testing tools](https://gideonpyzer.dev/blog/2018/06/25/visual-regression-testing/)
