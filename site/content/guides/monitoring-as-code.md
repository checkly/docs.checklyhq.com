---
title: What is monitoring as code?
description: >-
  Monitoring as code is the practice of managing monitoring configurations and alerts through code. This approach offers several benefits for engineering teams at scale, including codified, version-controlled, and reusable monitoring configurations.
author: Daniel Giordano
avatar: 'images/avatars/daniel-giordano.png'
tags:
  - FAQ
---

## An overview of monitoring as code

Monitoring as code is the practice of creating and maintaining your monitoring and alerting configurations through code. This approach offers several benefits over the traditional, manual approach of configuring monitors through a UI. 

MaC is similar to other paradigms that are shifting responsibilities "left", such as infrastructure as code, configuration as code, and testing. Shifting these responsibilities to engineers allows them to manage large-scale, complex systems more effectively. 

## The pain of traditional monitoring

Traditional monitoring approaches can be cumbersome and error-prone and often led to a siloed approach involving operations teams. They often require manual configuration of monitors, which can be time-consuming and difficult to manage at scale. This approach also makes it difficult to reuse configurations - each monitor needs to be configured individually. The tools themselves were built for a siloed approach and not built for extensibility in a engineering-centric world.

## The benefits of monitoring as code

### Codified and automated monitoring management
Monitors and alerts are configured in code, meaning you can programmatically create, update, and delete them in the same type of lifecycle as your other application and infrastructure code. If you use a file-based routing approach, you can automate the creation of monitors based on the presence of a file in a repository - without having to manually create them through a UI.

### Version-controlled and ready for CI/CD
When you manage your monitors and alerts in code, you can use the same version control system you use for your other code. This allows you to track changes, collaborate with others, and roll back to previous versions if needed inside your CI/CD pipelines.

### Reuse of existing designs and tests as monitors
Monitors and alerts configured in code can be reused across teams, workflows, and environments. For example, you can create a monitor for a service in your development environment, and use the same monitor in your production environment without having to manually configure it. You also can create a centralized wrapper for configuration that can be reused across multiple monitors and teams.

### Fully programmable within your stack
Use the same tools you use for testing and observability to create monitors. Checkly natively supports Playwright and OpenTelemetry, so you can use the same libraries and tools you use for testing to create monitors. Then integrate your oTel traces with Checkly traces for a faster, more accurate mean time to resolution.

### Unify Your Testing and Monitoring

Build and run your test and monitoring setup from the same code base. Create tests locally with Playwright, test and monitor deployments in CI, then deploy them as monitors on our global infrastructure or deploy them to your own infrastructure.

## Use cases of monitoring as code

### Uptime monitoring of your UI or APIs
Build simple monitors that check the availability of your UI or APIs and measure response times, status codes, and other simple metrics.

### End-to-end monitoring 
Create monitors that confirm the uptime or availability of a end-to-end process or transaction. Monitor login flows, checkout flows, or other complex workflows from the UI or create monitors that check multiple steps within an API call

### Automate monitor creation with new services
Automate the creation of monitors individually or configure a routing approach to create them based on the presence of a file or specification in a repository.

### Programmable alerting
Set highly configurable and customized alerting strategies that can be reused across monitors and teams.

### Customized dashboards and reports
Generate customized dashboards and reports that can be deployed anywhere to improve collaboration and get the right information to the right people.

## Getting started
Getting started with monitoring as code is straightforward with the [Checkly platform](https://www.checklyhq.com). To begin, sign up for a [free account of Checkly](https://app.checklyhq.com/signup) and start creating monitors and alerts using our CLI.