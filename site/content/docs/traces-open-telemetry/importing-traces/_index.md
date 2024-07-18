---
title: Send your traces to Checkly
weight: 40
menu:
  platform:
    parent: "Traces (beta)"
beta: true
---

Send your 3rd party backend OpenTelemetry traces to Checkly. Inspect and drill down to why a check failed or degraded.
<!--more-->

In [the Traces tab your Checkly account settings](https://app.checklyhq.com/settings/account/traces): 

1. Flip the **Basic HTTP instrumentation** toggle: 

   ![Enable basic instrumentation](/docs/images/integrations/otel/otel_basic_instrumentation.png)

   
2. Get the trace endpoint URL and the API key. Provide them to your preferred 3rd party OpenTelemetry backend.

   ![Provide URL and header with authentication](/docs/images/integrations/otel/otel_export_traces_settings.png)



3. Set up your OpenTelemetry collector to send only send Checkly relevant traces to Checkly. 

   * [Setting up the OpenTelemetry Collector](/docs/importing-traces/sending-traces-otel-collector/) 


---

After you've set this up, you should see traces coming in the [Traces page](https://app.checklyhq.com/traces). Moreover, when opening a check, you'll see a Traces section within it. 

   ![Check result with OpenTelemetry trace](/docs/images/integrations/otel/otel_check_result.png)