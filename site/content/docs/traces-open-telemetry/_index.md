---
title: Getting started with Checkly Traces and OpenTelemetry
weight: 1
menu:
  platform:
    parent: "Traces (beta)"
    identifier: getting-started-traces-otel
beta: true
aliases:
  - "/docs/open-telemetry/"
---

{{< info >}}
Checkly Traces are OpenTelemetry native. Currently in **beta** and available for free on all plans. 
Need help getting started? We offer a **free, 1:1 onboarding service** to help you instrument your stack with the 
correct OpenTelemetry SDKs and enable tracing inside Checkly. 
[Book an onboarding session right here](https://calendly.com/maria-checkly/traces-onboarding).
{{< /info >}}

With Traces configured, you will have access to traces in all the places where it matters to more quickly resolve issues:
- **Check results:** resolve production outages faster by correlating failing checks with backend traces.
- **Test sessions:** understand any failures during test session execution.
- **Check editors:** get a live trace while building, editing and debugging check code.

![Check result with OpenTelemetry trace](/docs/images/otel/otel_check_result.png)


<br>
To get started with Checkly Traces using OpenTelemetry, pick the scenario that best fits your needs.

<div class="cards-list">
{{< doc-card
	  class="three-column-card"
	  headerTag="h3"
	  title="I don't have an OpenTelemetry setup"
	  description="Instrument your app and send traces directly to Checkly. No need for a 3rd party OTel backend."
	  img="/docs/images/icons/opentelemetry_gray.svg"
	  link="/docs/traces-open-telemetry/instrumenting-code/"
>}}
{{< doc-card
	  class="three-column-card"
	  headerTag="h3"
	  title="I want to see traces in Checkly"
	  description="Send your backend traces to Checkly to get contextualized check failure analysis."
	  img="/docs/images/icons/opentelemetry.svg"
	  link="/docs/traces-open-telemetry/importing-traces/"
>}}
{{< doc-card
	  class="three-column-card"
	  headerTag="h3"
	  title="I want to export Check results to my OpenTelemetry setup"
	  description="Export check results as traces to your 3rd party OTel tooling"
	  img="/docs/images/icons/opentelemetry.svg"
	  link="/docs/traces-open-telemetry/exporting-traces/"
>}}
</div>

<br>

See this in action in the video below:

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/30c143388ba54e9ba6b665dfbfe0d295?sid=8ad8d273-b0bb-48ca-b456-1b137384b9de" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

If you want to learn more about how this all works, check out the [Understand Checkly Traces](/docs/open-telemetry/how-it-works/) section.

