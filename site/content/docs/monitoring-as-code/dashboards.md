---
title: Public dashboards
weight: 5
menu:
  docs:
    parent: "Monitoring-as-Code"
---

[Public dashboards](http://localhost:3000/docs/dashboards/) allow you to display checks and their related metrics on a single page. They come with their own dedicated resource:

```terraform
resource "checkly_dashboard" "dashboard-1" {
  custom_url      = "checkly"
  logo            = "https://www.checklyhq.com/logo.png"
  header          = "Public dashboard"
  refresh_rate    = 60
  paginate        = false
  pagination_rate = 30
  hide_tags       = false
  width           = "FULL"
  tags = [
    "auto",
  ]
}
```

{{<info>}}
By default, if no check is specified, all checks in the account will be shown in the dashboard. If instead you want to show specific checks, you will need to [use tags](http://localhost:3000/docs/dashboards/#adding-checks-to-your-dashboard).
{{</info>}}

You can see all the configuration options for checks, as well as more examples, on the official Terraform registry [documentation page](https://registry.terraform.io/providers/checkly/checkly/latest/docs/resources/checkly_dashboard).