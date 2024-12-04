---
title: Centralized logging in Kubernetes with OpenTelemetry - guide with examples
displayTitle: Centralized logging in Kubernetes with OpenTelemetry
navTitle: Centralized Logging
description: Monitoring logs effectively in a Kubernetes environment requires tools that centralize and streamline log management. 
date: 2024-11-08
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
  Learn about using OpenTelemetry for centralized logging in Kubernetes
menu:
  learn:
    parent: "Kubernetes"
weight: 30
---
Monitoring logs effectively in a Kubernetes environment requires tools that centralize and streamline log management. With OpenTelemetry, Kubernetes administrators can collect, process, and export logs from applications and infrastructure, ensuring consistent data and reducing the need for multiple, disparate logging solutions. Here’s an overview of how OpenTelemetry supports centralized logging in Kubernetes and the practical benefits it offers.

### Why Centralized Logging Matters in Kubernetes

Logs provide critical insights into application performance, errors, and security events. In a Kubernetes setup, workloads are distributed across many nodes, making it essential to have a centralized logging solution to collect logs in one place. Centralized logging enables teams to efficiently manage logs from across the entire Kubernetes cluster and prevents loss of logs during pod restarts or node replacements.

The OpenTelemetry project, initially created to address distributed tracing, has expanded to include metrics and now, comprehensive logging support. With its recent logging capabilities, OpenTelemetry provides a unified framework for collecting and correlating logs alongside traces and metrics, ensuring consistency and reliability.

### Key Components of OpenTelemetry for Centralized Logging

1. **OpenTelemetry Collector**: The OpenTelemetry Collector is at the heart of centralized logging with OpenTelemetry. It’s a standalone agent that can be deployed on Kubernetes nodes, Windows, or Linux hosts, and it’s capable of collecting logs from multiple sources. In Kubernetes, the collector can capture logs, system metrics (such as CPU and memory usage), and metrics from third-party applications.
2. **Instrumentation Libraries**: OpenTelemetry includes libraries and SDKs for popular programming languages, which can add logging capabilities directly to application code. By using OpenTelemetry’s appenders, developers can export logs in OpenTelemetry’s native format, simplifying log management and reducing the overhead typically required for parsing and reshaping logs.
3. **Data Model and Semantic Conventions**: OpenTelemetry introduces a standardized data model and semantic conventions, ensuring that logs have consistent metadata and structure across the entire system. This is critical for efficient querying and analysis, as it eliminates the need for complex parsing and filtering.

### Benefits of Using OpenTelemetry for Centralized Logging

OpenTelemetry’s approach to centralized logging addresses some common challenges in log management:

- **Consistency in Metadata**: One of the biggest issues with traditional logging is inconsistent metadata. With OpenTelemetry’s semantic conventions, metadata is standardized across logs, traces, and metrics, making it easier to analyze data across multiple sources.
- **Performance Optimization**: By processing logs directly in OpenTelemetry’s format, the collector minimizes CPU and memory usage associated with parsing and reshaping logs. Logs from OpenTelemetry-enabled applications can be sent directly to the collector without intermediary processing steps, saving resources.
- **Correlation Across Data Types**: OpenTelemetry simplifies correlating logs, traces, and metrics. This correlation provides a holistic view of application performance, helping teams diagnose and resolve issues quickly. For instance, logs from a failed request can be directly linked to corresponding trace data, helping teams identify the root cause faster.

### How the OpenTelemetry Collector Works in Kubernetes

The OpenTelemetry Collector can be deployed as a DaemonSet in a Kubernetes cluster, running as an agent on each node. This setup allows the collector to:

- Capture logs from containers, application components, and system processes.
- Process and transform logs to match the OpenTelemetry data model.
- Export logs to different backends (e.g., Elasticsearch, Splunk, or a cloud provider’s logging service).

The collector includes built-in parsers and transformation capabilities to handle logs in various formats, such as JSON or text. This flexibility is especially useful in Kubernetes environments where logs from different applications and services may not share a standard format. For more detail on deployment options for the collector, [see our guide to collector architecture](/learn/opentelemetry/what-is-the-otel-collector).

### Implementing Centralized Logging with OpenTelemetry in Kubernetes

Here’s how to set up centralized logging in Kubernetes with OpenTelemetry:

1. **Deploy the OpenTelemetry Collector**: Deploy the OpenTelemetry Collector as an agent on each Kubernetes node. This enables it to capture logs from all pods running on that node. A DaemonSet can simplify deployment, ensuring the collector runs on every node in the cluster.
2. **Configure Log Ingestion**: Configure the collector to ingest logs from different sources. The collector supports various log sources, including container logs, syslogs, and even other log agents like Fluent Bit. It can read application logs directly from files or through network protocols.
3. **Define Transformations and Exports**: Use OpenTelemetry’s processing capabilities to normalize logs, add metadata, and apply semantic conventions. After processing, configure the collector to export logs to a centralized logging backend or a cloud-based logging service.
4. **Correlate Logs with Traces and Metrics**: The collector can correlate logs, traces, and metrics by applying consistent metadata and sampling rules. For instance, if you’re sampling traces at a certain rate, the collector can apply the same sampling rate to logs, ensuring that traces and logs remain aligned.

### Advantages of OpenTelemetry Logging in Kubernetes

By adopting OpenTelemetry for centralized logging, Kubernetes administrators gain several benefits:

- **Unified Telemetry Stack**: OpenTelemetry consolidates logging, tracing, and metrics collection, eliminating the need for multiple agents and configuration files. This simplifies management and reduces potential points of failure.
- **Flexibility in Log Destination**: Logs can be sent to multiple backends, allowing organizations to maintain control over their data while still meeting specific requirements, such as long-term storage or compliance.
- **Improved Efficiency**: OpenTelemetry’s design reduces the CPU and memory overhead of log processing, which is critical in Kubernetes environments where resources are often at a premium.

### Conclusion

Centralized logging in Kubernetes is a necessity for maintaining reliable and secure applications. With OpenTelemetry, administrators gain a unified framework for collecting, processing, and exporting logs alongside other telemetry data types. The OpenTelemetry Collector serves as a powerful tool for centralized log management, providing consistency, efficiency, and flexibility to meet the demands of modern, distributed applications.