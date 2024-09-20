---
title: Environment variables and secrets
weight: 29
menu:
  resources:
    parent: "Groups"
    identifier: variables-groups
cli: true
---

You can set both variables and secrets for a Group of checks.

For browser and multistep checks, you can set variables at the check level. See [browser check variables and secrets](/docs/browser-checks/variables) for more details.

## Variable hierarchy

As checks are scheduled, Checkly merges the check, group and global environment variables into one data set and exposes them
to the runtime environment. During merging, any check variable with the same name as a global or group variable **overrides that variable.**  

Or, in other words: **check** variables trump **group** variables trump **global** variables.  

You can make use of this by providing a default value for a specific variable at the global or group level, but allow 
that variable to be overridden at the group level or check level.
