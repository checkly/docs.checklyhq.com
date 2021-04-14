---
title: Intercepting requests
subTitle: Monitoring and manipulating web traffic
date: 2020-09-03
author:
  - Giovanni Rago
  - Jonathan Thompson
githubUser:
  - ragog
  - thompsonjonm
tags:
  - network

menu:
  learn:
    parent: "Best Practices"
---

When we browse the web, a series of HTTP requests and responses are exchanged between our browser and the pages we are visiting. There are scenarios in which it is useful to monitor or manipulate this traffic, instead of letting it happen as-is.

<!-- more -->

## Request interception

Request interception enables us to observe which requests and responses are being exchanged as part of our script's execution. For example, this is how we could print them out when we load our [test website](https://danube-webshop.herokuapp.com):

{{< tabs "1" >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/request-interception-read.js" >}}
```
{{< run-in-checkly "/samples/puppeteer/request-interception-read.js" "puppeteer"  >}}
{{< /tab >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/request-interception-read.js" >}}
```
{{< run-in-checkly "/samples/playwright/request-interception-read.js" "playwright"  >}}
{{< /tab >}}
{{< /tabs >}}

We might want to intervene and filter the outgoing requests. For example, when [scraping web pages](/learn/headless/basics-scraping/), we might want to block unnecessary elements from loading in order to speed up the procedure and lower bandwidth usage.

In the following snippet we are going to abort all requests for images on our test website. We will identify them based off of their [`resourceType`](https://pptr.dev/#?product=Puppeteer&version=v5.2.1&show=api-httprequestresourcetype), while letting all other requests through without modification.

{{< tabs "2" >}}
{{< tab "Puppeteer" >}}
```js {9-14}
{{< readfile filename="samples/puppeteer/request-interception-block.js" >}}
```
{{< run-in-checkly "/samples/puppeteer/request-interception-block.js" "puppeteer"  >}}
{{< /tab >}}
{{< tab "Playwright" >}}
```js {9-13}
{{< readfile filename="samples/playwright/request-interception-block.js" >}}
```
{{< run-in-checkly "/samples/playwright/request-interception-block.js" "playwright"  >}}
{{< /tab >}}
{{< /tabs >}}

 As a result, you will see the website logo not being loaded.

 ![test site without images](/samples/images/request-interception-image.png)

 Similarly, switching the `resourceType` to `stylesheet` would result in the target website loading without any CSS styling.

 ![test site without css](/samples/images/request-interception-css.png)

## Response interception

Isolating one or more software components from their dependencies makes them easier to test. We can do so by substituting interactions with such dependencies with simulated, simplified ones. This is also known as _stubbing_.

Both Playwright and Puppeteer make it easy for us, as for every request we can intercept we also can stub a response.

Every time we load it, our test website is sending a request to its backend to fetch a list of best selling books. For our example, we are going to intercept this response and modify it to return a single book we define on the fly.

{{< tabs "3" >}}
{{< tab "Puppeteer" >}}
```js {19-28}
{{< readfile filename="samples/puppeteer/response-interception.js" >}}
```
{{< /tab >}}
{{< tab "Playwright" >}}
```js {19-24}
{{< readfile filename="samples/playwright/response-interception.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

Here is what the homepage will look like with our stubbed response:

![test site with stubbed response](/samples/images/response-interception.png)

Run the above examples as follows:
```sh
node request-interception.js
```

## Takeaways

1. Puppeteer and Playwright give us control over outgoing HTTP requests.
2. Puppeteer and Playwright can easily stub HTTP responses.

## Further reading

1. Official documentation on this topic from [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.2.1&show=api-class-httprequest) and [Playwright](https://playwright.dev/#version=v1.3.0&path=docs%2Fnetwork.md&q=handle-requests).
2. [Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html) by Martin Fowler.
