---
title: Instrument your code with OpenTelemetry
metatags:
  title: "Instrument your code with OpenTelemetry"
  description: "Instrument your application code with OpenTelemetry and send traces to Checkly."
weight: 35
menu:
  platform:
    parent: "Traces"
aliases:
  - "/docs/open-telemetry/instrumenting-code/"
---

Use OpenTelemetry SDKs and libraries to instrument your applications and services. Send traces directly to Checkly without setting up an [OpenTelemetry collector](/learn/opentelemetry/what-is-the-otel-collector/).

If you are new to OpenTelemetry, start by instrumenting your web facing application code with the relevant OpenTelemetry SDKs and libraries.

![OTEL App Diagram with Checkly Traces](/docs/images/otel/checkly-traces-instrument-app-diagram.png)

<!--more-->
Below you will find instructions on how to instrument your code, and how to send traces to Checkly. Select your coding language / framework to begin:

## Languages

<div class="cards-list">
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Node.js"
	img="/docs/images/otel/otel-languages/nodejs_icon.svg"
	link="/docs/traces-open-telemetry/instrumenting-code/nodejs/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Java"
	img="/docs/images/otel/otel-languages/java_icon.svg"
	link="/docs/traces-open-telemetry/instrumenting-code/java/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Go"
	img="/docs/images/otel/otel-languages/go_icon.svg"
	link="/docs/traces-open-telemetry/instrumenting-code/go/"
>}}
</div>
<br>

## Frameworks

<div class="cards-list">
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Next.js"
	img="/docs/images/otel/otel-languages/nextjs_icon.svg"
	link="/docs/traces-open-telemetry/instrumenting-code/nextjs/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Express.js"
	img="/docs/images/otel/otel-languages/expressjs_icon.svg"
	link="/docs/traces-open-telemetry/instrumenting-code/express/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Ruby on Rails"
	img="/docs/images/otel/otel-languages/ruby_on_rails_icon.svg"
	link="/docs/traces-open-telemetry/instrumenting-code/ruby-on-rails/"
>}}
</div>
<div class="cards-list">
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Flask"
	img="/docs/images/otel/otel-languages/flask_icon.svg"
	link="/docs/traces-open-telemetry/instrumenting-code/flask/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Django"
	img="/docs/images/otel/otel-languages/django_icon.svg"
	link="/docs/traces-open-telemetry/instrumenting-code/django/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Laravel"
	img="/docs/images/otel/otel-languages/laravel_icon.svg"
	link="/docs/traces-open-telemetry/instrumenting-code/laravel/"
>}}
</div>
<br>

> If you don't find the language or framework you are using in the list above, you can find all languages and frameworks there's OpenTelemetry support in the [OpenTelemetry Instrumentation docs](https://opentelemetry.io/docs/languages/).