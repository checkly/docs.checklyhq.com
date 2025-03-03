---
title: Exporting traces to Honeycomb - Checkly Docs   
displayTitle: Exporting traces to Honeycomb from Checkly
navTitle: To Honeycomb
description: "Export traces from Checkly to Honeycomb for better observability."
weight: 23
menu:
  platform:
    parent: Export traces to 3rd party tools with Checkly - Checkly Docs
aliases:
  - "/docs/open-telemetry/exporting-traces/honeycomb/"
---

1. Grab the relevant API endpoint from [the Honeycomb documentation](https://docs.honeycomb.io/send-data/opentelemetry/#using-the-honeycomb-opentelemetry-endpoint). It should look like `https://api.honeycomb.io/v1/traces`.
2. Grab your Honeycomb Ingest API key from the **Account** > **Team settings** > **Environments and API keys** section.
3. Add the endpoint the Checkly integration settings and provide the API key as an HTTP header `x-honeycomb-team` with
   the value of your API key.


