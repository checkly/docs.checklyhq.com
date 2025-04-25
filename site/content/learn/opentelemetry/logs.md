---
title: Logging in OpenTelemetry, an Engineer’s Guide
displayTitle: Logging in OpenTelemetry
navTitle: Logging
description: This article will go over the basics, and answer common questions for those getting started with logging in OpenTelemetry.
date: 2025-04-18
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
  OpenTelemetry elevates logging from isolated text snippets to fully contextualized observability data that integrates seamlessly with traces and metrics.
menu:
  learn_otel:
    parent: Key Signals
weight: 50
---


Logging is the one of the oldest signals we get from our production software, but with the emphasis on tracing between services, logging is often not the first feature we think about with OpenTelemetry. However, logging can be a key part of any modern observability toolkit, and this article will go over the basics, and answer common questions for those getting started.


## Why isn’t logging fully supported in so many OTel SDKs?

Taking a look at the ‘Language APIs and SDKs’ section of the OpenTelemetry documentation, and you’ll discover something odd or even concerning, many languages don’t have full logging support!

![A table of OpenTelemetry Frameworks](/learn/images/otel-frameworks.png)

*A table of language-framework support for OpenTelemetry Signals, retrieved in March 2025*

In fact only Java, C, and PHP have ‘stable’ logs support. Is this a cause for concern? In a word ‘no’, this table covers whether, when using the OpenTelemetry SDK, you can make a call to this SDK to emit logging. It is true that in many SDKs this isn’t yet fully supported, but this shouldn’t be a great concern to you because **you are already emitting logging just fine** in your production environment. There are many many ways to add logging to the signals being handled by the OpenTelemetry collector and your OpenTelemetry datastore, which hook in to your current logging streams.

## OpenTelemetry and Structured Logging

When you send logs from traces or events, you could just write raw text. But raw logs are hard to read and parse later. OpenTelemetry prefers **structured logging** instead. Structured logging is a best practice recommended by AWS and other cloud providers as well, since even a simple search of past logs can become prohibitively expensive if you’re 

### What is Structured Logging?

Structured logging means logs are saved in a clear, machine-readable format—like JSON—instead of plain text. Each log has:

- **Fields** (key-value pairs) for details like timestamps, severity, and context.
- **Consistent formatting**, making logs easier to search, filter, and analyze.

### Why OpenTelemetry Uses Structured Logs

1. **Better for Machines** – Tools can automatically process logs without messy parsing.
2. **Connects to Traces** – Logs can link to traces and spans, helping debug issues faster.
3. **Standardized** – OTel defines a common schema so logs work across different systems.

### How OTel Handles Logs

- **Log Records** include:
    - Timestamp
    - Severity (e.g., ERROR, INFO)
    - Message body
    - Attributes (extra context like `user_id`)
- **Integration** with traces and metrics for full observability.

### Example (Structured vs. Raw)

**Raw (Hard to Parse):**

`"Error: User login failed"`

**Structured (Easy to Use):**

```json
{
  "timestamp": "2024-05-21T10:00:00Z",
  "severity": "ERROR",
  "body": "User login failed",
  "attributes": {
    "user_id": "123",
    "error_code": "AUTH_401"
  }
}

```

Structured logs save time and make debugging easier. OpenTelemetry builds this into its design, so your logs work well with other observability tools.

### Even in logging, cardinality explosion is possible

When asking for advice from a senior engineer on labelling new entries into logging with structured labels, and deriving metrics from logs, she replied:

If you turn high-cardinality fields (like `user_ip`) into metric labels, you’ll create thousands of unique time series. **💥 Boom—metrics get huge, slow, and expensive!**

✅ **Structured logs are safer**—you don’t have to predefine every possible label combo. Just extract metrics *after* filtering/aggregating logs (e.g., count errors by `error_type`, not by `user_id`).

🔥 **Why?** Every unique label combination:

- Becomes a separate metric line 📈
- Lives in memory (your app + Prometheus) 🧠
- Slows down scrapes & garbage collection 🐌

💡 **Pro tip:** Use logs for granular data, metrics for aggregates. Pre-aggregate before exporting!

Logging, then, should be seen as similar to event data, and be the storehouse for aggregate, specific information like IP addresses and specific page routes.

## The Promise of OpenTelemetry Logging: Full Context on Every Line

### The Problem with Traditional Logging

Today, logs, traces, and metrics live in separate worlds. They use different tools, formats, and collection methods, making it hard to connect them.

- **Weak links between signals** – Logs might have timestamps or vague tags, but they don’t *truly* connect to traces or metrics.
- **No shared context** – In distributed systems, logs from different services don’t automatically tie together.
- **Manual, messy correlation** – You often stitch things together using timestamps or guesswork.

This leads to **fragile observability**—logs tell part of the story, but not the whole picture.

### OpenTelemetry’s Solution: Built-in Context

OpenTelemetry (OTel) fixes this by **propagating full context in every log line**.

- **Traces + logs = best friends** – Each log carries trace and span IDs, so you can jump from a log to the exact trace (and vice versa).
- **Consistent metadata** – Kubernetes pod info, service names, and other attributes are added *automatically* by the OTel Collector—no manual tagging needed.
- **Distributed systems just work** – Logs from different services share the same context, so you can follow a request across your entire system.

### How It Works

1. **Structured logs** – Logs follow OTel’s data model (like JSON with clear fields).
2. **Automatic enrichment** – The OTel Collector adds context (e.g., `k8s.pod.name`) to logs, traces, and metrics *the same way*.
3. **No re-engineering of existing libraries** – Works with existing logging libraries (Log4j, Logback, etc.) via bridges.

### Why This Matters

- **No more guessing** – Every log line knows exactly where it came from and how it fits into the bigger picture.
- **Better debugging** – Jump from a log error directly to the trace, metrics, and related logs—no manual searching.
- **Future-proof** – Even legacy apps can join the OTel ecosystem via the Collector.

### The Promise, not yet fulfilled

OpenTelemetry promises to turn logs from isolated snippets into **fully connected observability data**. As noted above, not every language SDK has full logging support, meaning this isn’t completely possible now. And the addition of enrichment data isn’t an easy or automatic process at the collector level (the collector is stateless and can only enrich logs based on what it’s processing at that moment). However, logging with OpenTelemetry has a bright future, and adopting now means you’re likely to be producing highly valuable logs in the next few years that prove worth the effort.

## The Collector: OpenTelemetry’s Super-Powered Logging Proxy

### The Problem with Legacy Log Collection

Most apps today log to files or stdout—simple, but messy. To get those logs into observability tools, you need:

- **Parsers** (for JSON, CSV, plain text, etc.)
- **Log tailing** (handling rotation, partial reads)
- **Enrichment** (adding metadata like `trace_id`)

This is fragile work. A typo in a log line can break parsing. Correlating logs with traces? Often manual.

### Enter the OpenTelemetry Collector 🦸

The Collector acts as a **universal log processor**. It can:

1. **Read logs from files/stdout** – No app changes needed.
2. **Auto-add context** – Injects `trace_id`, Kubernetes labels, and more.
3. **Convert to OTLP** – Sends logs in OpenTelemetry’s clean, structured format.

**Bonus:** It does the same for traces and metrics—enriching all signals consistently.

### Two Ways to Use It

### Option 1: File/Stdout → Collector (No Code Changes)

- **How it works**: The Collector tails log files, parses them, and adds context.
- **Good for**: Legacy apps, third-party software.
- **Tradeoff**: Parsing can be tricky if log formats are inconsistent.

### Option 2: App → Collector (Direct OTLP)

- **How it works**: Use an OTel "log appender" (e.g., for Log4j) to send logs directly to the Collector.
- **Good for**: New apps or those you control.
- **Why?** No file parsing, no lost logs on crashes, full structured data.

### The Best Part: Zero Manual Enrichment

No more editing every `log.info()` call! The Collector handles:

- **Trace context** (auto-injects `trace_id`/`span_id`)
- **Resource attributes** (like `k8s.pod.name`)
- **Routing** (send logs to Loki, Splunk, etc.)

### Why This Wins

- **No more "log soup"** – Every log line has rich, queryable fields.
- **Correlation just works** – Logs link to traces automatically.
- **One tool to rule them all** – Same Collector works for logs, traces, and metrics.

How to get started? Start with file collection, then phase in direct OTLP for critical apps.

## Conclusions: OpenTelemetry is Critical to Logging

Logging has always been a fundamental part of understanding software behavior, but in modern distributed systems, traditional logging approaches fall short. OpenTelemetry elevates logging from isolated text snippets to fully contextualized observability data that integrates seamlessly with traces and metrics.

The power of OpenTelemetry logging lies in its structured approach. Rather than dealing with ambiguous plain text logs, systems can emit rich, machine-readable records with consistent timestamps, severity levels, and attributes. This structure enables more reliable parsing, better searching, and most importantly, automatic correlation with trace data. When every log carries trace context, debugging distributed transactions becomes dramatically simpler.

While it's true that not all language SDKs currently offer full logging support, this gap matters less than one might think. The OpenTelemetry Collector provides a powerful bridge, capable of processing existing log files and enriching them with contextual metadata. Whether through direct instrumentation or collector-based processing, teams can start benefiting from better log integration today.

The Collector deserves special attention as the workhorse of OpenTelemetry logging. It handles the messy realities of log collection - file tailing, parsing various formats, and log rotation - while adding valuable context like trace IDs and Kubernetes metadata. This happens automatically, without requiring changes to application code. For organizations running diverse systems, this represents a practical path to better observability.

Looking ahead, OpenTelemetry's vision for logging is clear: logs should be first-class citizens in observability, not isolated artifacts. As the ecosystem matures, we can expect tighter integration between logging SDKs and collectors, making context-rich logging the default rather than the exception.

The transition to OpenTelemetry logging requires some investment, but the payoff is substantial. Teams that adopt this approach will find themselves spending less time hunting through logs and more time solving real problems. In an era of complex distributed systems, this level of observability isn't just nice to have - it's essential for maintaining reliable services and efficient debugging workflows.

For engineering organizations serious about observability, embracing OpenTelemetry's approach to logging isn't an optional upgrade - it's a critical evolution of one of our most fundamental debugging tools. The future of logging is contextual, structured, and integrated, and that future is being built today in OpenTelemetry.