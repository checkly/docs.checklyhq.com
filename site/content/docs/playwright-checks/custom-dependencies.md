---
title: Custom dependencies in Playwright Check Suites
displayTitle: Using custom dependencies in Playwright Check Suites
navTitle: Custom dependencies
weight: 16
slug: /custom-dependencies
menu:
  resources:
    parent: "Playwright Check Suites (Beta)"
---

Playwright Check Suites let you take your existing Playwright tests and turn them into globally distributed monitoring using the [Checkly CLI](/docs/cli/). It will read your Playwright configuration and parse your existing settings and dependencies to prepare the Checkly monitoring infrastructure.

## Using JavaScript/Node.js dependencies

Whether you use [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/); Checkly uses your existing `package.json` and lock files to install the correct `devDependencies` and prepare your testing and monitoring environment.

```json {title="package.json"}
{
  "devDependencies": {
    "@faker-js/faker": "^9.7.0"
  }
}
```

**By default, the Checkly infrastructure installs dependencies via npm.**

However, if an alternative lock file (`pnpm-lock.json` or `yarn.lock`) is discovered, Checkly uses the matching package manager to install the project dependencies.

| Available lock file | Package manager |
|---------------------|-----------------|
| `package-lock.json` | npm             |
| `pnpm-lock.json`    | pnpm            |
| `yarn.lock`         | yarn            |

> **For `pnpm` users:** if you define the same dependency in `dependencies` and `devDependencies`, please use a custom `installCommand` in your `checkly.config.ts|js` to register your package as a development dependency: `pnpm install --dev additional-package`

## Using private dependencies

There are no dependency changes required if you rely on private packages or a custom package registry. The Checkly CLI detects your existing private `package.json` dependencies and installs those using the credentials provided.

```json {title="package.json"}
{
  "devDependencies": {
    "@your-org/private-package": "^2.3.0"
  }
}
```


Regardless of whether you use private packages or a custom registry, the Checkly infrastructure needs to authenticate with your provider to `install` your private source code.

For example, if you use npm to manage your private dependencies, you need to:

- **add custom npm configuration** to your project.
- **include custom configuration files** in your Checkly project to make the infrastructure aware.

### Custom npm configuration for private packages

Let's look at popular options for private packages:

- using private npm packages on the public npm registry.
- using npm with JFrog Artifactory.

To access the private source code, npm relies on custom configuration in a project-specific `.npmrc` file.

> To avoid putting sensitive information into your `.npmrc` we recommend setting your authentication token via Checkly environment variables [available in the UI](https://app.checklyhq.com/environment-variables) or [the CLI](https://www.checklyhq.com/docs/cli/using-environment-variables/#managing-remote-environment-variables-using-the-cli).

#### Using private npm packages

```txt {title=".npmrc"}
# Hard-coded authentication token
//registry.npmjs.org/:_authToken=npm_abc...

# Authentication token defined in environment variables
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

#### Using JFrog Artifactory

```txt {title=".npmrc"}
# Custom registry URL with hard-coded authentication token
registry=https://yourcompany.jfrog.io/artifactory/api/npm/yourcompany.jfrog.io/artifactory/api/npm/npm-local/:_authToken=abc...

# Custom registry URL with authentication token defined in environment variables
registry=https://yourcompany.jfrog.io/artifactory/api/npm/yourcompany.jfrog.io/artifactory/api/npm/npm-local/:_authToken=${ARTIFACTORY_TOKEN}
```

### Include custom configuration files

To make the Checkly CLI and infrastructure aware of a custom package manager configuration for private packages, specify the additional files in the `checks.include` property in your `checkly.config.ts|js`.

Checkly CLI commands like `test` or `deploy` will then bundle and upload these files so they are available in the Checkly infrastructure when running essential commands like `install`.

```tsx {title="checkly.config.ts"}
export default defineConfig({
  checks: {
    playwrightConfigPath: './playwright.config.ts',
    // Include .npmrc to be used in the Checkly infrastructure
    include: ['.npmrc'],
    playwrightChecks: [
      // Configure your Playwright Check Suites
      // ...
    ]
  }
})
```
