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

Groups help you organize your checks (e.g. by team or feature) and apply shared configuration such as API defaults, scheduling & location overrides, and other properties.

![Check group screenshot](/docs/images/groups/group-in-dashboard.png)

## Creating a check group

By default, newly created check groups behave like folders, with no [group-level configuration](#group-level-configuration) applied. To get started:

* **Define a name:** Pick a meaningful name for your group. It helps you and your team identify the group in Checkly and in alerts triggered by failures.

* **Add tags (optional)**: Tags help you relate groups to one another and also determine which checks appear on your [dashboards](/docs/dashboards/).

You can populate a group by moving existing checks into it or by creating new checks directly within the group.

## Group level configuration

Groups let you apply shared configuration to standardize how checks behave. Below is a breakdown of each setting and how it affects checks in the group:

### API checks defaults

You can define [API check defaults](/docs/groups/api-check-defaults/) such as a common base URL, request information, [assertions](/docs/api-checks/assertions/), and [setup & teardown scripts](/docs/api-checks/setup-teardown-scripts/) to manage API checks in your group at scale.

### Variables

For configuration information commonly used by checks in your group, create [group environment variables and secrets](/docs/groups/variables/). These are merged with variables at the global and check levels when a check runs.

### Scheduling & locations overrides

* **Locations:** Select [public](/docs/monitoring/global-locations/) or [private](/docs/private-locations/) locations. This will override the location setting for all checks in your group. For example, if you create a check that runs in `eu-west-1` but add it to a group running in `us-east-1`, the check will run from `us-east-1` only.

* **Scheduling strategy:** Selecting a [scheduling strategy](/docs/monitoring/global-locations/#scheduling-strategies) will override this setting for all checks in your group. For example, if you create a check that runs in `parallel` but add it to a group running in `round-robin`, the check will run in `round-robin` only.

* **Frequency:** Each check in your group runs at its own scheduling interval. However, you can specify a default at the group level with the `frequency` property via the [CLI](/docs/cli/constructs-reference/#checkgroup).

### Retries & alerting overrides

* **Retries:** Select your preferred [retry strategy](/docs/alerting-and-retries/retries/) for failed checks. This will override retry settings for all checks in your group. For example, if you create a check that runs with `fixed` retries but add it to a group running with `linear` retries, the check will run with `linear` retries only.

* **Alert settings:** You can configure [alert channels](/docs/alerting-and-retries/alert-channels) for checks in your group. If we don’t provide your preferred alert method, use [webhooks](/docs/alerting-and-retries/webhooks/) to configure your alert flow. Like with retries, this will override alert settings for checks in your group.

> [!WARNING]
> Make sure to select an alert channel, otherwise checks in this group *will not alert*.

### Testing

You can run checks in this group as [E2E tests](/docs/testing) locally or from your CI/CD pipeline to validate your freshly deployed application. Use the Checkly CLI, or configure integrations with Vercel and GitHub.

### Runtimes

Checkly manages the [runtime](/docs/runtimes) environment for your JavaScript code in browser checks and setup & teardown scripts. If the checks in this group need a runtime different from your account default, you can set that here.

## Adding or removing checks from groups

* **Moving a check into a group:** If the group has [group-level configuration](#group-level-configuration) defined, adding a check may change how it runs. Settings like API defaults, locations & scheduling, or retries & alerting can override or append to the check’s configuration.

* **Removing check from group:** Any [group-level configuration](#group-level-configuration) will no longer apply, and the check will use its own configuration going forward.

> [!WARNING]
> To prevent issues (e.g. broken references to group variables), the check will be automatically deactivated after being added to or removed from a group. Make sure to review its settings before reactivating.

## How we run grouped checks

It helps to understand how we run the checks in a group, specifically if you're doing more sophisticated checks with shared
variables, script and alerting channels. Here are the rules:

1. Checks are scheduled as individual checks, not "as a group".
2. Calling a "group run" using a trigger (either command line or via our GitHub integration) runs all the checks in a group.
3. The group itself does not have an explicit runtime state.
4. There are no results or metrics collected at the group level.
5. Checks in a group still have their individual scheduling settings.

As you can see, groups in their current incarnation are mostly handy configuration buckets for common properties. In the future we will expand the group features to make them smarter.

## Troubleshoot validation

Group validation ensures that all checks within a group can support the selected configuration settings. Since uptime monitors and synthetic checks have different feature limitations based on your plan tier, Checkly validates group settings against the lowest common denominator of supported features to prevent configuration conflicts.

Learn how to [resolve validation errors](/docs/groups/troubleshoot/) when configuring Groups with mixed check types.
