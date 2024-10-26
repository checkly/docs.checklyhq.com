---
title: Using git metadata - Checkly Docs
displayTitle: Using git metadata
navTitle: Using Git
weight: 8
menu:
  platform:
    parent: "CLI"
---

The CLI can attach git metadata like `branch`, `commit sha`, `owner` and more when executing the `test --record` and `deploy` commands. This way you can keep track of 
your test sessions and deployed resources in the UI and cross-reference them with any updates to your code.

For example, in the screenshot below we ran a **test session** from our CI server after the project was deployed to our 
Staging environment with the `npx checkly test --record` command.

![test session with git info](/docs/images/cli/test_session_git_data.png)

After the test succeeds, we **deploy** this check so it runs as a monitor with `npx checkly deploy`. 

![browser check with git info](/docs/images/cli/browser_check_git_data.png)


## Environment variables

The CLI will attempt to auto-detect and parse git specific information from your local machine or CI environment, but you 
can also set these data items specifically by using environment variables.

{{< markdownpartial "/_shared/cli-env-vars.md" >}}

For example, if you want to specifically set the Environment you invoke:

```bash
CHECKLY_TEST_ENVIRONMENT=Production npx checkly test --record
```

Or, if you want to set repo URL you invoke:

```bash
CHECKLY_REPO_URL="https://my.git.solution/project/" npx checkly test --record
```
