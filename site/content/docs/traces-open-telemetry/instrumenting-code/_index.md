---
title: Instrumenting your code with OpenTelemetry
metatags:
  title: "Instrumenting your code with OpenTelemetry"
  description: "Instrument your application code with OpenTelemetry and send traces to Checkly."
weight: 30
menu:
  platform:
    parent: "OpenTelemetry (beta)"
beta: true
---

If you are completely new to OpenTelemetry, you should start by instrumenting your web facing application code with the 
relevant OTel libraries. This will allow you to send traces directly to Checkly without setting up a 3rd party OpenTelemetry collector.
<!--more-->
Below you will find instructions on how to instrument your popular languages and frameworks, and how to send traces to Checkly.

## Languages

<div class="cards-list">
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Node.js"
	img="/docs/images/integrations/otel/otel-languages/nodejs_icon.svg"
	link="/docs/open-telemetry/instrumenting-code/nodejs/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Python"
	img="/docs/images/integrations/otel/otel-languages/python_icon.svg"
	link="/docs/open-telemetry/instrumenting-code/python/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Java"
	img="/docs/images/integrations/otel/otel-languages/java_icon.svg"
	link="/docs/open-telemetry/instrumenting-code/java/"
>}}
</div>

<div class="cards-list">
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="PHP"
	img="/docs/images/integrations/otel/otel-languages/php_icon.svg"
	link="/docs/open-telemetry/instrumenting-code/php/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Go"
	img="/docs/images/integrations/otel/otel-languages/go_icon.svg"
	link="/docs/open-telemetry/instrumenting-code/go/"
>}}
</div>
<br>

## Frameworks

<div class="cards-list">
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Next.js"
	img="/docs/images/integrations/otel/otel-languages/nextjs_icon.svg"
	link="/docs/open-telemetry/instrumenting-code/nextjs/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Express.js"
	img="/docs/images/integrations/otel/otel-languages/expressjs_icon.svg"
	link="/docs/open-telemetry/instrumenting-code/express/"
>}}
{{< doc-card
	class="three-column-card"
	headerTag="h3"
	title="Ruby on Rails"
	img="/docs/images/integrations/otel/otel-languages/ruby_on_rails_icon.svg"
	link="/docs/open-telemetry/instrumenting-code/ruby-on-rails/"
>}}
</div>
<br>

If you don't find the language or framework you are using in the list above, you can always reference the
[OpenTelemetry Languages docs](https://opentelemetry.io/docs/languages/) directly.
