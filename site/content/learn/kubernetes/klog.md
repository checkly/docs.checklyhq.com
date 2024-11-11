---
title: Introducing klog - The Kubernetes Logging Library
displayTitle: klog for structured logging
navTitle: klog
description: Meet klog, the Kubernetes-specific logging library designed to provide structured and reliable logging across Kubernetes components. In this post, we’ll dive into klog’s purpose, key features, and how it’s transforming logging in Kubernetes.
date: 2024-11-08
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: klog, a permanent fork of glog, is a go logging tool focused on structured logging in a Kubernetes envrionment.

menu:
  learn:
    parent: "Kubernetes"
weight: 60
---

With clusters consisting of multiple nodes and applications, maintaining clear and consistent logs is crucial. Enter klog, the Kubernetes-specific logging library designed to provide structured and reliable logging across Kubernetes components. In this post, we’ll dive into klog’s purpose, key features, and how to get started.

### What is klog?

klog is the logging library used within Kubernetes to manage logs across its various components, such as the API server, kubelet, and controller manager. Originally based on Google’s `glog`, klog introduces structured logging and integrates with Kubernetes architecture. As Kubernetes clusters scale, klog’s ability to standardize log output is vital for efficient log collection, storage, and analysis.

Starting with Kubernetes v1.19, klog adopted structured logging to make log entries easier to parse, search, and analyze. This change enables administrators to move away from unstructured plain text logs, which often require custom parsing and lead to inconsistencies across components. Structured logs also allow for better integration with logging tools like Elasticsearch, Fluent Bit, and Grafana, making it easier to monitor, alert, and troubleshoot.

### Why klog Matters for Kubernetes Logging

In Kubernetes, logs are generated by numerous components, each responsible for specific functions. For example:

- **API Server Logs**: Record all interactions with the Kubernetes API.
- **Kubelet Logs**: Provide insights into pod management, resource usage, and node health.
- **Controller Manager Logs**: Capture information about state reconciliation and resource control.

Managing these logs without a consistent format can quickly become overwhelming. klog solves this issue by providing a structured approach to logging, allowing log aggregation and analysis tools to work more effectively. By adopting structured logging, Kubernetes improves observability, making logs easier to query and analyze.

### Key Features of klog

1. **Structured Logging with Key-Value Pairs**:
klog enables structured logging by supporting key-value pairs, allowing log entries to be machine-readable and easily parsable. This structure simplifies log queries, as logs with consistent fields can be filtered and aggregated efficiently.
2. **JSON Support**:
With JSON as the standard format for structured logs, klog makes it easier to ingest logs into centralized logging solutions. JSON logs are widely supported by logging tools, making it simple to integrate Kubernetes logs with existing monitoring systems.
3. **Enhanced Methods for Consistent Logging**:
klog provides new methods (`InfoS` and `ErrorS`) for logging informational and error messages in a structured format. These methods standardize log output across components, reducing inconsistencies and improving the readability of logs.
4. **Seamless Integration with Kubernetes Components**:
klog is embedded in the core of Kubernetes, meaning it’s natively supported by key system components. This allows for out-of-the-box structured logging across all critical areas of a Kubernetes cluster.

### klog vs. Glog: Why the Shift?

Kubernetes previously relied on `glog`, but as the system grew, the limitations of `glog` became apparent. Glog’s lack of structured logging meant that logs were generated as plain text, making them hard to parse and analyze. With structured logging increasingly becoming the standard in observability, Kubernetes needed a library that could support a consistent format across components. klog, with its JSON support and key-value pair structure, was developed to meet these needs.

Structured logging also allows Kubernetes to integrate more easily with third-party monitoring tools, as JSON logs are more compatible with Elasticsearch, Grafana, Prometheus, and other tools that rely on consistent data formatting.

### Key klog Methods: `InfoS` and `ErrorS`

To facilitate structured logging, klog introduced the `InfoS` and `ErrorS` methods. These methods replace traditional logging functions by enforcing a structured, key-value format.

### 1. **InfoS**: Log Informational Messages

The `InfoS` method captures general information in a structured format. This method requires a message followed by key-value pairs, where each key represents a field, and the associated value provides context.

```go
klog.InfoS("Pod status updated", "pod", "kube-dns", "status", "ready")

```

This example logs an informational message, specifying the pod name (`kube-dns`) and its current status (`ready`).

### 2. **ErrorS**: Log Error Messages

The `ErrorS` method is used for error logging. It requires an error as the first parameter, followed by a descriptive message and key-value pairs that provide context for the error.

```go
klog.ErrorS(err, "Failed to update pod status", "pod", "kube-dns")

```

In this example, `ErrorS` logs an error with a detailed message and relevant pod information. This structure makes it easier to track down issues within specific pods or components.

### Example: JSON Output with klog

klog’s structured approach outputs logs in JSON format, making it easier to parse and analyze. Here’s what a typical JSON log entry might look like when generated by klog:

```json
{
  "ts": "2024-11-07T12:00:00Z",
  "level": "info",
  "msg": "Pod status updated",
  "pod": "kube-dns",
  "status": "ready",
  "namespace": "kube-system"
}

```

Each log entry contains key-value pairs for essential information like timestamp, log level, message, pod name, and status, making it easy for log management tools to filter and analyze the data.

### Benefits of Structured Logging with klog

1. **Improved Observability**: Structured logging makes it easier to monitor Kubernetes environments by providing consistent, easily searchable logs.
2. **Efficient Log Analysis**: By outputting logs in JSON, klog supports efficient parsing and querying, which is essential when working with large volumes of data.
3. **Enhanced Integration**: JSON logs integrate seamlessly with observability tools, allowing Kubernetes administrators to visualize and analyze logs more effectively.
4. **Reduced Parsing Complexity**: Structured logs eliminate the need for custom parsing, as log fields are consistent across entries, enabling more straightforward log processing.

### Best Practices for Using klog in Kubernetes

1. **Use Key-Value Pairs Consistently**: Define standard fields for commonly logged events to keep logs consistent across components. For instance, use `"pod"`, `"namespace"`, and `"status"` consistently in pod-related logs.
2. **Set Log Levels Appropriately**: Use log levels (`InfoS` for informational logs and `ErrorS` for errors) to differentiate critical information from general updates. This ensures that logs are meaningful and that critical events are easy to identify.
3. **Monitor Log Performance**: Structured logging can add overhead, so monitor klog’s impact on performance, particularly in high-traffic clusters.
4. **Integrate with Log Management Tools**: klog is compatible with log management systems that support JSON, so integrate it with tools like Fluent Bit, Prometheus, and Grafana to visualize and analyze logs effectively.

### Implementing klog in Your Kubernetes Environment

To enable structured logging with klog, Kubernetes administrators can configure components to use `InfoS` and `ErrorS` methods and output JSON-formatted logs. This setup standardizes logs, improving the efficiency of log aggregation and analysis pipelines.

For a fully integrated solution, combine klog with logging agents like Fluent Bit or Fluentd. These agents can collect logs from across the Kubernetes cluster, parse them, and forward them to centralized storage or monitoring systems.

### Future of klog and Structured Logging in Kubernetes

The move toward structured logging reflects a larger industry trend towards improving observability across distributed systems. With features like contextual logging and enhanced compatibility with monitoring tools, klog will continue to improve the reliability and manageability of Kubernetes logging.

### Conclusion

klog  integration into Kubernetes components and compatibility with JSON format makes it a necessary tool for monitoring and troubleshooting in distributed environments. By using klog’s structured logging features, Kubernetes administrators and developers can improve observability, streamline log analysis, and ensure that their logs remain accessible and actionable across the entire cluster.