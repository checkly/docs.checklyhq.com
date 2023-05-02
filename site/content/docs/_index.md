---
title: Introduction to Checkly
---

Checkly unites E2E testing and monitoring in one **monitoring as code (MaC)** workflow, enabled by the Checkly CLI.
Monitoring as code is a methodology for managing your monitoring infrastructure using code. It consists of three key steps:

1. **Code** — Define your monitoring setup as code, so you can version, automate and scale them with ease.
2. **Test** — Run your monitors as E2E tests against production and staging from your CI pipeline. 
3. **Deploy** — Deploy and lifecycle your monitoring alongside your application deployments.

With MaC, your synthetic monitoring is now programmable, testable, reviewable and works with your dev pipeline. From your IDE, via PR to CI.

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
img="/docs/images/icons/plug@2x.png"
description="Manage and scale your complete monitoring configuration right from your code base with our official Hashicorp Terraform provider."
link="/docs/integrations/terraform/"
>}}
</div>


## Get started using the web UI

Not quite ready to start your monitoring as code journey? No problem. Get started using just the web UI and you'll be 
monitoring in minutes.

<div class="cards-list">
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="Create browser checks"
	  img="/docs/images/icons/chrome@2x.png"
	  description="Use TS / JS with @playwright/test and Headless browsers to navigate, screenshot and assert your key webapp flows."
	  link="/docs/browser-checks"
>}}
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="Create API checks"
	  img="/docs/images/icons/api@2x.png"
	  description="Monitor the latency and assert the correctness of your API endpoints. Use inline scripts and code to customize everything."
	  link="/docs/api-checks"
>}}
</div>

<div class="cards-list">
{{< doc-card
	class="full-width-card"
	headerTag="h3"
	title="Set up alert channels"
	img="/docs/images/icons/bell@2x.png"
	description="Get notified about outages, broken transactions or slow downs in your webapps and APIs. Connect to one of our many integrations like Slack, Pagerduty and Discord."
	link="/docs/alerting"
>}}
</div>

## Additional resources

<div class="cards-list">
{{< doc-card class="three-column-card" title="Dashboards" description="Whip up a status page on your own domain or create an internal dashboard." link="/docs/dashboards" >}}
{{< doc-card class="three-column-card" title="Private Locations" description="Run your Checks wherever you want: inside your firewall, VPC or K8S cluster. " link="/docs/private-locations" >}}
{{< doc-card class="three-column-card" title="Groups" description="Organize your checks and D.R.Y. up your code and configuration." link="/docs/groups" >}}
</div>

