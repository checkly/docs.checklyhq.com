---
title: Introduction to the OpenTelemetry Collector
subTitle: What the collector does, why it exists, and whether you can get by without it.
displayTitle: Collector basics
description: The OpenTelemetry Collector is a stand-alone service designed to collect, process, and export telemetry data such as logs, metrics, and traces. It provides a vendor-neutral way to manage this data, offering flexibility in configuration and deployment.
date: 2024-10-18
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
  Learn more about Playwright & Monitoring with Checkly. Explore how to automate your web with a reliable, programmable monitoring workflow.
menu:
  learn:
    parent: "OpenTelemetry"
weight: 5
---

## Introduction to the OpenTelemetry Collector

The OpenTelemetry Collector is a stand-alone service designed to collect, process, and export telemetry data such as logs, metrics, and traces. It provides a vendor-neutral way to manage this data, offering flexibility in configuration and deployment.

## Setting Up Observability with OpenTelemetry

### Instrumentation

To begin, you need to instrument your code with OpenTelemetry client libraries. These libraries help generate telemetry signals such as logs, metrics, and traces from your application.

### Data Collection and Processing

Once the telemetry data is generated, it can be exported directly to a backend or processed through the OpenTelemetry Collector. Using a collector helps offload the responsibility of data management from the application, making it easier to handle different data pipelines.

## Deployment Options

The OpenTelemetry Collector can be deployed in multiple ways:

- **As an agent:** Installed on individual hosts to collect host metrics like CPU, memory, and I/O metrics.
- **As a standalone service:** Runs independently, receiving telemetry from multiple sources.

In larger deployments, a combination of agents and standalone services may be employed to manage scale.

## OpenTelemetry Architecture

The OpenTelemetry framework is part of the Cloud Native Computing Foundation (CNCF) and aims to standardize the handling of telemetry data. It provides a consistent interface to collect and export data across many programming languages.

### Key Functions of the OpenTelemetry Collector

- **Collection:** Collects telemetry data in various formats from multiple sources.
- **Processing:** Applies transformations, such as sampling, batching, or removing sensitive data.
- **Exporting:** Sends telemetry data to different backend systems.

## Components of the OpenTelemetry Collector

1. **Receivers:**
    
    These accept data into the collector. Common formats include OTLP, Jaeger, and Prometheus.
    
2. **Processors:**
    
    Apply operations on the data, such as batching, retries, or adding metadata. Processors can also handle privacy-related tasks like removing personally identifiable information (PII). See our [advanced guide on filtering data with the OpenTelemetry collector](/learn/opentelemetry/otel-filtering).
    
3. **Exporters:**
    
    These send data to backends. You can send metrics to tools like Prometheus and traces to Jaeger or other supported systems.
    

## Configuring the OpenTelemetry Collector

The configuration is managed via a YAML file, defining how receivers, processors, and exporters are connected in pipelines.

### Example Configuration

### Receivers

```yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:
  jaeger:
    protocols:
      grpc:
      thrift_http:

```

### Processors

```yaml
processors:
  batch:
    send_batch_size: 1000
    timeout: 10s
  memory_limiter:
    ballast_size_mib: 683
    limit_mib: 1500
    check_interval: 5s
  queued_retry:
    num_workers: 4
    retry_on_failure: true

```

### Exporters

```yaml
exporters:
  prometheus:
    endpoint: "localhost:9090"
  jaeger:
    endpoint: "localhost:14250"

```

### Service and Pipelines

```yaml
service:
  pipelines:
    traces:
      receivers: [jaeger, otlp]
      processors: [batch, memory_limiter]
      exporters: [jaeger]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [prometheus]

```

## Backend Options for OpenTelemetry Metrics and Traces

After setting up the OpenTelemetry Collector, you will need tools to visualize and analyze the data. Prometheus is a popular choice for storing and querying metrics, while Grafana can visualize these metrics with dashboards. For tracing data, Jaeger is commonly used.

- **Prometheus:** Ideal for collecting and storing time-series metrics.
- **Grafana:** A visualization tool compatible with Prometheus metrics.
- **Jaeger:** Focuses on distributed tracing for microservices-based applications.

## Use Cases

The OpenTelemetry Collector is useful for:

- **Redacting sensitive data:** Ensure compliance with privacy and security standards.
- **Batching telemetry data:** Compress data and reduce the number of outgoing connections.
- **Customizing telemetry pipelines:** Modify attributes, transform metrics, or sample traces to suit your observability needs.

## FAQs

### Do I have to deploy an OpenTelemetry collector?

You don't have to use a collector to gather OpenTelemetry data. In the simplest example where you're monitoring a single monolithic application, the difference without a collector would be at the time of reporting data: instead of traces, logs, and metrics going to a collector; data would travel directly to the storage endpoint. If you're starting out with a demo project, or you're only using OpenTelemetry for a very limited purpose (for example you're only implementing [OpenTelemetry to send a few key traces to Checkly](https://www.checklyhq.com/docs/traces-open-telemetry/how-it-works/)), it may make sense not to use a collector at all.

### What is the difference between the OpenTelemetry Agent and Collector?

The agent is deployed close to the application to collect local data, while the collector is a centralized service that gathers telemetry data from multiple agents or systems.

### How does OpenTelemetry compare with Prometheus?

Prometheus is focused on metrics, using a pull model for data collection. OpenTelemetry, on the other hand, is a broader framework that handles logs, metrics, and traces and supports multiple backends.

### What is OpenTelemetry's collector-contrib?

The `collector-contrib` repository offers community-contributed components that extend the capabilities of the core OpenTelemetry Collector. These additions provide more receivers, processors, and exporters to handle different telemetry scenarios.

## Conclusion

OpenTelemetry Collector offers a flexible and scalable way to manage telemetry data. By using open-source tools such as Prometheus and Grafana, organizations can build robust observability systems tailored to their needs.