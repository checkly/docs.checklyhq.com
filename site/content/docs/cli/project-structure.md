---
title: Project Structure
weight: 3
menu:
  docs:
    parent: "CLI"
---

This is how a typical project using the Checkly CLI is organized. Most files, directories and paths are conventions you
can tweak to your liking using `import` / `require` and setting `glob` patterns.

## Directories and files

- `checkly.config.ts` - Global project and CLI configuration. This one is mandatory.
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

{{< tabs "config" >}}
{{< tab "TypeScript" >}}
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
{{< /tab >}}
{{< tab "JavaScript" >}}
 ```js
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

module.exports = config;
 ```
{{< /tab >}}
{{< /tabs >}}

- `checkMatch`: By default, Checkly looks for files matching `**/*.check.{js,ts}`.
- `cli`: Sets default values for command line flags. Setting command line flags will still override these values.
  - `runLocation`: The default run location for `checkly test`.
  - `privateRunLocation`: A [private run location](https://www.checklyhq.com/docs/private-locations/) for `checkly test`. Both `runLocation` and `privateRunLocation` can't be set at once.

### Config Intellisense

The CLI ships TypeScript typings, so you add hints to your IDE by either annotating the config object type in JSDoc:

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

```js
// __check__/api.check.js
const { ApiCheck } = require('@checkly/cli/constructs')

const api = new ApiCheck('hello-api', {
  name: 'Hello API',
  locations: ['ap-south-1'], // overrides the locations property
  frequency: 30, // overrides the frequency property
  request: {
    method: 'GET',
    url: 'https://api.checklyhq.com/public-stats',
    assertions: [{ source: 'STATUS_CODE', comparison: 'EQUALS', target: '200' }]
  }
})
```
