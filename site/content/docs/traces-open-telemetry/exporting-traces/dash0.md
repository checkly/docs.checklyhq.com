---
title: Exporting traces to Dash0 - Checkly Docs
displayTitle: Exporting traces to Dash0
navTitle: To Dash0
description: "Export traces from Checkly to Dash0 for better observability."
weight: 24
menu:
  platform:
    parent: Export traces to 3rd party tools with Checkly - Checkly Docs
beta: true
aliases:
  - "/docs/open-telemetry/exporting-traces/dash0/"
---

1. Create an API key in the **Settings** > **Auth Tokens** section.
  ![Generate an auth token](/docs/images/otel/export-traces/dash0-token.png)
2. Grab the right endpoint URL for your Dash0 organization from the **Settings** > **Endpoints** section. It should look like `https://ingress.eu-west-1.aws.dash0.com/v1/traces`.
   Make sure it ends with `/v1/traces/`
3. Add the endpoint and the auth token to the Checkly integration settings. The auth token is added as an HTTP header named
   `Authorization` with the value of `Bearer ` and your auth token.
  ![Fill in the values into Checkly](/docs/images/otel/export-traces/dash0-checkly.png)
4. Observe Spans appearing in Dash0 on the `Tracing` tab.
  ![Traces displayed in Dash0](/docs/images/otel/export-traces/dash0-traces.png)

Find all the details in the [Dash0 documentation](https://www.dash0.com/documentation).
