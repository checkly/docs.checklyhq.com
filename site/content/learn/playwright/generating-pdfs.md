---
title: How to Generate PDFs with Playwright
subTitle: Creating invoices, books and more from a web page
date: 2020-11-19
author: Giovanni Rago
githubUser: ragog
tags:
  - pdf
weight: 2
navTitle: Generating PDFs
menu:
  learn:
    parent: "Basics"
---

Playwright can be used to create PDFs from webpages. This opens up interesting automation scenarios for tasks such as archiving, generating invoices, writing manuals, books and more.

This article introduces this functionality and shows how we can customise the PDF to fit our needs.

<!-- more -->

## Generating a PDF file

After loading a page, we use the `page.pdf()` command to convert it to a PDF.


```ts {hl_lines=[7] title="pdf-minimal.spec.ts"}
{{% readfile filename="samples/playwright/pdf-minimal.spec.ts" %}}
```

Note that we need to pass the `path` option to have the PDF file actually saved to disk.

> ⚠️  This feature is currently only supported in Chromium headless in Playwright.

## Tweaking the result

It is important to take a quick look at the official docs for `page.pdf()` from [Playwright](https://playwright.dev/docs/api/class-page#page-pdf), as it is almost certain that we will want to tweak the appearance of our page in the resulting PDF.

In certain cases, our webpage might look significantly different in our PDF compared to our browser. Depending on the case, it can pay off to experiment with the following:

1. We might need to set option `printBackground` to true in case graphical components appear to be missing in the generated PDF.
2. By default, `page.pdf()` will generate a PDF with adjusted colors for printing. Setting the CSS property `-webkit-print-color-adjust: exact` will force rendering of the original colors.
3. Calling `page.emulateMedia('screen')` changes the CSS media type of the page.
4. Setting either `width` and `height` or `format` to the appropriate value might be needed for the page to be displayed optimally.

## Customising header and footer

We can also have custom headers and footers added to our pages, displaying values such as title, page number and more. Let's see how this looks on your [favourite website](https://www.checklyhq.com/):

```ts {hl_lines=["11-12","19"], title="pdf-hd.spec.ts"}
{{% readfile filename="samples/playwright/pdf-hd.spec.ts" %}}
```

We are including the following template files for our header and footer.

{{< tabs "3" >}}
{{< tab "template-header.html" >}}
```html
<html>
  <head>
    <style type="text/css">
      #header {
        padding: 0;
      }
      .content {
        width: 100%;
        background-color: #777;
        color: white;
        padding: 5px;
        -webkit-print-color-adjust: exact;
        vertical-align: middle;
        font-size: 15px;
        margin-top: 0;
        display: inline-block;
      }
      .title {
        font-weight: bold;
      }
      .date {
        text-align:right;
      }
    </style>
  </head>
  <body>
    <div class="content">
        <span class="title"></span> -
        <span class="date"></span>
        <span class="url"></div>
    </div>
  </body>
</html>
```
{{< /tab >}}
{{< tab "template-footer.html" >}}
```html
<html>
  <head>
    <style type="text/css">
      #footer {
        padding: 0;
      }
      .content-footer {
        width: 100%;
        background-color: #777;
        color: white;
        padding: 5px;
        -webkit-print-color-adjust: exact;
        vertical-align: middle;
        font-size: 15px;
        margin-top: 0;
        display: inline-block;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="content-footer">
      Page <span class="pageNumber"></span> of <span class="totalPages"></span>
    </div>
  </body>
</html>
```
{{< /tab >}}
{{< /tabs >}}

The first page of the generated PDF looks as follows:

![generated pdf example](/samples/images/pdf-generation-hd.png)


Run the above examples as follows:
```bash
npx playwright test generate-pdf.ts
```

## Further considerations

We can easily transform existing web pages into PDF format, just as we have shown in our example. An even more interesting use case is about generating a brand new document: now we can use our existing HTML and CSS skills to produce high-quality PDFs, often eliminating the need for LaTeX or similar tools.

