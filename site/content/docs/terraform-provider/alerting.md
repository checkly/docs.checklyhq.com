---
title: Alert channels and settings
weight: 3

menu:
  integrations:
    parent: "Terraform provider"
---

Alerting is organised around alert settings and alert channels.

## Alert settings

[Alert settings](https://www.checklyhq.com/docs/alerting/) determine _when_ and how many times alerts should be sent out. You can set the alert settings at check level:

```terraform
resource "checkly_check" "get-books" {
  name                   = "GET /books"
  type                   = "API"
  
  // ...

  alert_settings {
    escalation_type = "RUN_BASED"   // Whether to alert after a certain number of runs or time

    run_based_escalation {
      failed_run_threshold = 1      // (RUN_BASED escalation only) after how many failed runs to send an alert
    }

    time_based_escalation {
      minutes_failing_threshold = 5 // (TIME_BASED escalation only) after how many minutes spent in failing state to send an alert
    }

    ssl_certificates {
      enabled         = true        // Whether the SSL certificate will be checked for expiry
      alert_threshold = 30          // At which number of days remaining before expiry should the alert be sent
    }

    reminders {
      amount   = 2                  // How many reminders to send after the first alert
      interval = 5                  // How many minutes to wait between reminders
    }

    parallel_run_failure_threshold {
      enabled = true                // Applicable only for checks scheduled in parallel in multiple locations
      percentage = 50               // What percentage of regions needs to fail to trigger a failure alert, supported values: 10, 20, 30, 40, 50, 60, 70, 80, 90 & 100
    }
  }

  // ...
}
```

Or at group level:

```terraform
resource "checkly_check_group" "key-shop-flows" {
  name      = "Key Shop Flows"
  activated = true
  
  // ...
  
  alert_settings {
    escalation_type = "RUN_BASED"

    run_based_escalation {
      failed_run_threshold = 1
    }

    time_based_escalation {
      minutes_failing_threshold = 5
    }

    ssl_certificates {
      enabled         = true
      alert_threshold = 30
    }

    reminders {
      amount   = 2
      interval = 5
    }

    parallel_run_failure_threshold {
      enabled = true
      percentage = 50
    }
  }
}
```

## Alert channels

[Alert channels](https://www.checklyhq.com/docs/alerting/alert-channels/) determine _how_ (as in "to which alert systems") alerts are sent out. They can be created as standalone resources:

```terraform
resource "checkly_alert_channel" "email_ac" { 
  email {
    address = "john@example.com"      // The email address to notify
  }
  send_recovery = true                // Whether email will be sent when a check recovers
  send_failure = false                // Whether email will be sent when a check fails
  send_degraded = true                // Whether email will be sent when a check's performance degrades
}
```

Checkly supports a variety of alert channels, from email and SMS to Pagerduty and custom webhooks. For all available alert channels, see the corresponding [resource page](https://registry.terraform.io/providers/checkly/checkly/latest/docs/resources/alert_channel).

### Alert channel subscriptions

Checks or groups are subscribed to one or more alert channels:

```terraform
resource "checkly_check" "get-books" {
  name                   = "GET /books"
  type                   = "API"
  
  // ...

  alert_channel_subscription {      // This subscribes the check to the alert channel
    channel_id = checkly_alert_channel.email_ac.id
    activated  = true
  }

  // ...

}

resource "checkly_check_group" "key-shop-flows" {
  name      = "Key Shop Flows"
  activated = true
  
  // ...

  alert_channel_subscription {      // This subscribes the group to the alert channel
    channel_id = checkly_alert_channel.email_ac.id
    activated  = true
  }
}
```

{{<warning>}}
Checks and groups need to be _explicitly_ subscribed to an alert channel as shown above - they will _not_ be autosubscribed.
{{</warning>}}

{{<info>}}
Checks which are part of a group inherit the group's alert subscriptions. If you know a check will be part of a group, you can avoid needlessly subscribing it to alert channels and just handle everything at the group level.
{{</info>}}
