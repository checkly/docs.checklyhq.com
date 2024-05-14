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
The OpenTelemetry integration is currently in **private beta**. If you are intestested in participating, please reach out to us at support@checklyhq.com.
{{< /info >}}

With the Checkly OpenTelemetry (OTel) integration, you can find out why your business critical checks are failing and resolve
issues 10x faster than before. This works as follows:

1. All HTTP requests made by your checks are automatically instrumented with W3C `traceparent` and 
`tracestate` headers.
2. **Send every check run to your 3rd party OTel backend as a span**, enabling you to correlate check runs 
and their metadata like check run location, check name etc. with other telemetry data.
3. **Ingest traces into Checkly from your OTel setup** and display them in the Checkly UI, allowing you to 
correlate check results with traces.

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

