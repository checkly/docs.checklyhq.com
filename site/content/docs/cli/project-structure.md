---
title: Project Structure - Checkly Docs
displayTitle: Structuring your project in Checkly
navTitle: Project structure
weight: 3
menu:
  platform:
    parent: "CLI"
---

The example below shows how a typical Checkly CLI project is organized. Most files, directories and paths are conventions you can tweak to your liking using `import` / `require` and setting `glob` patterns.

## Directories and files

- `checkly.config.ts` - Mandatory global project and CLI configuration. We recommend using TypeScript.
- `src/__checks__/*` - TS/JS files defining your checks and other resources.
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

The `checkly.config.ts` at the root of your project defines a range of defaults for all your checks.

## Project configuration

As your project grows, you will want to override these defaults for specific checks or check groups. The recommended way to tackle this is using a mix of **global** and **local** configuration.

### Global Configuration

As mentioned, your global `checkly.config.ts` holds a set of defaults for your project, checks and some CLI commands. Use `defineConfig` to configure your Checkly project.

{{< tabs "describe" >}}
{{< tab "TypeScript" >}}
 ```ts {title="checkly.config.ts"}
import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

export default defineConfig({
  projectName: 'Website Monitoring',
  logicalId: 'website-monitoring-1',
  repoUrl: 'https://github.com/acme/website',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10',
    frequency: Frequency.EVERY_5M,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website', 'api'],
    checkMatch: '**/*.check.js',
    browserChecks: {
      frequency: Frequency.EVERY_10M,
      testMatch: 'browsers/**/*.spec.js',
    },
    multiStepChecks: {
      testMatch: 'multistep/**/*.spec.js',
    },
  },
  cli: {
    runLocation: 'eu-west-1',
    privateRunLocation: 'private-dc1'
  }
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js {title="checkly.config.js"}
const { defineConfig } = require('checkly')

const config = defineConfig({
  projectName: 'Website Monitoring',
  logicalId: 'website-monitoring-1',
  repoUrl: 'https://github.com/acme/website',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10',
    frequency: Frequency.EVERY_5M,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website', 'api'],
    checkMatch: '**/*.check.js',
    browserChecks: {
      frequency: Frequency.EVERY_10M,
      testMatch: 'browsers/**/*.spec.js',
    },
    multiStepChecks: {
      testMatch: 'multistep/**/*.spec.js',
    },
  },
  cli: {
    runLocation: 'eu-west-1',
    privateRunLocation: 'private-dc1'
  }
})

module.exports = config;
```
{{< /tab >}}
{{< /tabs >}}

Find a full reference of all project properties in [the `Project` construct section](/docs/cli/constructs-reference/#project).


### Local configuration

Override any of the settings in the `checks` global configuration section at the individual check level.

```ts {title="__checks__/api.check.ts"}
import { ApiCheck, AssertionBuilder, Frequency } from 'checkly/constructs'

const api = new ApiCheck('hello-api', {
  name: 'Hello API',
  locations: ['ap-south-1'], // overrides the locations property
  frequency: Frequency.EVERY_30M, // overrides the frequency property
  request: {
    method: 'GET',
    url: 'https://api.checklyhq.com/public-stats',
    assertions: [
      AssertionBuilder.statusCode().equals(200)
    ]
  }
})
```

Find a full reference of all check properties in [the `ApiCheck` construct](/docs/cli/constructs-reference/#apicheck) or [`BrowserCheck` construct section](/docs/cli/constructs-reference/#browsercheck).
