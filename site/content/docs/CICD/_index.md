---
title: Overview
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

<div class="cards-list">
{{< doc-card
	class="full-width-card"
	headerTag="h3"
	title="GitHub Actions"
	img="/docs/images/icons/github-icon.svg"
	description="Run the Checkly CLI from GitHub Actions, export summary reports and integrate with mono repos"
	link="/docs/cicd/github-actions/"
>}}
{{< doc-card
    class="full-width-card"
    headerTag="h3"
    title="Jenkins"
    img="/docs/images/icons/jenkins-logo.svg"
    description="Run the Checkly CLI from Jenkins."
    link="/docs/cicd/jenkins/"
>}}
{{< doc-card
    class="full-width-card"
    headerTag="h3"
    title="GitLab CI"
    img="/docs/images/icons/gitlab-logo.svg"
    description="Run the Checkly CLI from GitLab CI."
    link="/docs/cicd/gitlabci/"
>}}
</div>


## CI/CD Integration using webhooks

- [GitHub deployments](/docs/cicd/github/)
- [Vercel](/docs/cicd/vercel/)

For any other platform, check out how to use our command line trigger API:

- [Command Line triggers](/docs/cicd/triggers/)
