---
title: Syncing code from GitHub
weight: 17
menu:
  docs:
    parent: "Browser checks"
---

{{<warning >}}

We recommend using the [Checkly CLI](/docs/cli) to code, test and deploy your checks from your code base instead of using GitHub Sync.
In the first half of '23 we will deprecate the GitHub Sync functionality.

{{</warning >}}

Having your Playwright scripts live in your code repository allows you to use your familiar development environment and keep your Browser check code in sync with your application code.

GitHub Sync enables you to synchronize your Browser checks with JavaScript files in a GitHub repository.

## Prerequisites

To sync a Browser check with a GitHub file, Checkly needs access to your GitHub code. Install the [Checkly GitHub App](https://app.checklyhq.com/settings/account/integrations) and allow access to the repositories you want to sync with Checkly.

![Checkly integrations showing the GitHub integration section](/docs/images/browser-checks/gh-sync-add-github-integration.png)

## Get started with GitHub Sync

GitHub Sync works for existing and new Browser checks. Click the "Sync from GitHub" button close to the Browser check editor to open the synchronization settings.

!["Sync from GitHub" button in the Checkly UI](/docs/images/browser-checks/gh-sync-editor-enable.png)

Find the GitHub Sync settings in the GitHub Integration drawer.

![GitHub Sync main configuration](/docs/images/browser-checks/gh-sync-overview.png)

To sync a Browser check with your GitHub code, two configurations are necessary:

1. The sync target – which file should be synced?
2. The sync strategy – when should it be synced?

## Choose the GitHub Sync target

To start syncing a Browser check with a GitHub file enable "Sync from GitHub".

![Enable GitHub Sync](/docs/images/browser-checks/gh-sync-enable-sync.png)

Pick a repository with your Browser checks to sync.

![Choose a GitHub repository to sync](/docs/images/browser-checks/gh-sync-pick-a-repo.png)

Choose your entry file.

![Choose a file to sync](/docs/images/browser-checks/gh-sync-choose-a-file.png)

{{<info >}}

Pro tip: Synced **entry files** can `require` other local file dependencies. Checkly will fetch them recursively.
See [Working with local dependencies](#working-with-local-dependencies) below for more details.

{{</info >}}

## GitHub Sync strategies

The ideal syncing strategy depends on your monitoring and deployment setup. Checkly GitHub Sync supports two syncing strategies.

### Sync on commit

"Sync on commit" is the default syncing strategy. Every pushed commit or merged pull request will trigger a sync and update your Browser check. This approach works well for seperated repositories that primarily include your Browser checks.

To use this strategy:

1. Pick the target branch.
2. Enter the entry file path you want to sync.

![GitHub Sync with "Sync on commit" strategy and a defined branch "main"](/docs/images/browser-checks/gh-sync-sync-on-commit.png)

What are the pros and cons of this strategy?

- **Pros:** Simplicity. Push or merge and Checkly syncs your code.
- **Cons:** Your deployed code and Browser checks could go out of sync.

{{<info >}}

If a `git push` to `main` triggers **a 10 minute long production deployment**, but your checks run against your site **every minute**, there'll be a 10-minute-long window in which your checks and the deployed application are out of sync. Your checks are updated before your code is deployed.

We recommend the "Sync on deployment" strategy to avoid unneccesary alerts in these cases.

{{</info >}}

### Sync on deployment

The "Sync on deployment" strategy allows you to sync your Browser checks code after receiving [a successful `deployment_status` event from GitHub](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#deployment_status). These events are triggered by GitHub integrations such as Vercel, Heroku and Deno Deploy, [but they can be triggered via the GitHub API](/docs/browser-checks/github-code-sync-api/), too.

Find the available environment on your project's repository page.

![GitHub repository listing a Production and Preview environment](/docs/images/browser-checks/gh-sync-gh-environments.png)

The "Sync on deployment" strategy allows to sync your checks' code when your Production (or Preview) deployments pass, so you never have outdated checks running against a fresh deployment.

To use this strategy:

1. Pick the **target environment name**, e.g. `Production`.
2. Type out the path to the entry file you want to sync.

![Choose an environment syncing target.](/docs/images/browser-checks/gh-sync-sync-on-deploy.png)

{{<info >}}

If you also use the Vercel integration [find more information on how to check and sync your deployments in the integration docs](/docs/cicd/vercel/).

{{</info >}}

## Working with local dependencies

GitHub Sync also supports local dependencies to introduce helper and configuration files shared across multiple Browser checks.

An example setup could look as follows:

1. Create a `__checks__` directory with `*.check.js` files that visit your homepage (`home.check.js`) and
pricing page (`pricing.check.js`). Test the expected behavior.
2. Use a `checkly.config.js` and other helper files to reuse common configuration such as the base URL, default viewport sizes or other configuration across your Browser checks.

{{<info >}}

[Check our checklyhq.com repository](https://github.com/checkly/checklyhq.com/tree/main/__checks__) to see this approach in practice.

{{</info >}}

## Working with external NPM package dependencies

The Checkly runtime does not support arbitrary NPM packages, as we do not `npm install` your code for each check run.
Find a full [list of the currently supported packages in the **Runtime** section](/docs/runtimes/specs/#npm-packages).

