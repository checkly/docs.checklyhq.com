---
title: Getting started with OpenTelemetry
weight: 1
menu:
  integrations:
    parent: "OpenTelemetry (beta)"
    identifier: getting-started-otel
beta: true
---

With the Checkly OpenTelemetry (OTel) integration, you can find out why your business critical checks are failing and resolve
issues 10x faster than before. This works as follows:

1. All HTTP requests made by your checks are automatically instrumented with standard W3C compliant `traceparent` and 
`tracestate` headers.
2. You can **send every check run to your 3rd party OTel backend as a span**, enabling you to correlate check runs 
and their metadata like check run location, check name etc. with other telemetry data.
3. You can **ingest traces into Checkly from your OTel setup** and display them in the Checkly UI, allowing you to 
correlate check results with traces.

To get started with the Checkly OpenTelemetry integration, pick a scenario that best fits your needs.

<div class="cards-list">
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="I don't have an OpenTelemetry setup"
	  description="We'll guide you how to instrument your app and send traces directly to Checkly. No need to set up a 3rd party OpenTelemetry collector."
	  img="/docs/images/icons/opentelemetry_gray.svg"
	  link="/docs/open-telemetry/instrumenting-code/"
>}}
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="I have an OpenTelemetry setup"
	  description="We'll guide you how to send traces to your 3rd party OpenTelemetry backend and ingest them into Checkly too."
	  img="/docs/images/icons/opentelemetry.svg"
	  link="/docs/open-telemetry/sending-traces/"
>}}
</div>

<br>

If you want to learn more about how this all works, check out the [How it works under the hood](#how-it-works-under-the-hood) 
section below 👇

## How it works under the hood

To help you understand how the Checkly OpenTelemetry integration works, have a look at the diagram below that details
the (possible) dataflows and how they connect to Checkly's monitoring and alerting pipeline.

![checkly open telemetry diagram](/docs/images/integrations/otel/checkly_otel_diagram.png)

1. When enabling the integration, Checkly will automatically instrument all HTTP requests made by your checks with `traceparent` 
and `tracestate` headers. These HTTP requests hit your web application and / or API as normal.

      We do this for all of our synthetic check types, including API, Browser and Multistep checks. For the `traceparent`
      we generate a [W3C compliant trace ID](https://www.w3.org/TR/trace-context/#trace-context-http-headers-format) for 
      each HTTP request that is part of a check. This means that for Browser checks and Multistep checks, there can be multiple
      requests instrumented.

      Similarly, we add the `tracestate` header to identify Checkly as the vendor that generated the trace by setting it 
      to `checkly=true`. Together with the `traceparent` header, these headers are used to propagate the trace context
      along the request chain.
      
      This is the most basic way of tying a synthetic check to your backend traces. It will however not give you a ton 
      of **context** about the check run itself, like the check name, location etc.

2. You can configure your 3rd party backend in the Checkly UI, so we can also send every check result as a span to your 
backend. The result is that now all backend spans are correlated to the check run that triggered them, together with a
full context of the check run, like the run location, check name, check type etc. These items are stored in the `checkly` 
namespace as attributes on the span i.e.


    ```yaml
      checkly.check.name: "ACME homepage"
      checkly.check.id: "438481ea-0eab-43d6-8932-ab51bd0d49d6"
      checkly.check.type: "browser"
      checkly.check.location: "eu-west-1"
    ```  

**Step 3 and 4 are what really kicks Checkly's OTel integration into high gear**, and it works even if you do not have a 
3rd party OTel backend already set up.

3. By adding the correct OTel libraries and some simple extra filter statements, you can send ONLY the traces related to 
your Checkly checks back to Checkly. We ingest these traces on one of our endpoints, e.g. `otel.eu-west-1.checklyhq.com/v1/traces` 
and display them in the Checkly UI, right next to your check results. 

    **No 3rd party backend needed. 😲**

   Checkly's trace ingestion endpoint is a standard OTel backend endpoint, but we only accept traces that are related
   to synthetic checks, e.g. those marked with `tracestate: checkly=true`. This way, you can keep your OTel setup lean and mean
   and still get all the benefits of correlating check results with backend traces.

4. When your check breaks, you can get an alert that points to a check result. This result now contains a full trace of the
check run, including all backend spans. This allows you to quickly identify the root cause of the issue, without having to
jump to other tooling or dashboards.
