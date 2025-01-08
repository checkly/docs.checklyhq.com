---
title: API setup script examples - Checkly Docs
displayTitle: API setup script examples
navTitle: Setup script examples
weight: 1
menu:
  resources:
    parent: "Setup & teardown scripts"
    identifier: setup-script-examples

---

Here are some examples on how to address common authentication use cases with setup scripts. 

> Using Vercel deployment protection? Read [this section](/docs/cicd/vercel-deployment-protection/) on how to make this work with Checkly.

## Fetch an external token

{{< tabs "fetch token" >}}
{{< tab "TypeScript" >}}
```ts
import { axios } from 'axios'

// use 'await' on an axios HTTP get to fetch a token from a location
const { data } = await axios.get('https://example.com/api/token')

// add the token as a query parameters
request.queryParameters['token'] = data.token
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const axios = require('axios')

// use 'await' on an axios HTTP get to fetch a token from a location
const { data } = await axios.get('https://example.com/api/token')

// add the token as a query parameters
request.queryParameters['token'] = data.token
```
{{< /tab >}}
{{< /tabs >}}

## Sign an HMAC request

{{< tabs "hmac" >}}
{{< tab "TypeScript" >}}
```ts
import CryptoJS from 'crypto-js'
import moment from 'moment'

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
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
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
{{< /tab >}}
{{< /tabs >}}


## Sign an AWS API request

{{< tabs "aws" >}}
{{< tab "TypeScript" >}}
```ts
import aws4 from 'aws4'
import axios from 'axios'

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
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const aws4 = require('aws4')
const axios = require('axios').default

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
{{< /tab >}}
{{< /tabs >}}

## Fetch an OAuth2 access token using the `client_credentials` grant

This example works great for OAuth2 providers like [Okta](https://www.okta.com/) and [Auth0](https://auth0.com/) that
provide the "client_credentials" grant type.

{{< tabs "client_credentials" >}}
{{< tab "TypeScript" >}}
```ts
import axios from 'axios'

// grab the necessary credentials set up earlier in your environment variables.
const { AUDIENCE, CLIENT_SECRET, CLIENT_ID, ISSUER } = process.env;

// fetch an access token
const { data: { access_token } } = await axios.post(`${ISSUER}/oauth/token`,
    {
      grant_type: "client_credentials",
      client_id: `${CLIENT_ID}`,
      client_secret: `${CLIENT_SECRET}`,
      audience: `${AUDIENCE}`,
    },
    {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    }
)

// set the Authorization header
request.headers['Authorization'] = `Bearer ${access_token}`
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const axios = require('axios')

// grab the necessary credentials set up earlier in your environment variables.
const { AUDIENCE, CLIENT_SECRET, CLIENT_ID, ISSUER } = process.env;

// fetch an access token
const { data: { access_token } } = await axios.post(`${ISSUER}/oauth/token`,
  {
    grant_type: "client_credentials",
    client_id: `${CLIENT_ID}`,
    client_secret: `${CLIENT_SECRET}`,
    audience: `${AUDIENCE}`,
  },
  {
    headers: { "content-type": "application/x-www-form-urlencoded" }
  }
)

// set the Authorization header
request.headers['Authorization'] = `Bearer ${access_token}`
```
{{< /tab >}}
{{< /tabs >}}


## Fetch an OAuth2 access token using the `password` grant

This example works great for OAuth2 providers like [Okta](https://www.okta.com/) and [Auth0](https://auth0.com/) that
provide the "password" grant type. We actually use this one ourselves for monitoring Checkly!


{{< tabs "oauth password" >}}
{{< tab "TypeScript" >}}
```ts
import axios from "axios";

// grab the necessary credentials set up earlier in your environment variables.
const { AUDIENCE, CLIENT_SECRET, CLIENT_ID, ISSUER, USERNAME, PASSWORD, SCOPE } = process.env;

// fetch an access token
const { data: { access_token } } = await axios.post(`${ISSUER}/oauth/token`,
    {
        grant_type: 'password',
        username: `${USERNAME}`,
        password: `${PASSWORD}`,
        audience: `${AUDIENCE}`,
        scope: `${SCOPE}`,
        client_id: `${CLIENT_ID}`,
        client_secret: `${CLIENT_SECRET}`
    },
    {
        headers: { "content-type": "application/x-www-form-urlencoded" }
    }
)

// set the Authorization header
request.headers['Authorization'] = `Bearer ${access_token}`
```

{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const axios = require('axios')

// grab the necessary credentials set up earlier in your environment variables.
const { AUDIENCE, CLIENT_SECRET, CLIENT_ID, ISSUER, USERNAME, PASSWORD, SCOPE } = process.env;

// fetch an access token
const { data: { access_token } } = await axios.post(`${ISSUER}/oauth/token`,
    {
      grant_type: 'password',
      username: `${USERNAME}`,
      password: `${PASSWORD}`,
      audience: `${AUDIENCE}`,
      scope: `${SCOPE}`,
      client_id: `${CLIENT_ID}`,
      client_secret: `${CLIENT_SECRET}`
    },
    {
        headers: { "content-type": "application/x-www-form-urlencoded" }
    }
)

// set the Authorization header
request.headers['Authorization'] = `Bearer ${access_token}`
```
{{< /tab >}}
{{< /tabs >}}


## Create a JWT token using the jsonwebtoken library

{{< tabs "jwt" >}}
{{< tab "TypeScript" >}}
```ts
// we use the jsonwebtoken library as it makes creating JTW's really easy
import jwt from 'jsonwebtoken'

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
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
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
{{< /tab >}}
{{< /tabs >}}



## Parse XML/SOAP data

To parse XML and potentially prepare a SOAP API Check, fetch the API data, parse the XML and store the parsed value in an environment variable to make it accessible in an API Check request body.

{{< tabs "xml" >}}
{{< tab "TypeScript" >}}
```ts
import axios from 'axios'

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
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const axios = require('axios').default

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
{{< /tab >}}
{{< /tabs >}}
