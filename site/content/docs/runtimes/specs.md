---
title: Runtime specification
weight: 70
menu:
  resources:
    parent: "Runtimes"
aliases:
  - /docs/browser-checks/runner-specification/
cli: true
---

By default, all our runners have their timezone set to UTC, regardless of their location.

## Resource limitations
Each Browser and Multistep check can use up to `2.9 GiB` of memory and `2 vCPU` cores. This limit applies to all processes spawned by the check, including the browser, the test framework, and the test code itself. The limit is enforced by the runner and is not configurable.

> When the memory limit is exceeded, the check will automatically fail with a relevant error message, for example: `Your check has reached the maximum memory usage of 2.9 GiB`.

## Built-in Node.js modules

- assert
- buffer
- crypto
- dns
- fs
- path
- querystring
- readline
- stream
- string_decoder
- timers
- tls
- url
- util
- zlib

See the built-in module documentation on the official Node.js site (please see below which runtime includes what NodeJS version):

- [18.x](https://nodejs.org/dist/latest-v18.x/docs/api/)
- [16.x](https://nodejs.org/dist/latest-v16.x/docs/api/)

## NPM packages

These are the currently available runtimes and the included external NPM dependencies.

> The packages below are included for **setup and teardown scripts** as well, with the exclusion of Playwright and `mocha`.
> `mocha` is deprecated. Please use `@playwright/test` as a test framework instead.

{{% runtimes %}}
