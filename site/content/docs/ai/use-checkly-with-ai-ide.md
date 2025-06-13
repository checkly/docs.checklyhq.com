---
title: Using Checkly with AI IDEs and Copilots - Checkly Docs
displayTitle: Use Checkly with AI IDEs & Copilots
navTitle: Use Checkly with AI IDEs & Copilots
weight: 3
beta: true
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

- [Cursor](https://docs.cursor.com/context/@-symbols/@-docs)

At the time of writing this unfortunately no other IDE supports this kind of context enrichment.

## Custom Rules

We prepared a first set of ai rules which you can use to teach your AI IDE of choice on how to generate code for Checkly.

Go into the root of your IDEs workspace and download the rules according to your IDEs config parameters.

When asking questions about Checkly manually add the download rules files to your prompt.

### GitHub Copilot

Windows

```powershell
New-Item -ItemType Directory -Path ".github\instructions" -Force
Invoke-WebRequest -Uri "https://www.checklyhq.com/docs/ai/docs/ai/checkly.rules.md" -OutFile ".github\instructions\checkly-api-check.md"
```

Mac and Linux

```bash
mkdir -p .github/instructions && curl -o .github/instructions/checkly-api-check.md "https://www.checklyhq.com/docs/ai/checkly.rules.md"
```

### Cursor

Windows

```powershell
New-Item -ItemType Directory -Path ".cursor\rules" -Force
Invoke-WebRequest -Uri "https://www.checklyhq.com/docs/ai/checkly.rules.md" -OutFile ".cursor\rules\checkly-api-check.mdc"
```

Mac and Linux

```bash
mkdir -p .cursor/rules && curl -o .cursor/rules/checkly-api-check.md  "https://www.checklyhq.com/docs/ai/checkly.rules.md"
```

## Windsurf

Windows

```powershell
New-Item -ItemType Directory -Path ".windsurf\rules" -Force
Invoke-WebRequest -Uri "https://www.checklyhq.com/docs/ai/checkly-api-check.md" -OutFile ".windsurf\rules\checkly-api-check.md"
```

Mac and Linux

```bash
mkdir -p .windsurf/rules && curl -o .windsurf/rules/checkly-api-check.md "https://www.checklyhq.com/docs/ai/checkly.rules.md"
```
