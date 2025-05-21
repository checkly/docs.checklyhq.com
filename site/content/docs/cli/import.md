---
title: Importing your account - Checkly Docs
displayTitle: Importing your account with the Checkly CLI
navTitle: Importing existing resources
weight: 9
slug: /import
beta: true
menu:
  platform:
    parent: "CLI"
    identifier: import-cli
---

If you got started with Checkly working in the webapp you can use the `import` CLI command to download all your UI-managed resources as code and start managing your entire Checkly setup from the CLI.

## How `import` works

When importing an existing resource the CLI will both generate the code neccessary to manage the resource through code, and mark the resource itself as managed by the CLI, and not the UI. This allows you to start editing, and also deleting the resource through the CLI. 

To ensure that you can go through this process safely, and test your setup along the way the import process is done in three separate steps: Plan, apply and commit.
- `npx checkly import`: This generates the code for all resources in your account not already managed through the CLI, allowing for a review of all resources that will be imported. At this point no mapping have been created between imported resources and the existing ones in your account. A `deploy` in this state will duplicate your UI-managed resources as CLI-managed ones. If you cancel here, nothing will change for existing resources that are managed through the UI on your account. 
- `npx checkly import apply`: Links the imported resources to your CLI project, but keeps the mapping in a **pending** state. You can now make changes to resources in your account via the CLI, as the mapping has been established. As long as this mapping is **pending** you cannot delete any of the imported resources via the CLI. You are free to test your setup and deploy changes, but you will be prevented from deleting any resources until you commit your plan. You can cancel your import at this stage, but any changes made to resources through a `deploy` will persist.
- `npx checkly import commit`: Commits the plan, removing the **pending** state from all imported resources. Imported resources can now be deleted through the CLI by removing their constructs. At this point the `import` is completed and cannot be canceled.

## Importing step-by-step

1. [Install the CLI](/docs/cli/installation/). At the end of the process ensure you have a `checkly.config.ts/js` file, and that you have logged in to the account you want to import resources from. You can verify the current account with `npx checkly whoami`. If you already have installed the CLI but don't have a Checkly config file, one will be created for you as part of the import process.
2. Run `npx checkly import` and select `import everything` to import all resources from your account. You can also [import individual resources](/docs/cli/import/#importing-individual-resources). You can specify where the generated code should be placed using `--root`. If your Checkly config file is not in the current directory, specify the path using `--config`.
3. Review the imported code before continuing. You can verify imported checks with `npx checkly test`. At this point, avoid running `npx checkly deploy` as this will duplicate your UI-managed resources as CLI-managed ones.
4. Run `npx checkly import apply` to create the link between the imported resources and your CLI project. You can try out editing resources and pushing these updates to your account with `npx checkly deploy`.
5. When you are satisfied with your setup, run `npx checkly import commit` to finalize the import.

Remember that you can cancel your import with `npx checkly import cancel` at any point before running `npx checkly import commit`, but changes made to existing resources after the apply-stage will persist after cancelling.

## Importing individual resources

There are two ways to import individual resources:
- Run `npx checkly import` and in the first step select `Let me choose resources manually`. In the following menu use `space` to select/deselect resources for import and `return` to finalize your selection. From there, follow steps 3 - 5 in the [Importing step-by-step guide](/docs/cli/import#importing-step-by-step).
- Specify a single resource as part of the `import` command with the following syntax: `npx checkly import resource-type:resource-id`.

## Using `export` when creating CLI resources

The import process will automatically `export` resouces to make them available in other constructs. It is recommended to also export manually created resources so that future import processes can take advantage of the same process.

Here is an example of an exported alert channel:
```ts {title="alert-channel.ts"}
import { EmailAlertChannel } from 'checkly/constructs'

// This resource can be accessed by other imported resources.
export const emailAlert1 = new EmailAlertChannel('email-example', {
  address: 'john-doe@acme-company.com',
  sendDegraded: true,
})
```

Since the channel has been exported, the CLI code generation would automatically add the `import` and refer to it directly in the `alertChannels` section:
```ts {title="alert-channel.ts"}
import { AlertEscalationBuilder, BrowserCheck, RetryStrategyBuilder } from 'checkly/constructs'
import { emailAlert1 } from '../../alert-channels/email-example.check'

new BrowserCheck('check-landing-page-3eNrQgOb', {
  name: 'Check landing page',
  code: {
    entrypoint: './check-landing-page.spec.ts',
  },
  ...
  alertChannels: [
    // Note the usage of the imported alert channel here
    emailAlert1,
  ],
  ...
})
```

If `export` is not used, the CLI code generation will still reference the correct resources when generating code, but will use `fromId` instead.


## Next steps

Once you have a fully CLI managed setup you are ready to leverage Monitoring as Code to improve your setup. Check our how to [dynamically creating monitors](/docs/cli/dynamic-check-creation/), [combining MaC and Git](/docs/cli/using-git/), and how to [integrate Checkly in your CI/CD process](/docs/cicd/).