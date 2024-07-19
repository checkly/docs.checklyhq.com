---
title: Send your traces to Checkly
weight: 20
menu:
  platform:
    parent: "Traces (beta)"
beta: true
---

Send your 3rd party backend OpenTelemetry traces to Checkly. Inspect and drill down to why a check failed or degraded.
<!--more-->

In [the Traces tab, in your Checkly account settings](https://app.checklyhq.com/settings/account/traces): 

1. Flip the toggle to import traces in the [Traces settings page](https://app.checklyhq.com/settings/account/traces).
   
2. Get the trace endpoint URL and the API key. Provide them to your OpenTelemetry collector so that it sends traces back to Checkly.

   ![Provide URL and header with authentication](/docs/images/otel/otel_import_traces_settings.png)


3. Set up your OpenTelemetry collector to only send relevant traces to Checkly. 

   * [Setting up the OpenTelemetry Collector](/docs/traces-open-telemetry/importing-traces/sending-traces-otel-collector/) 


---

After you've set this up, you should start seeing traces on the [Traces page](https://app.checklyhq.com/traces). Moreover, when opening a check, you'll see a Traces section within it.

   ![Check result with OpenTelemetry trace](/docs/images/otel/otel_check_result.png)