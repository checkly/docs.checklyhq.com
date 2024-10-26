---
title: Integrating Checkly in GitHub Actions - Checkly Docs
displayTitle: Integrating Checkly in GitHub Actions
navTitle: GitHub Actions
weight: 2
menu:
  integrations:
    parent: "CI/CD integration"
---

## Using the CLI in a CI/CD pipeline

{{< markdownpartial "/_shared/cli-basics-for-cicd.md" >}}

## Workflow scenarios

GitHub Actions workflows can run on different events. In most cases, you will want to trigger the Checkly CLI after a
**deployment** is done based on a recent `git push` to a branch, when a branch is merged or when a pull request is created.

GitHub created the [deployments API](https://docs.github.com/en/rest/deployments/deployments) for this and many 3rd party
integrators like Vercel and Heroku use this to relay deployment status to GitHub. However, you can also call this API
yourself and trigger a `deployment_status` event.

> Make sure to set your `CHECKLY_API_KEY` and `CHECKLY_ACCOUNT_ID` as
[secrets in your GitHub Actions settings](https://docs.github.com/en/actions/security-guides/encrypted-secrets) before you
get started.

## Running on `deployment_status` events

The `deployment_status` event is the preferred event to trigger a GH Actions workflow that executes your checks. However,
this comes with some peculiarities that are native to GH Actions and a bit different from using the `push` event.

- The deployment event holds core information about your deployment, i.e. the environment name and an optional `ENVIRONMENT_URL`.
- The full git repo with full history is not available. We have to jump through some hoops to properly set the branch name
for instance.
- We have no access to the original pull request that triggered the deployment event.

```yaml
# .github/checkly.yml
name: 'checkly'
on: [deployment_status]

# Set the necessary credentials and export variables we can use to instrument our test run. Use the ENVIRONMENT_URL
# to run your checks against staging, preview or production.
env:
  CHECKLY_API_KEY: ${{ secrets.CHECKLY_API_KEY }}
  CHECKLY_ACCOUNT_ID: ${{ secrets.CHECKLY_ACCOUNT_ID }}
  ENVIRONMENT_URL: ${{ github.event.deployment_status.environment_url }}
  CHECKLY_TEST_ENVIRONMENT: ${{ github.event.deployment_status.environment }}
jobs:
  test-e2e:
    if: github.event.deployment_status.state == 'success' # Only run when the deployment was successful.
    name: Test E2E on Checkly
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v3
        with:
          ref: "${{ github.event.deployment_status.deployment.ref }}"
          fetch-depth: 0
      - name: Set branch name # workaround to detect branch name in "deployment_status" actions
        run: echo "CHECKLY_TEST_REPO_BRANCH=$(git show -s --pretty=%D HEAD | tr -s ',' '\n' | sed 's/^ //' | grep -e 'origin/' | head -1 | sed 's/\origin\///g')" >> $GITHUB_ENV
      - uses: actions/setup-node@v3
        with:
          node-version-file: '.nvmrc'
      - name: Restore or cache node_modules
        id: cache-node-modules
        uses: actions/cache@v3
        with:
          path: node_modules
          key: node-modules-${{ hashFiles('package-lock.json') }}
      - name: Install dependencies
        if: steps.cache-node-modules.outputs.cache-hit != 'true'
        run: npm ci
      - name: Run checks # run the checks passing in the ENVIRONMENT_URL and recording a test session.
        id: run-checks
        run: npx checkly test -e ENVIRONMENT_URL=${{ env.ENVIRONMENT_URL }} --reporter=github --record
      - name: Create summary # export the markdown report to the job summary.
        id: create-summary
        run: cat checkly-github-report.md > $GITHUB_STEP_SUMMARY
      - name: Deploy checks # if the test run was successful and we are on Production, deploy the checks
        id: deploy-checks
        if: steps.run-checks.outcome == 'success' && github.event.deployment_status.environment == 'Production'
        run: npx checkly deploy --force
```

## Usage with mono repos and Vercel deployments

If you are running a mono repo, you might bump into issues that multiple `deployment_status` events will randomly trigger
your workflow. GitHub Actions does not have a great way to filter for this, but there are two strategies you can follow.

### Filtering with `if` statements.

If part of the URL for your deployments deterministically maps to one of the apps in your repo, you can just extend
the `if` statement in your workflow, as shown below.

```yaml
jobs:
  test-e2e:
    if: github.event.deployment_status.state == 'success' && contains(github.event.deployment_status.environment_url, 'webapp')
    name: Test E2E on Checkly
    runs-on: ubuntu-latest
    timeout-minutes: 10
```

### Using branch protection rules

In many cases, the above solution with `if` statements is not enough. When using Vercel and mono repos for instance, GitHub
Actions will recognize any "skipped" statuses as "passed". This can cause havoc. A way to sidestep this issue is by setting
a branch protection rule on your repo that is generated by your GH Action workflow.

You do this by adding the [LouisBrunner/checks-action@v1.6.0](https://github.com/marketplace/actions/github-checks) action
to your workflow and assigning some name. This name can be fixed or dynamic. See the example below.

```yaml
name: 'Run Checkly MaC Checks'
on: [deployment_status]
env:
  ENVIRONMENT_URL: ${{ github.event.deployment_status.environment_url }}
  CHECKLY_API_KEY: ${{ secrets.CHECKLY_API_KEY }}
  CHECKLY_ACCOUNT_ID: ${{ secrets.CHECKLY_ACCOUNT_ID }}
run-name: Run MaC checks against ${{ github.event.deployment_status.environment_url }}
jobs:
  test-e2e:
    if: github.event.deployment_status.state == 'success' && contains(github.event.deployment_status.environment_url, 'webapp')
    name: Test E2E on Checkly
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      # All steps as normal...
      - uses: LouisBrunner/checks-action@v1.6.0
        if: always()
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          name: Test E2E Passed Notification
          conclusion: ${{ job.status }}
```

The will generate a custom status for your called **Test E2E Passed Notification**.

Then, add a [branch protection rule](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)
for your repo.

![GitHub Branch Protection Ruke](/docs/images/cicd/gh_branch_protection_rule.png)

Together with any optional `if` statements, your GH Actions will now run only against the apps you want in your mono repo.

## Using the GitHub Markdown Reporter

You can print a user friendly summary report to your GitHub Actions Job Summary by adding the `--reporter=github` flag
to the `test` command and export the resulting `checkly-github-report.md` file to the `$GITHUB_STEP_SUMMARY` variable.

In the example, you can see this in the following step:

```yaml
- name: Run checks
  id: run-checks
  run: npx checkly test
    -e ENVIRONMENT_URL=${{ env.ENVIRONMENT_URL }}
    --reporter=github
    --record
- name: Create summary
  id: create-summary
  run: cat checkly-github-report.md > $GITHUB_STEP_SUMMARY
```


