---
title: Visual regression & snapshot testing - Checkly Docs
displayTitle: Visual regression & snapshot testing
navTitle: Visual regression & snapshot testing
weight: 25
menu:
  resources: 
    parent: "Browser checks"
cli: true
aliases:
   - "/docs/browser-checks/visual-comparison-snapshot-testing/"
---
Playwright Test gives you the ability to do visual regression testing and snapshot testing. With Checkly, you can run these tests 
against production, 24x7. 

Visual regression testing is useful for testing the visual appearance of your applications and making sure production-specific issues like bad deploys,
flaky 3rd party dependencies, CMS changes and user-generated content do not impact to general layout and visual consistency of your
core screens on production.

Have a look at this video for a quick explainer:

{{< youtube uTm40YOtj_g >}}

The TL;DR is that you can:

- Use the `.toHaveScreenshot()` assertion to visually compare a screenshot of your page to a golden image / reference snapshot.
- Use the `.toMatchSnapshot()` assertion to compare any `string` or `Buffer` value to a golden image / reference snapshot.

This feature works with the following CLI and Checkly Agent versions:

- [Checkly CLI v4.4.0 or later](https://www.npmjs.com/package/checkly/v/4.4.0).
- [Checkly Agent v3.2.0 or later](https://hub.docker.com/layers/checkly/agent/3.2.0/images/sha256-714bbd7302d7c086ef1776014f919c1e9aacdfda450764295147e8f1ab99cb00?context=explore).

{{< info >}}
Visual regression & snapshot testing is available on our [Team and Enterprise plans](https://www.checklyhq.com/pricing/#features).
{{< /info >}}

## Visual regression testing

Starting with visual regression testing takes just three easy steps:

1. Add a single `expect(page).toHaveScreenshot()` line of code to
   your browser check script, like the example below.

   {{< tabs "Visual comparison test" >}}
   {{< tab "Typescript" >}}
   ```ts
   import { test, expect } from '@playwright/test';
   
   test('Playwright homepage', async ({ page }) => {
      await page.goto('https://playwright.dev')
      await expect(page).toHaveScreenshot()
   })
   ```
   {{< /tab >}}
   {{< tab "Javascript" >}}
   ```js
   const { expect, test } = require('@playwright/test')
   
   test('Playwright homepage', async ({ page }) => {
      await page.goto('https://playwright.dev')
      await expect(page).toHaveScreenshot()
   })
   ```
   {{< /tab >}}
   {{< /tabs >}}

2. Run your browser check. The first time you run it, you will get an error indicating that no golden image / reference
   snapshot exists yet.

   ```
   A snapshot doesn't exist at /tmp/19g67loplhq0j/script.spec.js-snapshots/Playwright-homepage-1-chromium-linux.png.
   ```
   
3. Generate a golden image / reference snapshot by clicking the "Run script and update golden image" option in the "run script" button.

   <video alt="generate reference snapshot" autoplay loop muted src="/docs/images/browser-checks/visual_comparison_1st_run.mp4"></video>

   This will generate the golden image, which you can inspect in the "golden files" tab in the editor. You can now save 
   your check and on each check run the golden image will be compared to the actual screenshot.


   {{<cli-tip >}}
   If you are using the Checkly CLI, you can also generate a golden image / reference snapshot by running the following 
   command in your terminal:
   ```
   npx checkly test --update-snapshots
   ```
   {{</cli-tip >}}

Now, when your check fails due to a visual difference, you will see a diff of the golden image and the actual screenshot
in your check result.

<video alt="inspect visual diff" autoplay loop muted src="/docs/images/browser-checks/visual_comparison_diff_modal.mp4"></video>


### Configuring visual regression testing 

To create accurate and actionable screenshot comparisons, Playwright gives you a ton of options to tweak how the `.toHaveScreenshot()`
should behave. What are acceptable differences in color, size, position, etc.? Do you want to match the full screen, or ignore
some dynamic elements that might screw up your comparison?

 Let's look at some examples, or check [the official reference docs](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1).

### Example 1: setting pixel ratios and color thresholds

You can control the margin of error you find acceptable between your golden image and the actual image using the following
options:

- `maxDiffPixelRatio`: An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1`
- `maxDiffPixels`: A total acceptable amount of pixels that could be different.
- `threshold`: An acceptable perceived color difference in the [YIQ color space](https://en.wikipedia.org/wiki/YIQ) between
the same pixel in compared images, between `0` (strict) and `1` (lax).


{{< tabs "Configuring thresholds" >}}
{{< tab "Typescript" >}}
   ```ts
   import { test, expect } from '@playwright/test';
   
   test('Playwright homepage', async ({ page }) => {
      await page.goto('https://playwright.dev')
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.2 })
      await expect(page).toHaveScreenshot({ maxDiffPixels: 1000 })
      await expect(page).toHaveScreenshot({ threshold: 0.2 })
   })
   ```
{{< /tab >}}
{{< tab "Javascript" >}}
   ```js
   const { test, expect } = require('@playwright/test')
   
   test('Playwright homepage', async ({ page }) => {
      await page.goto('https://playwright.dev')
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.2 })
      await expect(page).toHaveScreenshot({ maxDiffPixels: 1000 })
      await expect(page).toHaveScreenshot({ threshold: 0.2 })
   })
   ```
{{< /tab >}}
{{< /tabs >}}

### Example 2: ignoring specific screen elements

A typical homepage can have dynamic elements that change on each page load, or change based on the geographical region.
Think of a "latest blog posts" section, a cookie banner or a region / language selector. Playwright allows you to ignore
these elements when doing a visual comparison using the `mask` option and using one or more `page.locator()` selectors.

The example below hides the cookie banner and optional CTA popup from Intercom on the Checkly docs pages.

{{< tabs "Ignoring elements" >}}
{{< tab "Typescript" >}}
   ```ts
   import { test, expect } from '@playwright/test';
   
   test('Ignore cookie banner & cta popup', async ({ page }) => {
      await page.goto('https://docs.checklyhq.com')
      await expect(page).toHaveScreenshot({
         mask: [
            page.locator('.optanon-alert-box-wrapper'),
            page.locator('#intercom-container-body')
         ]
      })
   })
   ```
{{< /tab >}}
{{< tab "Javascript" >}}
   ```js
   const { test, expect } = require('@playwright/test')
   
   test('Playwright homepage', async ({ page }) => {
      await page.goto('https://docs.checklyhq.com')
      await expect(page).toHaveScreenshot({
         mask: [
            page.locator('.optanon-alert-box-wrapper'),
            page.locator('#intercom-container-body')
         ]
      })
   })
   ```
{{< /tab >}}
{{< /tabs >}}

### Example 3: disabling animations

In some cases, any ongoing animations can cause a visual difference between your golden image and the actual screenshot.
You can disable any CSS animations and transitions using the `animations` option.

{{< tabs "Disabling animations" >}}
{{< tab "Typescript" >}}
   ```ts
   import { test, expect } from '@playwright/test';
   
   test('Disable animations', async ({ page }) => {
      await page.goto('https://playwright.dev')
      await expect(page).toHaveScreenshot({ animations: 'disabled' })
   })
   ```
{{< /tab >}}
{{< tab "Javascript" >}}
   ```js
   const { test, expect } = require('@playwright/test')
   
   test('Disable animations', async ({ page }) => {
      await page.goto('https://playwright.dev')
      await expect(page).toHaveScreenshot({ animations: 'disabled' })
   })
   ```
{{< /tab >}}
{{< /tabs >}}

## Snapshot testing

Snapshot testing, using the `expect().toMatchSnapshot(snapshotName)` assertion, is a great way to test the output of
any arbitrary `string` or `Buffer` value. Note that it is not optimized for visual regression testing.

{{< tabs "Snapshot testing" >}}
{{< tab "Typescript" >}}
   ```ts
   import { test, expect } from '@playwright/test'
   
   test('Match hero text', async ({ page }) => {
      await page.goto('https://playwright.dev')
      expect(await page.textContent('.hero__title')).toMatchSnapshot('hero.txt')
   })
   ```
{{< /tab >}}
{{< tab "Javascript" >}}
   ```js
   const { test, expect } = require('@playwright/test')
   
   test('Match hero text', async ({ page }) => {
      await page.goto('https://playwright.dev')
      expect(await page.textContent('.hero__title')).toMatchSnapshot('hero.txt')
   })
   ```
{{< /tab >}}
{{< /tabs >}}

Creating or updating the golden image / reference snapshot works the same as with visual regression testing.

Check [the official reference docs](https://playwright.dev/docs/api/class-snapshotassertions#snapshot-assertions-to-match-snapshot-1)
for all options.

## Embedding in your CI/CD workflow

Using the [Checkly CLI](/docs/cli/) you can code and configure visual regression and snapshot testing on your local machine
and deploy any changes either directly from your local machine or from your CI/CD pipeline of choice.

In a typical scenario, you would follow the steps below:

1. Create or update a browser check with visual regression or snapshot testing on your local machine.
2. Generate the golden image / reference snapshot(s).
   ```bash
   npx checkly test --update-snapshots
   ```
   The resulting files are stored in a `some-file-prepend.ts-snapshots` folder next to your browser check script.
3. Commit the browser check script and the golden image / reference snapshot(s) to your version control system.
4. Push your code to your CI/CD pipeline.
5. In your CI/CD pipeline, optionally run your checks again. Maybe add the `--record` flag to record the test in 
Checkly.
   ```bash
   npx checkly test --record 
   ```
6. If your tests pass, deploy your checks to production. The CLI will push your snapshot to the
Checkly cloud automatically.
   ```bash
   npx checkly deploy
   ```
   
Learn more about setting up the Checkly CLI for your CI/CD pipeline 👇

{{< markdownpartial "/_shared/main-cicd-cards.md" >}}

## Known limitations

- Checkly currently only supports the Chromium and Chrome browsers.

## Playwright resources

- [The official Playwright guide on visual comparison and snapshot testing](https://playwright.dev/docs/test-snapshots)
- The `.toHaveScreenshot()` [API reference](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1)
- The `.toMatchSnapshot()` [API reference](https://playwright.dev/docs/api/class-snapshotassertions#snapshot-assertions-to-match-snapshot-1)
