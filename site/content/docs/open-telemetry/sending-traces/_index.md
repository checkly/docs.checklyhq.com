---
title: Sending traces to 3rd party backends
weight: 20
menu:
  integrations:
    parent: "OpenTelemetry (beta)"
beta: true
---

Sending your checks as traces to a 3rd party OpenTelemetry backend is a great way to correlate check runs with other
telemetry data. It's also very simple to set up.

1. Flip the **"Basic HTTP instrumentation"** toggle in the OpenTelemetry integration in your Checkly account.
2. Flip the **"Send traces"** toggle and provide the trace endpoint URL and API key for your preferred 3rd party OpenTelemetry
   backend. Done.

After you've set this up, Checkly will instrument every HTTP request with a proper `traceparent` and `tracestate` header
and send every check run as a trace to your 3rd party OpenTelemetry backend.

## Popular 3rd party OTel backends

<div class="cards-list">
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="New Relic"
	img="/docs/images/integrations/otel/backends/newrelic_icon.svg"
	link="/docs/open-telemetry/sending-traces/newrelic/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Grafana Tempo"
	img="/docs/images/integrations/otel/backends/grafana-tempo_icon.svg"
	link="/docs/open-telemetry/sending-traces/grafana-tempo/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Honeycomb"
	img="/docs/images/integrations/otel/backends/honeycomb_icon.svg"
	link="/docs/open-telemetry/sending-traces/honeycomb/"
>}}
</div>
