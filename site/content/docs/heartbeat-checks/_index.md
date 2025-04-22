---
title: Getting started with Heartbeat checks - Checkly Docs
displayTitle: Getting started with Heartbeat checks
navTitle: Overview
weight: 14
slug: /
menu:
  resources:
    parent: "Heartbeat checks"
    identifier: "heartbeat-checks"
aliases:
    - /docs/heartbeat-checks/quickstart/
    - /docs/heartbeat-checks/getting-started/

---

Monitor your scheduled jobs with Heartbeat checks. Heartbeat checks listen for regular pings from your automated tasks, to ensure that they are running as expected. 

![Heartbeat check overview page](/docs/images/heartbeat-checks/heartbeat-check-overview.png)

Check out this video for a quick explainer:

{{< youtube 7I_NfCjYCmo >}}

> Heartbeat checks are available on our [Team and Enterprise plans](https://www.checklyhq.com/pricing).

## What is a Heartbeat check?

A Heartbeat check is a passive check type that expects pings from an external source, such as a scheduled job on a server, at a defined interval. A ping is an HTTP request to a given endpoint URL using either the `GET` or `POST` method.
When a ping is not received on time, the check will trigger any configured alerts.

Use Heartbeat checks to monitor backup jobs, data imports, and other recurring jobs or scripts.

For example, this is how you ping a Heartbeat check from a Heroku job:

```BASH
curl -m 5 --retry 3 https://api.checklyhq.com/heartbeats/ping/bcd964a7-6f15-49a5-bac1-4be8059670ec
```

Note the retry and timeout options. We recommend enabling retries when possible, to avoid false alarms due to temporary network issues or similar. You should also specify a timeout so that the ping doesn't block your ongoing job.

## Creating a Heartbeat check

![Heartbeat check create page](/docs/images/heartbeat-checks/create-heartbeat-check.png)

### Name and tag
A meaningful name will not only help you and others identify your checks within Checkly, but it will help provide a better alerting experience if your checks fall into an alert state.

Tags can relate your checks together. They also determine which checks are shown on your [dashboards](/docs/dashboards/).

### Ping URL

This is the URL your check listens to for pings. Your scheduled job should send a ping to this URL when successful, once per the configured period.

### Period and Grace
Period defines how often you expect a ping to the ping URL.

Grace is the amount of time Checkly will wait before triggering any alerts when a ping does not arrive within the set period. E.g., if you have a check that expects a ping every 60 minutes, with a grace of 10 minutes, no alarms would trigger until 70 minutes after the latest ping.

Use grace to compensate for variance in your jobs.

### Alerting
You can configure any of the provided [alert channels](/docs/alerting-and-retries/alert-channels/) for a Heartbeat check. If we don’t provide your preferred alert method, use [webhooks](/docs/alerting-and-retries/webhooks/) to configure your alert flow. 

## Pinging your Heartbeat check

Once you've created your check, configure your scheduled job to send an HTTP request to your check's ping URL. For examples of how to do this, see [ping examples](/docs/heartbeat-checks/#ping-examples).

This should be a `GET` or `POST` request. Your check won't count `PUT` or `DELETE` requests as valid pings, and the endpoint will return an error.

You can set request headers to indicate the source of the ping. The source is parsed from the `origin` request header, falling back to `referer` if needed. If both are missing, the source will be blank.

> Note that some user-agents are blocked to prevent false-positive pings from bots. <br>
> We're currently blocking Twitterbot, Slackbot, Googlebot, Discordbot, Facebot, TelegramBot WhatsApp, and LinkedInBot.
> Please note that this list might change in the future.

### Manual pings

You can manually send pings via the Checkly UI. Use this to start the check timer when a check is first created or to silence alarms.

![Manually send a ping via the Checkly UI on the check overview page](/docs/images/heartbeat-checks/heartbeat-ping-overview-page.png)

"Ping now" is also available in the quick menu in your list of Heartbeat checks. 

![Manually send a ping via the Checkly UI in the quick menu](/docs/images/heartbeat-checks/heartbeat-ping-quick-menu.png)

## How does the timer work?
The check timer starts when it receives its first ping and will reset after each ping or triggered alert.

If you have a check that expects a ping every 60 minutes starting at 09:30, and it receives a ping at 10:00, it will reset the timer to expect a ping before 11:00. If the check does not receive a ping before 11:00 plus the configured grace period, it will trigger any configured alerts.

> Every ping or triggered alert will reset the timer of the next expected heartbeat ping.

![Explanation of timer resets. Every ping or alert resets the timer.](/docs/images/heartbeat-checks/heartbeats-grace.jpg)

> When a check is deactivated and activated again, the timer will start when the check is saved. This is also the case when changing the period of a check.

## Ping examples
Here you can find examples on how to ping a Heartbeat check. 

Most examples use `GET` as the request method, but Heartbeat checks also accept `POST` requests. Your check won't record `PUT` or `DELETE` requests as pings, and the endpoint will return an error.

### Shell
Adding a ping to a shell script only requires a single line.

This is an example using [curl](https://curl.se/). We recommend using the `-m` and `--retry` options to specify timeout and retries to reduce the risk of false alerts or blocking the script.

{{< tabs "Shell" >}}
{{< tab "Get" >}}
```BASH {title="run_backup.sh"}
curl -m 5 --retry 3 https://ping.checklyhq.com/f0e0b1d3-665d-49d0-8bf0-3e6504c3d372
```
{{< /tab >}}
{{< tab "POST" >}}
```BASH {title="run_backup.sh"}
curl -X "POST" -m 5 --retry 3 https://ping.checklyhq.com/f0e0b1d3-665d-49d0-8bf0-3e6504c3d372
```
{{< /tab >}}
{{< /tabs >}}

This is a similar example with [wget](https://www.gnu.org/software/wget/). Use the options `-t` for retries and `-T` for timeout.

```BASH {title="run_backup.sh"}
wget -T 5 -t 3 https://ping.checklyhq.com/87c05896-3b7d-49ae-83ff-5e81323a54c4
```

You can use curl in the [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler):

```BASH
run_backup.sh && curl -m 5 --retry 3 https://ping.checklyhq.com/f0e0b1d3-665d-49d0-8bf0-3e6504c3d372 > dev/null
```

And similarly for [Render cron jobs](https://render.com/docs/cronjobs):

```BASH
run_backup.sh && curl -m 5 --retry 3 https://ping.checklyhq.com/f0e0b1d3-665d-49d0-8bf0-3e6504c3d372
```

### Kubernetes CronJob
Here is an example of how to add the curl command to a Kubernetes CronJob.

```YAML {title="my-scheduled-job.yaml"}
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: curl
            image: docker.io/curlimages/curl:latest
            imagePullPolicy: IfNotPresent
            command:
            - sh
            - -c
            args:
            - 'curl -m 5 --retry 3 https://ping.checklyhq.com/f0e0b1d3-665d-49d0-8bf0-3e6504c3d372;'
          restartPolicy: OnFailure
```

### Node.js

This is an example with the built-in [https.get](https://nodejs.org/api/https.html#httpsgeturl-options-callback) package:

{{< tabs "https.get" >}}
{{< tab "Typescript" >}}
```ts {title="my-scheduled-job.ts"}
import https from "https";

// Sample URL
const url = "https://ping.checklyhq.com/87c05896-3b7d-49ae-83ff-5e81323a54c4";

const options = {
  timeout: 5000,
};

https.get(url, options, (res) => {
  console.log("statusCode:", res.statusCode);

  res.on('data', (data) => {
    console.log("responseBody:", data);
  });
});
```
{{< /tab >}}
{{< tab "Javascript" >}}
```js {title="my-scheduled-job.js"}
const https = require("https");

// Sample URL
const url = "https://ping.checklyhq.com/87c05896-3b7d-49ae-83ff-5e81323a54c4";

const options = {
  timeout: 5000,
};

https.get(url, options, (res) => {
  console.log("statusCode:", res.statusCode);

  res.on('data', (data) => {
    console.log("responseBody:", data);
  });
});
```
{{< /tab >}}
{{< /tabs >}}

You can also use [axios](https://axios-http.com/):

{{< tabs "axios" >}}
{{< tab "TypeScript" >}}
```ts {title="my-scheduled-job.ts"}
import axios from 'axios'

axios.get('https://ping.checklyhq.com/87c05896-3b7d-49ae-83ff-5e81323a54c4')
  .then(resp => {
      console.log(resp.data);
  })

```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js {title="my-scheduled-job.js"}
const axios = require('axios');

axios.get('https://ping.checklyhq.com/87c05896-3b7d-49ae-83ff-5e81323a54c4')
  .then(resp => {
      console.log(resp.data);
  })
```
{{< /tab >}}
{{< /tabs >}}

### Python
This is an example using the Python [requests](https://requests.readthedocs.io/en/latest/) library with a timeout of 5 seconds:

```PYTHON {title="my_scheduled_job.py"}
import requests

# Heartbeat URL
url = "https://ping.checklyhq.com/c3f5f5bb-6e46-431a-b7b1-35105450cddc"

# A GET request to the Heartbeat
response = requests.get(url, timeout=5)
```

### PowerShell
Use PowerShell and Windows Task Scheduler to automate tasks on Windows systems. Adding a ping to a PowerShell script only requires a single line.

We recommend using the `timeout` and `retry` options to reduce the risk of false alerts or blocking the script. See the [Invoke-RestMethod](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-7.3) documentation for more information.

```BASH
Invoke-RestMethod -Uri https://ping.checklyhq.com/c3f5f5bb-6e46-431a-b7b1-35105450cddc -TimeoutSec 5 -MaximumRetryCount 3 -RetryIntervalSec 5
```

## CLI example

The [Checkly CLI](/docs/cli/) gives you a JavaScript/TypeScript-native workflow for coding, testing and deploying synthetic monitoring at scale, from your code base.

You can define a Heartbeat check via the CLI. For example:

{{< tabs "CLI example" >}}
{{< tab "TypeScript" >}}
```ts {title="heartbeat.check.ts"}
import { HeartbeatCheck } from 'checkly/constructs'

new HeartbeatCheck('heartbeat-check-1', {
  name: 'Send weekly newsletter job',
  period: 7,
  periodUnit: 'days',
  grace: 2,
  graceUnit: 'hours',
})

```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js {title="heartbeat.check.js"}
const { HeartbeatCheck } = require('checkly/constructs')

new HeartbeatCheck('heartbeat-check-1', {
  name: 'Send weekly newsletter job',
  period: 7,
  periodUnit: 'days',
  grace: 2,
  graceUnit: 'hours',
})

```
{{< /tab >}}
{{< /tabs >}}

The above example defines:
- The `name` of the check.
- A `period` of 7 days and a `grace` of 2 hours.

For more options, see the [Check construct reference](/docs/cli/constructs-reference/#check).

## Next steps

- Learn about the benefits of [Monitoring as Code](/guides/monitoring-as-code/).
