---
title: Using NPM packages and local dependencies
weight: 7
menu:
  docs:
    parent: "CLI"
---

Checkly lets you use JavaScript / TypeScript in your browser checks and in API check setup & teardown scripts.
Checks are able to use NPM packages that are defined in [our runtimes](/docs/runtimes/specs/), as well as import local JavaScript and TypeScript files.


## NPM packages

> Not all NPM packages from NPM are available inside the context of a Check.

The JavaScript code for checks executes in a runtime environment managed by Checkly.
Runtime versions can be selected by setting a `runtimeId`.
This can be configured at the check and group level using constructs, and a default value for the project can be set in the [project configuration file](/docs/cli/project-structure/#global-configuration).
The latest runtime is `2022.10` at the time of writing. This runtime contains among others:

- Nodejs 16.x
- `@playwright/test 1.28.0`
- `axios 0.27.2`
- `lodash 4.17.21`
- `moment 2.29.2`

...and a range of other popular NPM package to help you write and assert checks.

- [Browse the latest runtime specs](/docs/runtimes/specs/)
- [Learn more about runtimes](/docs/runtimes/)

## Local Dependencies

Browser checks are also able to import other JavaScript and TypeScript files as dependencies.
This is useful for defining helper functions to be reused across multiple checks.
The Checkly CLI will automatically detect these dependencies and make sure that they're bundled as part of the check.
No additonal configuration is needed, and there's no need to create [Snippets](/docs/snippets/) in your account.

Here is an example of how this works in practice. The directory tree looks like the following:
```
__checks__
├── login.check.ts
├── login.spec.ts
└── login-helper.ts
```

In `login-helper.ts` we define a reusable function `gitHubLogin`. This function can be used by multiple browser checks.
```ts
// login-helper.ts

export async function gitHubLogin (page, username, password) {
  await page.goto('https://github.com/login')
  await page.getByLabel('Username or email address').type(username)
  await page.getByLabel('Password').type(password)
  await page.getByRole('button', { name: 'Sign in' })
}
```

In `login.spec.ts` we define the actual Playwright test. This file can import the `gitHubLogin` function from `login-helper.ts`. It also reads the username and password from [remote environment variables](https://www.checklyhq.com/docs/cli/using-environment-variables/#remote-environment-variables).
```ts
// login.spec.ts

// @ts-ignore
import { test } from '@playwright/test'
import { gitHubLogin } from './login-helper'

test('Github login', async ({ page }) => {
  await gitHubLogin(page, process.env.GITHUB_USER, process.env.GITHUB_PWD)

  // your normal check code
  await page.click('.header-search-input')
})
```

Finally, in `login.check.ts` we define the [BrowserCheck construct](/docs/cli/constructs/#browsercheck). Note that it's only necessary to configure the main Playwright file `login.spec.ts`. The dependency on `login-helper.ts` is automatically detected by the CLI.
```ts
// login.check.ts

import { BrowserCheck } from '@checkly/cli/constructs'

new BrowserCheck('login-check', {
  name: 'Login Check',
    code: { entrypoint: './login.spec.ts' }
  })
})
```

After running [`npx checkly deploy`](/docs/cli/command-line-reference/#npx-checkly-deploy) to deploy the project, we can see in the Web UI that the helper file `login-helper.ts` was also uploaded for the check.

![login check with helper file in dependencies](/docs/images/cli/github_login_helper_dependency.png)

> Local dependencies are currently only supported for Browser checks. This feature isn't available for API check setup and teardown scripts.

## Why can't I import any NPM package or other 3rd party dependencies?

Great question! Please see [this paragraph in our runtime docs](/runtimes/#why-cant-i-import-any-npm-package-or-other-3rd-party-dependencies)

In short:

1. Our runtime architecture is not a full CI platform for reasons of size, complexity and security.
2. Having said that, [please comment on this pinned GitHub issue](https://github.com/checkly/public-roadmap/issues/291) 
with a package you would love to see included in our Runtime.
