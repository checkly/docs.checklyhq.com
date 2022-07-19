---
title: Setting state using cookies
subTitle: Speeding up tests by skipping login, and more
date: 2020-10-14
author: Giovanni Rago
githubUser: ragog
tags:
  - cookies
weight: 20
menu:
  learn:
    parent: "Network & state"
---

The [HyperText Transfer Protocol (HTTP)](https://developer.mozilla.org/en-US/docs/Web/HTTP#:~:text=Hypertext%20Transfer%20Protocol%%20%28HTTP%29%20is,be%20used%20for%20other%20purposes.) is stateless, but cookies allow it to keep context consistent over the course of a session. In other words, by having our browser automatically exchange small amounts of data, we get to have websites recognise us and remember our preferences, the contents of our shopping baskets or the fact that we had just logged in to our account.

This article shows how we can use cookies and the Web Storage APIs to set state in our Playwright and Puppeteer scripts, opening up new scenarios and saving on execution time.

<!-- more -->

## Reading and writing cookies to the browser

Reading or modifying cookies opens up useful possibilities. A practical example is skipping authentication when testing features available only after login. We could automate the login procedure, but there is no point in going through it for every test in our suite. Skipping it might free up precious time, speeding up delivery.

The following examples show how we can save existing cookies after logging in to GitHub and reuse them later to skip login. First, let us perform login with our credentials, read the cookies and save them to a file.

{{< tabs "1" >}}
{{< tab "Playwright" >}}
```js {hl_lines=[21,22,24]}
{{< readfile filename="samples/playwright/cookies-reading.js" >}}
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js {hl_lines=[19,20,22]}
{{< readfile filename="samples/puppeteer/cookies-reading.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

After a successful login, our saved cookies file will look something like this:

```json
[
    {
        "name": "dotcom_user",
        "value": <YOUR_USERNAME>,
        "domain": ".github.com",
        "path": "/",
        "expires": 1633622615.629729,
        "size": 16,
        "httpOnly": true,
        "secure": true,
        "session": false,
        "sameSite": "Lax"
    },
    {
        "name": "user_session",
        "value": <YOUR_USER_SESSION_TOKEN>,
        "domain": "github.com",
        "path": "/",
        "expires": 1603296216.923899,
        "size": 60,
        "httpOnly": true,
        "secure": true,
        "session": false,
        "sameSite": "Lax"
    },

    ...

]
```

We are now able to read the file later and load the cookies into our new browser session. Notice how we are logged in from the start, without having gone through the UI login procedure.

{{< tabs "2" >}}
{{< tab "Playwright" >}}
```js {hl_lines=[9,11,12]}
{{< readfile filename="samples/playwright/cookies-writing.js" >}}
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js {hl_lines=[9,11,12]}
{{< readfile filename="samples/puppeteer/cookies-writing.js" >}}
```
{{< /tab >}}
{{< /tabs >}}


> Cookies come with an expiration date, so make sure the ones you are trying to reuse are still valid.

While brand new browser sessions with both Playwright and Puppeteer will not contain any cookies by default, there might be points when it is necessary to clear them.

In case you need to clear cookies, you can use [`page.deleteCookie(...cookies)`](https://pptr.dev/#?product=Puppeteer&version=v10.2.0&show=api-pagedeletecookiecookies) with Puppeteer and [`browserContext.clearCookies()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-clear-cookies) with Playwright.


> Notice how Puppeteer handles cookies at page level while Playwright does so at context level.

## localStorage and sessionStorage

Cookies are sent with every request, potentially deteriorating [performance](/learn/headless/basics-performance/) if used for storing large amounts of data. The [localStorage and sessionStorage](https://javascript.info/localstorage) APIs can help us offload some of this data to the browser. Just like with cookies, Playwright and Puppeteer make accessing localStorage and sessionStorage straightforward.

Our test site, [Danube](https://danube-web.shop/), actually uses localStorage to keep track of things such as the content of your cart. Let's see how we can access this state and then replicate it in a later session.

We will first fill the cart by adding three items, then we will copy the contents of localStorage to a file.

{{< tabs "3" >}}
{{< tab "Playwright" >}}
```js {hl_lines=[17,18]}
{{< readfile filename="samples/playwright/localstorage-reading.js" >}}
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js {hl_lines=[22,23]}
{{< readfile filename="samples/puppeteer/localstorage-reading.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

In this case our file will look as follows:

```json
{
  "cartContent": "[{\"id\":1,\"title\":\"Haben oder haben\",\"author\":\"Fric Eromm\",\"genre\":\"philosophy\",\"price\":\"9.95\",\"rating\":\"★★★★☆\",\"stock\":\"1\"},{\"id\":2,\"title\":\"Parry Hotter\",\"author\":\"J/K Rowlin'\",\"genre\":\"erotic\",\"price\":\"9.95\",\"rating\":\"★★★☆☆\",\"stock\":\"1\"},{\"id\":3,\"title\":\"Laughterhouse-Five\",\"author\":\"Truk Tugennov\",\"genre\":\"scifi\",\"price\":\"9.95\",\"rating\":\"★★★☆☆\",\"stock\":\"1\"}]"
}
```

We can use the content of this file to set localStorage in a separate session. That way we will immediately start with the three items already in our shopping cart, potentially getting us closer to a specific scenario we want to test and thereby saving ourselves time.

{{< tabs "4" >}}
{{< tab "Playwright" >}}
```js {hl_lines=[10,"12-17"]}

{{< readfile filename="samples/playwright/localstorage-writing.js" >}}
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js {hl_lines=[9,"11-16"]}
{{< readfile filename="samples/puppeteer/localstorage-writing.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

You can interact with sessionStorage very much like we did with localStorage.


> Do not underestimate the usefulness of having shorter execution time on scripts, especially when frequently running large batches/suites.

All the above examples can be run as follows:
{{< tabs "5" >}}
{{< tab "macOS" >}}
```shell script
GITHUB_USER=username GITHUB_PWD=password node managing-cookies.js
```
{{< /tab >}}
{{< tab "Windows" >}}
```shell script
SET GITHUB_USER=username
SET GITHUB_PWD=password
node managing-cookies.js
```
{{< /tab >}}
{{< /tabs >}}

## Takeaways

1. We can use cookies and Web Storage APIs through Playwright and Puppeteer to set test state and speed up test suites.
2. The Playwright and Puppeteer APIs for handling cookies are slightly different but achieve the same goals.

## Further reading

1. The official MDN docs for [cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies).
2. A practical guide to the [Web Storage APIs](https://javascript.info/localstorage), sessionStorage and localStorage.
2. Official [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-pagecookiesurls) and [Playwright](https://playwright.dev/docs/api/class-browsercontext#browser-context-add-cookies) docs around cookies.
