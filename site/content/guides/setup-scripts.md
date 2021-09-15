---
title: Setup and teardown script for API monitoring
description: >-
  TODO
author: Giovanni Rago
avatar: 'images/avatars/giovanni-rago.png'
---

## The importance of self-contained checks

Checks run independently and on different schedules. It is therefore important not to create inter-check dependencies, which could introduce false failures that do not depend on the target system's status. Checkly prevents (or tries to prevent) this antipattern by having each check run fully isolated in its own sandbox.

But then how do we run more complex API checks that might have prerequisites (think auth tokens, test data) that themselves require an API call? That's what [setup and teardown script]() exist for. They run respectively right before and right after the API check's main request (and, in the case of the teardown, just before the check's assertions), and enable us to do any preparation, elaboration and cleanup that might be needed to make our check work according to [best practices](). 

TODO Rephrase above, links

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

We [use Checkly to monitor Checkly](https://blog.checklyhq.com/how-we-monitor-checkly/)! 
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
