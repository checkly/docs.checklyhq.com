---
title: E2E Search
subTitle: Verifying core platform functionality
date: 2020-07-15
author: Giovanni Rago
githubUser: ragog
tags:
  - e2e
  - assertions
  - search
weight: 15
menu:
  learn:
    parent: "E2E examples"
---

Searching a website is an everyday action for most internet users. For most services, the speed at which their customers are able to get to the products they are looking for is directly tied to revenue. To enable that, a performant and reliable search function is needed.

<!-- more -->

## Steps

The example below, which is running against our [test webshop](https://danube-web.shop/), shows how we can verify the correctness of a search's result from an end-to-end perspective. In short, we will:
1. Enter a known search term
2. Firstly, assert the expected number of results is being shown
3. If the previous point is true, assert that all expected search results are shown

We will use [Chai](https://www.chaijs.com/api/assert/) as an assertion library for points 2 and 3.

{{< tabs "1" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/search.js" >}}
```
{{< run-in-checkly "/samples/playwright/search.js" "playwright"  >}}
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/search.js" >}}
```
{{< run-in-checkly "/samples/puppeteer/search.js" "puppeteer"  >}}
{{< /tab >}}
{{< /tabs >}}

Run this example as follows:

```sh
node search.js
```

> When testing search on large sets of data, you might additionally need to handle result pagination, together with the possibility of duplicate results.

Listing search terms and their corresponding expected results in a file could be helpful for additional, more thorough testing. The contents of the file would be then used to drive the searches and comparisons. An example could look like the following JSON:

```json
[
    {
        "search": "pen",
        "results": [
            "red pen",
            "blue pen",
            "fountain pen"
        ]
    },
    {
        "search": "pencil",
        "results": [
            "short pencil",
            "pencil sharpener",
            "pencil case"
        ]
    }
]
```

## Takeaways

1. Moving test data to a separate file can help when running more thorough comparisons.
2. Assertion libraries help us cleanly verify multiple constraints in our test.
