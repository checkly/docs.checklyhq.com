---
title: Setup and teardown script for API monitoring
description: >-
  TODO
author: Giovanni Rago
avatar: 'images/avatars/giovanni-rago.png'
---

## The importance of self-contained checks

Checks run independently and on different schedules. It is therefore important not to create inter-check dependencies, which could introduce false failures that do not depend on the target system's status. Checkly prevents (or tries to prevent) this antipattern by having each check run fully isolated in its own sandbox.

But then how do we run more complex API checks that might have prerequisites (think auth tokens, test data) that themselves require an API call? That's what [setup and teardown scripts](https://www.checklyhq.com/docs/api-checks/setup-teardown-scripts/) exist for. They run respectively right before and right after the API check's main request (and, in the case of the teardown, just before the check's assertions), and enable us to do any preparation, elaboration and cleanup that might be needed to make our check work according to [best practices](https://www.checklyhq.com/learn/headless/valuable-tests/). 

TODO Rephrase above

## Setup scripts

Setup scripts are where we prepare everything that needs to be in place before the main HTTP request of our check runs. Among the things we can do are:

- HTTP requests to other services (and parsing of the responses)
- encrypt data payloads
- generate unique IDs, timestamps and date strings

? TODO link runtimes for included libraries:L https://www.checklyhq.com/docs/runtimes/specs

In many cases, we will need to pass data we have retrieved, modified or created into the main HTTP request from our setup script. To do this, we have direct access to every field of the `request` object:

| property | description | type |
| ------------- | ------------- | --- |
| `request.method`  | The HTTP request method, i.e. 'GET', 'POST' etc. | String |
| `request.url`  | The request URL. Any separately defined query parameters are added at the end.  | String |
| `request.body`  | The request body in string format.  | String  |
| `request.headers`  | The request headers.  | Object |
| `request.queryParameters`  | The request query parameters. | Object | 

This means we can e.g. set the `Authorization` header of the request programmatically (maybe with a value we have just fetched in the same script) by setting `request.headers['Authorization'] = my_token`, or set the request body content with `request.body = { 'id': 123 }`.

### Prepare test data

A check that is self-contained is responsible for preparing (and cleaning up) all the test data it needs to properly test the target functionality. Let's take a look at an example.

We [use Checkly to monitor Checkly](https://blog.checklyhq.com/how-we-monitor-checkly/)! That means also [our API](https://www.checklyhq.com/docs/api), which includes endpoints for CRUD operations on checks, groups, alert channels and other resources. One of the checks we run verifies that our `DELETE /v1/checks/{id}` works. To verify that we will need a check to actually delete. To keep things nice and clean, we can create a new check in the setup script, then retrieve its ID and pass it to the main HTTP request so we can tell our API exactly which check to delete.

Let's look at the setup script. The first thing we need to do is decide what library we will use for creating our dummy check, then import it. I will use axios.

```js
const axios = require("axios"); // import axios library explicitly
```

The basic axios config will set up a POST request to our [`CREATE CHECK` endpoint](https://www.checklyhq.com/docs/api#operation/postV1Checks) at `https://api.checklyhq.com/v1/checks`. We will set the `Authorization` header to pass our account's API key to authenticate ourselves.

```js
const { data } = await axios({ // create dummy check on checkly
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
const apiKey = process.env.API_KEY

const { data } = await axios({ // create dummy check on checkly
  ...
  headers: {
    Authorization: `Bearer ${apiKey}`
  },
  ...
}
```

Next we specify the body of our axios request, which states how the check we want created for us will look like:

```js
const { data } = await axios({ // create dummy check on checkly
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

The last bit of the script is where we will extract the `id` of the newly created dummy check from the response to our axios request, in order to pass it on to our API check's own HTTP request. Specifically, we will adding the `id` to the target URL, as the target endpoint (`DELETE /v1/checks/{id}`) requires.

```js
const checkId = data.id; // extract dummy check id from response
request.url = request.url + "/" + checkId; // pass check id as path param in check's main http request url
```

Putting everything together, the final result is:

```js
const axios = require("axios"); // import axios library explicitly
const apiKey = process.env.API_KEY;

const { data } = await axios({ // create dummy check on checkly
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

How to monitor api endpoint that needs specific test data always present?
example: delete check endpoint, which deletes an existing check
we need a fresh check ready to be deleted every time
can use setup script to reate fresh one, send back id into new call

### Fetching access tokens

example from: 

```
// we use the request-promise library here as it supports posting Form data.
const requestPromise = require('request-promise')

// grab the necessary credentials set up earlier in your environment variables.
const { ISSUER, USERNAME, PASSWORD, CLIENT_ID, CLIENT_SECRET, AUDIENCE } = process.env
 

// fetch an access token
const { access_token } = await requestPromise({
  uri: `${ISSUER}/oauth/token`,
  json: true,
  method: 'POST',
  form: {
    grant_type: 'password',
    username: USERNAME,
    password: PASSWORD,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    audience: AUDIENCE
  },
})

// set the Authorization header
request.headers['Authorization'] = `Bearer ${access_token}`

```

## Teardown scripts

### Teardown scripts for API checks

modify received data
clean up test data
complex assertions

## conclusion

there a ton more use cases!
see docs: link
if you are still unsure, contact us via support

