---
title: Importing your backend traces to Checkly
weight: 40
menu:
  platform:
    parent: "Traces (beta)"
beta: true
---

Import your 3rd party backend OpenTelemetry traces to Checkly. Inspect and drill down to why a check failed or degraded.
<!--more-->

1. Flip the **Basic HTTP instrumentation** toggle in [the OpenTelemetry integration in your Checkly account](https://app.checklyhq.com/settings/account/open-telemetry).

   ![Enable basic instrumentation](/docs/images/integrations/otel/otel_basic_instrumentation.png)

   
2. Provide the trace endpoint URL and HTTP header with an API key to your preferred 3rd party OpenTelemetry
   backend.

   ![Provide URL and header with authentication](/docs/images/integrations/otel/otel_export_traces_settings.png)

After you've set this up, you should see traces coming in the [Traces page](https://app.checklyhq.com/traces). Moreover, when opening a check, you'll see a Traces section within it. 

   ![Check result with OpenTelemetry trace](/docs/images/integrations/otel/otel_check_result.png)