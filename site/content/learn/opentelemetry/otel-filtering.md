---
title: Advanced Data Filtering with the OpenTelemetry Collector
subTitle: Route, filter, and control your data with the collector
displayTitle: Advanced Data Filtering with the OpenTelemetry Collector
navTitle: Filtering
description: The OpenTelemetry Collector is a stand-alone service designed to collect, process, and export telemetry data such as logs, metrics, and traces. You can filter this data with the collector.
date: 2024-10-18
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
  An advanced guide to filtering data with processors and the OpenTelemetry Transform Language
menu:
  learn:
    parent: "OpenTelemetry"
weight: 7
---

The **OpenTelemetry Collector** is a powerful tool for managing telemetry data flows. One of its most valuable features is the ability to filter and transform data without modifying application code. This flexibility makes the collector an essential component for **controlling data overhead**, ensuring data privacy, and maintaining efficient observability pipelines.

---

## Why Filtering Matters

Instrumentation often generates **noisy or redundant data**. Some metrics or traces may include unnecessary information—like personal data or debug logs—leading to bloated dashboards, higher storage costs, and privacy risks. Filtering data within the OpenTelemetry Collector allows you to:

- **Remove unwanted data** to reduce noise.
- **Mask or drop sensitive information** such as personally identifiable information (PII).
- **Transform data formats** (e.g., unify naming conventions).
- **Control data flow to different backends** by sending filtered data to specific pipelines.

---

## How the OpenTelemetry Collector Filters Data

The Collector consists of **receivers, processors, and exporters**. Each plays a role in data filtering:

1. **Receivers**: Collect data from sources like applications and agents.
2. **Processors**: Modify, filter, or batch data before it is exported.
3. **Exporters**: Send the processed data to observability backends, such as **Prometheus** or **Grafana**.

### Processor-based Filtering

Processors allow transformations and data filtering mid-pipeline. Processors offer inherently limited transformation configuration to do the most common tasks like:

- **Drop attributes or entire spans**: Remove unnecessary fields or reduce trace volume.
- **Normalize data formats**: Convert snake_case to camelCase, or unify attribute labels.
- **Mask sensitive data**: Scrub PII before it is transmitted.

Example configuration to normalize naming conventions:

```yaml
processors:
  metricstransform/rename:
    transforms:
      include: system.cpu.usage
      action: update
      new_name: system.cpu.usage_time

```

---

## Transformations Using OpenTelemetry Transform Language (OTTL)

The **OpenTelemetry Transform Language (OTTL)** provides enhanced flexibility for complex transformations. OTTL allows for:

- **Pattern-based transformations**: Modify data dynamically using regex or templates.
- **Extract and relocate attributes**: Move user IDs from URL parameters to span attributes.
- **Conditional filtering**: Drop traces based on specific conditions, such as redundant spans.

Here’s an example of the more complex logic available with OTTL, keeping data from app1, app2, OR app3

```yaml
processors:
  filter/ottl:
    error_mode: ignore
    traces:
      span:
        - |
        resource.attributes["service.name"] != "app1" and
        resource.attributes["service.name"] != "app2" and
        resource.attributes["service.name"] != "app3"

```

Since OTTL allows functional changes of your data, this is really the simplest possible example of a use case: a gate that goes just beyond simple filtering. 

## Stateful Operations and Their Limitations

While the collector excels at real-time data transformations, it is **stateless by design** to ensure high performance. Stateful operations—such as aggregating historical data—are not natively supported. This ensures the collector remains lightweight and efficient.

Common limitations include:

- **No support for complex span re-linking**: Spans cannot be re-associated once collected.
- **Limited historical context**: Filtering decisions are based only on the current data batch.

Note: if you are reading this section trying to figure out how to add stateful filtering, e.g. forwarding only the longest trace seen in a 24-hour period I recommend that you *stop* pursuing this within the OTel collector. The limitations of the collector exist for performance reasons, and adding state to the tool will cause unexpected downstream effects as, for example, the collector becomes too burdened to always be ready to accept OTLP data from your services.

## Filtering Use Cases

1. **PII Masking**: Remove personal data before sending traces to public dashboards.
2. **Debug Data Suppression**: Drop debug-level logs from production pipelines.
3. **Multi-pipeline Export**: Send sanitized data to public dashboards while retaining full data for internal analysis.

---

## Conclusion

The OpenTelemetry Collector provides a robust framework for **controlling data flow and transformation** without requiring changes to application code. Its **processor-based filtering** and support for **OTL** make it an ideal tool for managing telemetry data in complex observability setups. By leveraging filtering effectively, teams can reduce overhead, ensure data privacy, and maintain efficient monitoring pipelines.

For more details on configuring the OpenTelemetry Collector, explore the [official documentation](https://opentelemetry.io/docs/collector/).