---
title: Summer update
date: 2018-07-26
author: Tim Nolet
sitemapExclude: true
---

Over the last few weeks we polished and refined some existing features and added a bunch that we're at t
he top of the wish list. To start, **we added 1 minute schedules** to all API checks.

## 🔒  SSL Certificate Monitoring

Much requested and now finally live. Checkly now also alerts you when your SSL certificate is about to expire.
We will start nudging you from 30 days till expiry till D-day. [Read more about how SSL montoring works](docs/alerting/ssl-expiration/)

<!--more-->


## 📊  Custom Domains for TV-mode dashboards

We tweaked and upgraded the TV mode dashboard which you can now host on a personal sub domain on checklyhq.com or on your own custom domain.
[Read more about using custom domains](/docs/dashboards/)

## 🔫  Triggers

Sometimes you just want to run a check ad hoc without logging into Checkly or dealing with scheduling. Now you can. Using triggers, you  can create a custom
url to call your check. Use it in a CI/CD pipeline or just from a shell. [Learn how to create trigger](/docs/browser-checks/triggers/).
