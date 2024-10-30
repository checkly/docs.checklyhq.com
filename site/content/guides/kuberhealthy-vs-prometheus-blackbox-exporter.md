---
title: Prometheus Blackbox Exporter vs Kuberhealthy for Kubernetes monitoring - Checkly Guides
displayTitle: Selecting a Synthetics tool for Kubernetes - Prometheus Blackbox vs Kuberhealthy
description: >-
  Blackbox Exporter focuses on checking the availability and responsiveness of external services over multiple protocols, while Kuberhealthy offers deeper insights into the internal health and operations of Kubernetes clusters through custom and built-in checks. Both tools integrate with Prometheus for metrics collection, but Kuberhealthy shines in Kubernetes-specific monitoring
author: Nočnica Mellifera
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - FAQ
---
We all implement tools to monitor our nodes and keep our entire cluster up and running. But how often do updates, failures, or errors mean that users suffer outages, even though our status boards look green? As Kubernetes has enabled more complex microservice architecture, the gap between the state of the dashboard, and the health of services for the user, has grown wider. Almost all serious Kubernetes teams need an external tool checking on their system, also known as a synthetic monitor, to really know that everything is working correctly for users. This article is a brief guide to two options: Kuberhealthy and Prometheus Blackbox exporter. The tools are quite different in cost, scope, maintenance, and execution so it’s no surprise they’ll fill quite different roles in ensuring uptime.

## Prometheus Blackbox exporter

Long the standard of ‘are we up or down or not’ Prometheus Blackbox exporter is a dead simple tool that does no more or less than what was promised: blackbox probing of endpoints over HTTP, HTTPS, DNS, TCP, ICMP and gRPC. Available as a container image, it runs constantly, hitting the endpoints you select and performing simple validation. As the name implies, its intended to export metrics to a prometheus instance.

### Validating responses with Prometheus Blackbox exporter

While this area is where Blackbox exporter is the most limited compared to the other options, the configuration is still surprisingly deep. I often describe the tool as ‘checking endpoints for a 200 response’ but in reality you can check for anything wrong with the connection configuration, and then do pattern matching to validate the response overall. Here’s the validation flags available for an HTTP probe:

```yaml
  # Probe fails if SSL is present.
  [ fail_if_ssl: <boolean> | default = false ]

  # Probe fails if SSL is not present.
  [ fail_if_not_ssl: <boolean> | default = false ]

  # Probe fails if response body matches regex.
  fail_if_body_matches_regexp:
    [ - <regex>, ... ]

  # Probe fails if response body does not match regex.
  fail_if_body_not_matches_regexp:
    [ - <regex>, ... ]

  # Probe fails if response header matches regex. For headers with multiple values, fails if *at least one* matches.
  fail_if_header_matches:
    [ - <http_header_match_spec>, ... ]

  # Probe fails if response header does not match regex. For headers with multiple values, fails if *none* match.
  fail_if_header_not_matches:
    [ - <http_header_match_spec>, ... ]
```

So we’ve got a good deal of logic we can encode here! We wouldn’t want to go *too* far into the HTML body with our regex, as we know of old the terrors that lurk when parsing [HTML with regex](https://stackoverflow.com/a/1732454), but simple string matching should work just fine.

Now, of course, we can’t go any deeper than this in our validation. There’s no way to do something like clicking on a visual button and checking the response. With no rendering engine there’s no visual comparison, etc etc. If we want to upgrade our monitoring to something more like end-to-end testing, Prometheus Blackbox exporter just isn’t intended to go that far.

### Open source and self-hosted, for better or worse

Prometheus Blackbox exporter is a completely free and open source tool, released under the Apache 2.0 license. That means no hidden fees, no surprise changes to SaaS terms, or the other vagaries that come with [adopting a tool like Cypress](https://www.checklyhq.com/blog/playwright-surpasses-cypress-for-downloads/#how-cypress-loses-to-playwright). However, this brings us to the greatest concern with relying too heavily on the Prometheus Blackbox exporter: the high probability it will be degraded at the same time as the rest of your service. Hopefully you’ve got your Prometheus instance in a separate cluster from your production systems, but even so it’s not certain that this service will survive a major outage. Further, there’s no inbuilt function for warning you about the lack of information. For example: an email that just says ‘We haven’t run a check with the blackbox exporter in over 30 minutes, something must be wrong!’

Again, this tool is open source, so it’s totally possible for you to implement a solution yourself. But this concern speaks to a basic principle: when it comes to sending an alert if your site is down, a self-hosted solution is probably the last thing you want to rely on. 

### Who should use Prometheus Blackbox exporter

Prometheus Blackbox exporter fits best for teams that need basic, scalable monitoring of endpoint availability without complex interaction checks. If your monitoring needs are focused on detecting network issues, SSL problems, or simple HTTP/HTTPS responses, this tool will meet expectations well.

It’s ideal for operations where the priority is infrastructure reliability, not feature-rich application-level testing. Teams running self-managed observability stacks using Prometheus will find Blackbox exporter an excellent, complementary addition due to its simplicity and native integration. It aligns well with DevOps philosophies, allowing engineers to quickly catch and address service interruptions at the networking level.

However, if you require advanced UI testing or more detailed validations (like simulating user actions across pages), other solutions such as the Playwright-supported browser checks from [Checkly](https://www.checklyhq.com/docs/), will be better suited.

## Kuberhealthy

Kuberhealthy is a Kubernetes operator designed for synthetic monitoring and continuous verification of applications and cluster processes. It uses custom resources called `KuberhealthyCheck` to run synthetic tests as pods within a Kubernetes environment, simulating real-world conditions. The results of these tests are exposed via Prometheus metrics and JSON status pages, providing easy integration into monitoring and alerting tools.

Kuberhealthy supports built-in checks for common Kubernetes operations such as deployments, daemonsets, DNS resolution, and SSL certificate validation. Users can also create custom checks in any programming language, tailoring the monitoring to their specific needs. It simplifies monitoring by mimicking operational workflows and observing expected behavior rather than just checking individual metrics.

The tool is part of the Cloud Native Computing Foundation (CNCF), indicating its alignment with Kubernetes best practices and community standards. Installation options include YAML manifests or Helm charts, with configurations reloading dynamically when modified

### Kuberhealthy’s focus is your cluster’s internal health

Take a look at the example checks from the [Kuberhealthy readme](https://github.com/kuberhealthy/kuberhealthy/blob/master/README.md):

---

- [SSL Handshake Check](https://github.com/kuberhealthy/kuberhealthy/blob/master/cmd/ssl-handshake-check/README.md) - checks SSL certificate validity and warns when certs are about to expire.
- [CronJob Scheduling Failures](https://github.com/kuberhealthy/kuberhealthy/blob/master/cmd/cronjob-checker/README.md) - checks for events indicating that a CronJob has failed to create Job pods.
- [Image Pull Check](https://github.com/kuberhealthy/kuberhealthy/blob/master/cmd/test-check#image-pull-check) - checks that an image can be pulled from an image repository.
- [Deployment Check](https://github.com/kuberhealthy/kuberhealthy/blob/master/cmd/deployment-check/README.md) - verifies that a fresh deployment can run, deploy multiple pods, pass traffic, do a rolling update (without dropping connections), and clean up successfully.
- [Daemonset Check](https://github.com/kuberhealthy/kuberhealthy/blob/master/cmd/daemonset-check/README.md) - verifies that a daemonset can be created, fully provisioned, and torn down. This checks the full kubelet functionality of every node in your Kubernetes cluster.
- [Storage Provisioner Check](https://github.com/ChrisHirsch/kuberhealthy-storage-check) - verifies that a pod with persistent storage can be configured on every node in your cluster.

---

We can see some overlap with Prometheus Blackbox exporter, but clearly Kuberhealthy goes deeper than the Blackbox exporter. Making sure that pulls are possible of a particular remote repository is a more complex test than just seeing a response from an API endpoint. 

However, notice what’s not included in this basic set of examples: nothing about checking a random URL’s API response and parsing the response. The focus here is on the health of components internal to your cluster. Kuberhealthy is likely to detect problems in your cluster, and those problems are very likely to be correlated to failures that are presented to your users. But these checks don’t answer questions like ‘Can users from X location log in’ or ‘Does our UI currently look correct to users?’ We can still use Kuberhealthy to detect problems on our service! But since we’re using the tool for something other than its core purpose, support and features may be hard to find.

### You *can* check anything you want with Kuberhealthy

As it is a system to create pods, run some script with those pods, check the response, and then clean up the pods, Kuberhealthy is a generic system to run nearly any code. If you want to write your page checks in WebAssembly, it’s possible to run those checks with Kuberhealthy. This puts a lot of power in your hands! Of course any request, interaction, and validation will be yours to write, and this can lead to unexpected problems. Only recently at Checkly we found a [Node core bug that interfered with some of our checks](https://www.checklyhq.com/blog/how-a-tcpdump-led-us-to-a-bug-in-nodes-ipv6-handli/).  

## Kuberhealthy vs. Prometheus Blackbox Exporter

Here's a table of features and use cases side-by-side

| Feature | Kuberhealthy | Prometheus Blackbox Exporter |
| --- | --- | --- |
| **Purpose** | Synthetic monitoring for Kubernetes clusters | Endpoint monitoring over various protocols |
| **Scope** | Focuses on internal cluster health checks | External endpoint availability checks |
| **Installation** | Kubernetes operator, deployable via YAML or Helm | Container image, simple setup with Prometheus |
| **Integration** | Native Prometheus integration, JSON status endpoint | Prometheus metrics endpoint |
| **Customization** | Custom checks in any language, pod-based execution | Configurable probes, pattern matching in HTTP responses, expect values in all responses |
| **Example Checks** | Deployment, Daemonset, CronJob failures, SSL handshake | HTTP(S), DNS, TCP, ICMP, gRPC probes |
| **Use Case** | Verifying internal Kubernetes operations | Monitoring service availability and connectivity, that services are configured to connect and returning good-looking responses |
| **Alerting on Failures** | Not out of the box. Can expose metrics for alerts; needs metrics forwarding for proactive alerts. | Requires Prometheus alerts; lacks failure notifications |
| **Licensing** | CNCF project, open source | Apache 2.0, open source |
| **Strengths** | Deep integration with Kubernetes, flexible custom tests | Simple setup for endpoint health checks |
| **Limitations** | Focuses on cluster components, limited external validation, limited fronted tests | No UI testing, limited to connection-based checks |
| **When to Use** | When verifying the operational health of Kubernetes clusters | When monitoring uptime and availability of external endpoints |

---

Both tools will tell you whether endpoints are responding, and check the availability of public services. To dive deeper, you'll want a tool that supports an automation framework like [Playwright](https://www.checklyhq.com/learn/playwright/what-is-playwright/).