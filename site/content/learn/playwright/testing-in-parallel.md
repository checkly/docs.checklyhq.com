---
title: How to run Playwright tests in parallel
displayTitle: How to run Playwright tests in parallel
date: 2024-11-08
author: Giovanni Rago
githubUser: ragog
tags:
  - e2e
  - assertions
weight: 110
navTitle: Parallel testing
menu:
  learn_playwright:
    parent: "Basics"
---

Playwright offers robust capabilities for automating browser tests. However, a common question among developers revolves around the best practices for structuring Playwright projects, especially when tests involve significant environment changes, resource creation, or database updates.

This post describes strategies for running Playwright tests in parallel, sequence, or both while optimizing your testing workflow for efficiency and reliability.

## Understanding Test Types: stateful vs stateless

Before getting into the technicalities of test execution, you must categorize your tests into two main types: stateless and stateful.

- **Stateless Tests** do not rely on a specific state of the environment and do not alter any global configuration. Since they are isolated in their operations, running them in parallel is generally safe and efficient. Stateless tests won't interfere with each other.
- **Stateful Tests** modify the environment by creating or deleting resources, or changing global configuration. Such tests can easily conflict if run in parallel, as one test's actions might disrupt another's expected environment state.

>[!NOTE]
> Tests that start and rely on a state created by a previous test are typically considered antipatterns. Tests should create and clean up their own state to avoid cluttering test environments and enable parallelization.

## Playwright's Default Test Execution

Before you start wondering how to parallelize all your Playwright tests, be aware that you probably run some of your tests in parallel already.

By default, **Playwright runs your test files in parallel, and all tests in a single file are run in order and with the same worker process**.

![Playwright default execution mode](/learn/images/default-execution@2x.jpg)

This default execution model is a sane default. It safely runs tests in a single file in order while still trying to parallelize all the `spec` files.

The execution model can be changed in multiple ways if you want to parallelize more tests or have specific requirements:

- set `fullyParallel: true` in your `playwright.config`
- change a test file's execution model using `test.describe.configure`
- limit the numbers of `workers` in your `playwright.config` or via the command line

Let's look at common execution scenarios and their required configuration.

## Running Tests Sequentially

While parallel execution is efficient, specific scenarios require running tests sequentially. This is especially true for destructive and stateful tests, where ensuring a predictable and unaltered environment state is crucial for test accuracy.

If you want to run all project tests sequentially, you can turn off Playwright's parallelism entirely. Limit the number of worker processes to one process, and all tests from all files will run after another.

>[!NOTE]
> But remember that you usually want to parallelize as many tests as possible to keep the test execution times low.

You can limit the workers via the command line:

```sh
npx playwright test --workers=1
```

Or set the `workers` property to `1` in your `playwright.config`.

```ts {title="playwright.config.ts"}
export default defineConfig({
  workers: 1,
});
```

There are multiple options if you want to run only a subset of your tests sequentially in one worker.

```sh
# Run all test files in `./tests/sequential` sequentially
npx playwright test --workers=1 ./tests/sequential

# Run all tests with the test tag `@sequential` sequentially
npx playwright test --workers=1 --grep @sequential

# Run all tests in the `sequential` project sequentially
npx playwright test --workers=1 --project=sequential
```

You can run a subset of test files, grep for specific test tags, or define a separate project to run tests sequentially. None of these approaches is better; you must decide what fits your project best.

## Running Tests in Parallel

Thanks to Playwright's automatic encapsulation and easy-to-use worker functionality, the test runner naturally excels at executing tests in parallel, significantly reducing the time it takes to execute your entire test suite.

By default, running multiple workers is limited to test files. Still, you can configure Playwright to parallelize running all your non-destructive and stateless tests, each running in its isolated environment.

To explicitly configure all your tests to run in parallel, you can utilize the `fullyParallel` option in your Playwright configuration file or project settings. This option instructs Playwright to maximize parallelism by launching separate workers for each test file.

Playwright will now try to run as many tests in parallel regardless of where they're defined.

```ts {title="playwright.config.ts"}
export default defineConfig({
  fullyParallel: true,
});
```

However, there are even more configuration options, and the test execution order in test files and groups can still be tweaked another way.

## Playwright's different execution modes

While you can control test execution order and parallelism via the `workers` and `fullyParallel` option, Playwright also allows you to configure each test file or group with predefined execution modes.

### The `serial` mode (sequential)

If you want to run all your project tests using `fullyParallel`, but one file's test should run sequentially, use the `serial` mode.

```ts {title="serial.spec.ts"}
import { test, type Page } from '@playwright/test';

/**
 * Run tests in this file sequentially and stop after a failure.
 *
 * -> If `One` fails `Two` won't be run.
 */
test.describe.configure({ mode: 'serial' });

test('One', async () => { /* ... */ });
test('Two', async () => { /* ... */ });
```

>[!NOTE]
> Note that by using the `serial` mode, a test failure will stop all the subsequent tests from running.

### The `default` mode (sequential)

If you want to run all your tests using `fullyParallel`, but one file's test should run sequentially while ignoring all the test results, use the `default` mode.

```ts {title="default.spec.ts"}
import { test, type Page } from '@playwright/test';

/**
 * Run tests in this file sequentially regardless of their results
 *
 * -> If `One` fails `Two` is still run.
 */
test.describe.configure({ mode: 'default' });

test('One', async () => { /* ... */ });
test('Two', async () => { /* ... */ });
```

The `default` mode will run all defined tests and ignore if tests fail on the way.

### The `parallel` mode

If you don't want to parallelize all your tests with `fullyParallel` but still have one file with stateless tests that you want to run in parallel, use the `parallel` mode.


```ts {title="default.spec.ts"}
import { test, type Page } from '@playwright/test';

/**
 * Run tests in this file in parallel.
 */
test.describe.configure({ mode: 'parallel' });

test('One', async () => { /* ... */ });
test('Two', async () => { /* ... */ });
```

## Leveraging Playwright's Flexibility

Playwright's design accommodates various testing strategies, allowing developers to tailor test execution to their project's needs. Whether running tests in parallel to save time or sequentially to ensure environment stability, Playwright provides the tools necessary to configure your testing environment effectively.

### Tips for Organizing Tests

- Use directories, tags or projects to separate stateful and stateless tests and apply appropriate parallel or sequential execution modes.
- Name your test files strategically if relying on alphabetical execution order for sequencing.
- Consider leveraging Playwright's capabilities for test sharding and annotations for more complex test suite organization.

## Conclusion

Choosing between parallel and sequential execution in Playwright tests hinges on understanding your tests' nature and their impact on the application environment. By categorizing tests into stateful and stateless, developers can apply the appropriate execution strategy, ensuring efficiency and reliability in their E2E testing processes.

Over on [the Checkly YouTube channel](https://www.youtube.com/checklyhq), Stefan gets hands-on with Playwright test Parallelism and execution modes:

{{< youtube id="8NIm1QCUXE0" title="monitoring as code launch event video" >}}
