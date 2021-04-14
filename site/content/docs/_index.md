---
title: Checkly documentation
---
Learn how to use Checkly to monitor your vital frontend webapp transactions and backend API's. Our docs cover everything 
from initial setup, scripting with extensive JavaScript examples to alerting and integrations.

## Getting started: monitoring & alerting

Start with monitoring your key webapp flows, your backend API's and set up alerting, so you get a notification when things
break or slow down.

<div class="cards-list">
{{< doc-card 
	  class="two-column-card"
	  headerTag="h3"
	  title="Create browser checks"
	  img="/docs/images/icons/chrome@2x.png" 
	  description="Use JavaScript and Headless browsers to navigate, screenshot and assert your key webapp flows. E2E monitoring as it should be."
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
	description="Get notified about outages, broken transactions or slow downs in your webapps and APIs. Connect to one of our many integrations like Slack, Pagerduty and Discord. Our Webhooks are especially flexible."
	link="/docs/alerting"
>}}
</div>

## Diving deeper

Checkly offers a lot of power and perks to modern developers and DevOps teams. Manage checks at scale with Terraform, hook into your CI/CD and deployment flow. 

<div class="cards-list">
{{< doc-card
	class="full-width-card"
	headerTag="h3"
	title="Terraform"
	img="/docs/images/icons/plug@2x.png"
	description="Manage and scale your complete monitoring configuration right from your code base with our official Hashicorp Terraform provider."
	link="/docs/integrations/terraform/"
>}}
{{< doc-card
	class="full-width-card"
	headerTag="h3"
	title="CI/CD and deployments"
	img="/docs/images/icons/infinity@2x.png"
	description="Catch bugs and breakage early by triggering your checks from your deployment platforms and CI/CD pipelines. Integrates with GitHub, Vercel, Heroku and basically all CI providers."
	link="/docs/cicd/"
>}}
{{< doc-card
	class="full-width-card"
	headerTag="h3"
	title="Headless Recorder"
	img="/docs/images/icons/headless-recorder@2x.png"
	description="Create Puppeteer and Playwright E2E testing scripts super fast with our open source Headless Recorder Chrome extension. Click record, navigate your site and export."
	link="/docs/headless-recorder/"
>}}
</div>

## Additional resources

<div class="cards-list">
{{< doc-card class="three-column-card" title="Groups" description="Organize your checks and D.R.Y. up your code and configuration." link="/docs/groups" >}}

{{< doc-card class="three-column-card" title="Dashboards" description="Whip up a status page on your own domain or create an internal dashboard." link="/docs/dashboards" >}}

{{< doc-card class="three-column-card" title="Maintenance Windows" description="Manage your scheduled maintenance periods so your numbers don't get skewed." link="/docs/maintenance-windows" >}}

</div>



