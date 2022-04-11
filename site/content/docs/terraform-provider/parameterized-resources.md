---
title: Parameterized resources
weight: 9
menu:
  docs:
    parent: "Terraform provider"
---

## Parameterised check resources

Terraform enables you to declare a parameterised resource once while having it manage multiple similar resources. You can use this to your advantage, for example when creating browser checks that share all their settings apart from their script:

```terraform
resource "checkly_check" "browser-check" {}
  for_each = fileset("${path.module}/scripts", "*") // Iterates through the files in the scripts folder in your project's directory

  name                      = each.key              // Sets the check name to match the file's 
  type                      = "BROWSER"
  activated                 = true
  frequency                 = 1
  double_check              = true
  ssl_check                 = false
  locations = [
    "us-west-1",
    "eu-central-1"
  ]

  script = file("${path.module}/scripts/${each.key}") // Assigns the script contained in each file to each new created check resource

}
```

This will create as many browser checks running each minute as there are files in the `./scripts` folder in your project's path.

You can find more information on the [`for_each` meta-argument](https://www.terraform.io/language/meta-arguments/for_each) and the [fileset function](https://www.terraform.io/language/functions/fileset) on the official Terraform documentation.

Keep in mind these constructs can be useful for a variety of resources, not just for checks.