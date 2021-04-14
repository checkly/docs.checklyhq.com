---
title: Terraform
weight: 10
menu:
  docs:
    parent: "Integrations"
---

You can use [Hashicorp's Terraform](https://www.terraform.io/) to create and manage your checks. This allows you to:

1. Specify your monitoring infrastructure as code, and have it live in source control.
2. Manage large numbers of checks efficiently and without manual intervention.

If you have a complex active monitoring setup that often need updating, Terraform is our recommended solution.

Following is a short introduction to using the Checkly Terraform provider; for in-depth information, please see the [official documentation](https://registry.terraform.io/providers/checkly/checkly/latest/docs).

## Installation

To get started, install the latest version of the Checkly Terraform provider from the [Terraform registry](https://registry.terraform.io/providers/checkly/checkly/latest).

![Terraform registry](/docs/images/integrations/terraform_registry.png)

Your `main.tf` file will look similar to the following:

```terraform
variable "checkly_api_key" {}

terraform {
  required_providers {
    checkly = {
      source = "checkly/checkly"
      version = "0.7.1"
    }
  }
}

provider "checkly" {
  api_key = var.checkly_api_key
}
```

After running `terraform init`, you can now start adding resources to your file. You can check the official documentation to see [available parameters](https://registry.terraform.io/providers/checkly/checkly/latest/docs/resources/check) for each resource type. You can also find examples in the following sections on this page.

## Adding resources

There are three different kinds of resources you can manage on Checkly:
1. [API checks](#api-checks)
2. [Browser checks](#browser-checks)
3. [Check groups](#check-groups)

### API Checks

A simple API check could look as follows:

```terraform
resource "checkly_check" "example-api-check" {
  name                      = "Example API check"
  type                      = "API"
  activated                 = true
  frequency                 = 1
  double_check              = true
  use_global_alert_settings = true

  locations = [
    "us-west-1",
    "eu-central-1"
  ]

  request {
    url              = "https://api.example.com/"
    follow_redirects = true
    assertion {
      source     = "STATUS_CODE"
      comparison = "EQUALS"
      target     = "200"
    }
  }
}
```

The above creates an API check named _Example API check_, which will run every minute against `https://api.example.com/` from two [locations](/docs/monitoring/global-locations), [asserting](/docs/api-checks/assertions) for a 200 response status code and [retrying](/docs/monitoring) in case of failure, [sending alerts](/alerting/settings) using the global alerting configuration on your account.

### Browser Checks

Browser checks have less options:

```terraform
resource "checkly_check" "example-browser-check" {
  name                      = "Example browser check"
  type                      = "BROWSER"
  activated                 = true
  frequency                 = 10
  double_check              = true
  use_global_alert_settings = true
  locations = [
    "us-west-1",
    "us-east-1",
    "eu-central-1"
  ]

  script = <<EOT
const assert = require("chai").assert;
const puppeteer = require("puppeteer");

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto("https://google.com/");
const title = await page.title();

assert.equal(title, "Google");
await browser.close();

EOT
}
```

The above will create a browser check named _Example browser check_, which will run the included puppeteer script every 10 minutes from three [locations](/docs/monitoring/global-locations), for a 200 response status code and [retrying](/docs/monitoring) in case of failure, [sending alerts](/alerting/settings) using the global alerting configuration on your account.

Notice the multi line string syntax with `EOT`. An alternative syntax for adding the script is by referencing an external file:

```terraform
data "local_file" "browser-script" {
  filename = "${path.module}/browser-script.js"
}

resource "checkly_check" "browser-check-1" {
  ...
  script = data.local_file.browser-script.content
}
```

### Check Groups

Checkly's groups feature allows you to group together a set of related checks, which can also share default settings for various attributes. Here is an example check group:

```terraform
resource "checkly_check_group" "example-group" {
  name      = "Example group"
  activated = true

  locations = [
    "eu-west-1",
    "eu-central-1"
  ]
  concurrency = 2
  environment_variables = {
    ENV1 = "somevalue",
  }
  double_check              = true
  use_global_alert_settings = true
}
```

The above will create a group running from two locations, which will run two checks at a time when triggered from CI, with one environment variable and global alert settings.

To add a check to a group, set its `group_id` attribute to the ID of the group. For example:

```terraform
resource "checkly_check" "test-check" {
  name                      = "My test check"
  ...
  group_id    = checkly_check_group.example-group.id
  group_order = 1
}
```

The `group_order` attribute specifies in which order the checks will be executed: 1, 2, 3, etc.

## Applying changes

After each change to your Terraform file, you will need to run both following commands:
1. `terraform plan -out tf.plan` - to plan the necessary actions that Terraform will need to make.
2. `terraform apply "tf.plan"` - to apply the plan and have the changes reflected on Checkly.

If you are using [Terraform Cloud](https://www.terraform.io/cloud), the above will be run for you automatically every time a pull request is merged into a main branch.

## Additional material

We often publish in-depth articles on how to use Terraform with Checkly on our blog:
1. [Managing Checkly checks with Terraform](https://blog.checklyhq.com/managing-checkly-checks-with-terraform/)
2. [Scaling Puppeteer & Playwright on Checkly with Terraform](https://blog.checklyhq.com/scaling-puppeteer-playwright-on-checkly-with-terraform/)

## Development version

If you want to get your hands dirty on the very last in development version, you can:

1. Checkout the Checkly Terraform provider in [this GitHub repo](https://github.com/checkly/terraform-provider-checkly).
2. Build the provider and add it to your Terraform installation.
3. Write your first Checkly resource and apply it.
