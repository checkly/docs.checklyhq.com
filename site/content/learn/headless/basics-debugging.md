---
title: Debugging scripts
subTitle: How to go about fixing what is not working
date: 2021-07-26
author: Giovanni Rago
githubUser: ragog
tags:
  - debugging

menu:
  learn:
    parent: "Getting Started"
---

Understanding why a script does not work as expected, or just what the root cause of a failure is, is a key skill for automation. Given its importance and its sometimes deceptive complexity, debugging is a topic that should receive quite some attention. 

This article will explore a few basic concepts and tools to point beginners in the right way.

<!-- more -->


## Awareness before tooling

Script debugging is firstly about observing and understanding. Finding out what is causing the failure (or misbehaviour) in your execution heavily depends on your knowledge of:

1. What the script you are looking at is _supposed_ to do
2. How the application the script is running against is supposed to behave at each step of the script

When approaching a debugging session, make sure the above points are taken care of. Skipping this step is way more likely to cost you additional time than it is to save you any. Do not fall into the easy trap of reading the error message and immediately jumping to conclusions.

Note that the two points above are not obvious:
* You might have not written the script, or you might have done so long ago. Which is why it is important to have scripts which are [short and easy to understand]().
* You might only have limited understanding of what goes on under the hood of the app. Which is why I urge you to always challenge yourself and learn more about it, even if the technical depth of it might be intimidating and your job description might not call for it.

## 









I see many beginner users jump too soon into attacking the more obvious/direct possible cause of the issue.

They end up trying to solve the wrong problem. 

A practical example from my day-to-day experience: a pop-up/modal (think a cookie usage notice) will come up unexpectedly for a user and cause an element in the script to not be found or not to be interactable... the script fails.

In such cases, I often see folks treat the error as if it existed in a vacuum and assume something must be wrong with the element or the element query.

But in many cases that is not the reason for the failure.

Pausing and zooming out would help the user realise the unexpected pop-up is blocking the UI element and should instead be at the center of the changes. Once it is dismissed, the element is found and the script runs just fine.

The failure was in the context, not the element.






debugging without additional tools: sometimes commenting out the right amount of code will already give you a good idea of what is going wrong


headful + slowmo

devtools elements + console + network

inspector
