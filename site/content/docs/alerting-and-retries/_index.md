---
title: 'Overview'
weight: 29
slug: /
menu:
  resources:
   parent: "Alerting & retries"
cli: true
aliases:
  - /docs/alerting/
---

Checkly will alert you when your checks [change state](/docs/retries-and-alerting/alert-states), e.g. when a passing check starts failing. To make the most out of Checkly alerts, you will want to configure them so they fit your workflow.

You can break Checkly alerting down to three main areas:
1. [Alert settings](/docs/retries-and-alerting/alert-settings), controlling **when** and **how often** you want to be alerted when a check fails/degrades/recovers.
2. [Alert channels](/docs/retries-and-alerting/alert-channels), determining **how** alert notifications will be sent to you.
3. [Retries](/docs/retries-and-alerting/retries), which will help you avoid false positives by re-running failed checks.
