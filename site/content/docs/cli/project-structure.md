---
title: Project Structure
weight: 3
menu:
  docs:
    parent: "CLI"
---

The example below is how a typical project using the Checkly CLI is organized. Most files, directories and paths are 
conventions you can tweak to your liking using `import` / `require` and setting `glob` patterns.

## Directories and files

- `checkly.config.ts` - Global project and CLI configuration. This one is mandatory and we recommend using TypeScript.
- `src/__checks__/*` - Your TS/JS files defining Checks and other resources.
- `package.json` - Standard NPM project manifest.

Here is an example directory tree of what that would look like:

```
.
|-- checkly.config.ts
|-- package.json
`-- src
    `-- __checks__
      |-- alert-channels.ts
      |-- api-check.check.ts
      `-- homepage.spec.ts
 
```

The main `checkly.config.ts` at the root of your project defines a range of defaults for all your checks. However, as your
project grows, you will want to override these defaults for specific checks of whole groups of checks. The recommended way 
to tackle this is using a mix of **global** and **local** configuration.

## Global Configuration

As mentioned, your global `checkly.config.ts` holds a set of defaults for your project, the checks in that project and some
CLI commands.

 ```ts
const config = {
  projectName: 'Website Monitoring',
  logicalId: 'website-monitoring-1',
  repoUrl: 'https://github.com/acme/website',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10',
    frequency: 5,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website', 'api'],
    alertChannels: [],
    checkMatch: '**/*.check.js',
    browserChecks: {
      frequency: 10,
      testMatch: '**/*.spec.js',
    },
  },
  cli: {
    verbose: false,
    runLocation: 'eu-west-1',
    privateRunLocation: 'private-dc1'
  }
}

export default config
 ```

You can find a full reference of all properties of a Project in [the Project construct section](/docs/cli/constructs/#project)

### Config Intellisense

We recommend using TypeScript, but you can use JavaScript and still get some benefits of TS and add hints to your IDE by 
either annotating the config object type in JSDoc:

```js
/** @type {import('@checkly/cli').ChecklyConfig} */
const config = {
  // …
}

module.exports = config;
```

Or alternatively, import and use the `defineConfig` helper which will provide typings intellisense without needing to annotate the object:
```js
const { defineConfig } = require('@checkly/cli')

const config = defineConfig({
  // …
})

module.exports = config;
```

## Local configuration

You can override any of the settings in the `checks` global configuration section at the individual check level.

```ts
// __check__/api.check.ts
import { ApiCheck, AssertionBuilder } from '@checkly/cli/constructs'

const api = new ApiCheck('hello-api', {
  name: 'Hello API',
  locations: ['ap-south-1'], // overrides the locations property
  frequency: 30, // overrides the frequency property
  request: {
    method: 'GET',
    url: 'https://api.checklyhq.com/public-stats',
    assertions: [
      AssertionBuilder.statusCode().equals(200)
    ]
  }
})
```
