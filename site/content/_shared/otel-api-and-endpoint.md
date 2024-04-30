---
sitemapExclude: true
---

Grab your **OTel API key** in the *Send traces* section of the [Open Telemetry Integration page in the Checkly app](https://app.checklyhq.com/settings/account/open-telemetry).  
Now, export your API key in your shell by setting the `OTEL_EXPORTER_OTLP_HEADERS` environment variable.

```bash
export OTEL_EXPORTER_OTLP_HEADERS="authorization=Bearer <your-api-key>"
```

Next, export the endpoint for the region you want to use and give your service a name.
```bash
export OTEL_EXPORTER_OTLP_ENDPOINT="https://otel.eu-west-1.checklyhq.com"
# export OTEL_EXPORTER_OTLP_ENDPOINT="https://otel.us-east-1.checklyhq.com"
export OTEL_SERVICE_NAME="your-service-name"
```

We are using the standard OpenTelemetry environment variables here to configure the OTLP exporter.

| Variable                      | Description                                                                               |
|-------------------------------|-------------------------------------------------------------------------------------------|
| `OTEL_EXPORTER_OTLP_HEADERS`  | The `Authorization` HTTP header containing your Checkly OTel API key as a `Bearer` token. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | The Checkly OTel API endpoint for the region you want to use.                             |
| `OTEL_SERVICE_NAME`           | The name of your service to identify it among the spans in the web UI.                    |
