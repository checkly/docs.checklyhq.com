---
title: Automating Check Steps for Developers
displayTitle: Involve Every Developer in Monitoring with Automated Setup
description: >-
  When we enable developers to create page or API monitors, we want to automate as much of the code writing process as possible, so that developers can test the functionality they care about without getting bogged down in setup steps.
author: Nočnica Mellifera
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - FAQ
---
## To involve developers in monitoring, you need to make it easy

[Insert some more 'why' here]

This guide will tie together material from our Playwright Learn articles, our blog, and our tutorial videos, to help you create an environment for developers that makes it easy for them to add new page checks with minimal repetitive code. We'll cover:

{{ .TableOfContents }}

* The Checkly CLI and Monitoring as Code for developers
* Creating standardized configuration for checks and groups of checks
* Automating repeated tasks like account logins so the code can be re-used in multiple checks
* Adding standardized code that runs with every check
* Standard code for ignoring elements
* Golden Files - creating and updating comparison files

## The Checkly CLI and Monitoring as Code for developers


## Grouping Checks and Standardizing Configuration

It's a great feature of Checkly that any check can have totally custom settings for every aspect of its running: it can run at a custom cadence, from its own geography, with its own logic for retries. This means that if, for example, you're creating a new test specifically to check localization settings, you can set just that check to run from dozens of geographies, even if most checks only need three or four.

Of course, we don't want to give our fresh developer over a dozen settings that she needs to set just to create her first check. New Checks created 