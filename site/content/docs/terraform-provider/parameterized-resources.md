---
title: Parameterized resources
weight: 9
menu:
  docs:
    parent: "Terraform provider"
---

There are cases where you might want to declare a single, parameterized resource in place of a (possibly variable) number of resources to be managed. Terraform enables this through some of its native constructs.

## File-based parameterization 

You can use a combination of the [`for_each` meta-argument](https://www.terraform.io/language/meta-arguments/for_each) and the [fileset function](https://www.terraform.io/language/functions/fileset) to your advantage, for example when creating browser checks that share all their settings apart from their script:

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

{{<info>}}
Aside from checks, these constructs can be useful for a variety of resources like alert channels, snippets and more.
{{</info>}}
