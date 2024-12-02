---
title: Parameterizing your Playwright projects
displayTitle: Parameterizing Playwright Projects
date: 2020-07-13
author: Giovanni Rago
githubUser: ragog
tags:
  - e2e
  - assertions
weight: 3
navTitle: Parameterizing Projects
menu:
  learn:
    parent: "Best practices"
---

In a previously [released YouTube video](https://www.youtube.com/watch?v=k488kAtT-Pw), I explained how and why Playwright fixtures perfectly match with page object models. Combining the two allows you to hide setup instructions and keep your tests clean. Page object models no longer have to be initialized in every test case.


```js
// Fixtures enable you to hide setup instructions from your test cases
test("feature works", async ({ yourPageObjectModel }) => {
  /* … */
})
```

To be upfront — I'm a fixture fanboy!

But what if you need to pass additional configuration to your page object models? When options are hidden in a fixture, you can't configure how a class is initialized, right? Wrong!

Let me show in this article how to implement options to configure fixtures, page object models, and even your entire Playwright code base.

If you prefer video, here's a recording explaining the same concepts.

{{< youtube rRmfYu8hlbw >}}

## Why fixtures enable clean Playwright projects

But let's take a step back first...

Over time, more and more people have asked me how they should organize and structure complex Playwright projects. I don't believe there's a single silver bullet, however, I do like to establish some patterns that enable coding conventions and best practices.

As mentioned above, one of these patterns is to rely on [custom Playwright fixtures](https://playwright.dev/docs/test-fixtures#creating-a-fixture) whenever possible. As the Playwright docs state, fixtures:

- help to encapsulate setup and teardown in a single place.
- are reusable between tests.
- are lazy and only run when "requested" in your test cases.
- are composable to group functionality.

And I wholeheartedly agree with all these statements, but let me add one more point for using fixtures: implementing custom fixtures "just feels right"™. By using fixtures, you're extending Playwright's core functionality rather than creating a spaghetti code base with tests importing JS/TS modules from anywhere.

**Fixtures allow you to follow Playwright's design principles; you'll be using the testing framework as it's supposed to!**

Let's look at a fixture example that hides the initialization of a page object model.

```ts
// BEFORE
import { DashboardPage } from './poms/dashboard-page.ts'

test('create check', async ({ page }) => {
  const dashboardPage = new DashboardPage(page, { 
    email: 'stefan@checklyhq.com', 
    password: '...'
  });
  await dashboardPage.login()
  await dashboardPage.createCheck()
})

// AFTER
test('create check', async ({ dashboardPage }) => {
  await dashboardPage.createCheck()
})
```

By moving the initialization of `DashboardPage` into a fixture and Playwright itself, the test cases can focus on testing features. You don't need to repeatedly add setup instructions that initialize page object models. Define that you want to use a dashboardPage in your test and receive a ready-to-use object. Great stuff!

But if your page object models need additional configuration, such as the user above, you might wonder how to pass additional arguments to your page object model constructors.

Let's look at how this fixture is implemented and find out how we can configure it!

## How to add options to your custom Playwright fixtures

Suppose you haven't used fixtures before; here's all the magic.

Instead of importing test and expect from @playwright/test, your tests can import these from a base file that extends Playwright's core functionality.

```ts {title="base.ts"}
// 1. import `test` but rename it to `base`
import { test as base } from '@playwright/test'
import { DashboardPage, User } from './poms/dashboard'

// 2. extend `base` with your custom functionality
// 3. export and use the returned value as `test` 
export const test = base.extend({
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page, {
      email: 'stefan@checklyhq.com',
      Password: '...'
    })
    await dashboardPage.login()
    // whatever you call `use` with will be passed to the
    // tests requesting to use the `dashboardPage` fixture
    await use(dashboardPage)
  },
})

export { expect } from '@playwright/test'
```

Playwright's `test` method allows you to enrich Playwright's core functionality with your own custom fixtures and options. The trick is to import and rename `test`, extend it with your custom additions, and then export the returned value as `test` to be used in your test cases.

In the example above, the `dashboard` fixture intializes the new `DashboardPage` and then passes the result to the provided `use` method. Whatever `use` will be called with will be passed to your test cases. This has the advantage of having all your setup instructions in one place. 

But if you now have test cases that should use the `dashboardPage` object with different users, you can't change how the page object model will be initialized because the setup is hidden away from the test cases.

How could we make this fixture setup configurable?

## Configure your Playwright project with custom options

Similar to fixtures, Playwright allows you to define static values and options in our Playwright setup, and you can do it right next to your fixture definitions in the extend call.

```ts {title="base.ts"}
import { test as base } from '@playwright/test'
import { DashboardPage} from './poms/dashboard'

export const test = base.extend({
  // define a new Playwright option
  user: [
    { email: 'stefan@checklyhq.com', password: '...' },
    { option: true },
  ],

  dashboardPage: async ({ page }, use) => { /* ... */ },
})

export { expect } from '@playwright/test'
```

Now that you have defined a user in your new test object, tests can access this option.

```ts
test('create check', async ({ dashboardPage, user }) => {
  // do something with the new `user` option
})
```

But it's not only your tests that can access this newly defined user; your fixtures can access it, too!

```ts {title="base.ts"}
import { test as base } from '@playwright/test'
import { DashboardPage} from './poms/dashboard'

export const test = base.extend({
  user: [
    { email: 'stefan@checklyhq.com', password: '...' },
    { option: true },
  ],

  dashboardPage: async ({ page, user }, use) => {
    // use the new `user` object in your fixture
    const dashboardPage = new DashboardPage(page, user)
    // ...
  },
})

export { expect } from '@playwright/test'
```

And this is great, but so far we only shuffled some code around, we didn't find a solution to change the user.

Did you notice the option: true? By marking the Playwright option as configurable, you can now change it from multiple places. And it will behave similarly to other "official" Playwright options.

For example, you could now head into your `playwright.config.ts` to change the user object and set a different one in the global settings.

```ts {title="playwright.config.ts"}
import { defineConfig, devices } from '@playwright/test'

export default defineConfig<TestOptions>({
  // more Playwright config here ...

  use: {
    // override your user in the global config
    user: { email: 'stefan@checklyhq.com', password: '...' }
  },
})
```

Or, if you want to leverage Playwright projects for different users, you could do that, too!

```ts {title="playwright.config.ts"}
import { defineConfig, devices } from '@playwright/test'

export default defineConfig<TestOptions>({
  // more Playwright config here ...

  projects: [
    {
      name: 'user-a',
      use: {
        ...devices['Desktop Chrome'],
        // override the default user in a project
        user: { email: 'stefan@checklyhq.com', password: '...' },
      },
    },
  ],
})
```

And for special occasions, if you only have one test requiring another user, you could even change it right in your test case with `test.use`.

```ts {title="base.ts"}
import { test } from './base'

// override the default user
test.use({ user: { email: 'hello@checklyhq.com', password: '' } })

test('create check', async ({ dashboardPage }) => {
  // dashboardPage now uses the user defined above
  await dashboardPage.createCheck()
})
```

Either way, tests or fixtures can access your user config option. And if you want to change it, you can do it similarly to other Playwright settings with the already provided use method. Win-win!

## Conclusion
If your Playwright project grows, I highly recommend looking into ways to establish conventions and keep your tests clean. Fixtures and options are the perfect tool for this. Setting these up might feel like overkill, but trust me, you won't look back once you define your dependencies in this Playwright-native way.

If you have any questions or comments, say "Hi" in the Checkly community Slack! 

But what's Checkly? Checkly enables you to take your existing Playwright tests running in CI/CD and transform them into synthetic end-to-end monitoring. Your Playwright tests will run around the clock and from anywhere on this planet so that you know that your production sites are up and running. And if they're not, you'll be the first to know because Checkly will alert you. It's pretty cool, trust me. 😉

