---
title: Setting up the OpenTelemetry collector

metatags:
  title: "Setting up the OpenTelemetry collector"
  description: "Set up the OpenTelemetry collector and send traces to Checkly."
weight: 20
menu:
  platform:
    parent: "Send your traces to Checkly"
beta: true
aliases:
  - "/docs/open-telemetry/ingesting-traces-otel-collector/"
  - "/docs/open-telemetry/sending-traces-otel-collector/"
---

Using the OpenTelemetry collector is the best way to manage and route telemetry data to Checkly. It requires
a little setting up, but it's worth it.
<!--more-->

## Prerequisites

* An OpenTelemetry collector running and configured.

If you need to set up OpenTelemetry for the first time, please use [the Open Telemetry Collector getting started documentation](https://opentelemetry.io/docs/collector/installation/).


## Step 1: Update your config

Sending traces to Checkly is very simple with the OpenTelemetry collector. There are three sections you need to add
to your collector configuration file:

1. Create a `filter` that will remove all spans that don't have `checkly=true` in the trace state.
2. Create a new `exporter` with the Checkly API endpoint and API key as an environment variables.
3. Hook the `exporter` and `filter` into a new trace pipeline.

```yaml
receivers:
  otlp:
    protocols:
      http:
      grpc:
processors:
  batch:
  filter/checkly:
    error_mode: ignore
    traces:
      span:
        # remove all spans that the trace state doesn't have an object
        # which key is "checkly" and value is "true"
        - 'trace_state["checkly"] != "true"'
exporters:
  otlp/checkly:
    endpoint: "otel.eu-west-1.checklyhq.com:4317"
    headers:
      authorization: "${env:CHECKLY_OTEL_API_KEY}"
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [filter/checkly, batch]
      exporters: [otlp/checkly]
```
## Step 2: Restart your collector

Grab your **OTel API key** in the *Send traces* section of the [Open Telemetry Integration page in the Checkly app](https://app.checklyhq.com/settings/account/open-telemetry).  
Now, export your API key in your shell by setting the `CHECKLY_OTEL_API_KEY` environment variable.

```bash
export CHECKLY_OTEL_API_KEY="<your-api-key>"
```

Now, restart your collector with the updated configuration file. If you are using a Dockerized version of the OTel collector,
don't forget to pass in the environment variables, e.g.

```bash
docker run \
-e CHECKLY_OTEL_API_KEY \
...
```

## Step 3: Verify your setup

You are done. Any traces ingested by your collector that are triggered by a Checkly synthetic check will now be sent to Checkly via the new pipeline.

{{< info >}}
If you are not using the OpenTelemetry collector, you can also [send traces directly to Checkly by instrumenting your application code](/docs/open-telemetry/instrumenting-code/).
{{< /info >}}
