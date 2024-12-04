---
title: Using Constructs - Checkly Docs
displayTitle: Using Constructs
navTitle: Using Constructs
weight: 4
menu:
  platform:
    parent: "CLI"
---

Every resource you create using the Checkly CLI is represented by a "construct": it's a class you import from `checkly/constructs`,
for instance an `ApiCheck` or `EmailAlertChannel`. A construct is the "as-code" representation of the eventual resource 
created / deleted / updated on the Checkly cloud once you run `npx checkly deploy`.

## Assigning Logical IDs

Assigning a `logicalId` is crucial when creating a construct. Remember the following rules when creating and updating constructs:

1. Every construct needs to have a `logicalId`. This is the first argument when instantiating a class, i.e.
```ts
const check  = new ApiCheck('my-logical-id', { name: 'My API check' })
```
2. Every `logicalId` needs to be unique within the scope of a `Project`.
3. A `Project` also has a `logicalId`. This needs to be unique within the scope of the Checkly account.
4. A `logicalId` can be any string up to 255 characters in length.
5. There is no hard limit on the amount of `Project`'s you can have in your Checkly account.

Behind the scenes, we use the `logicalId` to create a graph of your resources so we know what to persist, update and remove
from our database. Changing the `logicalId` on an existing resource in your code base will tell the Checkly backend that
a resource was removed and a new resource was created.

When using the Checkly CLI to manage multiple projects and repositories, each project's `logicalId` should be unique within the Checkly account.
The project's `logicalId` is used during the Checkly CLI commands to detect exactly which project is being used.
If multiple projects are using the same project `logicalId`, deploying one project will delete the checks that were deployed by another project.
The project `logicalId` can be configured in the project's [global configuration](/docs/cli/project-structure/#global-configuration).

So, I guess you know now that logical IDs are important!

{{< info >}}
When changing the logical ID of a project you will keep all resources on your Checkly account, unless you run [`npx checkly destroy`](/docs/cli/command-line-reference/#npx-checkly-destroy) to remove the old project.
{{< /info >}}

## Creating an API Check

API checks are used to validate your HTTP based API endpoints. Let's look at the example below as it does a couple of things:

- It defines the basic check properties like `name`, `activated` etc.
- It defines the HTTP method `GET` the `url`.
- It defines an array of assertions to assert the HTTP response status is correct.

```ts
// hello-api.check.ts

import { ApiCheck, AssertionBuilder } from 'checkly/constructs'
const path = require('path')
const { readFileSync } = require('fs')

new ApiCheck('hello-api-1', {
  name: 'Hello API',
  activated: true,
  request: {
    method: 'GET',
    url: 'https://mac-demo-repo.vercel.app/api/hello',
    assertions: [
      AssertionBuilder.statusCode().equals(200)
    ],
  }
})
```

## Creating and adding an Alert Channel

When a check fails, you want to get alerted. There are two steps to take here:

1. Create one or more alert channels. You can put them in a different file to DRY up your code, i.e. in `alert-channels.ts`

```ts
// alert-channels.ts

import { SmsAlertChannel, EmailAlertChannel } from 'checkly/constructs'

const sendDefaults = {
  sendFailure: true,
  sendRecovery: true,
  sendDegraded: false,
}

const smsChannel = new SmsAlertChannel('sms-channel-1', {
  phoneNumber: '0031061234567890',
  ...sendDefaults
})

const emailChannel = new EmailAlertChannel('email-channel-1', {
  address: 'alerts@acme.com',
  ...sendDefaults
})

module.exports = {
  smsChannel,
  emailChannel
}
```

2. Now you can import these channels into one or more checks by passing the objects into the `alertChannels` array:

```ts
// api.check.ts

import { ApiCheck } from 'checkly/constructs'
import { smsChannel, emailChannel } from './alert-channels'

new ApiCheck('hello-api-1', {
  name: 'Hello API',
  alertChannels: [smsChannel, emailChannel],
  request: {
    method: 'GET',
    url: 'https://mac-demo-repo.vercel.app/api/hello',
  }
})
```
## Using the Constructs API

All resources you can create and manage using the Checkly CLI are derived from "constructs". These constructs are just
[TypeScript classes](https://github.com/checkly/checkly-cli/tree/main/packages/cli/src/constructs) like `ApiCheck` in `api-check.ts` and
`SlackAlertChannel` in `slack-alert-channel.ts`.

You can use standard JS/TS programming to use these constructs to create the monitoring setup of your
choice. Loops, variables, if-statements, file imports, extensions etc.

### Using ECMAScript modules files (experimental)

If your project uses ECMAScript modules files, you can specify `type: "module"` in your `package.json` file or use `.mjs` file extensions. ECMAScript modules files can be used to create resources or as check's script dependencies.

> Note that `__dirname` and `__filename` don't exist in ECMAScript so you have to adapt your setup/teardown script references using relative paths.
> Also, as the setup/teardown script dependencies are run under a sandboxed environment, you must use CommonJS (or TypeScript project) for all the second-level dependencies for API and Browser checks.

#### Example using top-level `await` supported in ECMAScript

```js
// __checks__/api.check.mjs
import { ApiCheck, AssertionBuilder } from 'checkly/constructs'
console.log('Fetching endpoints list from the database')
// top-level-await available
const getEndpointFromDB = await Promise.resolve([
  {
    id: 'fetch-books-check',
    name: 'Fetch Book List',
    url: 'https://danube-web.shop/api/books',
    method: 'GET',
  },
  {
    id: 'fetch-book-check',
    name: 'Fetch a Book',
    url: 'https://danube-web.shop/api/books/1',
    method: 'GET',
  }
])
getEndpointFromDB.forEach(endpoint => new ApiCheck(endpoint.id, {
  name: endpoint.name,
  setupScript: {
    // relative reference to the file (__dirname not available in ECMAScript)
    entrypoint: './utils/setup.mjs'
  },
  request: {
    url: endpoint.url,
    method: endpoint.method,
    followRedirects: true,
    skipSSL: false,
    assertions: [
      AssertionBuilder.statusCode().equals(200),
    ],
  }
})
)

// __checks__/utils/setup.mjs
import { getToken } from './auth-client.mjs'
// top-level-await available
request.headers['X-My-Auth-Header'] = await getToken()

// __checks__/utils/auth-client.mjs
// top-level-await is NOT available in second-level script dependencies
export async function getToken () {
  console.log('Fetching a token from an imaginary auth API endpoint')
  const token = await new Promise(resolve => { return resolve('abc123') })
  return token
}
```

## Further Reading

Make sure to check our [Constructs Reference page](/docs/cli/constructs-reference) for all the details on all the constructs available in the Checkly CLI 
