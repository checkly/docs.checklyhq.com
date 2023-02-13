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
```js
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

```js
// hello-api.check.js

const { ApiCheck } = require('@checkly/cli/constructs')
const path = require('path')
const { readFileSync } = require('fs')

new ApiCheck('hello-api-1', {
  name: 'Hello API',
  activated: true,
  request: {
    method: 'GET',
    url: 'https://mac-demo-repo.vercel.app/api/hello',
    assertions: [
      { source: 'STATUS_CODE', regex: '', property: '', comparison: 'EQUALS', target: '200' },
    ]
  }
})
```

## Creating and adding an Alert Channel

When a check fails, you want to get alerted. There are two steps to take here:

1. Create one or more alert channels. You can put them in a different file to DRY up your code, i.e. in `alert-channels.js`

```js
// alert-channels.js

const { SmsAlertChannel, EmailAlertChannel } = require('@checkly/cli/constructs')

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

```js
// api.check.js

const { ApiCheck } = require('@checkly/cli/constructs')
const { smsChannel, emailChannel } = require('./alert-channels')

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

## Project

Coming very soon.

## Checks

The CLI currently supports two Check types: API Checks and Browser Checks. All checks share the following common properties:

- `name` : A human readable name for your Check.
- `frequency`: How often to run your check in minutes, i.e. `60` for every hour.
- `locations`: An array of location codes where to run your checks, i.e. `['us-east-1', 'eu-west-1]`.
- `privateLocations`: an array of [Private Locations](https://www.checklyhq.com/docs/private-locations/) slugs, i.e. `['datacenter-east-1]`.
- `activated`: A boolean value if your check is activated or not.
- `muted`: A boolean value if alert notifications from your check are muted, i.e. not sent out.
- `alertChannels`: An array of `AlertChannel` objects to which to send alert notifications.
- `doubleCheck`: A boolean value if Checkly should double check on failure.
- `tags`: An array of tags to help you organize your checks, i.e. `['product', 'api']`
- `runtimeId`: The ID of which [runtime](https://www.checklyhq.com/docs/runtimes/specs/) to use for this check.

Note that most properties have sane default values and do not need to be specified.

### API Checks

API checks are a good fit for monitoring typical HTTP based endpoints like REST APIs and GraphQL APIs, but can also be
used for form encoded payloads. [Read more about API checks in our docs](https://www.checklyhq.com/docs/api-checks/)

- It defines the basic check properties like `name`, `activated` etc.
- It defines the HTTP method `GET` the `url`.
- It sets an extra header in the `headers` array.
- It sets an extra param in the `queryParams` array, although you could add that to the URL directly too.
- It defines an array of assertions to assert the HTTP response status is correct and that the JSON response body
  has a property called `name` by using the [JSON path](https://jsonpath.com/) expression `*.name`
- It runs a **setup script** and **teardown script**, which are just JavaScript files referenced from the same directory.

The file hierarchy looks as follows:

```
├── __checks__
│   ├── hello-api.check.js
│   ├── setup.js
│   ├── teardown.js
```

```js
// hello-api.check.js

const { ApiCheck } = require('@checkly/cli/constructs')
const path = require('path')
const { readFileSync } = require('fs')

new ApiCheck('hello-api-1', {
  name: 'Hello API',
  activated: true,
  localSetupScript: readFileSync(path.join(__dirname, 'setup.js'), 'utf-8'),
  localTearDownScript: readFileSync(path.join(__dirname, 'teardown.js'), 'utf-8'),
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
      { source: 'STATUS_CODE', regex: '', property: '', comparison: 'EQUALS', target: '200' },
      { source: 'JSON_BODY', regex: '', property: '$.name', comparison: 'NOT_EMPTY', target: '' }
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

```js
// setup.js
console.log('this is a setup script')
```

Teardown script are commonly used to clean up any created test data. You can use access the previously executed HTTP request
and [for example delete some resource on your API](https://www.checklyhq.com/docs/api-checks/teardown-script-examples/#delete-created-test-data-based-on-response)

```js
// teardown.js
console.log('this is a teardown script')
```

### Browser Checks

Browser checks are based on [`@playwright/test`](https://playwright.dev/). You can just write `.spec.js|ts` files with test cases
and the Checkly CLI will pick them up and apply some default settings like a name, run locations and run frequency to turn
them into synthetic monitoring checks.

However, you can override these global settings and configure individual Browser checks just like all other built-in check
types. The most important thing is to set the `code.entrypoint` property and point it to your Playwright `.spec.js|ts` file. This property supports relative and absolute paths.

```js
const { BrowserCheck } = require('@checkly/cli/constructs')

new BrowserCheck('browser-check-1', {
  name: 'Browser check #1',
  frequency: 10, // minutes
  regions: ['us-east-1', 'eu-west-1'],
  code: {
    entrypoint: './home.spec.js'
  }
})
```

## Check Groups

You can explicitly organize checks in Check Groups.

This brings the following benefits:

1. Your checks are organized in a folder in the Checkly web UI.
2. You can trigger all checks in a group from the web UI and via a command line trigger.
3. You can manage group-level configuration like the runtime, activated & muted-state, tags and alert channels that trickle
   down to all the checks in the group.

> Note: you will notice that managing shared configuration between checks is very easy just using JS/TS. You might not need
Check Groups for that purpose.

### Adding Checks to a Check Group

You can add a check to a group in two ways.

1. Assign `group.ref()` to the `groupId` property of a Check.
2. For Browser Checks, we allow you to use the `testMatch` glob pattern to include any `.spec.js` file, without having to
   create a `BrowserCheck` construct. This works the same ast the `testMatch` glob at the Project level.

```js
const { CheckGroup, ApiCheck } = require('@checkly/cli/constructs')

const group = new CheckGroup('check-group-1', {
  name: 'Group',
  activated: true,
  tags: ['api-group'],
  concurrency: 10,
  browserChecks: {
    testMatch: '*.spec.js'
  }
})

new ApiCheck('check-group-api-check-1', {
  name: 'API check #1',
  groupId: group.ref(),
  request: {
    method: 'GET',
    url: 'https://mac-demo-repo.vercel.app/api/hello',
  }
})
```

- `name` : A human readable name for your Check Group.
- `concurrency`: A number indicating the amount of concurrent checks to run when a group is triggered.
- `locations`: An array of location codes where to run the checks in the group, i.e. `['us-east-1', 'eu-west-1]`.
- `privateLocations`: An array of [Private Locations](https://www.checklyhq.com/docs/private-locations/) slugs, i.e. `['datacenter-east-1]`.
- `alertChannels`: An array of `AlertChannel` objects to which to send alert notifications.
- `activated`: A boolean value if all the checks in the group are activated.
- `muted`: A boolean value if alert notifications from the checks in the group are muted, i.e. not sent out.
- `tags`: An array of tags. Group tags trickle down to tags on the individual checks. i.e. `['product', 'api']`
- `runtimeId`: The ID of which [runtime](https://www.checklyhq.com/docs/runtimes/specs/) to use for the checks in the group.
- `environmentVariables`: An array of objects defining variables in the group scope, i.e. `[{ key: 'DEBUG', value: 'true' }]`
- `localSetupScript`: Any JS/TS code as a string to run before each API check in this group.
- `localTearDownScript`: Any JS/TS code as a string to run after each API check in this group.
- `apiCheckDefaults`: A set of defaults for API checks. This should not be needed. Just compose shared defaults using JS/TS.
- `browserCheckDefaults`: A set of defaults for API checks. This should not be needed. Just compose shared defaults using JS/TS.

## Alert Channels

Alert channels let you get alert notifications when a Check fails. [Learn more about alerting in our docs](https://www.checklyhq.com/docs/alerting/)
All alert channels share a set of common properties to define when / how they should alert:

- `sendRecovery`: A boolean if you want to receive recovery notifications.
- `sendFailure`: A boolean if you want to receive failure notifications.
- `sendDegrade`: A boolean if you want to receive degraded notifications. These only apply to API checks.
- `sslExpiry`: A boolean if you want to receive a notification when a SSL/TLS certificate expires. This works only for API checks.
- `sslExpiryThreshold`: A number indicating how many days before the certificate expiry date a notification will be triggered.

Alert channels are assigned to Checks and CheckGroups by instantiating a class and adding the resulting object to the
`alertChannels` array.

### SMS Alert Channel

Sends SMS notifications to phone number. Make sure to use standard international notation.

```js
const { SmsAlertChannel } = require('@checkly/cli/constructs'

const smsChannel = new SmsAlertChannel('sms-channel-1', {
  phoneNumber: '0031061234567890',
})
```

[Learn more about SMS alert channels](/docs/alerting/sms-delivery/)

### Email Alert Channel

Sends email notifications to an email address. Only accepts one address, do not use multiple addresses separated by a comma.

```js
const { EmailAlertChannel } = require('@checkly/cli/constructs')

const emailChannel = new EmailAlertChannel('email-channel-1', {
  address: 'alerts@acme.com',
})
```

### Slack Alert Channel

Sends a Slack message to an incoming Slack webhook address. You can specify the target `channel`.

````js

const { SlackAlertChannel } = require('@checkly/cli/constructs')

const slackChannel = new SlackAlertChannel('slack-channel-1', {
  name: 'Slack channel',
  url: 'https://hooks.slack.com/services/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',
  channel: '#ops'
})
````
[Learn more about Slack alert channels](/docs/integrations/slack/)

### Webhook Alert Channel

Sends a webhook to any URL. Webhooks are very powerful and have quite some options. Here is an example that send

```js
const { WebhookAlertChannel } = require('@checkly/cli/constructs')

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
- `method`: A string, either `GET`, `POST`, `PUT`, `PATCH`, `HEAD` or `DELETE` just like an API check.
- `template`: This is commonly a JSON body. You can use Handlebars-style template variables to add custom data to the template.
  
[Learn more about Webhook alert channels and available variables](/docs/alerting/webhooks/)

### Opsgenie Alert Channel

Sends an alert notification to your Opsgenie account.

```js
const { OpsgenieAlertChannel } = require('@checkly/cli/constructs')

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

### Pagerduty Alert Channel

Sends an alert notification to a specific service in your Pagerduty account

```js
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

