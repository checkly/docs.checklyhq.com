---
title: Export traces to 3rd party tools with Checkly - Checkly Docs
displayTitle: Export traces to 3rd party tools with Checkly
navTitle: Exporting traces
identifier: exporting-traces
weight: 30
menu:
  platform:
    parent: "Traces (beta)"
beta: true
aliases:
  - "/docs/open-telemetry/exporting-traces/"
---

Exporting your check results as traces to a 3rd party OpenTelemetry backend is a great way to correlate check runs with other
telemetry data. It's also very simple to set up.
<!--more-->
   
1. Flip the toggle to export traces in the [Traces settings page](https://app.checklyhq.com/settings/account/traces).
   
2. Provide the trace endpoint URL and HTTP header with an API key for your preferred 3rd party OpenTelemetry
   backend.

   ![Provide URL and header with authentication](/docs/images/otel/otel_export_traces_settings.png)

After you've set this up, Checkly will instrument every HTTP request with a proper `traceparent` and `tracestate` header
and send every check run as a trace to your 3rd party OpenTelemetry backend.

## Popular 3rd party OTel backends

<div class="cards-list">
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Coralogix"
	img="/docs/images/otel/backends/coralogix_icon.svg"
	link="/docs/integrations/coralogix/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Grafana Tempo"
	img="/docs/images/otel/backends/grafana-tempo_icon.svg"
	link="/docs/open-telemetry/exporting-traces/grafana-tempo/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Honeycomb"
	img="/docs/images/otel/backends/honeycomb_icon.svg"
	link="/docs/open-telemetry/exporting-traces/honeycomb/"
>}}
</div>
<div class="cards-list">
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="New Relic"
	img="/docs/images/otel/backends/newrelic_icon.svg"
	link="/docs/open-telemetry/exporting-traces/newrelic/"
>}}
</div>
