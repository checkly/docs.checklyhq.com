---
title: Importing your backend traces to Checkly
weight: 40
menu:
  integrations:
    parent: "Traces (beta)"
beta: true
---

Exporting your check results as traces to a 3rd party OpenTelemetry backend is a great way to correlate check runs with other
telemetry data. It's also very simple to set up.
<!--more-->

1. Flip the **Basic HTTP instrumentation** toggle in [the OpenTelemetry integration in your Checkly account](https://app.checklyhq.com/settings/account/open-telemetry).

   ![Enable basic instrumentation](/docs/images/integrations/otel/otel_basic_instrumentation.png)

   
2. Provide the trace endpoint URL and HTTP header with an API key for your preferred 3rd party OpenTelemetry
   backend. Done.

   ![Provide URL and header with authentication](/docs/images/integrations/otel/otel_export_traces_settings.png)

After you've set this up, Checkly will instrument every HTTP request with a proper `traceparent` and `tracestate` header
and send every check run as a trace to your 3rd party OpenTelemetry backend.

## Popular 3rd party OTel backends

<div class="cards-list">
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Coralogix"
	img="/docs/images/integrations/otel/backends/coralogix_icon.svg"
	link="/docs/integrations/coralogix/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Grafana Tempo"
	img="/docs/images/integrations/otel/backends/grafana-tempo_icon.svg"
	link="/docs/open-telemetry/exporting-traces/grafana-tempo/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Honeycomb"
	img="/docs/images/integrations/otel/backends/honeycomb_icon.svg"
	link="/docs/open-telemetry/exporting-traces/honeycomb/"
>}}
</div>
<div class="cards-list">
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="New Relic"
	img="/docs/images/integrations/otel/backends/newrelic_icon.svg"
	link="/docs/open-telemetry/exporting-traces/newrelic/"
>}}
</div>
