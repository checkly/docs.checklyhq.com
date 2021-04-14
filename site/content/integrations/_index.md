---
title: Integration
heroTitle: Connect to the tools you already use
heroDescription: >-
  Checkly works with the key tools, frameworks and platforms in the modern development eco-system.
highlights:
  - label: TERRAFORM
    title: Achieve monitoring as code
    description: >-
      Our Terraform provider enables codified monitoring - manage, scale and alter your checks through a powerful CLI workflow.
    image: "/integrations/highlight/terraform-featured-image@2x.png"
    tabIcon: "/integrations/highlight/terraform-logo@2x.png"
    ctaLink: "/docs/integrations/terraform/"
  - label: VERCEL
    title: Run checks on every deploy
    description: >-
      Run your auto-generated health-, E2E- and API-checks on every deploy to make sure never to deploy broken apps.
    image: "/integrations/highlight/vercel@2x.png"
    tabIcon: "/integrations/highlight/vercel-logo@2x.png"
    ctaLink: "/docs/cicd/vercel/"
  - label: SLACK
    title: Get alerted when things go wrong
    description: >-
      Get detailed alerts and logs in Slack when a check fails, degrades, or recovers.
    image: "/integrations/highlight/slack-featured-image@2x.png"
    tabIcon: "/integrations/highlight/slack-logo@2x.png"
    ctaLink: "/docs/integrations/slack/"
alerting:
  - service: Email
    icon: "/integrations/alerting/email@2x.png"
    iconWidth: 42
    iconHeight: 30
    ctaLink: "/docs/alerting/alert-channels"
    description: >-
      Get alerted via email when a check fails, degrades or recovers.
  - service: SMS
    icon: "/integrations/alerting/sms@2x.png"
    iconWidth: 41
    iconHeight: 41
    ctaLink: "/docs/alerting/sms-delivery/"
    description: >-
        Get alerted with a text message when a check fails, degrades or recovers.
  - service: Slack
    icon: "/integrations/alerting/slack@2x.png"
    iconWidth: 40
    iconHeight: 40
    ctaLink: "/docs/integrations/slack/"
    description: >-
        Get detailed alerts and logs in Slack when a check fails, degrades or recovers.
  - service: Pagerduty
    icon: "/integrations/alerting/pagerduty@2x.png"
    iconWidth: 43
    iconHeight: 42
    ctaLink: "/docs/integrations/pagerduty/"
    description: >-
      Open and close incidents automatically in Pagerduty for as many teams as you need.
  - service: OpsGenie
    icon: "/integrations/alerting/opsgenie@2x.png"
    iconWidth: 33
    iconHeight: 39
    ctaLink: "/docs/integrations/opsgenie/"
    description: >-
        Open and close incidents automatically in OpsGenie for as many teams as you need.
  - service: Discord
    icon: "/integrations/alerting/discord@2x.png"
    iconWidth: 35
    iconHeight: 42
    ctaLink: "/docs/integrations/discord/"
    description: >-
        Get alerted in a Discord server when a check fails, degrades or recovers.
  - service: Microsoft Teams
    icon: "/integrations/alerting/microsoftteam@2x.png"
    iconWidth: 40
    iconHeight: 38
    ctaLink: "/docs/integrations/msteams/"
    description: >-
        Get alerts in MS Teams when a check fails, degrades or recovers.
  - service: Splunk On-Call
    icon: "/integrations/alerting/splunk@2x.png"
    iconWidth: 40
    iconHeight: 40
    ctaLink: "/docs/integrations/splunk_on_call/"
    description: >-
        Open and close incidents automatically in Splunk On-Call for as many teams as you need.
  - service: GitLab Alerts
    icon: "/integrations/alerting/gitlab@2x.png"
    iconWidth: 40
    iconHeight: 37
    ctaLink: "/docs/integrations/gitlab_alerts/"
    description: >-
        Open and close incidents automatically in GitLab Alerts for as many teams as you need.
  - service: Spike.sh
    icon: "/integrations/alerting/spike@2x.png"
    iconWidth: 40
    iconHeight: 40
    ctaLink: "/docs/integrations/spike/"
    description: >-
        Open and close incidents automatically in Spike.sh for as many teams as you need.
  - service: Webhooks
    icon: "/integrations/alerting/webhooks@2x.png"
    iconWidth: 42
    iconHeight: 39
    ctaLink: "/docs/alerting/webhooks/"
    description: >-
        Integrate with almost anything using our detailed, powerful and flexible webhooks.
triggers:
  - service: Vercel
    icon: "/integrations/triggers/vercel@2x.png"
    iconWidth: 40
    iconHeight: 40
    ctaLink: "/docs/cicd/vercel/"
    description: >-
      Create and run checks automatically against production and preview environments for all your Vercel projects.
  - service: GitHub Deployments
    icon: "/integrations/triggers/github@2x.png"
    iconWidth: 40
    iconHeight: 40
    ctaLink: "/docs/cicd/github/"
    description: >-
      Run your checks right after a deploy and get a detailed report directly in your GitHub pull request.
frameworks:
  - service: Playwright
    icon: "/integrations/frameworks/playwright@2x.png"
    iconWidth: 40
    iconHeight: 40
    ctaLink: "/docs/browser-checks/"
    description: >-
      Use the powerful Playwright framework to script your browser interactions. We run them every 5 minutes in a real browser.
  - service: Puppeteer
    icon: "/integrations/frameworks/puppeteer@2x.png"
    iconWidth: 40
    iconHeight: 58
    ctaLink: "/docs/browser-checks/"
    description: >-
        Use the Puppeteer framework to script your browser interactions. We run them every 5 minutes in a real browser.
  - service: JavaScript
    icon: "/integrations/frameworks/javascript@2x.png"
    iconWidth: 40
    iconHeight: 40
    ctaLink: "/docs/browser-checks/"
    description: >-
        Use the power of Javascript to augment your checks; fetch tokens, validate payloads, setup and teardown test cases.
infrastructure:
  - service: Terraform
    icon: "/integrations/infrastructure/terraform@2x.png"
    iconWidth: 114
    iconHeight: 44
    ctaLink: "/docs/integrations/terraform/"
    description: >-
      Manage your monitoring setup, at scale, from your codebase using our Terraform provider.
  - service: Prometheus
    icon: "/integrations/infrastructure/prometheus@2x.png"
    iconWidth: 40
    iconHeight: 40
    ctaLink: "/docs/integrations/prometheus/"
    description: >-
      Export your monitoring data to Prometheus and integrate it into your Graphana dashboards.
---
