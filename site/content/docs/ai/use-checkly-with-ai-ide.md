---
title: Using Checkly with AI IDEs and Copilots - Checkly Docs
displayTitle: Use Checkly with AI IDEs & Copilots
navTitle: Use Checkly with AI IDEs & Copilots
weight: 3
menu:
  platform:
    parent: "AI"
---

## Docs

You can index our docs pages in your IDE to leverage better code generation results. Todo so follow the guides for your IDE of choice:

Make sure to index the following url:

```txt
https://checklyhq.com/docs/
```

- [Referencing @docs with Cursor](https://docs.cursor.com/context/@-symbols/@-docs)

At the time of writing this unfortunately no other IDE supports this kind of context enrichment.

## Plain text docs

Every page on our docs site is accessible as a plain markdown file by appending `index.md` to the url, e.g. 
[https://www.checklyhq.com/docs/cli/constructs-reference/index.md](https://www.checklyhq.com/docs/cli/constructs-reference/index.md).

There is also an [`/llms.txt`](https://www.checklyhq.com/llms.txt) at the root of our site which contains all the URLs
of our docs pages in plain text format. You can use this file to index our docs in your AI IDE of choice.

## Custom Rules

We prepared a first set of AI rules which you can use to teach your AI IDE of choice on how to generate code for Checkly.
Go into the root of your IDEs workspace and download the rules according to your IDEs config parameters.
When asking questions about Checkly manually add the download rules files to your prompt.

### GitHub Copilot

{{< tabs "GH Copilot" >}}

{{< tab "Mac and Linux" >}}

```bash
mkdir -p .github && curl -o .github/copilot-instructions.md "https://www.checklyhq.com/docs/ai/checkly.rules.md"
```

{{< /tab >}}

{{< tab "Windows" >}}

```bash
New-Item -ItemType Directory -Path ".github\instructions" -Force
Invoke-WebRequest -Uri "https://www.checklyhq.com/docs/ai/docs/ai/checkly.rules.md" -OutFile ".github\copilot-instructions.md"
```

{{< /tab >}}

{{< /tabs >}}

You can ask Copilot to install the `checkly` NPM package and generate code for API Checks, Browser checks, Multistep checks
and all other constructs.


### Cursor

{{< tabs "Cursor" >}}

{{< tab "Mac and Linux" >}}

```bash
mkdir -p .cursor/rules && curl -o .cursor/rules/checkly.mdc  "https://www.checklyhq.com/docs/ai/checkly.rules.md"
```

Now make sure to add the new `checkly.mdc` file to your context.

You can now ask Cursor to install the `checkly` NPM package and generate code for API Checks, Browser checks, Multistep checks
and all other constructs. Make sure to use the `checkly.mdc` file as context for your questions.

{{< /tab >}}

{{< tab "Windows" >}}
```bash
New-Item -ItemType Directory -Path ".cursor\rules" -Force
Invoke-WebRequest -Uri "https://www.checklyhq.com/docs/ai/checkly.rules.md" -OutFile ".cursor\rules\checkly.mdc"
```
{{< /tab >}}

{{< /tabs >}}

You can now reference the `checkly.mdc` using `@checkly.mdc` file in your Cursor chats and ask it to generate code for
API Checks, Browser checks, Multistep checks and all other constructs.

### Windsurf

{{< tabs "Windsurf" >}}

{{< tab "Mac and Linux" >}}

```bash
mkdir -p .windsurf/rules && curl -o .windsurf/rules/checkly.md "https://www.checklyhq.com/docs/ai/checkly.rules.md"
```
{{< /tab >}}

{{< tab "Windows" >}}

```bash
New-Item -ItemType Directory -Path ".windsurf\rules" -Force
Invoke-WebRequest -Uri "https://www.checklyhq.com/docs/ai/checkly.rules.md" -OutFile ".windsurf\rules\checkly.md"
```
{{< /tab >}}

{{< /tabs >}}

You can now reference the `checkly.md` using `@checkly.md` file in your WindSurf chats and ask it to generate code for 
API Checks, Browser checks, Multistep checks and all other constructs.
