---
title: Structured Logging in Kubernetes - Why it matters and how to get started
displayTitle: Structured Logging in Kubernetes
navTitle: Structured logging
description: Don't put unstructured blobs of data into your Kubernetes logs!
date: 2024-11-08
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
  Best practices for structured logging.
menu:
  learn:
    parent: "Kubernetes"
weight: 50
---

For developers and administrators, adopting structured logging means enhancing observability, streamlining log analysis, and improved system performance. In this post we’ll cover the fundamentals of structured logging in Kubernetes, its practical applications, and best practices for implementing it in your systems.

### Why Kubernetes Logging Matters

Logs capture detailed information about cluster activities, from system component interactions to application behavior. However, Kubernetes logs often come from various sources (containers, system components like etcd, API servers, and nodes) and in inconsistent formats. This can make troubleshooting difficult, especially when logs need to be aggregated for analysis.

Log aggregation helps centralize logs, but without a standardized format, querying logs effectively becomes challenging. Structured logging addresses this issue by providing a consistent, predictable log format across all components, making it easier to analyze and troubleshoot Kubernetes systems.

### What is Structured Logging?

Structured logging means organizing logs into a standardized format, often using key-value pairs. This structure makes it easier to parse, search, and analyze logs, eliminating the need for ad-hoc solutions like regular expressions. Kubernetes structured logging leverages JSON as the standard output format, which is human-readable, widely supported by logging libraries, and efficiently parsed by systems.

### Example of Structured Logging Format

A structured log entry in Kubernetes follows a set format:

```json
{
  "timestamp": "2024-11-07T12:00:00Z",
  "level": "info",
  "message": "Pod status updated",
  "pod": "kube-dns",
  "status": "ready",
  "namespace": "kube-system"
}

```

This JSON structure ensures consistency across logs, allowing easy querying and integration with log management tools like Elasticsearch, Prometheus, and Grafana.

### Implementing Structured Logging in Kubernetes

To standardize Kubernetes logs, new methods (`InfoS` and `ErrorS`) were introduced in the Klog library. These methods provide a consistent structure for log entries, enabling logs to be exported in JSON format.

### Key Components of Structured Logging

1. **Message and Key-Value Pairs**: Structured log messages include a main message followed by key-value pairs.
2. **Klog Methods**:
    - `InfoS`: Captures standard informational logs.
    - `ErrorS`: Captures error logs, with the error as the first parameter, followed by the message and key-value pairs.

### Example Usage

```go
klog.InfoS("Pod status updated", "pod", "kube-dns", "status", "ready")

```

This produces a log entry with a standardized structure, making it easy to interpret and analyze.

### Why JSON for Structured Logging?

JSON was chosen for Kubernetes structured logging because it’s broadly adopted, human-readable, and easily parsed by machines. JSON’s format supports structured data naturally, and tools like `jq` make it straightforward to filter and process JSON logs. By standardizing on JSON, Kubernetes ensures compatibility with most log management and analysis tools, helping reduce friction in log aggregation and processing.

### Performance Benefits of Structured Logging

Migrating to structured logging in JSON format has shown performance improvements. Benchmarks indicate that structured logs in JSON format are significantly faster to parse and query than plain text logs. This improved performance is due to the predictability and standardized structure of JSON logs, which can be processed with fewer computational resources.

### Contextual Logging: Adding Context to Logs

Contextual logging is an advanced form of structured logging. It allows you to attach contextual data to log entries, which helps in understanding the source of specific log events. This is particularly useful in complex Kubernetes environments where logs from various components need to be correlated.

Contextual logging in Kubernetes uses the Go `logger` API, which is designed around structured logging principles and supports attaching additional metadata. This metadata provides context, such as which Kubernetes pod or scheduler plugin a particular log entry is associated with.

### Key Design Decisions in Contextual Logging

1. **Attaching the Logger to Context**: By attaching the logger as a value to the context, functions can use contextual information without requiring explicit parameters.
2. **Retrieving the Logger from Context**: The logger can be retrieved from the context, ensuring that all relevant metadata is accessible across function calls.

### Practical Example of Contextual Logging

Imagine a scenario where a developer wants to track which pod and operation a particular log message is associated with. By using contextual logging, they can attach relevant details to the log message, making it easier to filter logs based on pod and operation identifiers.

```go
logger := klog.FromContext(ctx).WithValues("pod", "kube-dns", "operation", "volume-binding")

```

This will produce logs with a prefix like `kube-dns/volume-binding`, helping the developer quickly locate logs related to specific pods or operations.

### Best Practices for Structured Logging in Kubernetes

To maximize the benefits of structured logging, consider these best practices:

1. **Use Key-Value Pairs Consistently**: Ensure that logs across different Kubernetes components use similar key-value pairs for the same types of data. This consistency simplifies queries and analysis.
2. **Limit Log Levels**: Structured logs should focus on meaningful events. Avoid logging verbose data by default to reduce log noise and storage costs.
3. **Avoid Logging Sensitive Information**: Take care not to log sensitive data, such as passwords or personal information. If sensitive data must be logged for troubleshooting, redact it before storing or transmitting logs.
4. **Monitor Log Performance**: Monitor the performance impact of structured logging, especially if you’re logging high volumes of data. Contextual logging can add overhead, so consider trade-offs between logging detail and performance.
5. **Test JSON Parsing**: Ensure that your JSON logs are correctly formatted and parsable. Invalid JSON structures can cause issues in downstream log analysis tools.
6. **Leverage Contextual Logging for Complex Workflows**: Use contextual logging when tracking complex workflows or operations across Kubernetes components. This can simplify debugging by adding relevant context to logs.

### Current Status and Future of Structured Logging

Structured logging in Kubernetes is now generally available (GA), and contextual logging is expected to enter beta soon. If you’re interested in contributing, the Kubernetes community has ongoing efforts to enhance structured logging through working groups and regular meetings.

### Getting Started with Structured Logging in Your Cluster

1. **Enable Structured Logging**: Ensure Kubernetes components are configured to use structured logging, ideally in JSON format.
2. **Integrate with Log Management Tools**: Use tools like Fluent Bit, Elasticsearch, and Grafana to collect, store, and analyze your structured logs.
3. **Experiment with Contextual Logging**: Add contextual logging where it provides meaningful insights, such as when debugging complex interactions between components.

### Conclusion

Structured logging is a foundational improvement for observability in Kubernetes. By adopting structured and contextual logging, you can make your logs more actionable, improve troubleshooting workflows, and enhance your cluster’s reliability. For developers and administrators, structured logging provides a robust, future-proof solution for managing the complexity of Kubernetes environments.