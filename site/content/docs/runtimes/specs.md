---
title: Runtime specification - Checkly Docs
displayTitle: Runtime specification
navTitle: Runtime specification
weight: 70
menu:
  resources:
    parent: "Runtimes"
aliases:
  - /docs/browser-checks/runner-specification/

---

By default, all our runners have their timezone set to UTC, regardless of their location.

## Resource limitations
Each Playwright-powered check (Browser and Multistep) can use up to `2.7 GiB` of memory and `1678m` [milli-CPU units](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu). This limit applies to all processes spawned by the check, including the browser, the test framework, and the test code itself. The limit is enforced by the runner and is not configurable.

> When the memory limit is exceeded, the check will automatically fail with a relevant error message, for example: 
> `Your check has reached the maximum memory usage of 2.7 GiB`.

## Built-in Node.js modules
The following standard Node modules are included and can be used as normal, e.g.

```ts
import * as path from 'path'
```

- assert
- buffer
- crypto
- dns
- fs (partial, we have restricted some file system operations for security reasons)
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

> The packages below are included for **setup and teardown scripts** as well, with the exclusion of `fs`, Playwright 
> and `mocha`.

{{% runtimes %}}
