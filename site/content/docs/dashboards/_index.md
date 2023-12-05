---
title: Overview
weight: 46
slug: /
menu:
  resources:
    parent: "Dashboards"
    identifier: overview-dashboards-v2
aliases:
  - "/dashboards/overview/"
  - "/docs/dashboards/overview/"
  - "/docs/dashboards/"
cli: true
---

You can use Checkly Dashboards to communicate check status and incidents to non-Checkly users. Use
them as a status page for your app, a service or as a dashboard on a wall-mounted TV in the office.

![Dashboard example](/docs/images/dashboards-v2/public-dashboard-1.png)

Dashboards allow you to do the following:

- Show the status of all your checks, or a subset by filtering by `tag`.
- Show the availability and p95 / p99 response times over the last 24 hours, 7 days and 30 days.
- Communicate custom incident messages and maintenance messages.

You can create multiple, distinct dashboards based on your plan. Edit your dashboard by clicking on
the **Dashboards** button on the Checkly dashboard page.


*Check out our [Checkly Production Dashboard](https://status.checkly-dashboards.com) for a live example* 

## Adding checks to your dashboard

You add checks to your dashboards by adding tags to checks and then referencing them in your dashboard. This is how it works:

1. First add tags to one or more checks you would like to show. This is done by editing the check(s). 

![Tags](/docs/images/dashboards-v2/tags.png)

2. Then, edit the dashboard to include the tag:

![Filter by tags](/docs/images/dashboards-v2/filter_by_tag.png)
