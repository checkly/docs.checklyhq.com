---
title: Exporting traces to Chronosphere - Checkly Docs   
displayTitle: Exporting traces to Chronosphere from Checkly
navTitle: To Chronosphere
description: "Export traces from Checkly to Chronosphere for better observability."
weight: 24
menu:
  platform:
    parent: Export traces to 3rd party tools with Checkly - Checkly Docs
aliases:
  - "/docs/open-telemetry/exporting-traces/chronosphere/"
---

1. Create a service account in your Chronosphere account with write permissions for traces. Chronosphere recommends creating a restricted service account with a write-only scope.
2. Generate an API token for the service account from the **Account** > **Service Accounts** section.
3. Determine your Chronosphere OTLP endpoint. It should follow the format: `https://YOUR_COMPANY.chronosphere.io/data/opentelemetry/v1/traces` where `YOUR_COMPANY` is your organization name.
4. Add the endpoint to the Checkly integration settings and provide the API token as an HTTP header `API-Token` with the value of your API token.

Find all the details in the [Chronosphere OpenTelemetry documentation](https://docs.chronosphere.io/ingest/metrics-traces/otel/otlp-endpoints).