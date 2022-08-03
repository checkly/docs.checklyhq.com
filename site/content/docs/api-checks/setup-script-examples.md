---
title: Setup script examples
weight: 1
menu:
  docs:
    parent: "Setup & teardown scripts"
    identifier: setup-script-examples
---

## Fetch an external token

```javascript
// explicitly import axios
const axios = require('axios')

// use 'await' on an axios HTTP get to fetch a token from a location
const { data } = await axios.get('https://example.com/api/token')

// add the token as a query parameters
request.queryParameters['token'] = data.token
```

## Sign an HMAC request

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

## Sign an AWS API request

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

## Fetch an OAuth2 access token using the `client_credentials` grant

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

## Fetch an OAuth2 access token using the `password` grant

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
## Create a JWT token using the jsonwebtoken library

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

## Parse XML/SOAP data

To parse XML and potentially prepare a SOAP API Check, fetch the API data, parse the XML and store the parsed value in an environment variable to make it accessible in an API Check request body.

```javascript
const axios = require("axios").default

// Make an XML request
const { data } = await axios.post(
  "https://www.dataaccess.com/webservicesserver/NumberConversion.wso",
  `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
            <ubiNum>42</ubiNum>
          </NumberToWords>
        </soap:Body>
    </soap:Envelope>
  `,
  {
    headers: {
      "content-type": "text/xml; charset=utf-8",
    },
  }
)

// Parse the value you're interested in
const regExp = /<m:NumberToWordsResult>(.*?)<\/m:NumberToWordsResult>/g
const result = regExp.exec(data)

if (result.length > 1) {
  // Store it in an environment variable to access it in your API Check request body
  process.env.NUMBER_TO_WORD_RESULT = result[1]
} else {
  throw new Error("Could not parse XML")
}
```

## Dismiss password-protection prompt on Vercel deployment

[Password-protected Vercel Deployments](https://vercel.com/blog/protecting-deployments) can be [bypassed programmatically](https://vercel.com/docs/platform/frequently-asked-questions#bypassing-password-protection-programmatically). The following script allows a check to run against both production and preview deployments while skipping the password prompt. Note that if only one of your deployments (e.g. the preview) is password-protected, you will want to skip the request via an _if_ statement to handle the other cases.

```javascript
const req = require('request-promise')

const productionUrl = process.env.PROD_URL
const vercelDeploymentPassword = process.env.PASSWORD_VERCEL

const url = process.env.ENVIRONMENT_URL || productionUrl

const options = {
  uri: url,
  simple: false,
  resolveWithFullResponse: true
};
try {
  const response = await req.post(options).form({_vercel_password: vercelDeploymentPassword})
  const token = response.headers['set-cookie']
  const tokenString = token.toString().split(';')[0]
  request.headers['Cookie'] = tokenString
} catch(error) {
  console.log(error)
}
```
