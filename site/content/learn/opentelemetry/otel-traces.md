---
title: OpenTelemetry traces
subTitle: An introduction to OpenTelemetry's most readable tool
displayTitle: OpenTelemetry Traces
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
   - Some languages and frameworks allow tracing without code changes by using instrumentation agents.
   - This approach quickly provides a basic trace structure, capturing incoming requests and outgoing responses.

4. **Manual Instrumentation:**  
   - Developers use OpenTelemetry APIs to create spans where deeper insights are needed.
   - Useful for tracking specific application logic or attaching custom attributes.

## Tracing in Monolithic vs. Distributed Systems

Though OpenTelemetry is often associated with microservices, its principles apply equally to monoliths. Even when working with a single application, external dependencies like databases, message queues, or third-party services make distributed tracing beneficial. Instrumenting a monolith provides visibility into which operations are slow, how many database calls occur per request, and which API calls contribute to latency.

### Example: Intercom’s Tracing Journey

Intercom, a company that offers customer communication tools, transitioned from using structured logs to adopting tracing incrementally. They started by instrumenting API and database calls, which provided immediate value. Over time, they instrumented more of their service, improving their understanding of internal workflows and onboarding processes.

## Logs and Traces: A Complementary Approach

Organizations often have an existing logging infrastructure when adopting tracing. OpenTelemetry’s logs bridge allows integration between structured logs and traces by wrapping logs with trace identifiers. This ensures logs and traces remain correlated without requiring a complete overhaul of existing logging practices.

### Gradual Migration with Logs Bridge

Organizations can slowly convert significant logs into spans, as seen with Loan Market, an Australian financial services company. This approach allows gradual adoption of tracing without interrupting existing workflows, ensuring a smooth transition.

## Benefits of OpenTelemetry Tracing

- **Visibility:** Quickly identify slow or failing operations.
- **Efficiency:** Diagnose complex issues by tracking dependencies and relationships.
- **Onboarding:** Help new developers understand system behavior through visualized traces.
- **Adaptability:** Works across monoliths, microservices, and hybrid systems.

## Getting Started

To begin, select your language and follow the documentation to add automatic instrumentation or use the OpenTelemetry API to create spans. Many libraries already support tracing out-of-the-box, making it easier to adopt tracing incrementally.

Incorporating OpenTelemetry traces helps developers detect problems earlier, understand their systems better, and respond effectively to user issues. Whether your application is a monolith, a microservice, or somewhere in between, traces provide the insight you need to optimize and troubleshoot your software.