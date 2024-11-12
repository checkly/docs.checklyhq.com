---
title: How to instrument your application with OpenTelemetry
subTitle: An introduction to the instrumentation process
displayTitle: How to instrument your application with OpenTelemetry
navTitle: Instrumentation
description: OpenTelemetry offers two main strategies for adding observability to your application - **direct instrumentation** and **auto-instrumentation**. Each method serves specific use cases, allowing developers to capture telemetry data efficiently while balancing flexibility and simplicity.
date: 2024-10-30
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
  OpenTelemetry offers two main strategies for adding observability to your application, learn how they work together
menu:
  learn:
    parent: "OpenTelemetry"
weight: 2
---


OpenTelemetry offers two main strategies for adding observability to your application: **direct instrumentation** and **auto-instrumentation**. Each method serves specific use cases, allowing developers to capture telemetry data efficiently while balancing flexibility and simplicity.

---

### Direct Instrumentation

Direct instrumentation involves **manually adding code** to your application to generate telemetry data. This requires developers to use the OpenTelemetry SDK specific to their programming language, explicitly invoking functions to create traces, metrics, or logs.

- **Example Use Case**: You might define spans that wrap critical sections of code to monitor database queries or key service calls.
- **Advantages**:
    1. **Precise Control**: Developers control which parts of the application generate telemetry data.
    2. **Contextual Richness**: Since code is written by hand, you can include detailed metadata relevant to your business logic.
    3. **Customization**: Allows for intricate tracking of custom events, metrics, and logs that fit your specific needs.

This approach ensures deeper insights but requires more engineering effort upfront and ongoing maintenance to ensure proper coverage and updates as the code evolves. There are of course 1,001 ways that a clever developer could ensure that the intervention needed even for direct instrumentation was miniman. For example, by wrapping the function that first receives a request, and the function class to ensure that future function calls are reported to a tracer. Direct instrumentation doesn't mean modifying n+1 lines of code, but it does require a fair amount of effort to get launched the first time, no matter how clever your developers are. 

### Auto-Instrumentation

Auto-instrumentation eliminates the need for manual code changes by **injecting telemetry at runtime**. This is often achieved through agents or middleware that modify existing code dynamically. For example, Java or Python applications can use agents to hook into libraries and frameworks they rely on.

- **Example Use Case**: A web server library automatically generates spans for HTTP requests without developer involvement.
- **Advantages**:
    1. **Fast Setup**: No changes to the codebase are required, making it easy to get started.
    2. **Coverage for Standard Libraries**: Many popular libraries and frameworks come with built-in support for auto-instrumentation.
    3. **Consistency**: Ensures consistent telemetry for common operations, reducing the risk of missing critical observability data.
    
    Auto-instrumentation may not offer the same level of granularity or customization as manual instrumentation. Automatic instrumentation can produce unnecessarily ‘noisy’ instrumentation, as just one example the NodeJS auto-instrumentation can produce traces with [hundreds of file system spans](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1344) that can even overrun available memory. 
    
    Finally, auto-instrumentation won’t generally produce useful results if something really unusual is happening inside your application. At base, automatic instrumentation assumes that your service is some kind of online application handling requests and sending responses. If that’s not the case, for example if your application is a machine learning system processing through a database and taking over 48 hours to produce results, you may get less useful information. In these cases, you may want to look into manually reporting [OpenTelemetry metrics](/learn/opentelemetry/otel-metrics).
    

### When to Use Each

- **Direct instrumentation** is ideal for teams seeking maximum flexibility, particularly for custom workflows or applications with unique behavior.
- **Auto-instrumentation** is better suited for scenarios where rapid observability is needed, or when standard libraries provide sufficient coverage.

In many cases, these methods can complement each other. Start with auto-instrumentation to gain quick insights, then enhance with direct instrumentation to capture application-specific details.

For more on how to add instrumentation to specifically integrate with Checkly Traces, [see our Traces documentation](https://www.checklyhq.com/docs/traces-open-telemetry/).