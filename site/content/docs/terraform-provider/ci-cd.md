---
title: CI/CD setups
weight: 12
menu:
  docs:
    parent: "Terraform provider"
---

## CI/CD compatibility

Terraform relies on its stored state to know which resources it is supposed to manage and what to do to apply your configuration. If you are applying Terraform configurations from different machines, or are working on your setup with your colleagues, you need to make sure the Terraform state stays in sync. Failure to do that will lead to duplicated resources and other critical issues with your checks and other managed resources.

Terraform enables [remote state](https://www.terraform.io/language/state/remote) management using [backends](https://www.terraform.io/language/settings/backends). If you are new to Terraform and plan to use it with Checkly together with your team or the rest of your organization, make sure you set up a remote backend to enable frictionless collaboration.

{{<info>}}
HashiCorp's [Terraform Cloud](https://www.terraform.io/cloud) comes with remote state management built-in.
{{</info>}}

