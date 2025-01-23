---
title: Organizing checks with groups - Checkly Docs
displayTitle: Organizing checks with groups
navTitle: Overview
weight: 26
slug: /
menu:
  resources:
    parent: "Groups"
    identifier: overview-groups
aliases:
- /docs/groups/

---

Groups allow you to organize your checks and centralize settings like base URLs, headers, variables and other properties
a collection of checks can share. 

Example use cases for groups are organizing your checks around:

- A common URL endpoint
- A specific team
- A specific feature in your app
- A test suite; trigger all checks after a deployment

> Group-level configurations, such as the runtime, activated & muted state, tags, and alert channels, will override check-level configurations. 

## Key features

The screenshot below gives a quick overview of the groups' key features.

![Check group editor screenshot](/docs/images/groups/group-editor.png)

1. **Activate and mute** all checks in a group
2. Configure **shared settings** for all checks in the group
    1. API check defaults like headers, assertions and setup & teardown scripts
    2. Environment variables
    3. Data center locations
    4. Alert setting and alert channels
3. **Run all checks in one go** with a configurable concurrency.
4. Tweak checks in the inline "mini editor" to **quickly build up a group of similar checks**
5. Use a **common base URL** for your API checks
6. **Manage individual checks**, including viewing, editing, and duplicating checks

> [!WARNING]
> Alert settings being controlled at group level means that a check that is part of a group that has no connected alert channels *will not alert*.

## Creating a check group

### Name and tags
Pick a meaningful name for your group. A meaningful name will not only help you and others identify your group within Checkly, but it will help provide a better alerting experience if checks in this group fall into an alert state. Tags can relate your groups together, they also determine which checks are shown on your public [dashboards](/docs/dashboards/).  

### Checks
Add new or existing checks to this group. If you add an existing check, the group configuration will overwrite certain check configurations, like run locations, retries, and alerting. 

For example, if you create a check that runs in `eu-west-1` but then add it to a group running in `us-east-1`, then the group settings will take precedence and overwrite the individual check locations. 

### API checks defaults
You can set [API check defaults](/docs/groups/api-check-defaults/), including request information, [assertions](/docs/api-checks/assertions/), and [setup & teardown scripts](/docs/api-checks/setup-teardown-scripts/), to help manage API checks.

### Variables
For configuration information commonly used by checks in this group, create [group environment variables and secrets](/docs/groups/variables/). When checks are scheduled, these will be merged with environment variables at the check and global levels.

### Scheduling & locations
Pick from our list of [public](/docs/monitoring/global-locations/) locations or from your [private](/docs/private-locations/) ones. This will override the scheduling strategy (i.e. parallel or round-robin) and location settings for checks in this group. 

Checks still run on their own scheduling intervals, but you can specify a default at the group level with the `frequency` property via the [CLI](/docs/cli/constructs-reference/#checkgroup).

### Retries & alerting

Select your preferred [retry strategy](/docs/alerting-and-retries/retries/) for failed checks. This will override retry settings for checks in this group.

You can configure [alert channels](/docs/alerting-and-retries/alert-channels/#managing-alert-channels) for checks in this group. If we don’t provide your preferred alert method, use [webhooks](/docs/alerting-and-retries/webhooks/) to configure your alert flow. Like with retries, this will override alert settings for checks in this group.

> [!WARNING]
> Make sure to select an alert channel, otherwise checks in this group **will not alert**.

> Note that some alerting channels, like [SMS](/docs/alerting-and-retries/sms-delivery/) and [Phone call](/docs/alerting-and-retries/phone-calls/) are only available on our [Team and Enterprise plans](/pricing/#features)

### Testing

You can run checks in this group as [E2E tests](/docs/testing) locally or from your CI/CD pipeline to validate your freshly deployed application. Use the Checkly CLI, or configure integrations with Vercel and GitHub.

### Runtimes

Checkly manages the [runtime](/docs/runtimes) environment for your JavaScript code in browser checks and setup & teardown scripts. If the checks in this group need a runtime different from your account default, you can set that here.

## How we run grouped checks

It helps to understand how we run the checks in a group, specifically if you're doing more sophisticated checks with shared
variables, script and alerting channels. Here are the rules:

1. Checks are scheduled as individual checks, not "as a group".
2. Calling a "group run" using a trigger (either command line or via our GitHub integration) runs all the checks in a group.
3. The group itself does not have an explicit runtime state.
4. There are no results or metrics collected at the group level.
5. Checks in a group still have their individual scheduling settings.

As you can see, groups in their current incarnation are mostly handy configuration buckets for common properties. In the 
future we will expand the group features to make them smarter.
