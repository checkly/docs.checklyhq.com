---
title: Self-documenting tests - add automatic Playwright steps with Typescript Decorators
subTitle: Understand tests better with steps
date: 2024-11-15
author: Stefan Judis
githubUser: stefanjudis
tags:
  - typescript

weight: 7
navTitle: Automatic Steps
menu:
  learn:
    parent: "Best practices"
---
You can write Playwright end-to-end testing code using JavaScript or TypeScript. Which one should you choose?

When I started writing my first automated browser tests, I went with JavaScript because I couldn't be bothered with the type wrangling. I just wanted to get something off the ground quickly. YOLO, right?

Today, though, there are two reasons why **I last wrote a JavaScript-first Playwright test a very long time ago**.

First, if you're worried about massive type headaches, complicated TypeScript generics, and countless red squiggly lines in your editor when you "just" want to end-to-end test your product features, here's a secret: [**Playwright doesn't type-check your code**](https://www.checklyhq.com/blog/playwright-type-checking-and-linting/). It understands and compiles TypeScript to JavaScript, but you can still write JavaScript or use `any` types. Playwright will not judge you on your TypeScript skills and will run your tests.

More importantly, though, TypeScript is the better choice when planning to maintain a test suite in the long term because its benefits outweigh the added complexity. Auto-completion alone will make your test creation more manageable, and even though nobody likes to deal with type errors, when your test suite becomes a software project on its own, TypeScript warnings will help you discover problems in your code early.

A few days ago, I found another TypeScript feature that allows me to **structure complex end-to-end tests with test steps while writing less code**. Doesn't this sound exciting?

{{< youtube id="of1v9cycTdQ" >}}

Let me show you how you can replace repetitive `test.step` calls with a single `@step` decorator. Let's go!

## The first problem: Playwright reports can be challenging to scan and understand.

By default, all your test actions and assertions will be a long wall of instructions shown in UI mode or your test reports. That's not a big deal for twenty instructions, but if you're testing a complex UI flow, your test instruction count will quickly hit a hundred actions. Looking at a report with that many instructions isn't great.

![way too many lines on a top level playwright report](/samples/images/steps1.png)

To solve this problem, you can group your actions in Playwright test steps.

Here's [a snippet right from the Playwright docs](https://playwright.dev/docs/api/class-test#test-step).

```js
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await test.step('Log in', async () => {
    // ...
  });

  await test.step('Outer step', async () => {
    // ...
    // You can nest steps inside each other.
    await test.step('Inner step', async () => {
    // ...
    });
  });
})
```

You define a step, give it a name and wrap your existing Playwright code in an async callback function. A complex test case becomes very readable with a few added test steps.

```js
test('Customer is able to create account', async ({
  page
}) => {
  await test.step('Customer can create account', async () => {
    // create account instructions
  });

  await test.step('Customer can log out', async () => {
    // log out instructions
  });

  await test.step('Customer can log in', async () => {
    // log in instruction
  });
})
```

Look at this beautiful and well-structured HTML test report. I'm a fan!

![much nicer html test report](/samples/images/steps2.png)

You might now ask, "Does this work when you implement POMs ([Page Object Model](https://playwright.dev/docs/pom))?".

It does, but wrapping every public class method in a test step isn't a great experience, which brings us to another problem.

## The second problem: wrapping all methods in a test step is annoying.

Here's an example `PlaywrightPage` POM to test the search on the official Playwright docs.

```js
export class PlaywrightPage {
  readonly page: Page
  readonly searchBtn: Locator
  readonly searchInput: Locator

  constructor(page: Page) {
    this.name = name
    this.page = page
    this.searchBtn = page.getByLabel("Search")
    this.searchInput = page.getByPlaceholder("Search docs")
  }

  async goto() {
    await this.page.goto("https://playwright.dev")
  }

  async search() {
    // add a test step 👇
    await test.step("Search", async () => {
      await this.searchBtn.click()
      await this.searchInput.fill("getting started")
      await this.page.getByRole("link", { name: "Writing tests" }).click()
      await this.page.getByRole("heading", { name: "Writing tests" }).click()
    })
  }
}
```

Wrapping one method in a test step (`search` in this case) isn't a big deal, but wrapping every public POM method will quickly feel like unnecessary busy work.

```js
export class YourPageObject {
  async methodOne() {
    await test.step("methodOne", async () => { /* ... */ })
  }

  async methodTwo() {
    await test.step("methodTwo", async () => { /* ... */ })
  }

  async methodThree() {
    await test.step("methodThree", async () => { /* ... */ })
  }

  // There has to be a better way. 👆
}
```

Is there a better way to quickly add test steps?

## The solution: automagically wrap your POM methods with TypeScript decorators.

Playwright doesn't include magic tricks to avoid this repetition, but we can use TypeScript tooling to make things easier. A TypeScript benefit I haven't mentioned yet is that TypeScript is a compiler that transforms your `.ts` files into JavaScript.

In practice this means, that you can use modern JavaScript features in TypeScript and transform them to JavaScript code supported in older browsers or runtimes.

One of these modern JavaScript features is decorators. JavaScript Decorators aren't supported anywhere but work if you use TypeScript.

### JavaScript Decorators — a proposal that's been in the making forever.

[The JavaScript decorator spec proposal](https://github.com/tc39/proposal-decorators) saw the light of day eight years ago and reached ECMAScript proposal stage three. Proposals on stage three are considered "ready to implement".

```js
@defineElement("my-class")
class C extends HTMLElement {
  @reactive accessor clicked = false;
}
```

Unfortunately, no browser has bothered to implement the new language feature yet.

However, this doesn't hinder the TypeScript team from shipping JavaScript decorators.

But what are they? If you look at the proposal, you'll find that:

> Decorators are functions called on classes, class elements, or other JavaScript syntax forms during definition.
> 

This definition is somewhat cryptic. Let me explain the feature in my own words.

> With decorators, you can access, replace, or wrap class methods (like a method in your POM class) with other functions with a very condensed and developer-friendly syntax.
> 

Wrapping class methods is what we need to avoid all these `test.step` instructions. Let's find out how to define a decorator!

### How to replace `test.step` instructions with TypeScript decorators

Let's look at our POM class again.

```js
class PlaywrightPage {
  constructor(page: Page) { /* ... */ }

  async search() {
    // we want to remove the `test.step`...
    await test.step("Search", async () => {
      // and "somehow" wrap these Playwright instructions...
      await this.searchBtn.click()
      await this.searchInput.fill("getting started")
      await this.page.getByRole("link", { name: "Writing tests" }).click()
      await this.page.getByRole("heading", { name: "Writing tests" }).click()
    })
  }
}
```

If you look at the `search` method, we want to remove the `test.step` from within the function body and somehow wrap the Playwright instructions with a test step. This situation is a perfect use case for decorators.

First, we must apply a new decorator.

```js
export class PlaywrightPage {
  constructor(page: Page) { /* ... */ }

  // Use `@` to define a decorator
  @step()
  async search() {
    await this.searchBtn.click()
    await this.searchInput.fill("getting started")
    await this.page.getByRole("link", { name: "Writing tests" }).click()
    await this.page.getByRole("heading", { name: "Writing tests" }).click()
  }
}
```

To decorate a class method with a Playwright step, put a `@step` line before the class method definition. Now TypeScript will complain…

![a complaint from a typescript linter in an IDE](/samples/images/steps3.jpeg)

… because the decorator isn't defined yet.

Decorators are normal JavaScript functions. Let's define a new `step` function.

```js
// 1. Define the `step` decorator
function step(target: Function, context: ClassMethodDecoratorContext) {
  // 2. Return a method that will replace the original class method
  return function replacementMethod(...args: any) {
    // 3. Call the original method with the same arguments
    return await target.call(this, ...args)
  }
}
```

Let's untangle this new function.

When TypeScript discovers the `@step` syntax, it will try to call a `step` function. This function can be available in the current scope, or you can import it from somewhere in your codebase.

When found, the `step` decorator function will be called with a function reference to our original method (`target`) and must return another function (`replacementMethod`). This returned function will replace the decorated method. Thanks to some low-level JavaScript, you can then call the original method (`target`) with the passed-in arguments (`args`).

When you now run your tests and call a decorated class method, nothing has changed yet, but we're ready to apply some compilation magic. Let's extend the decorator!

```js
function step(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    // 2. Use the surrounding context to define the step name
    const name = this.constructor.name + "." + (context.name as string)
    // 1. Wrap the target method with `test.step`
    return test.step(name, async () => {
      return await target.call(this, ...args)
    })
  }
}
```

First, you can wrap your `target.call` in a `test.step`. Then, you only need to find a way to define a step name; ideally, it would relate to your original method.

You might have noticed it already; the decorator function will be called not only with the function reference but also with `context`. The replacement methods will also run in the same this context as the original method. With these two things, we can combine the POM class name (`this.constructor.name`) and the method name (`context.name`) to define a relatable step name.

If we rerun our test, the `@step` decorator will do its magic and automatically wrap POM methods in a nice Playwright test step showing us the POM class and method. Beautiful!

![a well documented test](/samples/images/steps4.jpeg)

You can now go wild and replace all these `test.step` calls with `@step` decorators!

```js
export class YourPageObject {
  @step
  async methodOne() { /* ... */ }

  @step
  async methodTwo() { /* ... */ }
  
  @step
  async methodThree() { /* ... */ }
}
```

But what if you want to give your test steps a human-readable name?

### How to pass custom step names to a decorator

To pass a custom step name to your decorator, you must change how you decorate the class methods. Instead of "just applying" a decorator with `@step` you can also execute your decorators with `@step()`.

This change allows you to hand in arguments like a possible step name.

```js
export class YourPage {
  @step("A great method")
  async methodOne() { /* ... */ }
}

```

But you can't execute your decorator methods yet. Add another function level to your decorator to hand in arguments.

```js
// 1. Make `@step` executable to enable function arguments
function step(stepName?: string) {
  // 2. Return the original decorator
  return function decorator(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return function replacementMethod(...args: any) {
      // 3. Use `stepName` when it's defined or
      // fall back to class name / method name
      const name = stepName || `${this.constructor.name + "." + (context.name as string)}`
      return test.step(name, async () => {
        return await target.call(this, ...args)
      })
    }
  }
}
```

Rename your original decorator and wrap it in another function that will return it. Then, you can rely on function scope and reuse the step name argument (`stepName`) to define a new step name in your replacement method. If `stepName` isn't defined, the code above falls back to the class name / method name combination.

**You can now name your test steps with a single line!**

Unfortunately, this approach has one downside. Once you make your step decorator function executable, you must execute it everywhere. `@step` must become `@step()`.

```js
export class PlaywrightPage {
  constructor(page: Page) { /* ... */ }

  @step('Perform a simple search and check heading') // "Performan a simple ..."
  async search() { /* ... */ }

  @step() // "PlaywrightPage.login"
  async login() { /* ... */ }
}
```

In my opinion, adding `()` is a very reasonable trade-off for the ability of setting custom step names, though.

## Conclusion

What do you think? Is implementing decorators for Playwright test steps worth the added complexity? For me, the answer is a firm "Heck yeah!".

The decorator code is quite complicated JavaScript / TypeScript, but you'll rarely touch this code. It's a typical "set up once and forget about it" case, and I bet you'll fall in love with the easy-to-use decoratorar one-liners quickly.

If you want to see this decorator implementation, find [a complete example implementation next to more Playwright example code on GitHub](https://github.com/checkly/playwright-examples/), and if you have any questions or comments, drop into the [Checkly community](https://www.checklyhq.com/slack/). We're a lovely bunch and happy to help!