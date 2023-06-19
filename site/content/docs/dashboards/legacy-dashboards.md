---
title: Legacy Dashboards
weight: 51
menu:
  resources:
    parent: "Dashboards"
cli: true
---

{{< warning >}}
Legacy Dashboards will be deprecated June 1st 2023.
{{< /warning >}}

## Migrating to Dashboards V2

Our new Dashboards bring a ton of improvements over the first incarnation:
- Incident management to keep your audience in the loop on outages and maintenance.
- Better and longer range metrics for all check types.
- Custom CSS to style your dashboard and match your brand colors.
- Fully responsive and served from the worldwide Vercel CDN for speedy loading times.

[Check out the new docs](/docs/dashboards/) and read below how to migrate.

Migrating to the new dashboards takes a couple of steps. Let's say you have a legacy dashboard hosted under the custom 
domain `status.acme.com`

Go to the [dashboards overview page](https://app.checklyhq.com/dashes) and click the relevant dashboard you want to migrate and click edit. 
You will see two things:

1. Your new dashboard is already available on a **custom URL** ending in `.checkly-dashboards.com`. It will have the same 
checks and other config as your legacy dashboards, just with the new design.

2. If you use a **custom domain**, you need to update the `CNAME` record for `status.acme.com` in your DNS to the new `checkly-dashboards.com` domain. 
This record is probably pointing to `dashboards.checklyhq.com` right now.

After updating your DNS it can take some minutes for the changes to propagate.

## Troubleshooting

We have synced most the custom domains with our new hosting provider Vercel: you only need to point your DNS towards the 
new domain `checkly-dashboards.com`. However, if you find your dashboard not resolving after updating your DNS please reach 
out to support on support@checklyhq.com with your domain name (e.g. status.acme.com).

In some cases, our provider will ask you to verify you are the owner of the domain by adding another `TXT` record to you
your DNS. You will see a notice similar to the one below.

![verify domain via txt recrod](/docs/images/dashboards-v2/dashboards_txt_record.png)




