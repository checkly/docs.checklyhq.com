---
title: Using Constructs
weight: 3
menu:
  docs:
    parent: "CLI"
---

Every resource you create using the Checkly CLI is represented by a "construct": it's a class you import from `@checkly/cli/constructs`,
for instance an `ApiCheck` or `EmailAlertChannel`. A construct is the "as-code" representation of the eventual resource 
created / deleted / updated on the Checkly cloud once you run `npx checkly deploy`.

## Assigning Logical IDs

Assigning a `logicalId` is crucial when creating a construct. Remember the following rules when creating and updating constructs:

1. Every construct needs to have a `logicalId`. This is the first argument when instantiating a class, i.e.
```ts
const check  = new ApiCheck('my-logical-id', { name: 'My API check' })
```
2. Every `logicalId` needs to be unique within the scope of a `Project`. A Project also has a `logicalId`.
3. A `logicalId` can be any string up to 255 characters in length.
4. There is no hard limit on the amount of `Project`'s you can have in your Checkly account.

Behind the scenes, we use the `logicalId` to create a graph of your resources so we know what to persist, update and remove
from our database. Changing the `logicalId` on an existing resource in your code base will tell the Checkly backend that
a resource was removed and a new resource was created.

So, I guess you know now that logical IDs are important!

## Creating an API Check

API checks are used to validate your HTTP based API endpoints. Let's look at the example below as it does a couple of things:

- It defines the basic check properties like `name`, `activated` etc.
- It defines the HTTP method `GET` the `url`.
- It defines an array of assertions to assert the HTTP response status is correct.

```ts
// hello-api.check.ts

import { ApiCheck, AssertionBuilder } from '@checkly/cli/constructs'
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

import { SmsAlertChannel, EmailAlertChannel } from '@checkly/cli/constructs'

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

import { ApiCheck } from '@checkly/cli/constructs'
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


## Further Reading

Make sure to check our [Constructs Reference page](/docs/cli/constructs-reference) for all the details on all the constructs available in the Checkly CLI 
