---
title: Teardown script examples
weight: 2
menu:
  docs:
    parent: "Setup & teardown scripts"
    identifier: teardown-script-examples
---

## Update response status

```javascript
response.statusCode = 201
```

## Perform additional assertions

In certain cases you might want to run additional assertion as part of your teardown script.

```javascript
const expect = require('expect')

expect(response.body).toBe('myString')
```

This can come in handy when the main assertions of the API check are not fine-grained enough, or when you want to assert against a dynamic value. An example could be wanting to assert that the timestamp returned in your response matches today's date:

```javascript
const expect = require('expect')
const moment = require('moment')

const currentDate = moment().format('llll')

expect(response.body.date).toBe(currentDate)
```

## Delete created test data based on response

This is an actual script we use to monitor our own "create API check" API endpoint. It runs after a normal API check where
we POST a JSON blob to the `/accounts/<uuid>/checks` endpoint, which returns the created resource with its ID.
Notice how we reuse the environment variables to pass in credentials and tokens.

```javascript
// explicitly import axios
const axios = require('axios')

// parse the created resource
const createdResource = JSON.parse(response.body)

// setup the correct url and its parameters
const host = 'https://api.checklyhq.com'
const path = '/checks/' + createdResource.id

// set the correct auth headers
const headers = {
  'Authorization': 'Bearer ' + process.env.API_BEARER,
  'X-Checkly-Account': process.env.CHECKLY_ACCOUNT_ID
}

// delete the just created resource using the axios HTTP client
await axios.delete(host + path, { headers })
```

## Update the JSON response body

```javascript
// Parse the body as JSON
const body = JSON.parse(response.body)

// manipulate the object
body.someKey = 1

// store it again as a JSON string
response.body = JSON.stringify(body)
```
