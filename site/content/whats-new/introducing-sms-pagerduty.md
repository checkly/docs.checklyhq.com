---
title: Introducing SMS and Pagerduty integrations
date: 2018-08-23
author: Tim Nolet
sitemapExclude: true
---

![](/whats-new/sms_pagerduty.png)

We did a poll over the last few months what alerting integrations were still missing in Checkly. It was a tie between
SMS and Pagerduty so we build both!

## 📞 SMS Alerting

Still a gold standard in incident response. Got a cell signal? That's enough. Every plan comes with a generous SMS bundle, see the
pricing page for more details or [read more about how to setup SMS alerting](docs/alerting/ssl-delivery/)

## 📟 Pagerduty Alerting

You can link your Pagerduty account to Checkly and we will trigger events whenever a check fails and when it recovers.
This integration only works at the account level, not the individual check level. [Read more about integrating Pagerduty](docs/alerting/pagerduty/)
on our site or check [Pagerduty's integration guide.](https://www.pagerduty.com/docs/guides/checkly-integration-guide/)

<!--more-->
