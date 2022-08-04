---
title: Syncing code from GitHub
weight: 17
menu:
  docs:
    parent: "Browser checks"
---

Your Playwright and Puppeteer scripts should live in your code repository, so you can use your familiar tools & processes
to write, debug and review code. Furthermore, you can manage your Browser checks' code alongside your application code,
so updates to your applications and sites are always in sync with your checks.

{{<info >}}

GitHub Sync is currently in **a public beta**. [Please provide feedback on GitHub](https://github.com/orgs/checkly/discussions/2).

{{</info >}}

## Before we start: three concepts

To use GitHub sync, you need to understand three concepts:

1. Linking a file in a repo tells Checkly **What code do you to sync**!
2. Choosing a sync strategy tells Checkly **When do you want to sync your code**!
3. Enabling a deployment trigger tell Checkly ✨when a deployment happened ✨ if you choose the "Sync on Deployment"-strategy

> To use GitHub Sync, you need to have the [Checkly GitHub App installed](https://app.checklyhq.com/settings/account/integrations)
in your GitHub account with the appropriate access to the repos you want to sync your code from.


## Linking file(s) from a repo

After installing the Checkly GitHub App, the first step is to pick a repository and link an entry file to a Browser check.
Create a new Browser check or navigate to an existing one and click the "Sync from GitHub" button.

In the GitHub integration section...

1. Toggle **Sync from GitHub**.
2. Pick a repository with the file you want to sync.
3. You will now choose your entry file and syncing strategy.

> Note that your **entry file** can `require` other local file dependencies. Checkly will fetch them recursively.
See [Working with local dependencies](#working-with-local-dependencies) below for more details.

## Sync on commit to a branch

The default syncing strategy is to sync your code when committing to a specific branch you select, i.e. `main`. This can
be a direct `git push` to `main` or when merging a Pull Request from a development branch into `main`. To use this strategy:

1. Pick the target branch. Commits to this branch will trigger the sync.
2. Type out the path to the entry file you want to sync.

__insert image here__

What are the pro's and cons of this strategy?

- **Pros:** Simplicity. Just push or merge and Checkly syncs and persists your code.
- **Cons:** A commit to `main` normally does not coincide with a deployment being done and live. This means you could update
your check code, before or potentially after any changes you made to your app are live: the check code is out of sync for a
period with your application.

## Sync on deployment

The "Sync on Deployment" strategy allows you to sync your checks' code when Checkly receives a "deployment done" event from
one of the deployment providers we support, currently [Vercel](/docs/cicd/vercel/), [GitHub Deployments](/docs/cicd/github/)
and [Command Line Triggers](/docs/cicd/triggers/).

But it's a bit smarter than just that. With this strategy you can:

1. Trigger checks against Preview or staging environments, using your checks' code from any branch.
2. Sync your checks' code *only* when your Production deployment passes, so you never have outdated check running against a fresh deployment.

To use this strategy:

1. Pick the **target environment name**, e.g. `Production`. This name determines when Checkly should sync and persist your code,
in contrast to syncing ephemerally. More on that below.
2. Type out the path to the entry file you want to sync, just like the "Sync on Commit" strategy.

Now you need to make sure you have integrated one of our supported integrations that can tell Checkly a deployment is done.
Let's use the [Vercel](/docs/cicd/vercel/) integration as an example.

After setting up the Vercel integration, two workflows open up.

**1. Working on Preview branches**

You push an updated app to a development branch. Vercel proceeds to deploy a `Preview` environment and Checkly triggers
the checks (or check groups) after syncing your code. Your checks pass, or fail. We do not store the synced check code yet,
as you marked `Production` as your target environment: we only use the synced check code for checks triggered by the deployment to `Preview`.

We call this an **ephemeral sync**. It's essentially E2E testing / smoke testing against live environments.

**2. Deploying to `Production`**

After some iteration, you merge your code to `main` and Vercel proceeds to deploy your `Production` environment and Checkly
again triggers your checks / check groups against this production environment, after syncing your code. Two scenarios unfold:

1. Your checks pass. Checkly now persists your synced code. Your checks are now fully synced and updated and running against production.
2. One or more checks fail. Depending on your Vercel integration settings, Checkly blocks the promotion of the production deploy and does
not persist your checks. The "old" production environment is still live, and we do not want new check code running against it.

We call this a **persistent sync**. It persists your synced code, so your monitoring checks running on a schedule (e.g. every 5 minutes)
are now in sync with your Production deploy.

This allows you to:
1. Run updated checks against any preview, staging or non-production environment on deployment.
2. Persist the updated checks when the deployment to your target


## Working with local dependencies

When using GitHub Sync, we automatically also sync any local file dependencies your entry file might have. For example:

1. You have a folder `__checks__` with two `.check.js` files in there. One contains a check that visits your homepage (`home.check.js`),
the other perform a login into your app (`login.check.js`).
2. Both checks will share some common settings, like the base URL, default viewport sizes or essentially any setup and properties
you want to reuse in your checks.
3.

## Working with external NPM package dependencies

Be aware that the Checkly runtime does not support any arbitrary NPM package, as we do not `npm install` your code for each check run.
In the **Runtimes** section, you can find a full [list of the currently supported packages](/docs/runtimes/specs/#npm-packages).

