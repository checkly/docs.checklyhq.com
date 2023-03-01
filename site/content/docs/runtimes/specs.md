---
title: Runtime specification
weight: 70
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

See the built-in module documentation on the official Node.js site:

- [16.x](https://nodejs.org/dist/latest-v16.x/docs/api/)
- [14.x](https://nodejs.org/dist/latest-v14.x/docs/api/)
- [12.x](https://nodejs.org/dist/latest-v12.x/docs/api/) (deprecated)

## NPM packages

These are the currently available runtimes and the included external NPM dependencies.

> The packages below are included for **setup and teardown scripts** as well, with the exclusion of Puppeteer, Playwright and Mocha.

> We are planning to deprecate `mocha` in the future. Please use `@playwright/test` as a test framework instead.


{{< runtimes >}}
