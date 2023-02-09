---
title: Project Structure
weight: 3
menu:
  docs:
    parent: "CLI"
---


The getting started example above uses a set of defaults and conventions to get you going quickly. In more complex cases
you will want more control. The recommended way to tackle this is using a mix of **global** and **local**
configuration.

## Global configuration

Create a `checkly.config.js` (or `checkly.config.ts`) at the root of your project.

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
  }
}

module.exports = config;
```

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
