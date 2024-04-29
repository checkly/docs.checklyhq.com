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

1. Make sure you have the **Traces** feature enabled in your NewRelic account.
2. Grab your NewRelic LICENSE KEY in the **Administration** > **API keys** section.
3. Grab the right endpoint URL for your NewRelic account. It should look like `https://otlp.nr-data.net`. 
Check [the full list of all NewRelic OTel endpoints](https://docs.newrelic.com/docs/more-integrations/open-source-telemetry-integrations/opentelemetry/get-started/opentelemetry-set-up-your-app/#ports-and-endpoints).

Find all the details in the [NewRelic OpenTelemetry documentation](https://docs.newrelic.com/docs/more-integrations/open-source-telemetry-integrations/opentelemetry/get-started/opentelemetry-set-up-your-app/).

### Grafana Tempo


1. Make sure you have Grafana Tempo installed, running and accessible. If you are running Grafana Cloud, the Tempo 
datasource is already pre-configured. Find it at **Connections > **Datasources** > **Tempo**.
2. After installing, grab the Tempo endpoint URL. It should look like `https://tempo-eu-west-0.grafana.net/tempo`.
3. Under the section **Authentication**, grab the user and password for the Tempo endpoint.
4. As Tempo uses Basic Authentication, you need to provide the user and password in a `Authorization: Basic user:password` HTTP header in 
Checkly integration settings, where the `user:password` section is base64 encoded. You can use an online tool like [base64encode.net](https://www.base64encode.net/) 
to encode your user and password.

Find all the details in the [Grafana Tempo OpenTelemetry documentation](https://grafana.com/docs/tempo/latest/).

### Honeycomb

1. Grab the relevant API endpoint from [the Honeycomb documentation](https://docs.honeycomb.io/send-data/opentelemetry/#using-the-honeycomb-opentelemetry-endpoint). It should look like `https://api.honeycomb.io/`.
2. Grab your Honeycomb Ingest API key from the **Account** > **Team settings** > **Environments and API keys** section.
3. Add the endpoint the Checkly integration settings and provide the API key as an HTTP header `x-honeycomb-team` with 
the value of your API key.


### Using the OTel collector





