---
title: Ping examples - Checkly Docs
displayTitle: Ping examples
navTitle: Ping examples
weight: 15
menu:
  resources:
    parent: "Heartbeat checks"

---

Here you can find examples on how to ping a Heartbeat check. 

Most examples use `GET` as the request method, but Heartbeat checks also accept `POST` requests. Your check won't record `PUT` or `DELETE` requests as pings, and the endpoint will return an error.

## Shell
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

You can use curl for [Render cron jobs](https://render.com/docs/cronjobs) and the [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler):

```BASH
run_backup.sh && curl -m 5 --retry 3 https://ping.checklyhq.com/f0e0b1d3-665d-49d0-8bf0-3e6504c3d372
```

## Kubernetes CronJob
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

## Node.js

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

## Python
This is an example using the Python [requests](https://requests.readthedocs.io/en/latest/) library with a timeout of 5 seconds:

```PYTHON {title="my_scheduled_job.py"}
import requests

# Heartbeat URL
url = "https://ping.checklyhq.com/c3f5f5bb-6e46-431a-b7b1-35105450cddc"

# A GET request to the Heartbeat
response = requests.get(url, timeout=5)
```

## PowerShell
Use PowerShell and Windows Task Scheduler to automate tasks on Windows systems. Adding a ping to a PowerShell script only requires a single line.

We recommend using the `timeout` and `retry` options to reduce the risk of false alerts or blocking the script. See the [Invoke-RestMethod](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-7.3) documentation for more information.

```BASH
Invoke-RestMethod -Uri https://ping.checklyhq.com/c3f5f5bb-6e46-431a-b7b1-35105450cddc -TimeoutSec 5 -MaximumRetryCount 3 -RetryIntervalSec 5
```

## Vercel cron jobs

You can monitor your [Vercel cron jobs](https://vercel.com/docs/cron-jobs) with Heartbeat checks. At the end of your cron job, make an HTTP `GET` or `POST` request to your ping URL. For example:

{{< tabs "Vercel example" >}}
{{< tab "Next.js (App Router)" >}}
```js {title="app/api/my-cron-job/route.js"}
export async function GET(req, res) {
  // Your job tasks here ...

  // Ping URL
  const URL = 'https://ping.checklyhq.com/c3f5f5bb-6e46-431a-b7b1-35105450cddc';

  // GET request to the Heartbeat
  try {
    const response = await fetch(URL);
    console.log(`Checkly heartbeat ping status ${response.status}`);
  } catch (error) {
    console.log(`Checkly heartbeat ping failed: ${error}`)
  }  
}
```
{{< /tab >}}
{{< tab "Next.js (Pages Router)" >}}
```js {title="pages/api/my-cron-job.js"}
export default function handler(req, res) {
  // Your job tasks here ...

  // Ping URL
  const URL = 'https://ping.checklyhq.com/c3f5f5bb-6e46-431a-b7b1-35105450cddc';

  // GET request to the Heartbeat
  try {
    const response = await fetch(URL);
    console.log(`Checkly heartbeat ping status ${response.status}`);
  } catch (error) {
    console.log(`Checkly heartbeat ping failed: ${error}`)
  }
}
```
{{< /tab >}}
{{< tab "Other frameworks" >}}
```js {title="api/my-cron-job.js"}
export function GET() {
  // Your job tasks here ...

  // Ping URL
  const URL = 'https://ping.checklyhq.com/c3f5f5bb-6e46-431a-b7b1-35105450cddc';

  // GET request to the Heartbeat
  try {
    const response = await fetch(URL);
    console.log(`Checkly heartbeat ping status ${response.status}`);
  } catch (error) {
    console.log(`Checkly heartbeat ping failed: ${error}`)
  }
}
```
{{< /tab >}}
{{< /tabs >}}