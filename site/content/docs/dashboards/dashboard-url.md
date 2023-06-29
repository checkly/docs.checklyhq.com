---
title: Url and Custom Domain
weight: 51
menu:
  resources:
    parent: "Legacy Dashboards"
    identifier: legacy-dashboards-url-and-custom-domain
cli: true
---

## Custom URL

Every dashboard comes with a configurable custom subdomain under the checklyhq.com domain. By default, we generate
a random ID. You can change this subdomain to anything you like as long as it is unique among all Checkly users.
Typically a company name works best.

![custom url for your dashboard](/docs/images/dashboards/custom_url.png)


## Custom Domain

You can host your dashboard under your own domain. To make this work, you need to do two things:

1. Add a valid custom domain to your dashboard setting.

![custom domain for your dashboard](/docs/images/dashboards/custom_domain.png)

2. Create a CNAME record in your DNS that points to **dashboards.checklyhq.com**

Any DNS provider will have the option to easily add CNAME records. For example, on AWS Route 53 this looks like this.

![add cname to DNS provider](/docs/images/dashboards/aws_cname.png)

> **SSL/TLS encryption is automatically provisioned** for all dashboards on a custom domain on the first request to that domain. This
initial request might take a bit longer.
