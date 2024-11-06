---
title: Running tests in parallel with Playwright
navTitle: Running tests in parallel
subTitle: Speeding up tests by skipping login, and more
date: 2020-10-14
author: Giovanni Rago
githubUser: ragog
tags:
  - parallel
weight: 3
menu:
  learn:
    parent: "Basics"
---

_Playwright offers robust capabilities for automating browser tests. A question that arises when writing tests is whether to run them in parallel or in sequence. Choosing the right execution method depends on the nature of your tests and the environments they run in. This article covers the essentials of parallel and sequential test execution, and offers practical tips for optimizing test execution in Playwright._

## Table of Contents
- [Understanding Test Types: stateful vs. stateless](#understanding-test-types-stateful-vs-stateless)
- [Running Tests in Parallel](#running-tests-in-parallel)
- [Running Tests in Sequence](#running-tests-in-sequence)
- [Leveraging Playwright’s Flexibility](#leveraging-playwrights-flexibility)
- [Conclusion](#conclusion)

## Understanding Test Types: stateful vs. stateless

Before jumping into the specifics of execution methods, it’s essential to categorize tests based on their interaction with the test environment.

- **Stateful Tests**: These rely on a specific state or context, such as data created in a prior test. Running stateful tests in parallel may lead to flaky or unreliable outcomes if tests interact with shared resources.
  
- **Stateless Tests**: These tests are isolated and independent, with each execution run being self-contained. Stateless tests are ideal candidates for parallel execution, which can significantly reduce test execution times.

When deciding between parallel or sequential execution, consider the nature of your tests. For example, if a test suite includes both stateful and stateless tests, parallelizing only the stateless tests can enhance efficiency without sacrificing reliability.

_Playwright supports flexible test execution options, allowing you to run tests in parallel, sequentially, or a combination of both depending on your needs._

## Running Tests in Parallel

Playwright naturally excels at running tests in parallel, significantly reducing the time required for test suites. To configure Playwright to run tests in parallel, set the `workers` option to the desired number of concurrent instances.

```javascript
// playwright.config.js
module.exports = {
  fullyParallel: true,
};
```

Alternatively, for even greater control, you can use the `shard` option to split tests across multiple machines. You can also set the test execution mode for each specific project by selecting isolated execution for each browser.

_For more detailed information, refer to the Playwright [parallel test execution documentation](https://playwright.dev/docs/test-parallel)._

## Running Tests in Sequence

While parallel execution offers clear time savings, certain scenarios necessitate running tests sequentially. This is especially true for stateful tests or tests that depend on specific ordering.

### Sequential Execution by Default
By default, Playwright groups the test order of each suite within a file in sequence. This is useful when test dependencies exist. For example, Playwright will execute tests in the order they are declared.

### Enforcing Sequential Execution
For projects with stringent execution rules, enforcing sequential execution helps avoid potential issues. Sequential execution can be set on a per-directory basis using the `workers` configuration.

```javascript
// playwright.config.js
module.exports = {
  workers: 1,
};
```

Or, for directory-specific sequential execution:

- Set folder-specific configurations in the Playwright config file or use environment variables to ensure everything runs smoothly without cross-test interference.

## Leveraging Playwright’s Flexibility

Playwright is designed to be flexible, supporting various testing strategies, allowing developers to maximize efficiency without sacrificing reliability. Though parallel execution can drastically reduce test times, sequential execution is invaluable when working with interdependent tests.

### Tips for Organizing Tests
- Use directories to separate state-dependent and stateless tests, ensuring parallel and sequential tests don’t interfere with each other.
- Consider leveraging Playwright’s capabilities to test the stability and performance of your applications by running tests in different modes and across multiple environments.

## Conclusion

Choosing between parallel and sequential execution in Playwright tests hinges on understanding the nature of your tests and the environments they run in. Playwright’s robust flexibility allows developers to create efficient test pipelines, striking a balance between speed and reliability.

Over on the Checkly YouTube page, Stefan goes hands-on with Playwright test strategies.

{{< youtube id="fG0YePSS5iA" >}}

**Join the Checkly Community**

Checkly is a go-to resource for running your Playwright tests in orchestrated and optimized environments. Visit the Checkly [learning resources](https://checklyhq.com/learn) to meet other engineers committed to learning testing best practices.