---
title: Runtime specification
weight: 9999
menu:
  docs:
    parent: "Runtimes"
aliases:
    - /docs/browser-checks/runner-specification/
---

By default, all our runners have their timezone set to UTC, regardless of their location.

## Built-in Node.js modules

- assert
- buffer
- crypto
- dns
- path
- querystring
- readline
- stream
- string_decoder
- stream
- timers
- tls
- url
- util
- zlib

See the [built-in module documentation on the official Node.js site](https://nodejs.org/dist/latest-v12.x/docs/api/)

## NPM packages

These are the currently available runtimes and the included external NPM dependencies.

{{< runtimes >}}
