---
title: How to monitor for broken links using Playwright and Checkly
displayTitle: How to monitor for broken links using Playwright
description: >-
  Learn how to check for broken links on your webpages with Playwright.
author: Giovanni Rago
avatar: 'images/avatars/giovanni-rago.png'
tags:
  - FAQ
---

## Why you should monitor for broken links.

If your content lives in markdown and is only updated on deployments, checking for broken links in CICD will work out 
fine. But in my experience, this is rarely the case.

Website content often comes from a CMS or results from data stored in a database so that people can change content 
without relying on a developer. And that's great for the team, but it also means that links can change at any time. 
Your site can and will include broken links at any time. 

Will this be a big deal? It depends. But if you consider being in charge of a popular newspaper website, a broken top 
story link on the home page will get someone into trouble.

In this case, you can adopt [synthetic monitoring](https://www.checklyhq.com/product/synthetic-monitoring/), constantly run your Playwright scripts on a schedule, and 
receive alerts when your tests fail. When then someone typoed a broken link into your site, you'll be the first to know about it because you received a timely alert.

![Alt text](/guides/images/checkly-links.avif "a title")
