---
title: Go
head:
  title: "Instrumenting Go with OpenTelemetry"
metatags:
  title: "Instrumenting Go with OpenTelemetry"
  description: "Instrument your Go application with OpenTelemetry and send traces to Checkly."
weight: 35
menu:
  integrations:
    parent: "Instrumenting your code with OpenTelemetry"
beta: true
---

This guide will help you instrument the `net/http` stack of your Go application(s) with OpenTelemetry and send traces 
to Checkly.
<!--more-->
## Step 1: Install the OpenTelemetry SDK

Install the relevant OpenTelemetry packages:

```bash
go get "go.opentelemetry.io/otel" \
  "go.opentelemetry.io/otel/propagation" \
  "go.opentelemetry.io/otel/sdk/trace" \
  "go.opentelemetry.io/otel/exporters/otlp/otlptrace" \
  "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp" \
  "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
```

## Step 2: Set up SDK

Create a file called `tracing.go` at the root of your project and add the following code:

```go
// tracing.go

package main

import (
	"context"
	"errors"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/trace"
)

func setupOTelSDK(ctx context.Context) (shutdown func(context.Context) error, err error) {
	var shutdownFuncs []func(context.Context) error

	shutdown = func(ctx context.Context) error {
		var err error
		for _, fn := range shutdownFuncs {
			err = errors.Join(err, fn(ctx))
		}
		shutdownFuncs = nil
		return err
	}

	handleErr := func(inErr error) {
		err = errors.Join(inErr, shutdown(ctx))
	}

	prop := newPropagator()
	otel.SetTextMapPropagator(prop)

	tracerProvider, err := newTraceProvider()
	if err != nil {
		handleErr(err)
		return
	}
	shutdownFuncs = append(shutdownFuncs, tracerProvider.Shutdown)
	otel.SetTracerProvider(tracerProvider)

	return
}

func newPropagator() propagation.TextMapPropagator {
	return propagation.NewCompositeTextMapPropagator(
		propagation.TraceContext{},
		propagation.Baggage{},
	)
}

func newTraceProvider() (*trace.TracerProvider, error) {

	traceClient := otlptracehttp.NewClient()

	var traceExporter, err = otlptrace.New(context.Background(), traceClient)
	if err != nil {
		return nil, err
	}

	bsp := trace.NewBatchSpanProcessor(traceExporter)

	tracerProvider := trace.NewTracerProvider(
		trace.WithSampler(trace.AlwaysSample()),
		trace.WithSpanProcessor(bsp),
	)

	return tracerProvider, nil
}

```

## Step 3: Initialize the instrumentation

Add or adapt the following code to your `main.go` file. The key parts are as follows:

1. Wrap the default `http.Handler` with the`otelhttp.NewHandler` function.
2. Add the `otelChecklyFilter` function to filter out the requests that should be traced and send to Checkly.

```go
// main.go

package main

import (
	"context"
	"errors"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"strings"

	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
)

func main() {
	if err := run(); err != nil {
		log.Fatalln(err)
	}
}

func run() (err error) {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()

	otelShutdown, err := setupOTelSDK(ctx)
	if err != nil {
		return
	}

	defer func() {
		err = otelShutdown(context.Background())
	}()

	handler := http.Handler(http.DefaultServeMux)
	wrappedHandler := otelhttp.NewHandler(handler, "", otelhttp.WithFilter(otelChecklyFilter))

	srv := &http.Server{
		Addr:        ":8080",
		BaseContext: func(_ net.Listener) context.Context { return ctx },
		Handler:     wrappedHandler,
	}
	srvErr := make(chan error, 1)
	go func() {
		srvErr <- srv.ListenAndServe()
	}()

	select {
	case err = <-srvErr:
		return
	case <-ctx.Done():
		stop()
	}

	err = srv.Shutdown(context.Background())
	return
}

func otelChecklyFilter(req *http.Request) bool {
	header := req.Header.Get("tracestate")
	return header != "" && strings.Contains(header, "checkly=true")
}
```
## Step 4: Start your app with the instrumentation

{{< markdownpartial "/_shared/otel-api-and-endpoint.md" >}}


Export your API key and endpoint as environment variables in your shell. 

```bash
export CHECKLY_OTEL_API_ENDPOINT="otel.eu-west-1.checklyhq.com # EU instance
export CHECKLY_OTEL_API_KEY="<your Checkly OTel API key>"
```
Then run you app as usual:

```bash
go run main.go
```
