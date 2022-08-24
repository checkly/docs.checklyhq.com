---
title: Setup & teardown scripts
weight: 12
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

![setup and teardown script for http requests](/docs/images/api-checks/setup-teardown-inline.png)

Both script types are written in JavaScript and have access to popular libraries like moment, axios and lodash. See the full list of available libraries [here](#included-libraries).

{{<info >}}
Setup and teardown scrips have a **maximum execution time of 10 seconds**.
{{</info >}}


## Setup scripts

Setup scripts allow you to process test data and configure API Check requests.

A setup script executes before any requests are made. You have access to a set of [built-in variables](#built-in-variables) to tweak the HTTP request
and a set of [3rd party libraries available in each runtime](/docs/runtimes/specs).

{{<info >}}
Note: any libraries need to be explicitly imported using a `require` statement.
{{</info >}}

### Add custom request configuration

If your API Check's request configuration relies on setup script data, adjust the `request` object.

Common examples are:

- Setting a custom header
- Updating the request URL
- Defining of a cookie

```javascript
// request.headers is a standard Javascript object

// Set a custom header
request.headers['X-Custom-Header'] = 'my value'

// Append a value to the request url
request.url = request.url + '/extra'

// Define a cookie
request.headers['Cookie'] = tokenString
```

### Use environment variables to access values in your API Check request body

If your API Check's request body relies on data evaluated in a setup script, use [environment variables](/docs/api-checks/variables/) to make it accessible.

```javascript
// define a variable that should be accessible in the API Check response body
process.env.MY_VALUE = 'my value'
```

Access your defined environment variables in the API Check request body with `{{MY_VALUE}}` notation.

![Checkly API check editor showing a JSON request body that uses the MY_VALUE environment variable.](/docs/images/api-checks/setup-env-variables.png)

To learn more about setup scripts, [check our setup script examples](/docs/api-checks/setup-script-examples/).

## Teardown scripts

Teardown scripts are run after the HTTP request has finished, but before any assertions are validated. Next to the [request](#request)
and [environment](#environment) objects, teardown scripts also have access to the [response](#response) object. Use teardown scripts to clean up
any created test data or clean up response data that might contain sensitive information you do not want to store on the
Checkly backend.

To learn more about teardown scripts, [check our teardown script examples](/docs/api-checks/teardown-script-examples/).

## Reusable code snippets

To DRY (Don't Repeat Yourself) up your code, we strongly advice you create all setup and teardown scripts as code
snippets. You can create, update and delete code snippets in the 'Code Snippets' section. Snippets are available to all checks.

![reusable code snippets](/docs/images/api-checks/snippets.png)

Once created, just select any snippets from the drop down menu in setup and teardown scripts section of your API check.

![setup and teardown script for http requests with snippets](/docs/images/api-checks/setup-teardown-snippet.png)

It's also possible to import snippets from your setup or teardown scripts. This can be valuable if setup and teardown scripts are similar across checks, but still require some customization. Find more information in the [snippet documentation](/docs/snippets).

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

### General runtime variables

The setup and teardown runtime also exposes a set of generic variables you can use to figure out what 
check, check type etc. you are running. Again, these are accessible by using `process.env.CHECK_NAME` for example.

| property                  | description                                                | type   |
|---------------------------|------------------------------------------------------------|--------|
| `CHECK_NAME`              | The name of the check being executed.                      | String |
| `CHECK_ID`                | The UUID of the check being executed.                      | String |
| `CHECK_TYPE`              | The type of the check being executed, (`API`)              | String |
| `CHECK_RESULT_ID`         | The UUID of the result where the run result will be saved. | String |

## Included libraries

All setup and teardown scripts run in a sandboxed environment on our cloud backend. You do not have full access to the Node.js standard library or to arbitrary NPM modules.

Check out [our runtimes documentation](/docs/runtimes/specs) for a full specification of which modules are included.

## Technical limitations

- Setup and teardown scripts are implicitly wrapped in async function. This means you can always use `await` statements.
- You cannot use nested callbacks as there is no way to determine the callback function. Always use `await` statements.
- You need to include modules and libraries explicitly, e.g. `const moment = require('moment')` before you can use them.
- You can pass a maximum of 256KB of data to and from the check's main request (e.g. using `request.body = data`).
