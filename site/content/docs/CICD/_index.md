---
title: Integrating Checkly in your CI/CD pipeline - Checkly Docs
displayTitle: Integrating Checkly in your CI/CD pipeline
navTitle: Overview
weight: 1
slug: /
menu:
  integrations:
    parent: "CI/CD integration"
aliases:
- /docs/cicd/
---

Core to Checkly's monitoring as code approach is running your checks from your CI/CD pipeline and use them as E2E tests.

With this approach, you can validate your application and infrastructure before deploying to production, staging or any other environments.
Simultaneously , you can life cycle (create/update/delete) your checks from your code base as part of your CI/CD workflow.

## CI/CD Integration 101

Regardless of the provider or platform you use, integrating Checkly into your CI/CD pipeline boils down to **four basic steps**:

1. Store your checks as code and `git push`. Preferably store your checks alongside your application code. Just like unit tests.
2. Wait for your application to be deployed. This can be done through hooks, lifecycle events or wait scripts.
3. Run your checks using `npx checkly test` and pass in any variables like an `ENVIRONMENT_URL`.
4. If the checks pass successfully, run `npx checkly deploy`.


## CI/CD Integration with the Checkly CLI

The preferred and most flexible way to integrate Checkly with your CI/CD platform is through the [Checkly CLI](/docs/cli).

{{< markdownpartial "/_shared/main-cicd-cards.md" >}}

## CI/CD Integration using vendor webhooks

- [Vercel](/docs/cicd/vercel/)
- [GitHub deployments](/docs/cicd/github/)
