---
title: Browser Checks upgraded to Puppeteer version 1.7.0
date: 2018-08-23
author: Tim Nolet
sitemapExclude: true
---

The browser checks Puppeteer engine has been upgraded to Puppeteer version 1.7.0. This new version brings some minor
changes to mostly the `puppeteer.launch()` method and some default properties. Noteworthy is the that you can type
emoji's with `page.type()` , i.e.

```javascript
await page.type("input.my-input", "I ❤️ turtles 🐢");
```
 Read about the changes and bug fixes in the [release notes](https://github.com/GoogleChrome/puppeteer/releases/tag/v1.7.0)

<!--more-->
