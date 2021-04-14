---
title: Timeouts
weight: 9
menu:
  docs:
    parent: "Browser checks"
---

All browser checks are capped at **120 seconds**. This means everything in your script needs to happen within those 120 seconds.  

## Dealing with timeouts

Setting correct timeout values can mean the difference between a good night's sleep or alerts bugging
you because your site or apps performance dropped by 500 milliseconds.

You can deal with timeouts at two levels, and we recommend you study them in the order below:

1. Use the timeout options in Puppeteer/Playwright.
2. Set global timeouts on the Mocha suite and test level.

> Tip: Good use of the `page.waitForSelector()` can save you a lot of headaches.

## Timeouts in Puppeteer/Playwright

In your Puppeteer/Playwright code, you have a range of options to set timeouts for different actions. 
The default for most actions is 30 seconds. There are two very important ones that you should use in almost every 
browser check:

### page.waitForSelector()

This method waits for an element to appear on the page. This is your bread and butter and should be used whenever something
needs to be loaded after clicking, hovering, navigating, etc. You can pass it an options object with a timeout attribute
to override the default 30 seconds.

{{< info >}} 
Playwright `click` and `fill` methods will 
[auto-wait](https://playwright.dev/#version=v1.4.0&path=docs%2Fcore-concepts.md&q=auto-waiting) 
for the element to be visible.
{{< /info >}}

In the example below, we type 'fluffy kittens' into an input field on a search page and click "submit". We then use the
`page.waitForSelector()` method and pass in a timeout of 5 seconds because we want this check to fail if it takes any longer.
You can also see we assign a 10-second timeout to the surrounding Mocha test.

{{< tabs "waitForSelector example" >}}
{{< tab "Puppeteer" >}}
```js
it('First search result is my link', async () => {
  await page.type('input[name=q]', 'fluffy kittens')
  await page.click('input[type="submit"]')
  await page.waitForSelector('h3 a', { timeout: 5000 })

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('h3 a'))
      .map(a => a.textContent)
  )

  assert.equal('my link', links[0])
}).timeout(10000)
```

{{< /tab >}}
{{< tab "Playwright" >}}
```js
it('First search result is my link', async () => {
  await page.type('input[name=q]', 'fluffy kittens')
  await page.click('input[type="submit"]')
  await page.waitForSelector('h3 a', { timeout: 5000 })

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('h3 a'))
      .map(a => a.textContent)
  )

  assert.equal('my link', links[0])
}).timeout(10000)
```
{{< /tab >}}
{{< /tabs >}} 

Read more in the [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v2.0.0&show=api-pagewaitforselectorselector-options)
or [Playwright](https://playwright.dev/#version=v1.4.0&path=docs%2Fapi.md&q=pagewaitforselectorselector-options--options-timeout)
API docs.

> Playwright allows you to use XPath selectors in the `page.waitForSelector()` method. 
> Puppeteer provides a separate method for that: `page.waitForXpath()`.

### page.waitForNavigation()

In both Puppeteer and Playwright you can click on a link that triggers a navigation to a new page. 
Use the `page.waitForNavigation()`
method, although it is slightly unintuitive to use as the associated promise has to be initialized before waiting for it.
This means the following **will not work**

{{< tabs "waitForNavigation broken" >}}
{{< tab "Puppeteer" >}}
```js
await page.click('a.some-link')
await page.waitForNavigation() // does not works as expected
```

{{< /tab >}}
{{< tab "Playwright" >}}
```js
await page.click('a.some-link')
await page.waitForNavigation() // does not works as expected
```
{{< /tab >}}
{{< /tabs >}} 

but this will work:

{{< tabs "waitForNavigation correct" >}}
{{< tab "Puppeteer" >}}
```js
const navigationPromise =  page.waitForNavigation()
await page.click('a.some-link')
await navigationPromise
```

{{< /tab >}}
{{< tab "Playwright" >}}
```js
const navigationPromise =  page.waitForNavigation()
await page.click('a.some-link')
await navigationPromise
```
{{< /tab >}}
{{< /tabs >}} 


### Navigation wait times

The `page.waitForNavigation()` method — but also almost all other methods that deal with navigation like `page.reload()` and `page.goBack()`) — 
has a very important set of options that tell the library what it should consider a "navigation".

These options come in two categories:

**DOM event based**

These two options are directly related to the events your browser emits when it has reached a certain loading stage. 
These events are not specific to Puppeteer or Playwright and are used in almost all browsers.

- `load` - This the most strict: your whole page including all dependent resources, i.e. images, scripts, css etc. [More info](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event)
- `domcontentloaded` - less strict: when your HTML has loaded. [More info](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)

Note: the `load` option is the default. It is pretty strict, so if you have slow dependencies it can be less than optimal.

**Heuristic based**

These options are based on the heuristic that if (almost) all network connections your browser has
are no longer active, your page has *probably* finished loading.

- **Puppeteer:** `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
- **Puppeteer:** `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.
- **Playwright:** `networkidle` - is the equivalent of `networkidle0` in Puppeteer.

So, which one to choose? This really depends on your situation:

- Have an SPA that needs to be fully rendered? Probably go with `load`
- Have a server side rendered page but some slow dynamically loaded sections that are not crucial: 
go for `networkidle2`/`networkidle`

Options are set as follows: 
{{< tabs "networkidle example" >}}
{{< tab "Puppeteer" >}}
```js
page.waitForNavigation({ waitUntil: 'networkidle2' })
```

{{< /tab >}}
{{< tab "Playwright" >}}
```js
page.waitForNavigation({ waitUntil: 'networkidle' })
```
{{< /tab >}}
{{< /tabs >}} 

You can also specify an array of `waitUntil` options. Read more in the 
[Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v2.0.0&show=api-pagewaitfornavigationoptions)
or [Playwright](https://playwright.dev/#version=v1.4.0&path=docs%2Fapi.md&q=pagewaitfornavigationoptions)
API docs.

### page.setDefaultNavigationTimeout(timeout)

You can tweak the navigation timeout with `page.setDefaultNavigationTimeout()`. This impact the timeout limits of the
initial load of your page or app and all subsequent navigation.

Read more in the
[Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v2.0.0&show=api-pagesetdefaultnavigationtimeouttimeout)
or [Playwright](https://playwright.dev/#version=v1.4.0&path=docs%2Fapi.md&q=pagesetdefaultnavigationtimeouttimeout)
API docs.

### page.waitFor(timeout)  / page.waitForTimeout(timeout)

Some pages can be finicky because of animations or some non-linear behaviour or dynamic content. This method allows you
to "just wait" for a set amount of time. The example below passes in a number. The result is the test will wait for five
seconds.

{{< tabs "waitForTimeout" >}}
{{< tab "Puppeteer" >}}
```js
await page.waitFor(5000)
```

{{< /tab >}}
{{< tab "Playwright" >}}
```js
await page.waitForTimeout(5000)
```
{{< /tab >}}
{{< /tabs >}} 

> Note: using `page.waitFor(timeout)` or `page.waitForTimeout(timeout)` should be a last option. 
> Use it sparingly as it can quickly break your script if load times vary a lot.

## Timeouts in Mocha

> Default: 2 sec

At the highest level, you can set timeout values in your Mocha code. These timeouts are enforced regardless of what
happens in the Chromium browser started by Puppeteer or Playwright. For Checkly checks, we recommend using timeout 
values on each test. In the example below, we added a `.timeout(10000)` to the `it` function. The default timeout of 
2 seconds is almost always too short to run any meaningful check.

{{< tabs "Mocha timeout example" >}}
{{< tab "Puppeteer" >}}
```js
describe('Check Google Homepage', () => {
  it('has title "Google"', async () => {
    await page.goto('https://google.com', { waitUntil: 'networkidle2' })
    const title = await page.title()
    assert.equal(title, 'Google')
  }).timeout(10000)
})
```

{{< /tab >}}
{{< tab "Playwright" >}}
```js
describe('Check Google Homepage', () => {
  it('has title "Google"', async () => {
    await page.goto('https://google.com', { waitUntil: 'networkidle' })
    const title = await page.title()
    assert.equal(title, 'Google')
  }).timeout(10000)
})
```
{{< /tab >}}
{{< /tabs >}} 

This means this test will fail if it does not resolve within 10 seconds. You can also add a timeout at the suite level,
however, the syntax is a bit different if you want to use arrow functions: you have to pass in the `suite` and then set
the timeout on that object.

{{< tabs "Mocha suite timeout example" >}}
{{< tab "Puppeteer" >}}
```js
describe('Check Google Homepage', (suite) => {
  suite.timeout(10000)
  it('has title "Google"', async () => {
    await page.goto('https://google.com', { waitUntil: 'networkidle2' })
    const title = await page.title()
    assert.equal(title, 'Google')
  })
})
```

{{< /tab >}}
{{< tab "Playwright" >}}
```js
describe('Check Google Homepage', (suite) => {
  suite.timeout(10000)
  it('has title "Google"', async () => {
    await page.goto('https://google.com', { waitUntil: 'networkidle' })
    const title = await page.title()
    assert.equal(title, 'Google')
  })
})
```
{{< /tab >}}
{{< /tabs >}} 

[Read more on the Mocha site](https://mochajs.org/#timeouts) and in this [enlightening GitHub issue](https://github.com/mochajs/mocha/issues/2018).
