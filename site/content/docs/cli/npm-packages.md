---
title: Using NPM packages
weight: 4
menu:
  docs:
    parent: "CLI"
---

Checkly lets you use JavaScript / TypeScript in your Browser checks and in API check setup & teardown scripts.
This JavaScript code executes in a runtime environment managed by Checkly.
This environment has access to specific Node.js versions and NPM packages that are defined in [our runtimes](https://www.checklyhq.com/docs/runtimes/specs/).

> Not all NPM packages from NPM are available inside the context of a Check.

A runtime consists of a `runtimeId` which you can set at `Project` level or individual `Check` level.
The latest runtime is `2022.10` at the time of writing. This runtime contains among others:

- Nodejs 16.x
- `@playwright/test 1.28.0`
- `axios 0.27.2`
- `lodash 4.17.21`
- `moment 2.29.2`

...and a range of other popular NPM package to help you write and assert checks.

- [Browse the latest runtime specs](https://www.checklyhq.com/docs/runtimes/specs/)
- [Learn more about runtimes](https://www.checklyhq.com/docs/runtimes/)


