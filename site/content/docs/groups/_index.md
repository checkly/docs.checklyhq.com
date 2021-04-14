---
title: Overview
weight: 1
menu:
  docs:
    parent: "Groups"
    identifier: overview-groups
---

Groups allow you to organize your checks and centralize settings like base URL's, headers, variables and other properties
a collection of checks can share. 

Example use cases for groups are organizing your checks around:

- A common URL endpoint
- A specific team
- A specific feature in your app
- A test suite; trigger all checks after a deployment

## Key features

The screenshot below gives a quick overview of the groups' key features.

![Check group editor screenshot](/docs/images/groups/group-editor.png)

1. **Activate and mute** all checks in a group
2. Configure **shared settings** for all checks in the group
    1. API check defaults like headers, assertions and setup & teardown scripts
    2. Environment variables
    3. Data center locations
    4. Alert setting and alert channels
    5. CI/CD triggers
3. **Run all checks in one go** with a configurable concurrency.
4. Tweak checks in the inline "mini editor" to **quickly build up a group of similar checks**
5. Use a **common base URL** for your API checks      

## How we run grouped checks

It helps to understand how we run the checks in a group, specifically if you're doing more sophisticated checks with shared
variables, script and alerting channels. Here are the rules:

1. Check are scheduled as individual checks, not "as a group".
2. Calling a "group run" using a trigger (either command line or via our GitHub integration) runs all the checks in a group.
3. The group itself does not have an explicit runtime state.
4. There are no results or metrics collected at the group level.
5. Checks in a group still have their individual scheduling settings.

As you can see, groups in their current incarnation are mostly handy configuration buckets for common properties. In the 
future we will expand the group features to make them smarter.
