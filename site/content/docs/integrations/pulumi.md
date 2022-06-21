---
title: Pulumi
weight: 67
menu:
  docs:
    parent: "Integrations"
---

You can use [Pulumi](https://www.pulumi.com/registry/packages/checkly/) to create and manage your checks. 

> See our dedicated section on the [Checkly Pulumi provider](https://www.pulumi.com/registry/packages/checkly/) for more 
> information on [installation](https://www.pulumi.com/registry/packages/checkly/installation-configuration/) and all the [supported resources](https://www.pulumi.com/registry/packages/checkly/api-docs/)

## Example: Creating checks, check group and alert channels

Here is a short example of how to use Javascript and/or Typescript for creating checks, adding them to a group and configuring
email and Slack alert channels. This should give you a good idea of what is possible with the Checkly Pulumi provider.


```ts
import * as checkly from "@checkly/pulumi"

// Some variables we can reuse in checks and check groups
const locations = ['eu-west-1', 'us-west-2']
const tags = ['pulumi']

// Alert channels are defined up front so we can add them to checks and check groups later.
const emailChannel = new checkly.AlertChannel("my-email-channel", {
    email: {
        address: 'your@email.com'
    }
})

const slackChannel = new checkly.AlertChannel("my-slack-channel", {
    slack: {
        url: 'https://hooks.slack.com/services/<REPLACE_WITH_ACTUAL_SLACK_HOOK>',
        channel: '#alerts',
    }
})

// We create a group, add the tags, locations and alert channels.
const group = new checkly.CheckGroup("my-group", {
    name: 'Check Group #1',
    activated: true,
    concurrency: 1,
    apiCheckDefaults: {},
    locations,
    tags,
    useGlobalAlertSettings: true,
    alertChannelSubscriptions: [
        {
            activated: true,
            channelId: slackChannel.id.apply((id: string) => parseInt(id)),
        },
        {
            activated: true,
            channelId: emailChannel.id.apply((id: string) => parseInt(id))
        }
    ]
})

// Our first Browser check is added to group created above and uses the Playwright script.
new checkly.Check("my-browser-check", {
    name: "Google.com Playwright check",
    activated: true,
    frequency: 10,
    type: "BROWSER",
    groupId: group.id.apply((id: string) => parseInt(id)),
    script: `const { chromium } = require('playwright')
            async function run () {
              const browser = await chromium.launch()
              const page = await browser.newPage()
            
              const response = await page.goto('https://google.com')
            
              if (response.status() > 399) {
                throw new Error('Failed with response code ${response.status()}')
              }
            
              await page.screenshot({ path: 'screenshot.jpg' })
            
              await page.close()
              await browser.close()
            }
            
            run()`,
    locations,
    tags
})

const setupSnippet = new checkly.Snippet('my-snippet', {
    name: 'set-header',
    script: `request.headers['X-Custom-Header'] = 'my custom value'`
})

// Our first API check uses the setup script defined above and has two assertions.
new checkly.Check("my-api-check", {
    name: "Public SpaceX API",
    activated: true,
    frequency: 10,
    type: "API",
    locations,
    tags,
    setupSnippetId: setupSnippet.id.apply((id: string) => parseInt(id)),
    degradedResponseTime: 5000,
    maxResponseTime: 15000,
    request: {
        method: "GET",
        url: "https://api.spacexdata.com/v3",
        assertions: [
            {
                source: 'STATUS_CODE',
                comparison: 'EQUALS',
                target: '200'
            },
            {
                source: 'JSON_BODY',
                property: '$.project_name',
                comparison: 'EQUALS',
                target: 'SpaceX-API'
            }
        ]
    },
    useGlobalAlertSettings: true,
    alertChannelSubscriptions: [
        {
            activated: true,
            channelId: emailChannel.id.apply((id: string) => parseInt(id)),
        }
    ]
})

// Environment variables can be used in API request URLs, headers, query parameters etc.
// Use variables in API checks by using the {{MY_VAR}} notation.
// Use variables in Browser checks with the process.env.MY_VAR notation
new checkly.EnvironmentVariable('my-env-var', {
    key: 'API_URL',
    value: 'https://localhost:3000',
})
```
