---
title: Frequent debugging challenges
subTitle: todo
date: 2021-07-30
author: Giovanni Rago
githubUser: ragog
tags:
  - debugging

menu:
  learn:
    parent: "Miscellaneous"
---

after debugging lots of scripts for lots of people, you realise you start running into the same issues over and over again. 

Unfortunately, not 1:1 problem:solution, otherwise this would be easy. Oftentimes there can be more than one cause for an error. Sometimes the cause is obvious, sometimes it isn't, and while sometimes it is the obvious one, sometimes it isn't, and that will create some headaches. in most cases, folks will be looking for a solution to the "obvious" cause, while the not-so-obvious one is actually the one - that means you will be trying to solve the wrong problem! here is where people lose a lot of time.

goal of the article is to help people better understand errors and what their causes might be in order to save them time

Element not found
- Obvious: selector is wrong
- Not-so-obvious: Click not going through -> next element is looked for but we are on the wrong page

Wait not “respected”
- Obvious: selector
- Not-so-obvious: element was already in dom, but not visible

Only works some of the time:
- Race condition
- Identify what changes

Script times out
- Obvious: timeouts
- Obvious: bad waiting
- Obvious: too long
- Obvious: not closing browser
- Not so obvious: app slow
- Not so obvious: element not accessible

Empty/ not fully loaded screenshots

target closed
- obvious
- not-so-obvious: prmise issues e.g. foreach wrong usage






{{< tabs "1">}}
{{< tab "Playwright" >}}
```js
const browser = await chromium.launch();

```
{{< /tab >}}
{{< tab "Puppeteer" >}}
 ```js
const browser = await puppeteer.launch();


```
{{< /tab >}}
{{< /tabs >}}

## Automation-resistant UIs


## Further reading
