---
title: Url and Custom Domain
weight: 1
menu:
  docs:
    parent: "Dashboards"
aliases:
- "/dashboards/dashboard-url/"
- "/docs/dashboards/dashboard-url/"
---

Checkly dashboards are public dashboards available on every plan. Use them on your wall mounted TVs, on
shared monitors around the office or as a status page on your site.

An example of a dashboard is [status.checklyhq.com](https://status.checklyhq.com).

> Dashboards can be **embedded in iframes**.

You can create multiple, distinct dashboards based on your plan. Edit your dashboard by clicking on
the **Dashboards** button on the Checkly default dashboard page.

## Custom URL

Every public dashboard comes with a configurable custom subdomain under the checklyhq.com domain. By default, we generate
a random ID. You can change this subdomain to anything you like as long as it is unique among all Checkly users.
Typically a company name works best.

![custom url for public dashboard](/docs/images/dashboards/custom_url.png)


## Custom Domain

You can host your public dashboard under your own domain. To make this work, you need to do two things:

1. Add a valid custom domain to your dashboard setting.

![custom domain for public dashboard](/docs/images/dashboards/custom_domain.png)

2. Create a CNAME record in your DNS that points to **dashboards.checklyhq.com**

Any DNS provider will have the option to easily add CNAME records. For example, on AWS Route 53 this looks like this.

![add cname to DNS provider](/docs/images/dashboards/aws_cname.png)

> **SSL/TLS encryption is automatically provisioned** for all dashboards on a custom domain on the first request to that domain. This
initial request might take a bit longer.
