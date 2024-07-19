---
title: Python
head:
  title: "Instrumenting Python with OpenTelemetry"
metatags:
  title: "Instrumenting Python with OpenTelemetry"
  description: "Instrument your Python application with OpenTelemetry and send traces to Checkly."
weight: 32
menu:
  platform:
    parent: "Instrument your code with OpenTelemetry"
beta: true
aliases:
  - "/docs/open-telemetry/instrumenting-code/python"
---

This guide will help you instrument your Python application(s) with OpenTelemetry and send traces to Checkly.
<!--more-->
## Step 1: Install the OpenTelemetry SDK

Install the relevant OpenTelemetry packages:

```bash
pip install opentelemetry-distro \
    opentelemetry-exporter-otlp
```

## Step 2: Initialize the instrumentation

Use the `opentelemetry-bootstrap` command to automatically install any OTel libraries based on your current Python app.

```bash
opentelemetry-bootstrap --action=install
```

## Step 3: Start your app with the instrumentation

First, make sure to switch on the **Basic HTTP Instrumentation**. This will add the necessary headers to your HTTP requests.

![Checkly basic OTEL http instrumentation](/docs/images/otel/otel_basic_instrumentation.png)

Then, toggle on **Send Traces** and grab your OTel API key in the **OTel API keys** section of the [Open Telemetry Integration page in the Checkly app](https://app.checklyhq.com/settings/account/open-telemetry).

![Checkly OTEL API keys](/docs/images/otel/otel_send_traces.png)

Now, export your API key in your shell by setting the `OTEL_EXPORTER_OTLP_HEADERS` environment variable.

```bash
export OTEL_EXPORTER_OTLP_HEADERS="authorization=<your-api-key>"
```

Next, export the endpoint for the region you want to use and give your service a name.
```bash
export OTEL_EXPORTER_OTLP_ENDPOINT="https://otel.eu-west-1.checklyhq.com"
export OTEL_SERVICE_NAME="your-service-name"
```

We are using the standard OpenTelemetry environment variables here to configure the OTLP exporter.

| Variable                      | Description                                                                              |
|-------------------------------|------------------------------------------------------------------------------------------|
| `OTEL_EXPORTER_OTLP_HEADERS`  | The `Authorization` HTTP header containing your Checkly OTel API key.                    |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | The Checkly OTel API endpoint for the region you want to use.                            |
| `OTEL_SERVICE_NAME`           | The name of your service to identify it among the spans in the web UI.                   |

Then start your app with the extra `opentelemetry-instrument` command before the regular start command.

```bash
opentelemetry-instrument python myapp.py
```
🎉 You are done. Any interactions with your app that are triggered by a Checkly synthetic monitoring check will now generate
traces, which are sent back to Checkly and displayed in the Checkly UI.
