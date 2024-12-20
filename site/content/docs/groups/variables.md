---
title: Environment variables and secrets at the Group level - Checkly Docs
displayTitle: Environment variables and secrets at the Group level
navTitle: Variables
weight: 29
menu:
  resources:
    parent: "Groups"
    identifier: variables-groups
cli: true
---

You can set both variables and secrets for a Group of checks.

For browser and multistep checks, you can set variables at the check level. See [browser check variables and secrets](/docs/browser-checks/variables) for more details.

>[!WARNING]
> Note that for browser checks, secrets are only hidden in the Checkly native UI, not in any generated Playwright artifacts, such as Traces, Screenshots or Videos.

>[!NOTE]
> Secrets are available for [Private Locations](/docs/private-locations/) on agent version `3.3.4` and later. Secrets are available on [CLI](/docs/cli/) version `4.9.0` and later.

## Variable hierarchy

As checks are scheduled, Checkly merges the check, group and global environment variables into one data set and exposes them
to the runtime environment. During merging, any check variable with the same name as a global or group variable **overrides that variable.**  

Or, in other words: **check** variables trump **group** variables trump **global** variables.  

You can make use of this by providing a default value for a specific variable at the global or group level, but allow 
that variable to be overridden at the group level or check level.
