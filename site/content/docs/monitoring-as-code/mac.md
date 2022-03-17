---
title: Introduction
weight: 74
menu:
  docs:
    parent: "Monitoring-as-Code"
---

Every resource you can manage via the Checkly UI can also be managed using Terraform. There are many different kinds:

1. [API checks](#api-checks)
2. [Browser checks](#browser-checks)
3. [Check groups](#check-groups)
4. [Alert channels](#alert-channels)
5. [Dashboards](#dashboards)
6. [Code snippets](#code-snippets)

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

Checkly's groups feature allows you to group a set of related checks, which can also share default settings for various attributes. Here is an example check group:

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

## Alert channels

Alert channel resources vary depending on the type of channel you wish to set up. For example, an email alert channel resource could look as follows:

```terraform
resource "checkly_alert_channel" "email_ac" {
  email {
    address = "john@example.com"
  }
  send_recovery = true
  send_failure = false
  send_degraded = true
  ssl_expiry = true
  ssl_expiry_threshold = 22
}
```

Here is an example of an Opsgenie alert channel resource:

```terraform
resource "checkly_alert_channel" "opsgenie_ac" {
  opsgenie {
    name = "opsalerts"
    api_key = "fookey"
    region = "fooregion"
    priority = "foopriority"
  }
}
```

### Alert channel subscriptions

Once you have declared one or more alert channels, make sure you subscribe one or more checks or groups to it in order to use it:

```terraform
resource "checkly_check" "browser-check-1" {
  ...
  alert_channel_subscription {
    channel_id = checkly_alert_channel.email_ac.id
    activated  = true
  }
  ...
}
```

## Dashboards

## Code snippets