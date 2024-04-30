---
title: Using the OpenTelemetry collector
weight: 50
menu:
  integrations:
    parent: "OpenTelemetry (beta)"
beta: true
---

Using the OpenTelemetry collector is the best way to manage and route telemetry data from / to Checkly. It requires
a little setting up, but it's worth it.

In this guide we assume you already have an OTel collector running and configured. If you don't, please reference [the
Open Telemetry Collector getting started documentation](https://opentelemetry.io/docs/collector/installation/)


## Step 1: Get the API endpoint and an API key

{{< markdownpartial "/_shared/otel-prereqs.md" >}}


## Step 2: Sending traces to Checkly

Sending trace to Checkly is very simple with the OpenTelemetry collector. There are three sections you need to add
to your collector configuration file:

1. Create a `filter` that will remove all spans that don't have `checkly=true` in the trace state.
2. Create a new `exporter` with the Checkly API endpoint and API key.
3. Hook the `exporter` and `filter` into a new trace pipeline.

```yaml
receivers:
  otlp:
    protocols:
      http:

processors:
  batch:
  filter/checkly:
    error_mode: ignore
    traces:
      span:
        # remove all spans that the trace state doesn't have an object
        # which key is "tracetest" and value is "true"
        - 'trace_state["checkly"] != "true"'

exporters:
  logging:
    loglevel: debug
  otlp/checkly:
    endpoint: otel.eu-west-1.checklyhq.com:443
    headers:
      authorization: Bearer ot_132966335ad74b18bf424b737e9abc26
      "Content-Type": "application/json"

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [filter/checkly, batch]
      exporters: [logging, otlp/checkly]
```

