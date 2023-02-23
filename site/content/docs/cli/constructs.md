---
title: Using Constructs
weight: 3
menu:
  docs:
    parent: "CLI"
---

Every resource you create using the Checkly CLI is represented by a "construct": it's a class you import from `@checkly/cli/constructs`.
A construct is the "as-code" representation of the eventual resource created / deleted / updated on the Checkly cloud once
you run `npx checkly deploy`.

Remember the following rules when creating and updating constructs:

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

1. Create one or more alert channels. You can put them in a different file to DRY up your code, i.e. in `alert-channels.js`

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

# Using the Constructs API

All resources you can create and manage using the Checkly CLI are derived from "constructs". These constructs are just
[TypeScript classes](https://github.com/checkly/checkly-cli/tree/main/packages/cli/src/constructs) like `ApiCheck` in `api-check.ts` and
`SlackAlertChannel` in `slack-alert-channel.ts`.

You can use standard JS/TS programming to use these constructs to create the monitoring setup of your
choice. Loops, variables, if-statements, file imports, extensions etc.

## `Project`

A `Project` defines core settings and defaults for the CLI and other constructs like Checks. In many cases, you can just
use set defaults for your Checks in the `checks` property and override them occasionally at the Check or CheckGroup level. 

```ts
import { defineConfig } from '@checkly/cli'

export default defineConfig({
  projectName: 'Website Monitoring',
  logicalId: 'website-monitoring-1',
  repoUrl: 'https://github.com/acme/website',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10',
    frequency: 5,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website', 'api'],
    alertChannels: [],
    checkMatch: '**/__checks__/*.check.ts',
    ignoreDirectoriesMatch: [],
      browserChecks: {
      frequency: 10,
      testMatch: '**/__checks__/*.spec.ts',
    },
  },
  cli: {
    runLocation: 'eu-west-1',
    privateRunLocation: 'private-dc1'
  }
})
```

- `projectName` : A friendly name for your Project.
- `logicalId` : A unique identifier for this Project. Like all logical ID's, this should be stable.
- `repoUrl` : An optional URL to a Git repository.

- `checks`: Top-level defaults for all Checks in this Project. If not overridden at the Check or CheckGroup level, these
settings apply to your Checks. Takes all [Check properties](#check)
  - `checkMatch`: A glob pattern where the CLI should look for files containing Check constructs. For more info check [the
    dedicated docs on checkMatch and testMatch](/docs/cli/using-check-test-match/)
  - `ignoreDirectoriesMatch`: An array of glob patterns which directories should be ignored by the `checkMatch` property.
  - `browserChecks`: Top-level defaults specifically for Browser Checks generated by a glob match pattern. All [Check properties](#check)
  are valid here.
    - `testMatch`: Glob pattern where the CLI looks for Playwright test files, i.e. all `.spec.ts` files. For more info check [the 
dedicated docs on checkMatch and testMatch](/docs/cli/using-check-test-match/)

- `cli`: Defaults for CLI commands.  
  - `runLocation`: The default run location when running `npx checkly test`.
  - `privateRunLocation`: The default private run location when running `npx checkly test`.

## `Check`

The CLI currently supports two Check types: API Checks and Browser Checks. All checks share the following common properties
derived from the abstract class `Check`.

- `name` : A friendly name for your Check.
- `frequency`: How often to run your Check in minutes, i.e. `60` for every hour.
- `locations`: An array of location codes where to run your Checks, i.e. `['us-east-1', 'eu-west-1]`.
- `privateLocations`: an array of [Private Locations](https://www.checklyhq.com/docs/private-locations/) slugs, i.e. `['datacenter-east-1]`.
- `activated`: A boolean value if your Check is activated or not.
- `muted`: A boolean value if alert notifications from your Check are muted, i.e. not sent out.
- `group`: The `CheckGroup` object that this check is part of.
- `alertChannels`: An array of `AlertChannel` objects to which to send alert notifications.
- `doubleCheck`: A boolean value if Checkly should double check on failure.
- `tags`: An array of tags to help you organize your Checks, i.e. `['product', 'api']`
- `runtimeId`: The ID of which [runtime](https://www.checklyhq.com/docs/runtimes/specs/) to use for this Check.
- `testOnly`: A boolean determining if the Check is available only when `test` runs and not included when `deploy` is executed.

Note that most properties have sane default values and do not need to be specified.

## `ApiCheck`

API Checks are a good fit for monitoring typical HTTP based endpoints like REST APIs and GraphQL APIs, but can also be
used for form encoded payloads. [Read more about API checks in our docs](https://www.checklyhq.com/docs/api-checks/)

The examples below does the following:

- It defines the basic Check properties like `name`, `activated` etc.
- It defines the HTTP method `GET` and the `url`.
- It sets an extra header in the `headers` array.
- It sets an extra param in the `queryParams` array, although you could add that to the URL directly too.
- It defines an array of assertions using the `AssertionBuilder` to assert that:
  - the HTTP response status is `200` 
  - the JSON response body has a property called `name` by using the [JSON path](https://jsonpath.com/) expression `$.name`
  - the `strict-transport-security` response header's `max-age` property has a value greater than 100000.
- It runs a **setup script** and **teardown script**, which are just JavaScript files referenced from the same directory.

The file hierarchy looks as follows:

```
├── __checks__
│   ├── hello-api.check.js
│   ├── setup.js
│   ├── teardown.js
```

```ts
// hello-api.check.ts

import { ApiCheck, AssertionBuilder } from '@checkly/cli/constructs'
import * as path from 'path'
import { readFileSync } from 'fs'

new ApiCheck('hello-api-1', {
  name: 'Hello API',
  activated: true,
  localSetupScript: readFileSync(path.join(__dirname, 'setup.ts'), 'utf-8'),
  localTearDownScript: readFileSync(path.join(__dirname, 'teardown.ts'), 'utf-8'),
  request: {
    method: 'GET',
    url: 'https://mac-demo-repo.vercel.app/api/hello',
    skipSsl: false,
    followRedirects: true,
    headers: [
      {
        key: 'X-My-Header',
        value: 'My custom header value'
      }
    ],
    queryParams: [
      {
        key: 'myParam',
        value: 'true'
      }
    ],
    assertions: [
        AssertionBuilder.statusCode().equals(200),
        AssertionBuilder.jsonBody('$.name').notEmpty(),
        AssertionBuilder.headers('strict-transport-security', 'max-age=(\\d+)').greaterThan(10000),
    ]
  }
})
```

The setup script just has a placeholder `console.log()` statement, but you can do a ton off stuff for authentication, overriding
headers or other parts of the eventual HTTP request. Check our docs for examples like:

- [Fetching an OAuth2 token](https://www.checklyhq.com/docs/api-checks/setup-script-examples/#fetch-an-oauth2-access-token-using-the-client_credentials-grant)
- [Sign an AWS API request](https://www.checklyhq.com/docs/api-checks/setup-script-examples/#sign-an-aws-api-request)
- [Sign a HMAC request](https://www.checklyhq.com/docs/api-checks/setup-script-examples/#sign-an-hmac-request)
- [Create a JWT token](https://www.checklyhq.com/docs/api-checks/setup-script-examples/#create-a-jwt-token-using-the-jsonwebtoken-library)
- [Dismiss a Vercel password prompt](https://www.checklyhq.com/docs/api-checks/setup-script-examples/#dismiss-password-protection-prompt-on-vercel-deployment)

```ts
// setup.ts
console.log('this is a setup script')
```

Teardown script are commonly used to clean up any created test data. You can use access the previously executed HTTP request
and [for example delete some resource on your API](https://www.checklyhq.com/docs/api-checks/teardown-script-examples/#delete-created-test-data-based-on-response)

```ts
// teardown.ts
console.log('this is a teardown script')
```

### `AssertionBuilder`

To define `assertions` for the `request` of an `ApiCheck` you should use the `AssertionBuilder`. The `AssertionBuilder` provides a fluent 
API for the otherwise slightly cryptic JSON object that the CLI passes to the Checkly API. Here are some examples:


- Asserting an HTTP status code.
```ts
AssertionBuilder.statusCode().equals(200)
// renders to a JSON string 
"{ source: 'STATUS_CODE', regex: '', property: '', comparison: 'EQUALS', target: '200' }"
```

- Asserting a part of a JSON response body using a JSON path expression. [Learn more about using JSON path]((/docs/api-checks/assertions/#json-responses-with-json-path)).
```ts
AssertionBuilder.statusCode().equals(200)
// renders to a JSON string 
"{ source: 'STATUS_CODE', regex: '', property: '', comparison: 'EQUALS', target: '200' }"
```

- Asserting the value of a part of an HTTP response header. Note that you can pass in a regex as the second argument.
```ts
AssertionBuilder.headers('strict-transport-security', 'max-age=(\\d+)').greaterThan(10000),
// renders to a JSON string 
"{ source: 'HEADERS', regex: 'max-age=(\d+)', property: 'strict-transport-security', comparison: 'GREATER_THAN', target: '100000' }"
```

The `AssertionBuilder` defines the following sources as an entry to building an assertion. 

- `statusCode()`: Assert the HTTP status code for the HTTP request, e.g. `200` or `404`.
- `jsonBody(property?)`: Assert the JSON response body. Accepts a [JSON path expression](/docs/api-checks/assertions/#json-responses-with-json-path) as the `property` argument. 
- `textBody()`: Assert the body as raw text.
- `headers(propery?, regex?)`: Assert a set of response headers, takes the header name as the `property` argument and a `regex` to tease out a string from the header value. 
- `responseTime()`: Assert the total response time of the HTTP request.

Read more about assertions in [our docs on API check assertions](/docs/api-checks/assertions/).

## `BrowserCheck`

Browser Checks are based on [`@playwright/test`](https://playwright.dev/). You can just write `.spec.js|ts` files with test cases
and the Checkly CLI will pick them up and apply some default settings like a name, run locations and run frequency to turn
them into synthetic monitoring Checks.

However, you can override these global settings and configure individual Browser Checks just like all other built-in Check
types. The most important thing is to set the `code.entrypoint` property and point it to your Playwright `.spec.js|ts` file. This property supports relative and absolute paths.

```ts
import { BrowserCheck } from '@checkly/cli/constructs'

new BrowserCheck('browser-check-1', {
  name: 'Browser check #1',
  frequency: 10, // minutes
  regions: ['us-east-1', 'eu-west-1'],
  code: {
    entrypoint: './home.spec.js'
  }
})
```

## `CheckGroup`

You can explicitly organize Checks in Check Groups.

This brings the following benefits:

1. Your Checks are organized in a folder in the Checkly web UI.
2. You can trigger all Checks in a group from the web UI and via a command line trigger.
3. You can manage group-level configuration like the runtime, activated & muted-state, tags and alert channels that trickle
   down to all the Checks in the group.

> Note: you will notice that managing shared configuration between Checks is very easy just using JS/TS. You might not need
Check Groups for that purpose.

#### Adding Checks to a Check Group

You can add a Check to a group in two ways.

1. By passing the `CheckGroup` object for the `group` property of a Check.
2. For Browser Checks, we allow you to use the `testMatch` glob pattern to include any `.spec.js|ts` file, without having to
   create a `BrowserCheck` construct. This works the same ast the `testMatch` glob at the Project level.

```ts
import { CheckGroup, ApiCheck } from '@checkly/cli/constructs'

const group = new CheckGroup('check-group-1', {
  name: 'Group',
  activated: true,
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['api-group'],
  concurrency: 10,
  browserChecks: {
    testMatch: '*.spec.js'
  }
})

new ApiCheck('check-group-api-check-1', {
  name: 'API check #1',
  group,
  request: {
    method: 'GET',
    url: 'https://mac-demo-repo.vercel.app/api/hello',
  }
})
```

- `name` : A friendly name for your Check Group.
- `concurrency`: A number indicating the amount of concurrent Checks to run when a group is triggered.
- `locations`: An array of location codes where to run the Checks in the group, i.e. `['us-east-1', 'eu-west-1]`.
- `privateLocations`: An array of [Private Locations](https://www.checklyhq.com/docs/private-locations/) slugs, i.e. `['datacenter-east-1]`.
- `alertChannels`: An array of `AlertChannel` objects to which to send alert notifications.
- `activated`: A boolean value if all the Checks in the group are activated.
- `muted`: A boolean value if alert notifications from the Checks in the group are muted, i.e. not sent out.
- `tags`: An array of tags. Group tags trickle down to tags on the individual Checks. i.e. `['product', 'api']`
- `runtimeId`: The ID of which [runtime](https://www.checklyhq.com/docs/runtimes/specs/) to use for the Checks in the group.
- `environmentVariables`: An array of objects defining variables in the group scope, i.e. `[{ key: 'DEBUG', value: 'true' }]`
- `localSetupScript`: Any JS/TS code as a string to run before each API Check in this group.
- `localTearDownScript`: Any JS/TS code as a string to run after each API Check in this group.
- `apiCheckDefaults`: A set of defaults for API Checks. This should not be needed. Just compose shared defaults using JS/TS.
- `browserCheckDefaults`: A set of defaults for API Checks. This should not be needed. Just compose shared defaults using JS/TS.

## `AlertChannel`

Alert channels let you get alert notifications when a Check fails. [Learn more about alerting in our docs](https://www.checklyhq.com/docs/alerting/)
All alert channels share a set of common properties to define when / how they should alert derived from the abstract class
`AlertChannel`

- `sendRecovery`: A boolean if you want to receive recovery notifications.
- `sendFailure`: A boolean if you want to receive failure notifications.
- `sendDegrade`: A boolean if you want to receive degraded notifications. These only apply to API Checks.
- `sslExpiry`: A boolean if you want to receive a notification when a SSL/TLS certificate expires. This works only for API Checks.
- `sslExpiryThreshold`: A number indicating how many days before the certificate expiry date a notification will be triggered.

Alert channels are assigned to Checks and CheckGroups by instantiating a class and adding the resulting object to the
`alertChannels` array.

> Note that alert channels are only deployed to your Checkly account when referenced explicitly in the `alertChannels` 
property of a Project, CheckGroup or Check.

## `SMSAlertChannel`

Sends SMS notifications to phone number. Make sure to use standard international notation.

```ts
import { SmsAlertChannel } from '@checkly/cli/constructs'

const smsChannel = new SmsAlertChannel('sms-channel-1', {
  phoneNumber: '0031061234567890',
})
```

[Learn more about SMS alert channels](/docs/alerting/sms-delivery/)

## `EmailAlertChannel`

Sends email notifications to an email address. Only accepts one address, do not use multiple addresses separated by a comma.

```ts
import { EmailAlertChannel } from '@checkly/cli/constructs'

const emailChannel = new EmailAlertChannel('email-channel-1', {
  address: 'alerts@acme.com',
})
```

## `SlackAlertChannel`

Sends a Slack message to an incoming Slack webhook address. You can specify the target `channel`.

````ts

import { SlackAlertChannel } from '@checkly/cli/constructs'

const slackChannel = new SlackAlertChannel('slack-channel-1', {
  name: 'Slack channel',
  url: 'https://hooks.slack.com/services/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',
  channel: '#ops'
})
````
[Learn more about Slack alert channels](/docs/integrations/slack/)

## `WebhookAlertChannel`

Sends a webhook to any URL. Webhooks are very powerful and have quite some options. Here is an example that send

```ts
import { WebhookAlertChannel } from '@checkly/cli/constructs'

const webhookChannel = new WebhookAlertChannel('webhook-channel-1', {
  name: 'Pushover webhook',
  method: 'POST',
  url: 'https://api.pushover.net/1/messages.json',
  template: `{
    "token":"FILL_IN_YOUR_SECRET_TOKEN_FROM_PUSHOVER",
    "user":"FILL_IN_YOUR_USER_FROM_PUSHOVER",
    "title":"{{ALERT_TITLE}}",
    "html":1,
    "priority":2,
    "retry":30,
    "expire":10800,
    "message":"{{ALERT_TYPE}} {{STARTED_AT}} ({{RESPONSE_TIME}}ms) {{RESULT_LINK}}"
  }`
})
```
- `url`: The URL where to send the webhook HTTP request.
- `method`: A string, either `GET`, `POST`, `PUT`, `PATCH`, `HEAD` or `DELETE` just like an API Check.
- `template`: This is commonly a JSON body. You can use Handlebars-style template variables to add custom data to the template.
  
[Learn more about Webhook alert channels and available variables](/docs/alerting/webhooks/)

## `OpsgenieAlertChannel`

Sends an alert notification to your Opsgenie account.

```ts
import { OpsgenieAlertChannel } from '@checkly/cli/constructs'

const opsGenieChannel = new OpsgenieAlertChannel('opsgenie-channel-1', {
  name: 'My Ops Team',
  region: 'EU',
  priority: 'P1',
  apiKey: 'xxxx123abc'
})
```

- `name`: Friendly name to recognise the integration.
- `region`: A string representing the Opsgenie location, either `EU` or `US`.
- `priority`: A string representing the severity level, `P1` to `P5`.
- `apiKey`: An API key for your Opsgenie account. 

[Learn more about Opsgenie alert channels](/docs/integrations/opsgenie/)

## `PagerdutyAlertChannel`

Sends an alert notification to a specific service in your Pagerduty account

```ts
import { PagerdutyAlertChannel } from '@checkly/cli/constructs'

const pagerdutyChannel = new PagerdutyAlertChannel('pagerduty-channel-1', {
  account: 'ACME',
  serviceName: 'ACME products',
  serviceKey: '872b9b58ff4a9n06d0dl9f20487bbqwew'
})
 ```

- `account`: The name of your Pagerduty account.
- `serviceName`: The name of your service defined in Pagerduty under which the alerts should be nested.
- `serviceKey`: The API key created by installing the Checkly integration in Pagerduty. We advise you to [install the
  Pagerduty alert channel first from our UI](https://app.checklyhq.com/alerts/settings/channels/new/pagerduty) to grab
  the `serviceKey`.

[Learn more about Pagerduty alert channels](/docs/integrations/pagerduty/)

