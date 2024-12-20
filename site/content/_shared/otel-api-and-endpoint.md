---
sitemapExclude: true
---

Toggle on **Import Traces** and grab your OTel API key in the **OTel API keys** section of the [Traces page in the Checkly app](https://app.checklyhq.com/settings/account/traces) and
take a note of the endpoint for the region you want to use.

![Checkly OTEL API keys](/docs/images/otel/traces_import_api_keys.png)

Now, export your API key in your shell by setting the `OTEL_EXPORTER_OTLP_HEADERS` environment variable.

```bash
export OTEL_EXPORTER_OTLP_HEADERS="authorization=<your-api-key>"
```

Next, export the endpoint for the region you want to use and give your service a name.
```bash
export OTEL_EXPORTER_OTLP_ENDPOINT="https://otel.eu-west-1.checklyhq.com"
export OTEL_SERVICE_NAME="your-service-name"
```

> During the beta we only have one region available: `eu-west-1`. We will expand to US regions soon.

We are using the standard OpenTelemetry environment variables here to configure the OTLP exporter.

| Variable                      | Description                                                             |
|-------------------------------|-------------------------------------------------------------------------|
| `OTEL_EXPORTER_OTLP_HEADERS`  | The `Authorization` HTTP header containing your Checkly OTel API key.   |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | The Checkly OTel API endpoint for the region you want to use.           |
| `OTEL_SERVICE_NAME`           | The name of your service to identify it among the spans in the web UI.  |
