---
title: Azure Pipelines
weight: 2
menu:
  integrations:
    parent: "CI/CD integration"
---

## Using the CLI in a CI/CD pipeline

{{< markdownpartial "/_shared/cli-basics-for-cicd.md" >}}

> Make sure to set your `CHECKLY_API_KEY` and `CHECKLY_ACCOUNT_ID` as
[secrets in your Azure Pipelines settings](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=classic%2Cbatch#set-variables-in-pipeline) before you
get started, if you're not using [Azure Key Vault](#implementing-azure-key-vault-for-fetching-secrets).

## A basic pipeline example

Create a new `azure-pipelines.yml` file in your repo, or add the steps and stages from the example below to your existing file.
This pipeline is "branch aware" and treats the `main` branch as the production branch. This means checks are only deployed
to Checkly after they are ran against production (after merging to `main`) and the checks passed.

```yml
trigger:
- main

pr:
- main

pool:
  name: 'Default' # Update to your agent pool
  vmImage: 'ubuntu-latest'

variables:
  CHECKLY_API_KEY: $(CHECKLY_API_KEY)
  CHECKLY_ACCOUNT_ID: $(CHECKLY_ACCOUNT_ID)
  CHECKLY_TEST_REPO_BRANCH: $(Build.SourceBranchName)
  CHECKLY_TEST_REPO_URL: $(Build.Repository.Uri)

stages:
  - stage: Deploy
    jobs:
      - job: DeployApp
        steps:
          # Example deployment step
          - script: |
              echo "Add your deployment logic here"
            displayName: 'Deploy App'

  - stage: ChecklyTest
    dependsOn: Deploy
    jobs:
      - job: E2EStaging
        condition: and(succeeded(), ne(variables['Build.SourceBranch'], 'refs/heads/main'))
        steps:
          # Cache node_modules
          - task: Cache@2
            inputs:
              key: 'node | "$(Agent.OS)" | package-lock.json'
              path: '$(Pipeline.Workspace)/node_modules'
              restoreKeys: |
                node | "$(Agent.OS)"
              cacheHitVar: 'CACHE_RESTORED'
            displayName: 'Cache node_modules'

          # Install dependencies
          - script: |
              npm ci
            displayName: 'Install Dependencies'

          # Run Checkly tests
          - script: |
              npx checkly test --record --reporter=ci
            displayName: 'Run Checkly Tests'

      - job: E2EProduction
        condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
        steps:
          # Cache node_modules
          - task: Cache@2
            inputs:
              key: 'node | "$(Agent.OS)" | package-lock.json'
              path: '$(Build.SourcesDirectory)/node_modules'
              restoreKeys: |
                node | "$(Agent.OS)"
              cacheHitVar: 'CACHE_RESTORED'
            displayName: 'Cache node_modules'

          # Install dependencies
          - script: |
              npm ci
            displayName: 'Install Dependencies'

          # Run Checkly tests
          - script: |
              npx checkly test --record --reporter=ci
            displayName: 'Run Checkly Tests'

  - stage: ChecklyDeploy
    dependsOn: ChecklyTest
    condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
    jobs:
      - job: Monitor
        steps:
          # Cache node_modules
          - task: Cache@2
            inputs:
              key: 'node | "$(Agent.OS)" | package-lock.json'
              path: '$(Build.SourcesDirectory)/node_modules'
              restoreKeys: |
                node | "$(Agent.OS)"
              cacheHitVar: 'CACHE_RESTORED'
            displayName: 'Cache node_modules'

          # Run Checkly deploy
          - script: |
              npx checkly deploy --force
            displayName: 'Deploy Checkly Monitors'
```

The above example creates three stages:
- **deploy**: this is where your application specific deployment logic happens
- **checkly-test**: after the deploy stage, we run the `checkly test` command. We run two different jobs based on whether
we are on the `main` branch of a different, feature branch so we can set a different environment.
- **checkly-deploy**: the last stage, that only runs on `main` is to deploy the checks to Checkly. Note that this stage
only runs when the previous `e2e-production` job is successful.

The output in the Azure Pipelines Stages tab will now look similar to this:

![Azure Pipelines Stages tab](/docs/images/cicd/azure_pipeline.png)

### Implementing Azure Key Vault for fetching secrets

In order to fetch secrets from an Azure Key Vault, you can add the following code stage ahead of the deploy stage.

```yml
  - stage: FetchSecrets
    jobs:
      - job: FetchSecretsJob
        steps:
          - task: AzureKeyVault@2
            inputs:
              azureSubscription: 'your-azure-service-connection' # Update this to your service connection name
              KeyVaultName: 'your-key-vault-name' # Update this to your key vault name
              SecretsFilter: 'CHECKLY-API-KEY,CHECKLY-ACCOUNT-ID'
            name: FetchSecrets
```

The output in the Azure Pipelines Stages tab will now look similar to this, including the additional FetchSecrets stage:

![Azure Pipelines Stages tab with keyvault](/docs/images/cicd/azure_pipeline_keyvault.png)