---
title: Working with selectors
subTitle: Techniques and pointers
date: 2020-06-22
author: Giovanni Rago
githubUser: ragog
tags:
  - basics

weight: 5

menu:
  learn:
    parent: "Getting Started"
---

With Puppeteer and Playwright, as well as with most other UI automation tools, elements on the UI are referenced through element selectors. Becoming proficient in the use of selectors is a hard requirement for writing scripts; an eye for good, solid selectors can make the difference between unstable (or "flaky") high-maintenace script and solid, reliable ones.

This guide aims to get new users started with selectors, and to serve a refresher for more experienced automators. Even though some content will be specific to Puppeteer and Playwright, most principles will apply to most, if not all, UI automation tools.

<!-- more -->

## Different types of selectors

Depending on the tool and the application being tested, different kind of selectors might be available. Puppeteer and Playwright share two main types of selector:

1. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
2. [XPath selectors](https://developer.mozilla.org/en-US/docs/Web/XPath)

In addition, Playwright also supports

1. Text selectors, allowing users to select an element based on its text content
2. Playwright-specific selectors, which are implemented in Playwright directly (and might be unofficial proposed or pseudo-CSS selectors)
3. Chained selectors, in which one selector is run relatively to the previous one(s)

Let's look at each type of selector a little closer.

> Note that Playwright also lets you define [your own selector engine](https://playwright.dev/docs/extensibility#custom-selector-engines).

### CSS selectors

Originally used to target HTML elements for [applying CSS rules](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS), CSS selectors are the go-to for referencing web UI elements across automation tools. Powerful and flexible, they should enable you to reference most, if not all, elements on the page.

Examples:
1. `#add-to-cart` selects the item with id `add-to-cart`, e.g. `<button id="add-to-cart">Buy</button>`
2. `.preview` selects the item with class `preview`, e.g. `<li data-v-5ad54829="" class="preview">...</li>`
3. `.preview .preview-price` selects the item with class `price` within the element with class `preview`
4. `[data-test=login-button]` selects the item with attribute `data-test` equal to `login-button`, e.g. `<button id="btn-login" aria-label="Log in" data-test="login-button">Log in</button>`
5. `a.preview-link` selects the item of type `a` with class `preview-link`, e.g. `<a href="https://example.com/ class="preview-link">Example</a>"`
6. `#navbar > .button-cart` selected the item with class `button-cart` within the item with id `navbar`

> Note that there might be multiple items corresponding to one selector. Make sure you are referencing the right one in your script.

### XPath selectors

XPath was coinceived to reference nodes within an XML document. It can also be used to reference HTML elements, just like CSS. The different ways it can be used to traverse the DOM, as well as its ability to support multiple boolean conditions and reference elements via text content make it a useful backup option for CSS selectors.

Examples:
1. `//button` selects the item of type `button`, e.g. `<button id="btn-signup">Sign up</button>`
2. `//*[@id="add-to-cart"]` selects the item of any type with id `add-to-cart`, e.g. `<a href ="" id="add-to-cart">Buy</a>`
3. `//li/a` selects the item of type `a` which is a child of item of type `li`
4. `//div[3]` selects the third item of type `div`
5. `//button[text()="Submit"]` selects the item of type `button` with text `Submit`
6. `//div[@data-testid="cta" and text()="Configure"]` selects the item of type `div` that has attribute `data-testid` equal to `cta` and contains text `Configure`

### Text selectors

Text selectors allow selecting an element via its text content directly. They are Playwright-specific.

Examples:
1. `text=Add` selects the element containing text `Add`, `add` or similar (case insensitive) 
2. `text="Add to cart"` selects the element containing exactly the text `Add to cart`

### Playwright-specific selectors

Playwright-specific selectors are implemented in Playwright directly, and can fill in the gaps where CSS and XPath selectors might fall short.

Examples:
1. `:nth-match(:text("Details"), 2)` selects the second element containing text `Details`

### Chained selectors

With Playwright, multiple selectors of different types can be combined to reference elements relative to other elements.

Examples:
1. `css=preview >> text=In stock` selects the item with class `preview` and text content `In stock`, `in stock` or similar (case insensitive) 

## Finding selectors

There are different ways one can go about finding a selector for one or more UI elements. Let's take a look at each.

### Looking at the page's source code

Once you know enough about selectors, looking at a page's HTML will be enough to start writing your own. For each page you load in your browser, you will be able to see the source code:

![selectors from page source](/samples/images/selectors-source.png)

### Inspecting the page

You can also use your browser's inspector tool, as found e.g. in the [Chrome Dev Tools](https://developers.google.com/web/tools/chrome-devtools/dom), to highlight elements on the page and see their attributes. 

![getting selectors via the browser inspector](/samples/images/selectors-inspector.png)

In the case of the Chrome DevTools, you can also generate different kinds of selector straight from the Elements tab:

![generate selectors in devtools](/samples/images/selectors-generate.png)

> Auto-generated selectors can be brittle. Always make sure the selectors you end up deploying in your finished scripts [follow best practices](#choosing-selectors).

### Recording scripts

If you are looking to generate an entire script and don't feel like finding selectors for your elements one by one, you can try an automated recording tool, e.g. the open-source [Headless Recorder](https://chrome.google.com/webstore/detail/headless-recorder/djeegiggegleadkkbgopoonhjimgehda).

![record selectors with recorder](/samples/images/selectors-recorder.png)

A recorder will output a script based on a sequence of page interactions in your browser, complete with auto-generated (in most cases CSS) selectors. You will always want to double check the selectors one by one and potentially tweak them to ensure they follow [best practices](#choosing-selectors).

### The Playwright Inspector

The Playwright Inspector's Explore feature can be used to select elements in the browser and generate selectors.

![playwright inspector explore feature](/samples/images/selectors-explore.png)

## Testing selectors

No matter how a selector is obtained, it is always a good idea to test it out on the target page to make sure it works consistently.

Writing scripts in small increments and running after each new selector is introduced is a good way to quickly spot selectors that either do not work or reference a different element from the one we intended.

We can also test our selectors directly in the browser, before touching our script. In the Chrome DevTools, for example, we are able to test CSS selectors using commands such as
1. `document.querySelector(<selector>)`, or its shorter form `$(<selector>)`, which will return the first element matching the specified criteria
2. `querySelectorAll(<selector>)`, or its shorter form `$$(<selector>)`, which will return all the elements matching the specified criteria)

Similarly, we can test XPath selectors using `$x(<selector>)`, which will return all the element matching our criteria.

The Playwright-specific selectors can be tested by running the Playwright Inspector, which will provision a `playwright` object for access in the console. 

![playwright inspector object in console](/samples/images/selectors-pwobject.png)

## Choosing selectors

The CSS selectors you ultimately choose to use in your scripts will determine how much maintenance work will go into your Puppeteer/Playwright scripts over the course of their lifetime. Ideally, you want to have robust selectors in place since the inception of the script to save yourself time and effort going forward.

The attributes of a good selector are:

- **Uniqueness**: the goal is to choose something that will identify the target element, and nothing else; [IDs](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#ID_Selectors) are the natural choice, when available.
- **Stability**: choosing an attribute that is not likely to change over time as the page gets updated lowers the chances that you will need to manually update it.
- **Conciseness**: a short selector is easier to read, understand and possibly replace if it finally breaks.

### Examples of bad selectors

Avoid this kind of selector *whenever possible:*

1. `.A8SBwf > .RNNXgb > .SDkEP > .a4bIc > .gLFyf`
    - not concise
    - likely not stable: class names are auto-generated, they could change rapidly
2. `.g:nth-child(3) > .rc`
    - likely not stable: is the third child of .g always going to be present?
    - likely not unique: is it always going to be the right element?
3. `a[data-v-9a19ef14]`
    - not stable: attribute is [auto-generated](https://vue-loader.vuejs.org/guide/scoped-css.html#scoped-css) and changes between deployments
    - likely not unique: is it always going to be the right element?

### Examples of (potentially) good selectors

The following *might* be good selectors:

1. `#elementId`
    - concise
    - unique, as long as the page contains [valid HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)
    - generally stable
2. `a[data-something=value]`
    - concise
    - unique, as long as `value` is
    - potentially stable, as long as `value` does not change very often
3. `#overlay.close-button`
    - concise
    - unique, as long as only one element has class `.close-button`
    - potentially stable, as long as `.close-button` does not change very often

## Further reading
1. [W3C CSS spec](https://www.w3.org/TR/CSS21/selector.html%23id-selectors) for CSS selectors.
2. [CSS selector intro](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) from Mozilla.
3. [Playwright's selector documentation](https://playwright.dev/docs/selectors)
4. [Using script recorders](/learn/headless/script-recorders)