---
title: A guide to the OpenTelemetry Trace API
displayTitle: A guide to the OpenTelemetry Trace API
navTitle: Trace API
description: The OpenTelemetry Trace API provides developers with the tools needed to create, manage, and analyze traces, a critical component of observability.
date: 2024-10-30
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
  The OpenTelemetry Trace API provides developers with the tools needed to create, manage, and analyze traces, a critical component of observability.
menu:
  learn:
    parent: "OpenTelemetry"
weight: 9
---
## Taking direct control of OpenTelemetry traces via the API

The OpenTelemetry Trace API provides developers with the tools needed to create, manage, and analyze traces, a critical component of observability. Traces represent the journey of a request or process as it flows through a system, breaking it into smaller operations called spans. Understanding how to use the Trace API effectively helps teams gain insight into their systems’ performance and quickly identify bottlenecks or failures.

### Overview

The API allows you to:

- **Add spans**: Define individual operations within a trace.
- **Attach attributes and events**: Provide context to spans, making the trace more informative.
- **Manage context propagation**: Maintain relationships between spans across different parts of your code or services.
- **Use manual and automatic instrumentation**: Complement automatic tracing with custom spans to capture essential information that auto-instrumentation may miss.

### Manual Instrumentation and Spans

While automatic instrumentation can kick off traces and capture key operations, developers often need to add spans manually. For example, a trace may start automatically when handling a web request, but you may want to add spans within specific parts of the application that require deeper insight. Manual spans allow teams to capture contextual information like user IDs or transaction details, providing richer insights for debugging and analysis.

Spans are always linked to a **tracer object**, which is provided by a **tracer provider**. This structure allows modular instrumentation, enabling different components of a system to use their own tracers, scoped by version or module, if needed.

### Context Propagation

Context propagation ensures that spans within a trace maintain their parent-child relationships, even across different services or functions. The API offers two types of context propagation:

- **In-process propagation**: Links spans within the same service or function.
- **Out-of-process propagation**: Connects spans across services via trace context headers.

In languages like Python or JavaScript, this propagation happens implicitly, but in Go, developers must handle it manually using functions like `SpanFromContext` and `ContextWithSpan`.

### Key Operations on Spans

- **SetAttributes**: Attach key-value pairs to spans, providing additional context.
- **AddEvents**: Record events within a span’s lifetime to capture specific actions or failures.
- **SetStatus**: Indicate whether an operation succeeded or failed, aiding in later troubleshooting.
- **AddLinks**: Link different traces together, useful in asynchronous scenarios like message queues.
- **RecordException**: Log exceptions as events within spans, including stack traces and error messages.

### Practical Considerations

Using the Trace API effectively involves balancing automatic and manual instrumentation. Auto-instrumentation handles common scenarios, but manual spans offer the flexibility to capture unique business logic or operations. Proper use of context propagation ensures that traces remain complete and meaningful, avoiding broken or orphaned spans.

The OpenTelemetry Trace API is a powerful tool for teams aiming to build robust observability practices, offering fine-grained control over how operations are tracked and analyzed. By combining this API with backend tools like Prometheus and Grafana, developers can visualize and act on telemetry data to improve system performance and reliability.