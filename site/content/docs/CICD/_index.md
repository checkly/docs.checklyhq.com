---
title: Overview
weight: 36
slug: /
menu:
  docs:
    parent: "CI/CD integration"
aliases:
- /docs/cicd/
---

Checkly enables you to trigger **single checks or groups of checks** as you deploy your code from your CI/CD pipeline. 

The easiest way to get started is by using our Vercel integration or GitHub integration. Both require minimal setup.
The direct Vercel integration also works with GitLab and Bitbucket.

- [GitHub deployments](/docs/cicd/github/)
- [Vercel](/docs/cicd/vercel/)

You can also integrate with your CI/CD using our API directly:

- [CircleCI](/docs/cicd/circleci/)
- [Codeship](/docs/cicd/codeship/)
- [Heroku](/docs/cicd/heroku/)
- [Jenkins](/docs/cicd/jenkins/)
- [Travis CI](/docs/cicd/travisci/)
- [GitLab CI](/docs/cicd/gitlabci)

For any other platform, check out how to use our command line trigger API:

- [Command Line triggers](/docs/cicd/triggers/)

{{<info >}}
Note that failed checks triggered by CI/CD integrations won't send alert notifications, because their purpose is to block and monitor pre-production environments.
{{</info >}}