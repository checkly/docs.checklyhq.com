---
title: Sync with the GitHub Deployments API
weight: 2
menu:
  docs:
    parent: "Syncing code from GitHub"
---

Some projects use custom deployment scripts and processes. If you want to follow [the "sync on deployment" strategy](/docs/browser-checks/github-code-sync/#sync-on-deployment) to update your Browser checks but don't use a GitHub CI/CD integration, leverage the GitHub API.

Before moving on [guarantee to follow the GitHub Sync setup steps](/docs/browser-checks/github-code-sync/#prerequisites).

{{<info >}}

GitHub Sync is under active development and in **a public beta**. [Please provide feedback on GitHub](https://github.com/orgs/checkly/discussions/2).

{{</info >}}

## Trigger a GitHub Sync via the GitHub API

Configure your Browser check to listen for `production` deployments.

![Choose an environment syncing target.](/docs/images/browser-checks/gh-sync-sync-on-deploy.png)

Checkly synchronizes your Browser checks after receiving a successful `deployment_status`.

To trigger this event, perform two steps via the GitHub API:

- Create a new deployment in your GitHub project.
- Update the deployment status to `success`.

The following code samples leverage the GitHub CLI for simplicity. Use `curl` or HTTP calls alternatively.

### Create a new deployment

Create a new deployment via [the `/repos/{owner}/{repo}/deployments` endpoint](https://docs.github.com/en/rest/deployments/deployments#create-a-deployment).

```bash
$ gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /repos/checkly/checklyhq.com/deployments \
  -f ref='main' \
  -f payload='{ "deploy": "trigger-gh-sync", "environment": "production" }' \
  -f description='Custom deploy'
```

If the deployment creation succeeds, move on and use the `id` property to update this deployments status.

```json
{
  "url": "https://api.github.com/repos/checkly/checklyhq.com/deployments/622767618",
  "id": 622767618,
  "node_id": "DE_kwDOA9KB0c4lHq4C",
  "task": "deploy",
  "original_environment": "production",
  "environment": "production",
  "description": "Custom deploy",
  "...": "..."
}
```


### Update the deployment status

Update the deployment's status via [the `/repos/{owner}/{repo}/deployments/{deployment_id}/statuses` endpoint](https://docs.github.com/en/rest/deployments/statuses#create-a-deployment-status). In this case, it's `622767618` which we retreived from the previous call.

```bash
$ gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /repos/checkly/checklyhq.com/deployments/622767618/statuses \
  -f environment='production' \
  -f state='success' \
  -f description='Deployment finished successfully.'
```

If your browser checks are waiting for `production` deployments they will now be refetched and synced.
