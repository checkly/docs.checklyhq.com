---
title: Scraping behind a login
subTitle: An example in accessing account-specific information
date: 2020-12-23
author: Giovanni Rago
githubUser: ragog
tags:
  - scraping
weight: 22
menu:
  learn:
    parent: "Scraping"
---

Playwright and Puppeteer can be particularly useful when scraping data accessible only behind a login wall. This article shows a practical example of such a case.

<!-- more -->

## Scraping expenses on Amazon

For our example, we will be logging in to our Amazon account and scraping the price off each order in the previous year, then adding them all up to show us our total Amazon expenditures over that period of time.

A combination of UI automation and scraping will allow us to first log in to the platform, and then to retrieve the information about all our orders.

{{< tabs "1" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/scraping-example-purchases.js" >}}
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/scraping-example-purchases.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

> ⚠️ This example is only intended for learning purposes. Always make sure the website you are planning to scrape allows such behaviour.

Run the above examples as follows, making sure to choose the right Amazon URL and currency:

{{< tabs "2" >}}
{{< tab "macOS" >}}
```sh
CURRENCY=EUR AMAZON_URL=https://www.amazon.de AMAZON_USER=<YOUR_AMAZON_USERNAME> AMAZON_PASSWORD=<YOUR_AMAZON_PASSWORD> node scraping-example-purchases.js
```
{{< /tab >}}
{{< tab "Windows" >}}
```sh
SET CURRENCY=EUR
SET AMAZON_URL=https://www.amazon.de
SET AMAZON_USER=<YOUR_AMAZON_USERNAME>
SET AMAZON_PASSWORD=<YOUR_AMAZON_PASSWORD>
node scraping-example-purchases.js
```
{{< /tab >}}
{{< /tabs >}}


> Under the hood, Amazon can change quite quickly. You might need to adjust the locators and/or flow slightly to have the script work for you.

> ⚠️ Websites might [restrict headless browser traffic](/learn/headless/challenging-flows/) in order to protect their users from fraud. 2FA will also interfere with the script if enabled.

## Takeaways
1. We can scrape information available behind a login wall with Playwright and Puppeteer.
2. Some websites might not allow scraping. Always make sure you check their terms of service beforehand.

## Further reading
1. [Basic scraping](/learn/headless/basics-scraping/) with Playwright and Puppeteer
