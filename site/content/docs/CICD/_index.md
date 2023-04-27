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


## CI/CD Integration with the Checkly CLI

The preferred and most flexible way to integrate Checkly with your CI/CD platform is through the [Checkly CLI](/docs/cli).

- [GitHub Actions](/docs/cicd/github-actions)
- [Jenkins](/docs/cicd/jenkins/)
- [GitLab CI](/docs/cicd/gitlabci)
- [CircleCI](/docs/cicd/circleci/)
- [Codeship](/docs/cicd/codeship/)

## CI/CD Integration using webhooks

- [GitHub deployments](/docs/cicd/github/)
- [Vercel](/docs/cicd/vercel/)

For any other platform, check out how to use our command line trigger API:

- [Command Line triggers](/docs/cicd/triggers/)
