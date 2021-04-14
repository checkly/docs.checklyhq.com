---
title: Setup & teardown scripts
weight: 6
menu:
  docs:
    parent: "API checks"
---

You can tailor each HTTP request made by an API check to your exact situation by using setup and/or teardown scripts.

- **Setup scripts** give you access to properties like the URL, headers and query parameters of the HTTP request as well as 
all environment variables. Popular use cases are signing HMAC requests, requesting tokens and setting up test data.
- **Teardown scripts** give you access to all the same data as the setup scripts plus the response
object, allowing you to read and modify the response. Use cases are cleaning up test data and scrubbing sensitive 
response data for regulatory reasons.

![setup and teardown script for http requests](/docs/images/api-checks/setup-teardown-1.png)

Both script types are written in JavaScript and have access to popular libraries like moment, axios and lodash. See the full list of available libraries [here](#included-libraries).

## Script execution flow

Setup and teardown scripts are executed in a specific order in the Checkly backend. Being aware of this order is important
to get the most out of this feature:

1. Each setup script is executed once per check in a dedicated execution sandbox directly as it is scheduled to run. Any changes you make in the
setup script are distributed to each check run on each data center location.
2. For each configured data center location, the HTTP request of your API check is executed directly followed by the teardown
script. This means your teardown script *can run multiple times!*
3. After the teardown script has run, all results are collected in our central storage.

Both setup and teardown scrips have a **maximum execution time of 10 seconds**.

![setup and teardown script execution](/docs/images/api-checks/setup-teardown-2.png)

 
{{<warning >}}
Setup scripts run once per check. Teardown scripts run on each data center location.
{{</warning >}}

## Setup scripts

Setup scripts allow you to do last minute processing of test data and request options. The scripts are executed before any
requests are made. You have access to a set of [built-in variables](#built-in-variables) so you can tweak the HTTP request 
and a set of [3rd party libraries](#included-third-party-libraries).  
 
Note: any libraries need to be explicitly imported using a 'require' statement.

## Setup script examples

### Add a custom header

```javascript
// request.headers is a standard Javascript object
request.headers['X-Custom-Header'] = 'my value'
```

### Update the URL

```javascript
// append a value to the request url
request.url = request.url + '/extra'
```

### Fetch an external token 

```javascript
// explicitly import axios
const axios = require('axios')

// use 'await' on an axios HTTP get to fetch a token from a location
const { data } = await axios.get('https://example.com/api/token')

// add the token as a query parameters
request.queryParameters['token'] = data.token
```

### Sign an HMAC request

```javascript
// explicitly import libraries
const CryptoJS = require('crypto-js')
const moment = require('moment')

// get keys stored in environment variables
const privateKey = process.env.PRIVATE_KEY
const publicKey = process.env.PUBLIC_KEY

// collect the fields used in signing the request
const method = request.method
const contentType = 'application/json'
const contentMd5 = ''
const url = request.url
const host = 'localhost:8080'
const uri = url.replace(/^.*\/\/[^\/]+/, '')
const timestamp = moment().toISOString()

// create the signature
const signature = [method, contentMd5, contentType, timestamp].join(',\n')
const encryptedSignature = publicKey + ':' + CryptoJS.HmacSHA1(signature, privateKey).toString(CryptoJS.enc.Base64)

// set or update the results as environment variables, to be used in the HTTP request.
process.env.TIMESTAMP = timestamp
process.env.ENCRYPTED_SIGNATURE = encryptedSignature
process.env.CONTENT_TYPE = contentType
```

### Sign an AWS API request

```javascript
// explicitly import libraries
const aws4 = require('aws4')
const axios = require('axios')

// set up AWS request variables
const url = 'https://s3.eu-central-1.amazonaws.com/checkly-private-test/test.txt'
const options = {
  service: 's3',
  region: 'eu-central-1',
  path: '/checkly-private-test/test.txt'
}

// set up AWS credentials
const credentials = {
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID
}

// use the aws4 library to sign the request
const signature = aws4.sign(options, credentials)

// fetch the data and store in an environment variable
const { data } = await axios.get(url, { headers: signature.headers })
process.env.AWS_V4_RESULT = data
```

### fetch an OAuth2 access token using the `client_credentials` grant

This example works great for OAuth2 providers like [Okta](https://www.okta.com/) and [Auth0](https://auth0.com/) that 
provide the "client_credentials" grant type.

```javascript
// we use the request-promise library here as it supports posting Form data.
const requestPromise = require('request-promise')
const btoa = require('btoa')

// grab the necessary credentials set up earlier in your environment variables.
const { ISSUER, TEST_CLIENT_ID, TEST_CLIENT_SECRET, DEFAULT_SCOPE } = process.env

// assemble a token 
const token = btoa(`${TEST_CLIENT_ID}:${TEST_CLIENT_SECRET}`)

// fetch an access token
const { access_token } = await requestPromise({
  uri: `${ISSUER}/v1/token`,
  json: true,
  method: 'POST',
  headers: {
    authorization: `Basic ${token}`,
  },
  form: {
    grant_type: 'client_credentials',
    scope: DEFAULT_SCOPE,
  },
})

// set the Authorization header
request.headers['Authorization'] = `Bearer ${access_token}`
```

### fetch an OAuth2 access token using the `password` grant


This example works great for OAuth2 providers like [Okta](https://www.okta.com/) and [Auth0](https://auth0.com/) that 
provide the "password" grant type. We actually use this one ourselves for monitoring Checkly!

```javascript
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
### create a JWT token using the jsonwebtoken library

```javascript
// we use the jsonwebtoken library as it makes creating JTW's really easy
const jwt = require('jsonwebtoken');

// grab the secret from our environment variables
const secret = process.env.SECRET

// define a helper function to sign the token
const getToken = () => {
  return new Promise((resolve, reject) => {
    jwt.sign({
      expiry: Math.floor(Date.now() / 1000) + (60 * 60), // set the expiry time to 60 minutes
      email: '',
      userId: '',
    }, secret , (err, token) => {
      if(err) return reject(err);
      resolve(token);
    });
  })
}

// create the token
const token = await getToken();

// set the Authorization header
request.headers['Authorization'] = `Bearer ${token}`
```

## Teardown scripts

Teardown scripts are run after the HTTP request has finished, but before any assertions are validated. Next to the [request](#request) 
and [environment](#environment) objects, teardown scripts also have access to the [response](#response) object. Use teardown scripts to clean up
any created test data or clean up response data that might contain sensitive information you do not want to store on the 
Checkly backend.

## Teardown script examples

### update response status

```javascript
response.statusCode = 201
```

### delete created test data based on response

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

### updating the JSON response body

```javascript
// Parse the body as JSON
const body = JSON.parse(response.body)

// manipulate the object
body.someKey = 1

// store it again as a JSON string
response.body = JSON.stringify(body)
```

Note: Remember that teardown scripts run on each configured data center location. 

## Reusable code snippets

To DRY (Don't Repeat Yourself) up your code, we strongly advice you create all setup and teardown scripts as code
snippets. You can create, update and delete code snippets in the 'Code Snippets' section. Snippets are available to all checks.

![reusable code snippets](/docs/images/api-checks/snippets-list.png)

Once created, just select any snippets from the drop down menu in setup and teardown scripts section of your API check.

## Built-in variables

Inside each script, you have access to certain data structures of the API check lifecycle.

### Environment

You have access to all environment variables configured in the variables section on the account page. They are available under `process.env`.

You can create, read, update and delete any of the attributes in this object.

The current data center location the script is running in is exposed as the AWS region code in the `REGION` constant, 
i.e. `eu-west-1` or `us-east-1`

```javascript
// read values and use them for further processing
const myValue = process.env.MY_KEY

// write values
process.env.MY_KEY = myValue + 10

// add a new key/value pair
process.env.NEW_KEY = 'new value'

// remove a key
delete process.env.SOME_OTHER_KEY

// read the current region
const region = process.env.REGION
```

In setup scripts, the modified environment object is used for the subsequent HTTP request. In teardown
script, the modified environment object is just there for informational purposes.

[More about using environment variables](/docs/api-checks/variables/)

### Request

Request properties are exposed a standard Javascript object. This object is available in both setup and teardown scripts.

| property | description | type |
| ------------- | ------------- | --- |
| `request.method`  | The HTTP request method, i.e. 'GET', 'POST' etc. | String |
| `request.url`  | The request URL. Any separately defined query parameters are added at the end.  | String |
| `request.body`  | The request body in string format.  | String  |
| `request.headers`  | The request headers.  | Object |
| `request.queryParameters`  | The request query parameters. | Object | 

### Response

Response properties are exposed a standard Javascript object. These are only available in teardown scripts. 

| property | description | type |
| ------------- | ------------- | ---- |
| `response.statusCode`  | The response status code, i.e. 200 or 404.  | Number |
| `response.statusText`  | The response status text, i.e. 'Ok' or 'Not found'.  | String |
| `response.body`  | The response body in string format. You will need to use `JSON.parse(response.body)` to access JSON responses.| String |
| `response.headers`  | The response headers in the form of a standard Javascript object. | Object |
| `response.timings`  | Various timestamps for the request stage relative to the starting time.  | Object |
| `response.timingPhases`  | Time durations for each request phase. | Object |

## Included libraries

All setup and teardown scripts run in a sandboxed environment on our cloud backend. You do not have full access to the Node.js
standard library or to arbitrary NPM modules. Currently every runner is equipped with the following libraries:

### Built-in modules

- assert
- buffer
- crypto
- path
- querystring
- readline
- stream
- string_decoder
- stream
- timers
- tls
- url
- util
- zlib

See the [built-in module documentation on the official Node.js site](https://nodejs.org/dist/latest-v10.x/docs/api/)

### External modules

- **[aws4](https://github.com/mhart/aws4)** 1.8.0: Third-party library for easily signing AWS API requests.
- **[axios](https://github.com/axios/axios)**  0.18.0: A modern HTTP library. Supports async/await.
- **[btoa](https://www.npmjs.com/package/btoa)** 1.2.1: Binary to base64 encoded ascii. Handy for parsing some response bodies.
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**  8.5.1: Implementation of JSON web tokens. Helps with signing.
- **[crypto-js](https://github.com/brix/crypto-js)** 3.1.9: Cryptographic function library.
- **[lodash](https://lodash.com)** 4.x.x: Javascript toolkit for many object, array and other functions.
- **[moment](https://momentjs.com)** 2.22.2: Popular library for all things time related.
- **[node](https://nodejs.org/docs/latest-v10.x/api/)** 10.x: The general Node.js execution environment.
- **[request](https://github.com/request/request)** 2.88.0: An alternative HTTP client to Axios that supports posting Form data.
- **[request-promise](https://github.com/request/request-promise)** 4.2.2: A plugin for the request library to enable promises.
- **[uuid](https://github.com/kelektiv/node-uuid)** 3.3.3: Simple, fast generation of UUIDS.
- **[expect](https://www.npmjs.com/package/expect)** 26.6.2: The Jest expect assertion library.

## Technical limitations

- Setup and teardown scripts are implicitly wrapped in async function. This means you can always use `await` statements.
- You cannot use nested callbacks as there is no way to determine the callback function. Always use `await` statements.
- You need to include modules and libraries explicitly, e.g. `const moment = require('moment')` before you can use them.
