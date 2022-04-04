---
title: Parameterized check resources
weight: 9
menu:
  docs:
    parent: "Terraform provider"
---

## Parameterised check resources

Terraform enables you to declare a parameterised resource once while having it manage multiple similar resources. You can use this to your advantage, for example when creating browser checks that share all their settings apart from their script:

```terraform
resource "checkly_check" "browser-check" {}
  for_each = fileset("${path.module}/scripts", "*") //

  name                      = each.key //
  type                      = "BROWSER"
  activated                 = true
  frequency                 = 1
  double_check              = true
  ssl_check                 = false
  locations = [
    "us-west-1",
    "eu-central-1"
  ]

  script = file("${path.module}/scripts/${each.key}") //

}
```

This will create as many browser checks running each minute as there are files in the `./scripts` folder in your project's path.

You can find more information on the `for_each` meta-argument on the [official Terraform documentation](https://www.terraform.io/language/meta-arguments/for_each).