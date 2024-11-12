---
title: How to empower developers and operations with Monitoring as Code - Checkly Guides
displayTitle: How to empower developers and operations with Monitoring as Code
description: >-
  Discover how Checkly empowers developers and platform teams to streamline complex monitoring through a code-first approach. Learn how collaboration, automation, and integrated alerts improve reliability and reduce bottlenecks in modern software delivery workflows.
author: Daniel Giordano
avatar: 'images/avatars/daniel-giordano.png'
tags:
  - FAQ
---
## Why developers need to contribute to monitoring
In today’s fast-paced development environment, engineers are under pressure to ensure that their applications not only function but also perform reliably under a wide variety of circumstances and conditions. Effective monitoring is key to staying on top of potential issues and keeping systems running smoothly with minimal downtime. However, in many organizations, the process of setting up and managing monitors falls to specialized platform or operations teams, which can create bottlenecks.

Checkly solves this problem by providing a solution that bridges the gap between application developers and platform teams. By leveraging Checkly’s codified MaC approach, both groups can collaborate efficiently to create, configure, and manage monitors in a seamless way that fits within existing workflows.

## Empowering Developers with Code-First Monitoring
With the rise of shift-left and the age of empowering engineers, more teams are using code to configure tests, infrastructure, and deployment models. They are finding benefits like increased collaboration, auditability, and automation in these new paradigms that are revolutionizing the way they ship software. 

Checkly fits neatly into this trend, offering software teams a codified approach to building and configuring their monitors and alerts. This means that monitors can be:

* Created faster within the software delivery lifecycle
* Tested and reviewed in CI/CD pipelines
* Automated across services and teams

No more throwing monitoring over the proverbial wall. Rather than relying on a separate platform or operations team to set up monitors, engineers can take full control of what gets monitored, when, and how. This can save time, reduce errors, and make the entire process more efficient. 


For example, here’s a simple API check defined in Checkly’s CLI:

```bash
curl --request POST \
     --url 'https://api.checklyhq.com/v1/checks/api?autoAssignAlerts=true' \
     --header 'Authorization: [your-key]' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "activated": true,
  "muted": false,
  "doubleCheck": true,
  "shouldFail": false,
  "alertSettings": {
    "escalationType": "RUN_BASED",
    "reminders": {
      "amount": 0,
      "interval": 5
    },
    "runBasedEscalation": {
      "failedRunThreshold": 1
    },
    "parallelRunFailureThreshold": {
      "enabled": false,
      "percentage": 10
    }
  },
  "useGlobalAlertSettings": true,
  "groupId": null,
  "groupOrder": null,
  "runtimeId": null,
  "retryStrategy": {
    "type": "FIXED",
    "baseBackoffSeconds": 60,
    "maxRetries": 2,
    "maxDurationSeconds": 600,
    "sameRegion": true
  },
  "runParallel": false,
  "request": {
    "method": "GET",
    "url": "https://api.checklyhq.com",
    "skipSSL": false,
    "ipFamily": "IPv4",
    "bodyType": "NONE"
  },
  "frequency": 1,
  "tearDownSnippetId": null,
  "setupSnippetId": null,
  "localSetupScript": null,
  "localTearDownScript": null,
  "degradedResponseTime": 10000,
  "maxResponseTime": 20000,
  "name": "webshop-api",
  "locations": [
    "us-east-1",
    "ap-east-1"
  ]
}
'
```
As seen here, engineers can quickly configure an API check that runs every minute to ensure that the status code is 200. If there’s a failure, Checkly will immediately notify the team, allowing them to address the issue promptly.

## Collaboration Between Dev and Platform Teams
While a code-first approach to monitoring empowers application engineers, many teams include both developers and platform engineers who work together to build and operate complex systems. This is where Checkly’s flexibility and extensibility truly shines.

Platform teams often handle the configuration of complex alerts, thresholds, and scheduling across multiple environments. By codifying these aspects, platform engineers can provide a consistent monitoring “wrapper” around the application teams’ checks. This allows developers to focus on building and shipping code and adding simple checks without worrying about the operational intricacies of monitoring.

For example, here’s a more complex Checkly configuration, where the platform team might define specific response time thresholds and alerting rules:

```bash
resource "checkly_check" "example_check_2" {
  name                   = "Example API check 2"
  type                   = "API"
  activated              = true
  should_fail            = true
  frequency              = 1
  degraded_response_time = 5000
  max_response_time      = 10000
  locations = [
    "us-west-1",
    "ap-northeast-1",
    "ap-south-1",
  ]
  alert_settings {
    escalation_type = "RUN_BASED"
    run_based_escalation {
      failed_run_threshold = 1
    }
    reminders {
      amount = 1
    }
  }
  retry_strategy {
    type = "FIXED"
    base_backoff_seconds = 60
    max_duration_seconds = 600
    max_retries = 3
    same_region = false
  }
}
```
In this example, the platform team has set up detailed monitoring parameters, including response time thresholds and a retry strategy in case of failure. By wrapping these details into reusable configurations, the platform team allows application engineers to create new monitors that are consistent with the organization’s standards—without having to worry about the operational details.

### Codified Alerts and Notifications
Checkly also integrates alert channels into the code, allowing teams to manage alerts for different monitors via a code-first approach. You can specify email alerts, Slack notifications, or other channels to ensure that the right team members are notified when something goes wrong.

For instance, here’s how to set up email alerts for a check:

```bash
resource "checkly_alert_channel" "email_ac1" {
  email {
    address = "info1@example.com"
  }
}
resource "checkly_check" "example_check" {
  name = "Example check"
  alert_channel_subscription {
    channel_id = checkly_alert_channel.email_ac1.id
    activated  = true
  }
}
```
By codifying alert configurations, platform engineers can ensure that the organization’s monitoring rules and notification protocols are followed consistently, even as application teams create new monitors.
## Conclusion
Checkly’s approach to monitoring via code gives engineering and operations teams the tools they need to keep applications running smoothly. Application engineers can take ownership of their monitors, ensuring that they’re set up efficiently and integrated into their workflows. Meanwhile, platform teams can manage and maintain a higher-level view, providing the necessary configurations and support for more complex systems.

Whether your team is fully developer-led, or you have a more traditional split between development and platform engineering, Checkly’s code-first monitoring solution ensures that everyone can collaborate smoothly and efficiently. As modern applications continue to grow in complexity, tools like Checkly are becoming essential to manage the intricacies of monitoring in a fast-moving development environment.