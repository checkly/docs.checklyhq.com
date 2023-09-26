---
title: Getting started
weight: 14
slug: /
menu:
  resources:
    parent: "Heartbeat checks"
    identifier: "heartbeat-checks"
aliases:
    - /docs/heartbeat-checks/quickstart/
    - /docs/heartbeat-checks/getting-started/
cli: true
---

This guide gives you all the info needed to get started with Checkly heartbeat checks.
{{< info >}}
Heartbeat checks are available on our [Team and Enterprise plans](https://www.checklyhq.com/pricing#features).
{{< /info >}}

Check out this video for a quick explainer:

{{< youtube 7I_NfCjYCmo >}}

## What is a heartbeat check?

A heartbeat check is a passive check type that expects pings from an external source, such as a scheduled job on a server, at a defined interval. A ping is an HTTP request to a given endpoint URL.
When a ping is not received on time, the check will trigger any configured alerts.

Use heartbeat checks to monitor backup jobs, data imports, and other recurring jobs or scripts.

Here is an example of how to have a Heroku job send a ping to a Checkly heartbeat check.
{{< tabs "Heroku example" >}}
{{< tab "BASH" >}}
```BASH
curl -m 5 --retry 3 https://api.checklyhq.com/heartbeats/ping/bcd964a7-6f15-49a5-bac1-4be8059670ec;
```
{{< /tab >}}
{{< /tabs >}}
Note the use of the retry option. We recommend always using retries when available to avoid false alarms due to temporary network issues or other disruptions. You should also specify a timeout so that the ping does not end up blocking an ongoing process or job.

## Creating a heartbeat check

To create a new heartbeat check, click the `+` icon on the sidebar & select **heartbeat check**.

Creating a heartbeat check is quick and easy; the check requires a name and the period and grace settings defined. These can all be changed later on. Optionally, you can customize tags or [alert settings](/docs/alerting).

Once you have created your check, the service or host you want to monitor needs to be configured to send a request to the ping URL. When creating or editing the check you can find code examples for how to send requests using JavaScript, Python or in Bash in the quickstart section.

## Check breakdown

### Name and tag
The check name is used for identifying the check in the list of heartbeat checks and in alert messages. Using a clear and meaningful name will help team members identify the check and can help reduce the reaction time when alerts are triggered.
Tags are used to create meaningful distinctions between check groups, making it easy to filter out selections of checks.
![name and tag](/docs/images/heartbeat-checks/getting-started-name-and-tag.png)

### Ping URL
The URL on which the check is listening for pings. The job or task monitored should make an HTTP request to the ping URL once per the period configured.
![ping url](/docs/images/heartbeat-checks/getting-started-ping-url.png)

### Period and Grace
**Period** defines how often you expect a ping to the ping URL.

**Grace** is the time Checkly will wait before triggering any alerts when a ping does not arrive within the set period. E.g., if you have a check that expects a ping every 60 minutes, with a grace of 10 minutes, no alarms would trigger until 70 minutes after the latest ping.

Use grace to compensate for variance in your jobs.
![period and grace](/docs/images/heartbeat-checks/getting-started-period-and-grace.png)

### Timer
The check timer starts when it receives its first ping and will reset after each ping.
If you have a check that expects a ping every 60 minutes starting at 09:30, and it receives a ping at 10:00, it will reset the timer to expect a ping before 11:00. If the check does not receive a ping before 11:00 plus any configured grace period it will trigger any configured alerts.
> When a check is deactivated and activated again, the timer will start when the check is saved. This is also the case when changing the period of a check.

### Ping now
Sends a ping to the ping URL. Use this to start the check timer when a check is first created or to silence alarms.
![ping now](/docs/images/heartbeat-checks/getting-started-ping-now.png)
Ping now is also available in the quick menu in the heartbeat overview page.
![ping now in list view](/docs/images/heartbeat-checks/getting-started-list-view-ping-now.png)

> Note that some __user-agents__ are blocked to prevent false-positive pings from bots. <br>
> We're currently blocking __Twitterbot__, __Slackbot__, __Googlebot__, __Discordbot__, __Facebot__, __TelegramBot__, __WhatsApp__, __LinkedInBot__.
> Please note that this list might change in the future.

### Alerting
By default Checkly uses your account default alert settings and channels. You can configure any of the provided [alert channels](/docs/alerting/alert-channels/#managing-alert-channels) for a heartbeat check. If we don’t provide your preferred alert method, use [webhooks](/docs/alerting/webhooks) to configure your alert flow. When configuring a check, you can choose if it should use the account default channels or a selection specific to the check.

> Note that some alerting channels, like [SMS](/docs/alerting/sms-delivery/) and [Phone call](/docs/alerting/phone-calls) are only available on our [Team and Enterprise plans](https://www.checklyhq.com/pricing#features)


## Reporting
The heartbeat overview page displays a table of all your heartbeat checks. Here you can see the results of recent pings, the configured period and grace, and the availability over the last 7 days.

Clicking any individual check will open the check overview page.
![overview](/docs/images/heartbeat-checks/getting-started-overview.png)

### Check overview
The check overview page shows the current status of the check, as well as a breakdown of recent runs and availability metrics.

The summary section at the top of the page allows for time-based filtering, and displays the availability and number of alerts triggered for the given time period.

Single check runs can be accessed by selecting them in the timeline, or by clicking an individual result in the list below the timeline.

Select ‘View all’ for a complete list of available monitoring results in a time period.

### Check results

Selecting a single check result page from the check overview page will give a detailed breakdown of the specific request.

The `source`  value is taken from the request parameter, if available, otherwise from the request `header.origin`, lastly from `headers.referer`. If none of these are available `source` defers to `null`.

## Ping examples
Here you can find examples on how to ping a heartbeat check using various types of script or programming languages.

### Shell
Adding a ping to a shell script only requires a single line. In this example we use [curl](https://github.com/curl/curl), and [wget](https://www.gnu.org/software/wget/).

As mentioned earlier, we recommend using the `-m` and `--retry` options to specify timeout and retries to reduce the risk of false alerts or blocking the script. The corresponding options for wget are `-t` for retries and `-T` for timeout.
{{< tabs "Shell" >}}
{{< tab "Curl" >}}
```BASH
# run_backup.sh

curl -m 5 --retry 3 https://ping.checklyhq.com/f0e0b1d3-665d-49d0-8bf0-3e6504c3d372
```
{{< /tab >}}
{{< tab "Wget" >}}
```BASH
# run_backup.sh

wget -T 5 -t 3 https://ping.checklyhq.com/87c05896-3b7d-49ae-83ff-5e81323a54c4
```
{{< /tab >}}
{{< /tabs >}}

The above curl example can also be used in the [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler):

`run_backup.sh && curl -m 5 --retry 3 https://ping.checklyhq.com/f0e0b1d3-665d-49d0-8bf0-3e6504c3d372 > dev/null`

And similarly for [Render cron jobs](https://render.com/docs/cronjobs):

`run_backup.sh && curl -m 5 --retry 3 https://ping.checklyhq.com/f0e0b1d3-665d-49d0-8bf0-3e6504c3d372`

### Kubernetes CronJob
Here is an example of how to add the curl command from earlier to a Kubernetes CronJob.

```BASH
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly
  namespace: example
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
In these examples we are using the built in [https.get](https://nodejs.org/api/https.html#httpsgeturl-options-callback) option, and then [axios](https://axios-http.com/).
{{< tabs "Node.js" >}}
{{< tab "Node.js" >}}
```JS
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
{{< tab "Axios" >}}
```JS
const axios = require('axios');

axios.get('https://ping.checklyhq.com/87c05896-3b7d-49ae-83ff-5e81323a54c4').then(resp => {
    console.log(resp.data);
})
```
{{< /tab >}}
{{< /tabs >}}


### Python
Using the python [requests](https://requests.readthedocs.io/en/latest/) library with a timeout set to 5 seconds.

```PYTHON
import requests

# Heartbeat URL
url = "https://ping.checklyhq.com/c3f5f5bb-6e46-431a-b7b1-35105450cddc"

# A GET request to the Heartbeat
response = requests.get(url, timeout=5)
```

### PowerShell
Adding a ping to a PowerShell script only requires a single line. Use PowerShell and Windows Task Scheduler to automate tasks on Windows systems.

Similar to the Shell example we can specify `timeout` and `retry` options. See the [Invoke-RestMethod](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-7.3) documentation for more information.

```BASH
Invoke-RestMethod -Uri https://ping.checklyhq.com/c3f5f5bb-6e46-431a-b7b1-35105450cddc -TimeoutSec 5 -MaximumRetryCount 3 -RetryIntervalSec 5
```
