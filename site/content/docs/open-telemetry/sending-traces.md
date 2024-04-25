---
title: Sending traces to 3rd party OpenTelemetry backends
weight: 20
menu:
  integrations:
    parent: "OpenTelemetry (beta)"
beta: true
---

Sending your checks as traces to a 3rd party OpenTelemetry backend is a great way to correlate check runs with other 
telemetry data. It's also very simple to set up.

1. Flip the **"Basic HTTP instrumentation"** toggle in the OpenTelemetry integration in your Checkly account.
2. Flip the **"Send traces"** toggle and provide the trace endpoint URL and API key for your preferred 3rd party OpenTelemetry 
backend. Done.

After you've set this up, Checkly will instrument every HTTP request with a proper `traceparent` and `tracestate` header
and send every check run as a trace to your 3rd party OpenTelemetry backend.

## Example configuration

To help you get started, we collected some example configurations for popular OpenTelemetry vendors below.

### NewRelic

- Make sure you have the **Traces** feature enabled in your NewRelic account.
- Grab your NewRelic LICENSE KEY in the **Administration** > **API keys** section.
- Grab the right endpoint URL for your NewRelic account. It should look like `https://otlp.nr-data.net`. Check [the full list of all NewRelic OTel endpoints](https://docs.newrelic.com/docs/more-integrations/open-source-telemetry-integrations/opentelemetry/get-started/opentelemetry-set-up-your-app/#ports-and-endpoints).

Find all the details in the [NewRelic OpenTelemetry documentation](https://docs.newrelic.com/docs/more-integrations/open-source-telemetry-integrations/opentelemetry/get-started/opentelemetry-set-up-your-app/).

### Grafana Tempo

### Honeycomb

### Dynatrace

### Axiom

### Signoz

### Baselime

### Generic OpenTelemetry backend

### Using the OTel collector





