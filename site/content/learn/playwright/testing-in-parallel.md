---
title: How to run Playwright tests in parallel
displayTitle: How to run Playwright tests in parallel
date: 2024-11-08
author: Giovanni Rago
githubUser: ragog
tags:
  - e2e
  - assertions
weight: 3
navTitle: Parallel testing
menu:
  learn_playwright:
    parent: "Basics"
---

Playwright offers robust capabilities for automating browser tests. A common question among developers, however, revolves around the best practices for structuring Playwright projects, especially when tests involve significant environment changes, resource creation, or database updates. This blog post describes strategies for running Playwright tests either in parallel or in sequence, optimizing your testing workflow for efficiency and reliability.

## Understanding Test Types: stateful vs stateless

Before getting into the technicalities of test execution, it's essential to categorize your tests into two main types: non-destructive and destructive.

- **Stateless Tests**: These tests do not rely on a specific state of the environment and do not alter any resources. Since they are isolated in their operations, running them in parallel is generally safe and efficient, as they won't interfere with each other.
- **Stateful Tests**: Destructive tests modify the environment by creating or deleting resources, or changing global configurations. Such tests can easily conflict with each other if run in parallel, as one test's actions might disrupt another's expected environment state.

Keep in mind that in most cases, a test that starts and relies on a state that should be created by a previous test is typically considered an antipattern. Tests ideally should create and clean up their own state. Of course, this doesn't help if your tests would collide on the same parameter, record, or other state component.

## Running Tests in Parallel
Playwright naturally excels at running tests in parallel, significantly reducing the time it takes to execute your entire test suite. This is particularly advantageous for non-destructive tests. By default, Playwright attempts to execute tests in parallel using multiple workers, each running in its isolated environment.

Configuring Parallel Execution
To explicitly configure your tests to run in parallel, you can utilize the fullyParallel mode in your Playwright configuration file. This setting instructs Playwright to maximize parallelism by launching separate workers for each test file.

```ts {title="playwright.config.ts"}
module.exports = {
  fullyParallel: true,
}
```

Alternatively, for more granular control, you can use the test.describe.configure method within your test files to set the execution mode to parallel for specific test suites.

`test.describe.configure({ mode: 'parallel' });`

## Running Tests in Sequence
While parallel execution is efficient, certain scenarios necessitate running tests sequentially. This is especially true for destructive tests, where ensuring a predictable and unaltered environment state is crucial for test accuracy.

###Sequential Execution by Default
By default, Playwright treats the order of test cases within a spec file as sequential. If your tests are organized within a single file, Playwright will execute them one after another, using a single worker.

###Enforcing Sequential Execution
For projects with tests spread across multiple files, achieving sequential execution requires a bit more configuration. You can limit Playwright to use a single worker globally via the Playwright configuration file or on a per-directory basis using the command line.

```ts {title="playwright.config.ts"}
module.exports = {
  workers: 1,
}
```

Or, for directory-specific sequential execution:

`npx playwright test --workers=1 ./tests/sequential`
One further use for sequential execution is creating a test to clean up everything that your other tests did. This may be an antipattern depending on your test implementation, but is worth having in your tool belt if it makes sense.

## Leveraging Playwright's Flexibility
Playwright's design accommodates various testing strategies, allowing developers to tailor test execution to their project's needs. Whether running tests in parallel to save time or sequentially to ensure environment stability, Playwright provides the tools necessary to configure your testing environment effectively.

### Tips for Organizing Tests

- Use directories to separate non-destructive and destructive tests, applying appropriate parallel or sequential configurations to each.
- Name your test files strategically if relying on alphabetical execution order for sequencing.
- Consider leveraging Playwright's capabilities for test sharding and annotations for more complex test suite organization.

## Conclusion

Choosing between parallel and sequential execution in Playwright tests hinges on understanding the nature of your tests and the impact they have on the application environment. By categorizing tests into non-destructive and destructive, developers can apply the appropriate execution strategy, ensuring both efficiency and reliability in their E2E testing processes.

Over on the Checkly YouTube page, Stefan gets hands on with Playwright test Parallelism:
