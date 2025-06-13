---
title: Dynamic monitor creation - Checkly Docs
displayTitle: Dynamic monitor creation
navTitle: Dynamic monitor creation
weight: 6
menu:
  platform:
    parent: "CLI"
---

The Checkly CLI enables you to code your entire monitoring setup taking full advantage of the flexibility of TypeScript/JavaScript. Reusing language constructs that you are already familiar with, you will be able to create a MaC setup that neatly fits your unique use cases and workflows.

This page shows a few examples.

## Similar checks from a list of targets

Iterating through lists of target URLs is an easy way to manage checks at scale while avoiding code duplication.

```ts {title="__checks__/api.check.ts"}
import { ApiCheck } from 'checkly/constructs'

const publicResources = ['/public-stats', '/v1/runtimes']

for (const publicResource of publicResources) {
  new ApiCheck(`public-resource_${publicResource}`, {
    name: `Public Resource ${publicResource}`,
    request: {
      url: `https://api.checkly.com${publicResource}`,
      method: 'GET',
      followRedirects: true,
      skipSsl: false,
      assertions: [ AssertionBuilder.statusCode().equals(200) ]
    }
  })
}
```

Asynchronous operations are supported by exporting an async function from your check files, too.

```ts {title="__checks__/api.check.ts"}
import { ApiCheck } from 'checkly/constructs'
import { getPublicResources } from './helpers'

// an exported async function to signal that
// this check file performs asynchronous operations
export default async function createApiChecks() {
  const publicResources = await getPublicResources();

  for (const publicResource of publicResources) {
    new ApiCheck(`public-resource_${publicResource}`, {
      name: `Public Resource ${publicResource}`,
      request: {
        url: `https://api.checkly.com${publicResource}`,
        method: 'GET',
        followRedirects: true,
        skipSsl: false,
        assertions: [ AssertionBuilder.statusCode().equals(200) ]
      }
    })
  }
}
```

## Separate groups for prod and pre-prod

Iterating through target environments (like `preview` and `production`) linked to `Group` resources allows you to reuse existing `Check` definitions.

```ts {title="__checks__/browser.check.ts"}
import fs from 'fs'
import { BrowserCheck } from 'checkly/constructs'
import { groupProd, groupPreview } from './groups.check'

// This reads a directory and extracts all file paths containing '.spec.ts'
const files = fs.readdirSync('__checks__/')
const specFiles = files.filter((filename) => {
  return filename.includes('.spec.ts')
})

// This is the list of environments and their matching group; it can be extended easily
const environments = [
	{ name: 'preview', group: groupPreview },
	{ name: 'production', group: groupProd },
]

// Here we create a new browser check for each environment x testspec combination
// Checks are added to the right groups - the group will set the right env variable for the target URL
environments.forEach((environment) => {
	for (const specFile of specFiles) {
		new BrowserCheck(`${specFile}${environment.name}`, {
			name: `${specFile} [${environment.name}]`,
			tags: [`${environment.name}`],
			group: environment.group,
			code: {
				entrypoint: specFile,
			},
		})
	}
})
```

You can handle potential differences between target environments via group-level environment variables, which are made available to all checks within a group.

```ts  {title="__checks__/group.check.ts"}
import { CheckGroup } from 'checkly/constructs'
import { smsChannel, emailChannel } from '../alert-channels'
const alertChannels = [smsChannel, emailChannel]

export const groupPreview = new CheckGroup('group-browser-preview', {
  name: 'WebShop - Preview',
  activated: true,
  muted: false,
  runtimeId: '2025.04',
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['mac', 'preview'],
  // You can use group-level environment vars to point each group's checks to the right target URL
  environmentVariables: [ { key: 'TARGET_URL', value: 'https://preview.mywebsite.com' }],
  apiCheckDefaults: {},
  concurrency: 100,
  alertChannels
})

export const groupProd = new CheckGroup('group-browser-prod', {
  name: 'WebShop - Production',
  activated: true,
  muted: false,
  runtimeId: '2025.04',
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['mac', 'production'],
  // You can use group-level environment vars to point each group's checks to the right target URL
  environmentVariables: [ { key: 'TARGET_URL', value: 'https://www.mywebsite.com' }],
  apiCheckDefaults: {},
  concurrency: 100,
  alertChannels
})
```
