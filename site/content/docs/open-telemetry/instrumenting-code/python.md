---
title: Python
head:
  title: "Instrumenting Python with OpenTelemetry"
metatags:
  title: "Instrumenting Python with OpenTelemetry"
  description: "Instrument your Python application with OpenTelemetry and send traces to Checkly."
weight: 32
menu:
  integrations:
    parent: "Instrumenting your code with OpenTelemetry"
beta: true
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

Grab your **OTel API key** in the *Send traces* section of the [Open Telemetry Integration page in the Checkly app](https://app.checklyhq.com/settings/account/open-telemetry).  
Now, export your API key in your shell by setting the `OTEL_EXPORTER_OTLP_HEADERS` environment variable.

```bash
export OTEL_EXPORTER_OTLP_HEADERS="authorization=Bearer%20<your-api-key>"
```

{{< warning >}}
Note that the Python OTel library demands that header key/value pairs are URL encoded. This is why we use `%20` instead of a space.
{{< /warning >}}

Next, export the endpoint for the region you want to use, give your service a name and set the protocol to `http/protobuf`
```bash
export OTEL_EXPORTER_OTLP_ENDPOINT="https://otel.eu-west-1.checklyhq.com"
export OTEL_SERVICE_NAME="your-service-name"
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf 
```

We are using the standard OpenTelemetry environment variables here to configure the OTLP exporter.

| Variable                      | Description                                                                               |
|-------------------------------|-------------------------------------------------------------------------------------------|
| `OTEL_EXPORTER_OTLP_HEADERS`  | The `Authorization` HTTP header containing your Checkly OTel API key as a `Bearer` token. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | The Checkly OTel API endpoint for the region you want to use.                             |
| `OTEL_SERVICE_NAME`           | The name of your service to identify it among the spans in the web UI.                    |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | Sets the protocol to use, which is gRPC by default in Python. Checkly only supports HTTP  |

Then start your app with the extra `opentelemetry-instrument` command before the regular start command.

```bash
opentelemetry-instrument python myapp.py
```
🎉 You are done. Any interactions with your app that are triggered by a Checkly synthetic monitoring check will now generate
traces, which are sent back to Checkly and displayed in the Checkly UI.
