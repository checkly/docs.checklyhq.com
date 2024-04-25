---
title: Node.js
weight: 31
menu:
  integrations:
    parent: "Instrumenting your code with OpenTelemetry"
beta: true
---

This guide will help you instrument your Node.js application(s) with OpenTelemetry and send traces Checkly.

## Step 1: Get the API endpoint and an API key

{{< markdownpartial "/_shared/otel-prereqs.md" >}}


## Step 2: Install the OpenTelemetry SDK

```bash
npm install --save \
    @opentelemetry/sdk-node \
    @opentelemetry/exporter-trace-otlp-proto \
    @opentelemetry/auto-instrumentations-node
```

## Step 2: Initialize the instrumentation

Create a file called `tracing.js` at the root of your project and add the following code"

```javascript
// tracing.js
const { NodeSDK } = require('@opentelemetry/sdk-node')
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto')
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node')
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base')
const { Resource } = require('@opentelemetry/resources')
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')
const { ParentBasedSampler, SamplingDecision } = require('@opentelemetry/sdk-trace-base')

const checklyExporter = new OTLPTraceExporter({
  timeoutMillis: 2000,
  url: process.env.CHECKLY_OTEL_API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.CHECKLY_OTEL_API_KEY}`,
  }
})

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: `my-node-app`,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  spanProcessors: new BatchSpanProcessor(checklyExporter),
  sampler: new ParentBasedSampler({
    root: {
      shouldSample: (context, traceId, spanName, spanKind, attributes, links) => {
        if (attributes['tracestate']?.includes('checky=true')) {
          return { decision: SamplingDecision.RECORD_AND_SAMPLED }
        } else {
          return { decision: SamplingDecision.NOT_RECORD }
        }
      },
    },
  }),
})

sdk.start()

// Shutdown the SDK when the Node.js process is terminated
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OTel Tracing terminated'))
    .catch((error) => console.log('Error terminating OTel tracing', error))
    .finally(() => process.exit(0))
})
```
## Step 3: Start your app with the instrumentation

Export your API key and endpoint as environment variables in your shell.

```bash
export CHECKLY_OTEL_API_ENDPOINT="https://otel.us-east-1.checklyhq.com/v1/traces" # US instance
#export CHECKLY_OTEL_API_ENDPOINT="https://otel.us-east-1.checklyhq.com/v1/traces" # EU instance
export CHECKLY_OTEL_API_KEY="<your Checkly OTel API key>"
```
Then start your app with the extra `-r` flag to load the `tracing.js` file before any other files are loaded.

```bash
node -r ./tracing.js index.js
```
🎉 You are done. Any interactions with your app that are triggered by a Checkly synthetic monitoring check will now generate 
traces, which are sent back to Checkly and displayed in the Checkly UI.

## Reducing noise in the auto Node.js instrumentation

We found the Node.js auto-instrumentation a bit noisy. There can be a lot of file i/o and a ton of DNS calls you might not 
be interested in. Luckily, you can easily tweak that by providing some extra options to the `getNodeAutoInstrumentations()` function.
We use the following configuration to filter out some of the noise:

```javascript
instrumentations: [getNodeAutoInstrumentations({
  '@opentelemetry/instrumentation-hapi': {
    enabled: false,
  },
  '@opentelemetry/instrumentation-fs': {
    enabled: false,
  },
  '@opentelemetry/instrumentation-net': {
    enabled: false,
  },
  '@opentelemetry/instrumentation-dns': {
    enabled: false,
  },
  '@opentelemetry/instrumentation-http': {
    enabled: true,
  },
})]
```
