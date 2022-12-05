## Welcome to Checkly's `@playwright/test` and GitHub sync example setup! 👋

This example shows how you can use `@playwright/test` in combination with the Checkly GitHub Sync feature to monitor your
webapps and sites.

![Checkly dashboard showing synced checks](./screenshot.png)

To keep our automated Browser checks up to date, `checklyhq.com` implements GitHub-synced Browser checks. 
The project leverages [the "sync on deployment" strategy](https://www.checklyhq.com/docs/browser-checks/github-code-sync/#sync-on-deployment) 
to refetch and update synchronized Browser checks after every successful production deployment.

## Project structure

Synced browser checks enable you to `require` local dependencies and reuse them across multiple Browser checks.

This project includes the following files:

- [`checkly.config.js`](https://github.com/checkly/checklyhq.com/blob/main/checkly.config.js) for shared config and defaults
- [`CheckSitePage.js`](https://github.com/checkly/checklyhq.com/blob/main/__checks__/ChecklySitePage.js) in the `__checks__` directory is used as a Page Object Model (POM) to DRY up some common boilerplate
- `*.spec.js` files and in the `__checks__` directory for individual checks

### Explainer video

Do you want to see the GitHub Sync feature in action? [Watch a quick explainer on YouTube](https://youtu.be/rppPOBytjTg).

### Local development

To develop and test the Browser checks locally, this project includes the `@playwright/test` dependencies to match [the Checkly runtime dependencies](https://www.checklyhq.com/docs/runtimes/specs/).

You can run your checks by simply invoking `playwright test`, which is also aliased in `npm test`

## Further information

[Visit the GitHub Sync docs to find further information](https://www.checklyhq.com/docs/browser-checks/github-code-sync/).
[Visit the Playwright Test docs for more information](https://www.checklyhq.com/docs/browser-checks/playwright-test/).
