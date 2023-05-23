---
title: Dashboards
weight: 5
menu:
  integrations:
    parent: "Terraform provider"
---

[Dashboards](/docs/dashboards/) allow you to display checks and their related metrics on a single page. They come with their own dedicated resource:

```terraform
resource "checkly_dashboard" "dashboard-main" {
  custom_url      = "danube"   // A unique subdomain name under "checklyhq.com"
  custom_domain   = "status.danube.com" // A custom user domain
  logo            = "https://www.danube-web.shop/logo.png"  // URL pointing to an image/logo for the page
  header          = "My dashboard"  // What text to display at the top of your dashboard
  refresh_rate    = 60          // How often to refresh the dashboard in seconds
  paginate        = false       // Determines if pagination is on or off
  pagination_rate = 30          // How often to trigger pagination in seconds
  hide_tags       = false       // Whether to show or hide the tags on the dashboard
  width           = "FULL"      // Determines whether to use the full screen or focus in the center
  tags = [                      // One or more tags that filter which checks to display on the dashboard
    "auto"    
  ]
}
```

{{<info>}}
By default, if no check is specified, all checks in the account will be shown in the dashboard. If instead you want to show specific checks, you will need to [use tags](/docs/dashboards/#adding-checks-to-your-dashboard).
{{</info>}}

You can see all the configuration options for checks, as well as more examples, on the official Terraform registry [documentation page](https://registry.terraform.io/providers/checkly/checkly/latest/docs/resources/checkly_dashboard).
