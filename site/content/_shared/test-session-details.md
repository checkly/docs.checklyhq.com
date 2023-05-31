---
sitemapExclude: true
---
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
