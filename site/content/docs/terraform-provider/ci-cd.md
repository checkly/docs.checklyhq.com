---
title: CI/CD pipelines
weight: 12
menu:
  integrations:
    parent: "Terraform provider"
---

If you are using or planning to use Terraform to manage your monitoring resources, chances are you will be using it in some sort of shared pipeline. This page aims to show how to get up and running with different CI/CD tools.

{{<info>}}
The Terraform and the Checkly Terraform provider work seamlessly with all major CI servers. Even if your tool of choice is not listed below, Terraform and the provider will very likely still integrate with it without issues.
{{</info>}}

## Handling remote state

Terraform relies on its stored state to know which resources it is supposed to manage and what to do to apply your configuration. If you are applying Terraform configurations from different machines, or are working on your setup with your colleagues, you need to make sure the Terraform state stays in sync. Failure to do that will lead to duplicated resources and other critical issues with your checks and other managed resources.

Terraform enables [remote state](https://www.terraform.io/language/state/remote) management using [backends](https://www.terraform.io/language/settings/backends). If you are new to Terraform and plan to use it with Checkly together with your team or the rest of your organization, make sure you set up a remote backend to enable frictionless collaboration.

## Terraform Cloud

[Terraform Cloud](https://terraform.io/cloud) allows you to automate setting up your monitoring resources on Checkly, while also [taking care](https://www.terraform.io/cloud-docs/workspaces/state) of remote state management for you, with no configuration needed.

![checkly terraform cloud integration diagram](/docs/images/terraform-provider/hashicorp-terraform-checkly-horizontal.png)

Getting started with Terraform Cloud is simple: you only need to create a new workspace and [link it to version control](https://www.terraform.io/cloud-docs/vcs). 

![terraform cloud new vcs project](/docs/images/terraform-provider/cicd-1.png)

Our linked repository will contain our Terraform code, for example:

```terraform
variable "checkly_api_key" {}
variable "checkly_account_id" {}

terraform {
  required_providers {
    checkly = {
      source = "checkly/checkly"
      version = "~> 1.0"
    }
  }
}

provider "checkly" {
  api_key = var.checkly_api_key
  account_id = var.checkly_account_id
}

// Your resources here
```

While you can apply your Terraform configuration on-demand by clicking `Actions` and `Start new plan`, you will likely want to have your workspace set up to automatically apply it on every push to the default branch of the linked repository. You can enable that through the `Auto apply` option under the `General` settings panel of your Terraform Cloud workspace.

![terraform cloud auto apply](/docs/images/terraform-provider/cicd-2.png)

Any new push to the default branch of the repository will now result in your latest Terraform configuration being applied, which in turn means your Checkly monitoring setup will be updated.

![terraform cloud apply report](/docs/images/terraform-provider/cicd-3.png)

{{<info>}}
This is a v1 page. We will be adding further guides on how to integrate with other CI servers going forward.
{{</info>}}
