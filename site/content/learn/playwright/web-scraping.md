---
title: Playwright Web Scraping - How to Extract Data from Websites
subTitle: Extracting valuable information through automation
date: 2020-08-26
author: Giovanni Rago
githubUser: ragog
tags:
  - basics
  - scraping
  - assertions

weight: 5
navTitle: Scraping
menu:
  learn:
    parent: "Best practices"
---

We call the action of extracting data from web pages _web scraping_. Scraping is useful for a variety of use cases:

1. In testing and monitoring, asserting against the state of one or more elements on a page
2. In general, gathering data for a variety of different purposes

<!-- more -->

## Scraping element attributes & properties

Below is an example running against our [test site](https://danube-web.shop/), getting and printing out the `href` attribute of the first `a` element on the homepage. That just happens to be our logo, which links right back to our homepage, and therefore will have an `href` value equal to the URL we navigate to using `page.goto()`:

{{< tabs "1" >}}
{{< tab "Playwright" >}}
```js 7
{{< readfile filename="samples/playwright/basic-get-href-value.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-get-href-value.js" "playwright"  >}}
{{< /tab >}}
{{< /tabs >}}

As an alternative, it is also possible to retrieve an [ElementHandle](https://playwright.dev/docs/api/class-elementhandle) and then retrieve a property value from it. Following is an example printing the `href` value of the first `a` element of our homepage:

{{< tabs "2" >}}
{{< tab "Playwright" >}}
```js 7,8
{{< readfile filename="samples/playwright/basic-get-href-handle.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-get-href-handle.js" "playwright"  >}}
{{< /tab >}}

{{< /tabs >}}

> The `innerText` property is often used in tests to assert that some element on the page contains the expected text.

## Scraping lists of elements

Scraping element lists is just as easy. For example, let's grab the `innerText` of each product category shown on the homepage:

{{< tabs "3" >}}
{{< tab "Playwright" >}}
```js 7-9
{{< readfile filename="samples/playwright/basic-get-text-values.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-get-text-values.js" "playwright"  >}}
{{< /tab >}}
{{< /tabs >}}

## Scraping images

Scraping images from a page is also possible. For example, we can easily get the logo of our test website and save it as a file:

{{< tabs "4" >}}
{{< tab "Playwright" >}}
```js [9,11,12]
{{< readfile filename="samples/playwright/basic-get-image.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-get-image.js" "playwright"  >}}
{{< /tab >}}
{{< /tabs >}}

We are using [axios](https://github.com/axios/axios) to make a `GET` request against the source URL of the image. The response body will contain the image itself, which can be written to a file using [fs](https://nodejs.org/api/fs.html).

## Generating JSON from scraping

Once we start scraping more information, we might want to have it stored in a standard format for later use. Let's gather the title, author and price from each book that appears on the home page of our test site:

![books with titles ready for scraping](/samples/images/basics-scraping-1.png)

The code for that could look like this:

{{< tabs "5" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/basic-get-data-json.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-get-data-json.js" "playwright"  >}}
{{< /tab >}}
{{< /tabs >}}

The resulting `books.json` file will look like the following:

```json
[
  { "title": "Haben oder haben",
    "author": "Fric Eromm",
    "price": "$9.95"
  },
  {
    "title": "Parry Hotter",
    "author": "J/K Rowlin'",
    "price": "$9.95"
  },
  {
    "title": "Laughterhouse-Five",
    "author": "Truk Tugennov",
    "price": "$9.95"
  },
  {
    "title": "To Mock a Killingbird",
    "author": "Larper Hee",
    "price": "$9.95"
  },
  ...
]
```

All the above examples can be run as follows:

```sh
$ node scraping.js
```

## Further reading
1. [Playwright](https://playwright.dev/docs/assertions#text-content)'s official API reference on the topic
2. An [E2E example test](/learn/playwright/testing-coupons/) asserting agains an element's `innerText`

