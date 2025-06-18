---
title: Getting started with Checkly - Checkly Docs
displayTitle: Getting started with Checkly
navTitle: Get Started
aliases:
  - /docs/
---

Checkly gives you code-first synthetic monitoring for modern DevOps. Monitor your APIs, service connectivity and apps at a fraction of the price of legacy providers. Powered by Monitoring as Code and Playwright.

## Get started with monitoring as code

Get started with monitoring as code by picking the right integration for your team. We recommend using the **Checkly CLI**
for the full code, test and deploy workflow.

<div class="cards-list">
{{< doc-card
	class="full-width-card"
	headerTag="h3"
	title="Checkly CLI"
	img="/docs/images/icons/terminal.svg"
	description="Code, test and deploy your monitoring configuration using a JavaScript/TypeScript-native workflow right from your code base."
	link="/docs/cli/"
>}}

{{< doc-card
class="full-width-card"
headerTag="h3"
title="Terraform"
img="/docs/images/icons/integrations.svg"
description="Manage and scale your complete monitoring configuration right from your code base with our official Hashicorp Terraform provider."
link="/docs/terraform-provider/"
>}}
</div>


## Get started using AI IDEs and Copilots

Checkly is designed to work with AI IDEs and Copilots. You can use your preferred provider to generate code for API
Checks, Browser Checks and all other constructs.

{{< markdownpartial "/_shared/ai-ide-copilot-cards.md" >}}

## Get started using the web UI

Not quite ready to start your monitoring as code journey? No problem. Get started using just the web UI and you'll be
monitoring in minutes.

<div class="cards-list">
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="Create a Browser check"
	  img="/docs/images/icons/browser-checks.svg"
	  description="Use TS / JS with @playwright/test and Headless browsers to navigate, screenshot and assert your key webapp flows."
	  link="/docs/browser-checks/"
>}}
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="Create an API check"
	  img="/docs/images/icons/api.svg"
	  description="Monitor the latency and assert the correctness of your API endpoints. Use inline scripts and code to customize everything."
	  link="/docs/api-checks"
>}}
</div>

<div class="cards-list">
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="Create a Multistep check"
	  img="/docs/images/icons/multistep-check-stroked.svg"
	  description="Write Node.js scripts that run multiple API requests in sequence, with arbitrary code between requests and get all the data."
	  link="/docs/multistep-checks/"
>}}
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
    title="Create a TCP check"
    img="/docs/images/icons/tcp.svg"
    description="Monitor the availability and performance of your TCP services by establishing TCP connections and verifying the response."
    link="/docs/tcp-checks/"
>}}
</div>

<div class="cards-list">
{{< doc-card
   class="two-column-card"
   headerTag="h3"
   title="Create a Heartbeat check"
   img="/docs/images/icons/heartbeats-check-stroked.svg"
   description="Monitor your backup jobs, data imports, and other recurring jobs or scripts by pinging Checkly at a regular interval."
   link="/docs/heartbeat-checks/"
>}}
{{< doc-card
 class="two-column-card"
 headerTag="h3"
 title="Set up alert channels"
 img="/docs/images/icons/alerting.svg"
 description="Get notified about outages or slow downs in your webapps and APIs. Connect to one of our many integrations like Slack and Pagerduty."
 link="/docs/alerting"
>}}
</div>

## Additional resources

<div class="cards-list">
{{< doc-card class="three-column-card" title="Dashboards" description="Whip up a status page on your own domain or create an internal dashboard." link="/docs/dashboards" >}}
{{< doc-card class="three-column-card" title="Private Locations" description="Run your Checks wherever you want: inside your firewall, VPC or K8S cluster. " link="/docs/private-locations" >}}
{{< doc-card class="three-column-card" title="Groups" description="Organize your checks and D.R.Y. up your code and configuration." link="/docs/groups/" >}}
</div>

