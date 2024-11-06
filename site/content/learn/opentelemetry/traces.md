---
title: OpenTelemetry traces
displayTitle: An introduction to OpenTelemetry Traces
navTitle: Traces
description: OpenTelemetry traces capture how individual operations within your system interact over time. A trace follows a request as it flows through a system, recording the relationships between different operations. Traces are particularly useful in distributed systems, where multiple services or components interact. However, they are equally valuable for monolithic applications, providing insights even when everything runs in a single process.
date: 2024-10-30
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
  Learn more about OpenTelemetry & Monitoring with Checkly. Explore metrics, one of the three pillars of observability.
menu:
  learn:
    parent: "OpenTelemetry"
weight: 4
---

# An Introduction to OpenTelemetry Traces

## What Are OpenTelemetry Traces?

OpenTelemetry traces capture how individual operations within your system interact over time. A trace follows a request as it flows through a system, recording the relationships between different operations. Traces are particularly useful in distributed systems, where multiple services or components interact. However, they are equally valuable for monolithic applications, providing insights even when everything runs in a single process.

## Key Concepts in OpenTelemetry Traces

1. **Spans:**  
   - The core unit in a trace.
   - Represents an individual operation.
   - Each span has a name, a start and end time, and metadata (attributes) as key-value pairs.
   - Spans can be nested to reflect parent-child relationships.

2. **Trace Context:**  
   - Propagates trace identifiers across process boundaries.
   - Helps track related spans across multiple services or components.

3. **Automatic Instrumentation:**  
   - Most languages and frameworks allow tracing without code changes by using instrumentation agents.
   - This approach quickly provides a basic trace structure, capturing incoming requests and outgoing responses.

4. **Manual Instrumentation:**  
   - Developers use OpenTelemetry APIs to create spans where deeper insights are needed.
   - Useful for tracking specific application logic or attaching custom attributes.

## Tracing in Monolithic vs. Distributed Systems

Though OpenTelemetry is often associated with microservices, its principles apply equally to monoliths. Even when working with a single application, external dependencies like databases, message queues, or third-party services make distributed tracing beneficial. Instrumenting a monolith provides visibility into which operations are slow, how many database calls occur per request, and which API calls contribute to latency.

## Logs and Traces: A Complementary Approach

Organizations often have an existing logging infrastructure when adopting tracing. OpenTelemetry’s logs bridge allows integration between structured logs and traces by wrapping logs with trace identifiers. This ensures logs and traces remain correlated without requiring a complete overhaul of existing logging practices. The vision of OpenTelemetry logging remains unfinished, but there's hope in coming years that more tools will exist to connect logs and traces more consistently.

Further, until tracing coverage is perfect and well-annotated, logs will be part of the solution to finding the root cause of the problem, after tracing has given strong clues as to the cause (for example with a particularly long and slow span).

### Gradual Migration with Logs Bridge

Organizations can slowly convert significant logs into spans, by processing either within their datastore or at logging time. This approach allows gradual adoption of tracing without interrupting existing workflows, ensuring a smooth transition. 

## Benefits of OpenTelemetry Tracing

- **Visibility:** Quickly identify slow or failing operations.
- **Efficiency:** Diagnose complex issues by tracking dependencies and relationships.
- **Onboarding:** Help new developers understand system behavior through visualized traces.
- **Adaptability:** Works across monoliths, microservices, and hybrid systems.

## Getting Started

To begin, select your language and follow the documentation to add [automatic instrumentation](learn/opentelemetry/otel-instrument/). All major web development language libraries already support tracing out-of-the-box, making it easier to adopt tracing incrementally.

Incorporating OpenTelemetry traces helps developers detect problems earlier, understand their systems better, and respond effectively to user issues. Whether your application is a monolith, a microservice, or somewhere in between, traces provide the insight you need to optimize and troubleshoot your software.