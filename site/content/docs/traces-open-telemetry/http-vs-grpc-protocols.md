---
title: HTTP vs. gRPC OpenTelemetry protocols
head:
  title: "Choosing between HTTP and gRPC OpenTelemetry protocols"
metatags:
  title: "Choosing between HTTP and gRPC OpenTelemetry protocols"
  description: "Learn about the trade-offs between using HTTP and gRPC for sending data to an OpenTelemetry backend."
weight: 60
menu:
  integrations:
    parent: "OpenTelemetry (beta)"
beta: true
---
Checkly's OTel ingestion endpoint supports both the HTTP and gRPC protocols. The gRPC protocol is the "native"
protocol for OTel, but in 2020 an alternative HTTP protocol was introduced due to some of the downsides gRPC has:

- gRPC tends to come with bigger dependencies in your code base.
- gRPC uses HTTP/2 as its transport layer, which might not be 100% supported in your network infra. Think firewalls, proxies and load balancers.

However, for larger payload and higher throughput scenarios, gRPC is the way to go. It's more efficient and has a smaller 
connection overhead.

Different SDKs and languages have different levels of support for gRPC and HTTP. For example, the HTTP protocol is
the default for Node.js, but gRPC is the default for Go. In all cases, we recommend using the default protocol for your
language and SDK.

