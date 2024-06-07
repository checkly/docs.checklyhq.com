---
title: Getting started with OpenTelemetry
weight: 1
menu:
  integrations:
    parent: "OpenTelemetry (beta)"
    identifier: getting-started-otel
beta: true
---

{{< info >}}
The OpenTelemetry integration is currently in **beta** and available for free on all plans. 
Need help getting started? We offer a **free, 1:1 valet onboarding service** to help you instrument your stack with the 
correct OpenTelemetry SDKs and enable tracing inside Checkly. 
[Book an onboarding session right here](https://calendly.com/tim-nolet/checkly-open-telemetry)
{{< /info >}}

The Checkly OpenTelemetry (OTel) integration allows you to correlate synthetic monitoring checks with traces from your backend services. This integration is especially useful for two types of users:

- **Resolve issues quicker:** Resolve failing synthetic checks much quicker by correlating failing checks with backend & infrastructure traces. No more flipping between various 3rd party observability (o11y) systems.
- **Increase signal vs. noise:** Cut through the sea of o11y and focus on the data that correlates to critical and known business processes as exercised by synthetic monitoring checks.
- **Save money:** Send traces directly to Checkly, without signing up for another product or hosting an OTel solution yourself.

![Check result with OpenTelemetry trace](/docs/images/integrations/otel/otel_check_result.png)

With OpenTelemetry enabled, you will have access to traces in all the places where it matters to more quickly resolve issues:
- **Check results:** resolve production outages faster by correlating failing checks with backend traces.
- **Test sessions:** understand any failures during test session execution.
- **Check Editors** get a live trace while building, editing and debugging check code.

See this in action in the video below:

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/30c143388ba54e9ba6b665dfbfe0d295?sid=8ad8d273-b0bb-48ca-b456-1b137384b9de" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>


<br>
To get started with the Checkly OpenTelemetry integration, pick a scenario that best fits your needs.

<div class="cards-list">
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="I don't have an OpenTelemetry setup"
	  description="Instrument your app and send traces directly to Checkly. No need for a 3rd party OTel backend."
	  img="/docs/images/icons/opentelemetry_gray.svg"
	  link="/docs/open-telemetry/instrumenting-code/"
>}}
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="I have an OpenTelemetry setup"
	  description="Send traces to your 3rd party OTel backend and ingest them into Checkly too."
	  img="/docs/images/icons/opentelemetry.svg"
	  link="/docs/open-telemetry/sending-traces/"
>}}
</div>

<br>

If you want to learn more about how this all works, check out the [How it works under the hood](/docs/open-telemetry/how-it-works/) section.

