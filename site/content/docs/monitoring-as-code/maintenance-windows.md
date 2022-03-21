---
title: Service maintenance windows
weight: 6
menu:
  docs:
    parent: "Monitoring-as-Code"
---

With [maintenance windows](/docs/maintenance-windows/) you can schedule planned maintenance for whatever you are monitoring in order to prevent your checks from running at specific times. Maintenance windows have their own resource:

```terraform
resource "checkly_maintenance_windows" "maintenance-1" {
  name            = "Maintenance Windows"
  starts_at       = "2014-08-24T00:00:00.000Z"
  ends_at         = "2014-08-25T00:00:00.000Z"
  repeat_unit     = "MONTH"
  tags = [
    "auto",
  ]
}
```

You can see all the configuration options for maintenance windows, as well as more examples, on the official Terraform registry [documentation page](https://registry.terraform.io/providers/checkly/checkly/latest/docs/resources/checkly_maintenance_windows).
