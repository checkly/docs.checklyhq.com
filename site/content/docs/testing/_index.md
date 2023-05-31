---
title: Getting started with testing
weight: 1
slug: /
aliases:
- /docs/testing
menu:
  platform:
    parent: "Testing"
    identifier: testing-overview
---

Checkly unites E2E testing and monitoring in one monitoring as code (MaC) workflow. Ideally, this workflow consists of the following
steps:

1. You **code** your checks using our [JS/TS based CLI](/docs/cli) alongside your application code.
2. You **test** your checks locally, or inside your CI/CD pipeline to make sure they run reliably against your staging and production
environments.
3. You **deploy** your checks to Checkly, so we can run them around the clock as monitors and alert you when things break.

However, you can unite E2E testing with monitoring in multiple ways with Checkly. You might be a Terraform shop, or just configure
your checks in the web UI first. To help you pick your own journey, we will discuss the core principles below.

- [Test sessions](#test-sessions)
- [Testing with the CLI](#testing-with-the-cli)
- [Triggering tests via the CLI](#triggering-tests-via-the-cli)
- [Triggering tests via integrations](#triggering-tests-via-integrations)

## Test Sessions

Regardless of how you run / trigger your test runs, every batch of test runs is recorded as a **test session** and displayed
in your [test sessions page](https://app.checklyhq.com/test-sessions).

![test sessions overview](/docs/images/testing/test_session_overview@2x.jpg)

The test session overview provides insights into where a test session was triggered from and who triggered it.

![test sessions detail](/docs/images/testing/test_session_detail@2x.jpg)

While test session details are automatically detected you can also configure them:

| Test session detail | Source                                                                       |
|---------------------|------------------------------------------------------------------------------|
| **Duration**        | Test session duration                                                        |
| **Environment**     | `process.env.CHECKLY_TEST_ENVIRONMENT`                                       |
| **Location**        | `cli.runLocation` in `checkly.config.ts` or `test` command `--location` flag |
| **Repository**      | `repoUrl` in `checkly.config.ts` or `process.env.CHECKLY_TEST_REPO_URL`      |
| **Branch**          | Automatically detected or `process.env.CHECKLY_TEST_REPO_BRANCH`             |
| **Commit owner**    | Automatically detected or `process.env.CHECKLY_TEST_REPO_COMMIT_OWNER`       |
| **Commit message**  | Automatically detected or `process.env.CHECKLY_TEST_REPO_COMMIT_MESSAGE`     |
| **Commit hash**     | Automatically detected or `process.env.CHECKLY_TEST_REPO_SHA`                |

For each test session, we record all logging, videos, traces, screenshots and other telemetry. This specifically powerful when using our `@playwright/test` powered browser checks.

## Testing with the CLI

The preferred way to achieve a full monitoring as code workflow is to use the Checkly CLI. This workflow uses the best
practices from standard testing frameworks like Playwright and Jest and extends them so you can `deploy` your checks
to Checkly's global infrastructure and run them as monitors.

In a nutshell, the CLI gives you two powerful commands: `test` and `deploy`.

After setting up your first checks inside your repo, you can run them using the `test` command,

```bash
npx checkly test --record
```

This runs your checks on our global platform, reports the results in your terminal and records a test session.

```
Running 5 checks in eu-west-1.

src/__checks__/group.check.ts
  ✔ Homepage - fetch stats (43ms)
src/__checks__/home.check.ts
  ✔ 404 page (7s)
  ✔ Homepage (7s)
src/services/api/api.check.ts
  ✔ Homepage - fetch stats (50ms)
src/services/docs/__checks__/docs-search.spec.ts
  ✔ docs-search.spec.ts (11s)

5 passed, 5 total
```

After validating your checks are correct, you deploy your checks to Checkly, turning them into monitors. You can add
alert channels like email, Slack, Pagerduty etc. to alert you when things break.

```bash
npx checkly deploy
```
<div class="cards-list">
{{< doc-card
	class="full-width-card"
	headerTag="h3"
	title="Checkly CLI"
	img="/docs/images/icons/terminal.svg"
	description="Code, test and deploy your monitoring configuration using a JavaScript/TypeScript-native workflow right from your code base."
	link="/docs/cli/"
>}}
</div>

### Integrating into CI

Your checks should live in your codebase and managed as any other application code, making full use of code reviews, versioning,
and your general software development lifecycle.

Using the CLI, you can run your `test` commands from your CI/CD pipeline and target different environments like staging and
production. You can then only `deploy` your checks once you are sure your build is passing and your deployment has no regressions.

{{< markdownpartial "/_shared/main-cicd-cards.md" >}}

## Triggering test sessions via the CLI

If you are not quite ready to store your checks as code inside your codebase, you can still use the Checkly CLI to trigger
test sessions using the `npx checkly trigger` command.

```bash
npx checkly trigger --record --tags=production
```
The above example `trigger` command operates on Checks already deployed to / created in Checkly tagged with "production"
and records a test session.

There are some tradeoffs to be aware of when comparing `trigger` to `test`:

- Using `trigger` you do not get the benefit of the code-first approach: no versioning, no code reviews.
- However, the `trigger` command works for any scenario, regardless of how you create your checks (web UI, Terraform, API, etc.)


[See the full docs on the `trigger` command](/docs/cli/command-line-reference/#npx-checkly-trigger)

## Triggering test sessions via vendor integrations

You can trigger test sessions using our [Vercel](/docs/cicd/vercel/) and / or [GitHub Deployments](/docs/cicd/github/)
integrations.

![test sessions vercel and github](/docs/images/testing/test_session_vercel_gh@2x.jpg)

These integrations work based on webhooks triggered by deployment events in either vendor's platforms. In general, this is
a great way to get started, but less flexible and powerful than the "full" monitoring as code approach.

