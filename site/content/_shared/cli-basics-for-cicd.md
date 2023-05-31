---
sitemapExclude: true
---
We've optimized the [Checkly CLI](/docs/cli) to work in any CI/CD workflow. Here are the basics you need to know that
will come in handy when adapting the examples we give you to your own, specific setup.

1. For **authentication**, make sure to set the `CHECKLY_API_KEY` and `CHECKLY_ACCOUNT_ID` parameters as environment variables
in your CI/CD platform.
2. Set the **reporter** you want to use for the `test` command using the `--reporter` flag, i.e. `--reporter=dot`.
3. To store a **test session** with full logging, traces and vides, set the `--record` flag for the `test` command.
4. Use the `--force` flag on the `deploy` and / or `destroy` commands to skip the normal confirmation steps.

When using the `--record` flag, the CLI will attempt to parse `git` specific information from
the environment to display in the recorded test session as metadata. However, you can also set these data items specifically
by using environment variables.

| variable                           | description                                |
|------------------------------------|--------------------------------------------|
| `CHECKLY_TEST_REPO_SHA`            | The SHA of the commit.                     |
| `CHECKLY_TEST_REPO_URL`            | The URL of your repo on GitHub, GitLab etc.|
| `CHECKLY_TEST_REPO_BRANCH`         | The branch name.                           |
| `CHECKLY_TEST_REPO_COMMIT_OWNER`   | The committer's name or email.             |
| `CHECKLY_TEST_REPO_COMMIT_MESSAGE` | The commit message.                        |
| `CHECKLY_TEST_ENVIRONMENT`         | The environment name, e.g. "staging"       |

Check the [CLI command line reference](/docs/cli/command-line-reference) for more options.
