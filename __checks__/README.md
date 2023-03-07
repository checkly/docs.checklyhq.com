## Welcome to Checkly's monitoring as code example setup! 👋

This example shows how you can use `@playwright/test` in combination with the [Checkly CLI](https://www.checklyhq.com/docs/cli/)
to monitor webapps and sites using a monitoring as code workflow.

## Project structure

Using the CLI, you can code, test and deploy your E2E tests and synthetic monitors directly from your code base.
This project includes the following files:

- [`checkly.config.ts`](https://github.com/checkly/checklyhq.com/blob/main/checkly.config.ts) for shared config and defaults.
- [`site.check-group.ts`](https://github.com/checkly/checklyhq.com/blob/main/__checks__/site.check-group.ts) to bundle our Checks in a group.
- [`CheckSitePage.ts`](https://github.com/checkly/checklyhq.com/blob/main/__checks__/poms/ChecklySitePage.ts) in the `__checks__` directory is used as a Page Object Model (POM) to DRY up some common boilerplate
- `*.spec.ts` files and in the `__checks__` directory for individual checks

### Local development

To code, test and deploy this setup locally, you can just pull this repo and run

```bash
npx checkly test
```

And for deployment

```bash
npx checkly deploy
```

## Further information

[Visit the Checkly CLI docs to find further information](https://www.checklyhq.com/docs/cli/).
[Visit the Playwright Test docs for more information](https://www.checklyhq.com/docs/browser-checks/playwright-test/).
