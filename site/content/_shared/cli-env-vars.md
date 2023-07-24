---
sitemapExclude: true
---
| item               | auto | variable                      | description                                |
|--------------------|--------------|-------------------------------|--------------------------------------------|
| **Repository**     | false        | `repoUrl` in `checkly.config.ts` or `CHECKLY_REPO_URL`         | The URL of your repo on GitHub, GitLab etc. |
| **Commit hash**    | true         | `CHECKLY_REPO_SHA`            | The SHA of the commit.               |
| **Branch**         | true         | `CHECKLY_REPO_BRANCH`         | The branch name.                     |
| **Commit owner**   | true         | `CHECKLY_REPO_COMMIT_OWNER`   | The committer's name or email.       |
| **Commit message** | true         | `CHECKLY_REPO_COMMIT_MESSAGE` | The commit message.                  |
| **Environment**    | false        | `CHECKLY_ENVIRONMENT`         | The environment name, e.g. "staging" |
