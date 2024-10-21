---
title: How to use setup scripts for better API monitoring
displayTitle: How to use setup scripts for better API monitoring
description: >-
  Setup scripts are a fundamental tool to tailor API checks to your own target endpoints. Their power and flexibility can intimidate beginners, who might struggle to understand how the different parts fit together. This guide will present and break down different real-world examples to help you master this game-changing tool.
author: Giovanni Rago
avatar: 'images/avatars/giovanni-rago.png'
tags:
  - API
---

## The importance of self-contained checks

Checkly's [API Monitoring](/blog/what-is-api-monitoring/) checks run independently and on different schedules, possibly even following different retry logics when failures occur. It is therefore important not to create dependencies between them, which could introduce failures that do not depend on the target system's status, also known as "false failures" and "flakiness". Checkly prevents (or tries to prevent) this antipattern by having each check run fully isolated in its own sandbox.

But then how do we run more complex API checks that might have prerequisites (e.g. auth tokens, test data) that themselves require an API call, or other similar preparation steps? That's what [setup scripts](/docs/api-checks/setup-teardown-scripts/#setup-scripts) are made for. They run right before the API check's main request and enable us to do any action that might be needed to make our check work according to industry [best practices](/learn/headless/valuable-tests/).

## Setup scripts

Setup scripts are where we prepare everything that needs to be in place before the main HTTP request of our check runs. Among the things we can do are:

- HTTP requests to other services (and parsing of the responses)
- encrypt data payloads
- generate unique IDs, timestamps and date strings

In many cases, we will need to pass data we have retrieved, modified or created into the main HTTP request from within our setup script. To do this, we have direct access to every field of the `request` object:

| property | description | type |
| ------------- | ------------- | --- |
| `request.method`  | The HTTP request method, i.e. 'GET', 'POST' etc. | String |
| `request.url`  | The request URL. Any separately defined query parameters are added at the end.  | String |
| `request.body`  | The request body in string format.  | String  |
| `request.headers`  | The request headers.  | Object |
| `request.queryParameters`  | The request query parameters. | Object |

This means we can, for example, set the `Authorization` header of the check's main request programmatically (maybe with a value we have just fetched in the same script) by setting `request.headers['Authorization'] = my_token`, or set the request body content with `request.body = { 'id': 123 }`.

> Like for [Browser checks](/docs/browser-checks/), which libraries and modules are available in setup and teardown scripts depends on which [Runtime](/docs/runtimes/) you have chosen. You can find a list of exactly [which libraries are included](/docs/runtimes/specs/) in which runtime.

### Prepare test data

A check that is self-contained is responsible for preparing (and cleaning up - more on that in [teardown scripts](/docs/api-checks/setup-teardown-scripts/#teardown-scripts)) all the test data it needs to properly test the target functionality. Let's take a look at an example.

We [use Checkly to monitor Checkly](https://blog.checklyhq.com/how-we-monitor-checkly/)! That includes [our API](/docs/api/), which exposes endpoints for CRUD operations on checks, groups, alert channels and other resources. One of the checks we run verifies that our `DELETE /v1/checks/{id}` works correctly. In order to verify that, we will need a check to actually delete. To keep things nice and clean, we can create a new check in the setup script, then retrieve its unique `id` and pass it to the main HTTP request so we can tell our API exactly which check to delete.

First off, let's look at the basic HTTP request config inside our new API check. Note that this will be the request to delete the existing check, not the one to create the dummy check that will be deleted: that will be featured in our setup script, which will run before the request shown below.

Our main request will hit the `DELETE` endpoint at `https://api.checklyhq.com/v1/checks`:

{{< figure src="/guides/images/guides-checkly-setup-delete.png" alt="checkly API check http request config" title="The basic config for our API check's HTTP request" >}}

Note that we are including the `Authorization` header set to `Bearer <YOUR_CHECKLY_API_KEY>`. We will not need to set the body or other parameters.

Let's now look at the setup script. The first thing we need to do is decide what library we will use for creating our dummy check, then import it. I will use {{< newtabref  href="https://axios-http.com/" title="axios" >}}:

```js
const axios = require("axios"); // import axios library explicitly
```

The basic axios config will set up a POST request to our [`CREATE CHECK` endpoint](https://www.checklyhq.com/docs/api#operation/postV1Checks) at `https://api.checklyhq.com/v1/checks`. We will set the `Authorization` header to pass our account's API key to authenticate ourselves.

```js
const { data } = await axios({ // create dummy check on Checkly
  method: "post",
  url: "https://api.checklyhq.com/v1/checks",
  headers: {
    Authorization: "Bearer YOUR_CHECKLY_API_KEY"
  },
  ...
}
```

Note that you can use [environment variables](https://www.checklyhq.com/docs/api-checks/variables/) not to expose your credentials in the setup script:

```js
const apiKey = process.env.API_KEY;

const { data } = await axios({ // create dummy check on Checkly
  ...
  headers: {
    Authorization: `Bearer ${apiKey}`
  },
  ...
}
```

Next we specify the body of our axios request, which states how the check we want created for us will look like:

```js
const { data } = await axios({ // create dummy check on Checkly
  ...
  data: {
    name: "dummy_check",
    checkType: "BROWSER",
    frequency: 5,
    activated: true,
    locations: ["us-east-1"],
    script:
      'const assert = require("chai").assert;const puppeteer = require("puppeteer");const browser = await puppeteer.launch();const page =await browser.newPage();await page.goto("https://google.com/");const title = await page.title();assert.equal(title, "Google"); await new Promise(resolve => setTimeout(resolve, 1000)); browser.close();',
    useGlobalAlertSettings: true,
    degradedResponseTime: 10000,
    maxResponseTime: 20000
  }
}
```

The last bit of the script is where we will extract the `id` of the newly created dummy check from the response to our axios request, in order to pass it on to our API check's own HTTP request. Specifically, we will add the `id` to the target URL, as the target endpoint (`DELETE /v1/checks/{id}`) requires.

```js
const checkId = data.id; // extract dummy check id from response
request.url = request.url + "/" + checkId; // pass check id as path param in check's main http request url
```

Putting everything together, the final result is:

```js
const axios = require("axios"); // import axios library explicitly
const apiKey = process.env.API_KEY;

const { data } = await axios({ // create dummy check on Checkly
  method: "post",
  url: "https://api.checklyhq.com/v1/checks",
  headers: {
    Authorization: `Bearer ${apiKey}`
  },
  data: {
    name: "dummy_check",
    checkType: "BROWSER",
    frequency: 5,
    activated: true,
    locations: ["us-east-1"],
    script:
      'const assert = require("chai").assert;const puppeteer = require("puppeteer");const browser = await puppeteer.launch();const page =await browser.newPage();await page.goto("https://google.com/");const title = await page.title();assert.equal(title, "Google"); await new Promise(resolve => setTimeout(resolve, 1000)); browser.close();',
    useGlobalAlertSettings: true,
    degradedResponseTime: 10000,
    maxResponseTime: 20000,
  }
})

const checkId = data.id; // extract dummy check id from response
request.url = request.url + "/" + checkId; // pass check id as path param in check's main http request url
```

We have built a fully autonomous and self-contained API check, which will take care of setting up all it needs to verify our endpoint is working correctly, then proceed to do just that.

Note that the check might still fail due to an issue with an endpoint other than the one we are checking (`DELETE /v1/checks/{id}`), as the `POST /v1/checks` call in our setup script might also break at some point. Here, the Checkly check result will let us know whether the error occurred in the setup script or in the main HTTP request, allowing us to easily recognise the cause of the issue.

### Fetching dynamic test data

There are several scenarios in which we might want to fetch test data from an external source. It might be out of convenience, or because the data itself is changing often and we want to always grab the newest version, or maybe even because we want to make our check more dynamic to ensure our target system can handle different inputs.

Our example will be about creating a new product for our webshop using its API. Specifically, we will

1. Use our setup script to request the test data from an API generating random device information.
2. Map that data field-by-field to match the schema of our target API.
3. Check against the target API, in our case `fakestoreapi.com`.

Our main request will hit the `POST` endpoint at `https://fakestoreapi.com/products`:

{{< figure src="/guides/images/guides-checkly-setup-create.png" alt="checkly API check http request" title="Our API check's HTTP request" >}}

Now for the setup script. We are going to have an external API generate random data for us. In this case, we want to request information about a random device (e.g. a smartphone) from `random-data-api.com`, precisely with a `GET` to `https://random-data-api.com/api/device/random_device`. Using axios, the request will look as follows:

```js
const axios = require('axios') // import axios library explicitly

const { data } = await axios({ // retrieve random device information from random-data-api.com
  method: "GET",
  url: "https://random-data-api.com/api/device/random_device",
})
```

The response body we will get back from this endpoint will look similar to the following (try running `curl https://random-data-api.com/api/device/random_device` from your command line):

```json
{
    "build_number": 486,
    "id": 4837,
    "manufacturer": "Apple",
    "model": "iPhone 5C",
    "platform": "iOS",
    "serial_number": "9vxM9fCsG9nXg8EjTN5ygV2LvaDZdG",
    "uid": "aeeebb85-aef7-427e-beaf-c65fab5e9154",
    "version": 201
}
```

We will then need to extract some of this information and manually add it to the right fields in the body of the second request, to match its expected schema. First, let's create the object that will make up the response body.

```js
const responseData = { // create the response body object
  title: data.model,
  price: data.id,
  description: data.manufacturer,
  category: "device"
}
```

Notice that, since the first API did not return anything to do with the product's category, we are explicitly specifying a static string.

Now, we can transform the object into a JSON string and add it to the body of the second request:

```js
request.body = JSON.stringify(responseData) // set request body to stringified response body object
```

Putting everything together our setup script will look as follows:

```js
const axios = require('axios') // import axios library explicitly

const { data } = await axios({ // retrieve random device information from random-data-api.com
  method: "GET",
  url: "https://random-data-api.com/api/device/random_device",
})

const responseData = { // create the response body object
  title: data.model,
  price: data.id,
  description: data.manufacturer,
  category: "device"
}

request.body = JSON.stringify(responseData) // set request body to stringified response body object
```

We built a fully encapsulated check that fetches dynamic (random, in this case) test data from an external API and repurposes it for one of our webshop's endpoints.

> There is a huge variety of cases in which setup scripts can be used. Stay tuned for more examples over the coming weeks!

## Read More

<div class="cards-list">
{{< doc-card class="three-column-card" title="Checkly CLI" description="Understand monitoring as code (MaC) via our Checkly CLI." link="/guides/monitoring-as-code-cli/" >}}

{{< doc-card class="three-column-card" title="End to end monitoring" description="Learn end-to-end monitoring with puppeteer and playwright to test key website flows." link="/guides/end-to-end-monitoring/" >}}

{{< doc-card class="three-column-card" title="Monitoring as code" description="Why should the way we manage monitoring be any different?" link="/guides/monitoring-as-code/" >}}
</div>