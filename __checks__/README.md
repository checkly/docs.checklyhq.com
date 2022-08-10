## Welcome to Checkly's example setup! 👋

> **Note**
> The described Checkly setup uses [GitHub Sync](https://www.checklyhq.com/docs/browser-checks/github-code-sync/). It's is under active development and in a public beta. [Please provide feedback on GitHub](https://github.com/orgs/checkly/discussions/2).

![Checkly dashboard showing synced checks](./screenshot.png)

To keep our automated Browser checks up to date, `checklyhq.com` implements synced Browser checks. The project leverages [the "sync on deployment" strategy](https://www.checklyhq.com/docs/browser-checks/github-code-sync/#sync-on-deployment) to refetch and update synchronized Browser checks after every successful production deployment.

## Project structure

Synced browser checks enable you to `require` local dependencies and reuse them across multiple Browser checks.

This project includes:

- [a `checkly.config.js` file](https://github.com/checkly/checklyhq.com/blob/main/checkly.config.js) in the root for shared config and defaults
- `*.check.js` files and utilities in the __checks__ directory to DRY up some common boilerplate

### Local development

To guarantee the Browser checks are running, this project includes the `playwright` and `expect` dependencies to match [the Checkly runtime dependencies](https://www.checklyhq.com/docs/runtimes/specs/).

This enables running each check locally using:

```bash
NODE_ENV=development node __checks__/pricing.check.js
```

## Further information and feedback

[Visit the GitHub Sync docs to find further information](https://www.checklyhq.com/docs/browser-checks/github-code-sync/).

GitHub Sync is currently in public beta. [Please provide feedback on GitHub](https://github.com/orgs/checkly/discussions/2).
