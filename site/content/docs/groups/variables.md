---
title: Environment variables and secrets at the Group level - Checkly Docs
displayTitle: Environment variables and secrets at the Group level
navTitle: Variables
weight: 29
menu:
  resources:
    parent: "Groups"
    identifier: variables-groups

---

You can set both variables and secrets for a Group of checks.

For browser and multistep checks, you can set variables at the check level. See [browser check variables and secrets](/docs/browser-checks/variables) for more details.

>[!NOTE]
> Secrets are available for [Private Locations](/docs/private-locations/) on agent version `3.3.4` and later. Secrets are available on [CLI](/docs/cli/) version `4.9.0` and later.

> [!WARNING]
> To ensure the integrity of Playwright artifacts (traces, videos and screenshots), the following are not scrubbed, even when saved as secrets: The characters `/` and `*` and the full or partial match of `/artifact/`, `https://`, `http://`, `*********`, and `123`.
> Values of the keys `sha1`, `_sha1`, `pageref`, `downloadsPath`, `tracesDir`, `pageId` and any string that ends with `sha1` will not be scrubbed from the Playwright trace, but will be scrubbed from the general check result.
> Numbers are not scrubbed from the Playwright trace, but from the general check result.

## Variable hierarchy

As checks are scheduled, Checkly merges the check, group and global environment variables into one data set and exposes them
to the runtime environment. During merging, any check variable with the same name as a global or group variable **overrides that variable.**  

Or, in other words: **check** variables trump **group** variables trump **global** variables.  

You can make use of this by providing a default value for a specific variable at the global or group level, but allow 
that variable to be overridden at the group level or check level.
