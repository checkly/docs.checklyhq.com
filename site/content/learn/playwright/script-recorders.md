---
title: Using Script Recorders with Playwright
subTitle: Generating scripts for beginners and pros
date: 2020-09-16
author: Hannes Lenke
githubUser: hlenke
tags:
  - script generation
weight: 7
navTitle: Script recorders
menu:
  learn:
    parent: "Best practices"
---

With Playwright, writing scripts manually is not the only option. Since browser automation became possible, there have always been tools trying to simplify script creation. Such instruments aim to help users with little or no scripting skills use automation tools, while also saving more expert users time when creating brand new scripts.

Recorders can be used to quickly generate code for a scenario, saving time users would otherwise have to spend inspecting the various pages to find valid selectors. When creating multiple scripts, this adds up to a noticeable amount of time saved.

## How to record automation scripts with Playwright

### Record Playwright scripts with `codegen`

Playwright provides multiple ways to record browser automation scripts. The recommended approach is to leverage [the built-in `codegen` command](https://playwright.dev/docs/codegen-intro#running-codegen).

![Playwright codegen example](/samples/images/playwright-codegen.jpg)

{{< info >}}
Pro tip: if you're using [the Playwright VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright#record-new-tests), you can also record and run scripts in your editor.
{{< /info >}}


## Using recorders effectively

Regardless of your chosen approach, you will want to inspect the output scripts to make sure they are doing what you need them to in the fastest and most reliable way possible.

Double-check the newly created scripts and tweak it when necessary, especially keeping an eye out for:

1. Selectors, which should be in line with common [best practices](/learn/playwright/selectors/).
2. [Waits](/learn/playwright/navigation/), which should ensure the right element is present and/or ready for interaction at the right time; also, make sure you get rid of unnecessary waits.
3. Any sort of needless duplication.

## Takeaways

1. Recorders are a powerful tool to speed up script creation.
2. Recorded scripts should always be inspected and possibly tweaked to ensure correctness and efficiency.
3. Script maintenance is still required after scripts have been recorded.

## Further reading

1. [Playwright Codegen](https://playwright.dev/docs/codegen-intro#running-codegen) documentation.
