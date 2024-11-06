---
title: Learn How to Observe and Monitor your Software with OpenTelemetry
displayTitle: Getting started with Observability
navTitle: What is Observability?
description: Learn OpenTelemetry with Checkly. Add monitoring to every piece of your stack with the open standards and open-source tools.
date: 2024-10-17
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
  Learn more about Playwright & Monitoring with Checkly. Explore how to automate your web with a reliable, programmable monitoring workflow.
menu:
  learn:
    parent: "OpenTelemetry"
weight: 1
---

## A beginner's guide

**Observability** is the practice of understanding the internal state of a system by examining the outputs it generates—such as logs, metrics, and traces. OpenTelemetry (OTel) plays a key role in modern observability by offering open standards for instrumenting code, gathering telemetry data, and managing this data through centralized collectors.


### Why Observability Matters

In systems that adopt **microservices** architecture, tracking system health becomes challenging. Unlike monolithic systems, where a few experts can oversee the whole system, microservices distribute responsibilities across many independent services. This fragmentation makes it difficult to pinpoint issues and monitor end-to-end system behavior. Observability addresses these gaps by enabling better monitoring and faster resolution of incidents.

At the same time that microservice architectures cry out for better observability, the fragmentation of these code execution environments means that tracing a request through this stack has gotten exponentially more difficult. From these needs was OpenTelemetry born (OpenTelemetry was born by merging the OpenCensus and OpenTracing projects).

## What OpenTelemetry is, and isn't
As you browse the many instrumentation tools and [collector](/learn/openTelemetry/otel-collector) modules included in the OpenTelemetry project, it can seem like the project is incredibly vast. However there are some clear demarcations around what is and isn't part of the project.

### The OpenTelemetry project includes

The Otel project includes everything you need to collect data about your system, with standards in place to make sure later analysis is standardized. This covers:

* A standard for internal observability APIs, and a language standard for any OpenTelemetry SDKs
* A standard protocal for sending data - the OpenTelemetry transfer protocol or OTLP
* Libraries to instrument applications, supporting all common web development languages
* The OpenTelemetry collector, an all-purpose data forwarding and filtering tool for controlling OTel data
* Various other community modules, including plugins for the above systems, and data gathering tools for Kubernetes, FaaS, and others.

### What isn't part of OpenTelemetry?
Often you'll see a question posted to the effect of 'how can the OpenTelemetry collector make me a dashboard?' Someone asking this question has gotten confused: while the collector receives data, it only does so to immediately forward the data somewhere else. The OpenTelemetry project is vendor-agnostic, and as such it doesn't compete with any open source or SaaS observability dashboard service. This helps explain why the Otel project does **not** include:

* Data storage
* Data querying
* Dashboards, charting, and other components for viewing data
* Alerting and monitoring tools

Often in these guides, we'll mention open source tools like Prometheus and Grafana for storing and displaying OpenTelemetry data. However OpenTelemetry is not preferential to these tools, and with a unified standard for transmitting data, any vendor that supports the OTLP standard should work to receive OpenTelemetry data.

### The Three Pillars of Observability

OpenTelemetry enables observability through three core data types:

1. **Metrics**:
    - Numerical summaries of system behavior (e.g., CPU usage, request counts).
    - Provide high-level insights into trends and overall performance.
    - Metrics are efficient to collect and store, making them suitable for monitoring at scale.
2. **Logs**:
    - Detailed records of events or states within a system.
    - Offer a complete picture of system operations but can become unwieldy in large volumes.
    - While useful for post-mortem analysis, starting with logs during a live incident may slow down troubleshooting.
3. **Traces**:
    - Capture the lifecycle of a request as it moves through various services in a system.
    - Tracing helps identify the components involved in a request and their performance (e.g., through waterfall charts).
    - Distributed tracing extends this concept to microservices, ensuring that spans from different services are correlated correctly.

### Distributed Tracing with OpenTelemetry

Distributed tracing relies on propagating a **trace context** across services. Each service contributes spans to the trace, which are visualized in sequence to understand the request's journey. OpenTelemetry makes this possible by defining trace headers that are passed across service boundaries. 

### Getting Started with OpenTelemetry

To begin using OpenTelemetry, you will follow three general steps:

* Start generating OTel data, generally by instrumenting your application code. 
* Report your data to some location, ether with the OpenTelemetry collector, or by directly reporting data to an OTLP endpoint somewhere.
* Implement storage and display of your data (as mentioned above, this step is not part of the OTel project and multiple solutions exist).

The flexibility of the collector enables smooth transitions between direct reporting and more complex data pipelines as your observability needs grow.



### Relevant Resources on OpenTelemetry

- **Metrics Overview**: [Learn how OpenTelemetry handles metrics to provide high-level insights into your system's performance](/learn/opentelemetry/otel-metrics).
- **Logging with OpenTelemetry**: [Discover how OpenTelemetry integrates with existing logging libraries and enhances log data correlation across microservices](https://opentelemetry.io/docs/specs/otel/logs/).
- **Quick Start Guide**: A guide for setting up OpenTelemetry quickly to start monitoring your applications [here](https://opentelemetry.io/docs/quickstart/).

These resources explain the core pillars of observability, as well as how to use OpenTelemetry’s **Collector** to manage and export telemetry data to observability platforms like Prometheus and Grafana.

## Conclusion

Observability with OpenTelemetry empowers teams to quickly detect, understand, and resolve issues in microservices environments. By adopting this open framework, organizations gain the ability to monitor complex systems without relying on proprietary tools, ensuring scalability and interoperability across platforms. By implementing OpenTelemetry, you gain a unified view of system health across microservices and can ensure your monitoring solutions are scalable and vendor-neutral.