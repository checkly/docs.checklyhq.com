---
title: Checks and groups
weight: 2
menu:
  docs:
    parent: "Terraform provider"
---

Checks make up the most important unit of your Checkly monitoring setup. Groups help you split them up according to your needs and keep complexity down.

## Checks

[Browser checks](/docs/browser-checks) and [API checks](/docs/api-checks) share many arguments, configuration-wise, but also have their own unique ones. The type of your check is controlled using the `type` argument.

### Browser checks

For example, a browser check can look as follows:

```terraform
resource "checkly_check" "e2e-login" {
  name                      = "Login flow"    // The name of the check
  type                      = "BROWSER"       // The type of the check
  activated                 = true            // Whether the check will start as active on creation
  frequency                 = 10              // The frequency of the check in minutes
  double_check              = true            // Whether the check should be run once more on failure
  ssl_check                 = true            // Whether your SSL cert for the given domain should be checked too
  use_global_alert_settings = true            // Whether to use account level alert setting instead of the alert setting defined on this check

  locations = [                               // Which locations the check should run from (if not in a group)
    "us-west-1",
    "eu-central-1"
  ]

  script = <<EOT                              // The script the check should execute
const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://danube-web.shop/");

  await page.click("#login");

  await page.type("#n-email", "user@email.com");
  await page.type("#n-password2", "supersecure1");

  await page.click("#goto-signin-btn");
  await page.waitForSelector("#login-message", { visible: true });

  await browser.close();
}
run()
EOT
}
```

For tidiness and ease of use, it is recommended to store scripts in separate files, instead of using the inline option:

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
  locations = [
    "us-west-1",
    "eu-central-1"
  ]

  script = file("${path.module}/scripts/login.js") // Our script is contained in this file
}
```

### API checks

On the other hand, an API check shares some part of the initial configuration, but is organized around the `request` argument instead of the `script` argument:

```terraform
resource "checkly_check" "get-books" {
  name                      = "GET /books"   // The name of the check
  type                      = "API"     // The type of the check
  activated                 = true      // Whether the check will start as active on creation
  should_fail               = false     // Whether the check's HTTP response's status is expected to be >399
  frequency                 = 1         // The frequency of the check in minutes
  double_check              = true      // Whether the check should be run once more on failure
  ssl_check                 = true      // Whether your SSL cert for the given domain should be checked too
  use_global_alert_settings = true      // Whether to use account level alert setting instead of the alert setting defined on this check

  locations = [                         // Which locations the check should run from (if not in a group)
    "us-west-1",
    "eu-central-1"
  ]

  request {                             // All the settings for the check's HTTP request
    url              = "https://danube-web.shop/api/books"   // The request URL
    follow_redirects = true             // Whether the request should follow redirects
    skip_ssl         = false            // Whether to skip the SSL validation on the target server
    assertion {                         // One or more assertions to run against the HTTP response
      source     = "STATUS_CODE"        // What to assert against
      comparison = "EQUALS"             // How to assert
      target     = "200"                // Expected value
    }
  }
}
```

You can see all the configuration options for checks, as well as more examples, on the official Terraform registry [documentation page](https://registry.terraform.io/providers/checkly/checkly/latest/docs/resources/checkly_check).

## Groups

Once you start having more than just a handful of checks, it makes sense to start looking into [groups](/docs/groups) to keep things tidy:

```terraform
resource "checkly_check_group" "key-shop-flows" {
  name      = "Key Shop Flows"  // The name of the group
  activated = true              // Whether the group will start as active on creation
  muted     = false             // Whether the group will start as muted on creation

  locations = [                 // Which locations the check should run from (if not in a group)
    "eu-west-1",
    "eu-central-1"
  ]

  concurrency               = 3     // How many checks to run at once when triggering the group using CI/CD triggers
  double_check              = true  // Whether to re-run a failed check from a different location
  use_global_alert_settings = false // Whether to use global alert settings or group-specific ones
}
```

### Adding checks to groups

To add a check to a group, link it to that group by setting the `group_id` argument to the group's resource ID. For example, to link the API check and the group from this article:

```terraform
resource "checkly_check" "get-books" {
  name                      = "GET /books"
  type                      = "API"
  activated                 = true
  should_fail               = false
  frequency                 = 1
  double_check              = true
  ssl_check                 = true
  use_global_alert_settings = true

  locations = [
    "us-west-1",
    "eu-central-1"
  ]

  // This makes the check part of the group
  group_id = checkly_check_group.key-shop-flows.id

  request {
    url              = "https://danube-web.shop/api/books"
    follow_redirects = true
    skip_ssl         = false
    assertion {
      source     = "STATUS_CODE"
      comparison = "EQUALS"
      target     = "200"
    }
  }
}
```

{{<info>}}
Locations and alert channel subscriptions defined at group level always trump the ones defined at check level. Double-check your config to make sure all checks are running from the intended regions and are set to alert on the correct channels.
{{</info>}}

You can see all the configuration options for groups, as well as more examples, on the official Terraform registry [documentation page](https://registry.terraform.io/providers/checkly/checkly/latest/docs/resources/checkly_check_group).
