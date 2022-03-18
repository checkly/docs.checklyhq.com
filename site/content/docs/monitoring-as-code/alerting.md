---
title: Alert channels and settings
weight: 78

menu:
  docs:
    parent: "Monitoring-as-Code"
---

Alerting is organised around alert settings and alert channels.

## Alert settings

[Alert settings](https://www.checklyhq.com/docs/alerting/) determine _when_ and how many times alerts should be sent out.

You can set the alert settings at check level:

```terraform
resource "checkly_check" "example-check-2" {
  name                   = "Example API check 2"
  type                   = "API"
  
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
      amount = 1
    }
  }

  // ...
}
```

Or at group level:

```terraform
resource "checkly_check_group" "example-group" {
  name      = "My test group 1"
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
  }
}
```

## Alert channels

[Alert channels](https://www.checklyhq.com/docs/alerting/alert-channels/) determine _how_ (as in "to which alert systems") alerts are sent out.

Alert channels can be created as standalone resources:

```terraform
resource "checkly_alert_channel" "email_ac" {
  email {
    address = "john@example.com"
  }
  send_recovery = true
  send_failure = false
  send_degraded = true
}
```

Checks or groups are then subscribed to one or more alert channels:

```terraform
resource "checkly_check" "example-check-2" {
  name                   = "Example API check 2"
  type                   = "API"
  
  // ...

  alert_channel_subscription {
    channel_id = checkly_alert_channel.email_ac.id
    activated  = true
  }

  // ...

}

resource "checkly_check_group" "example-group" {
  name      = "My test group 1"
  activated = true
  
  // ...

  alert_channel_subscription {
    channel_id = checkly_alert_channel.email_ac.id
    activated  = true
  }
}
```




