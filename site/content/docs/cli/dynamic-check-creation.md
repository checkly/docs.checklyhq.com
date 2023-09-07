---
title: Dynamic check creation
weight: 5
menu:
  platform:
    parent: "CLI"
---

The Checkly CLI enables you to code your entire monitoring setup taking full advantage of the flexibility of TypeScript/JavaScript. Reusing language constructs that you are already familiar with, you will be able to create a MaC setup that neatly fits your unique use cases and workflows.

This page shows a few examples.

## Dynamic and programmable check creation

Iterating through lists of target URLs is an easy way to manage checks at scale while avoiding code duplication.

```ts
// __checks__/api.check.ts
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

```ts
// __checks__/api.check.ts
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

Iterating through target environments (like `preview` and `production`) allows you to reuse existing check or spec definitions.

```ts
// __checks__/browser.check.ts
import fs from 'fs';
import { BrowserCheck } from 'checkly/constructs';
import { groupProd, groupPreview } from './groups.check';
​
// This reads a directory and extracts all file paths containing '.spec.ts'
let files = fs.readdirSync('__checks__/');
let specFiles = files.filter((filename) => {
	return filename.includes('.spec.ts');
});
​
// This is the list of environments and their matching group; it can be extended easily
const environments = [
	{ name: 'preview', group: groupPreview },
	{ name: 'production', group: groupProd },
];
​
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
		});
	}
});
```

```ts
// __groups.check.ts
import { CheckGroup } from 'checkly/constructs'
import { smsChannel, emailChannel } from '../alert-channels'
const alertChannels = [smsChannel, emailChannel]
​
export const groupPreview = new CheckGroup('group-browser-preview', {
  name: 'WebShop - Preview',
  activated: true,
  muted: false,
  runtimeId: '2023.02',
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
  runtimeId: '2023.02',
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['mac', 'production'],
  // You can use group-level environment vars to point each group's checks to the right target URL
  environmentVariables: [ { key: 'TARGET_URL', value: 'https://www.mywebsite.com' }],
  apiCheckDefaults: {},
  concurrency: 100,
  alertChannels
})
```