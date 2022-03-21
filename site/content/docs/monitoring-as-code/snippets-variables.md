---
title: Snippets and environment variables
weight: 4
menu:
  docs:
    parent: "Monitoring-as-Code"
---

Checkly exposes handy resources to avoid code duplication and reduce the maintenance load on whoever is maintaining checks and scripts.

## Code snippets

[Code snippets](/docs/browser-checks/partials-code-snippets) are useful for reusing bits of code without duplication. They can be used for [setup & teardown scripts](/docs/api-checks/setup-teardown-scripts/#reusable-code-snippets) in API checks, as well as in [browser checks](/docs/browser-checks/partials-code-snippets/).

## Environment variables

[Environment variables](/docs/browser-checks/variables) help you store data (like credentials or other strings) on Checkly that you might need to use in one or more checks and groups. They can exist as arguments in check or group type resources:

```terraform
resource "checkly_check" "e2e-login" {
  name                      = "Login Flow"
  type                      = "BROWSER"
  activated                 = true
  should_fail               = false
  frequency                 = 1
  double_check              = true
  ssl_check                 = false
  use_global_alert_settings = true
  
  environment_variables = {         // This sets check-level environment variables
    TEST_EMAIL = "user@email.com",
    TEST_USER_ID = "7d8d8288-43a6-44b0-ba08-4c5736c1b6ed"
  }
  
  locations = [
    "us-west-1",
    "eu-central-1"
  ]

  script = file("${path.module}/scripts/login.js")
}

resource "checkly_check_group" "key-shop-flows" {
  name      = "Key Shop Flows"
  activated = true
  muted     = false

  environment_variables = {         // This sets group-level environment variables
    TEST_EMAIL = "user@email.com",
    TEST_USER_ID = "7d8d8288-43a6-44b0-ba08-4c5736c1b6ed"
  }

  locations = [
    "eu-west-1",
    "eu-central-1"
  ]

  concurrency               = 3
  double_check              = true
  use_global_alert_settings = false
}
```

{{<info>}}
We are working on enabling Terraform users to set up environment variables at account level, too.
{{</info>}}