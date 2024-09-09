---
sitemapExclude: true
---

Add Group variables on the Variables tab in a check group. Group variables are only accessible in the context of a group, which includes the checks within the group and their configuration.

![set group environment variable](/shared/images/group-environment-variables.png)

Add Global variables clicking "Global variables" on the left-side menu. Global variables are available throughout Checkly, that includes checks, tests, and global configuration options.

![set global environment variable](/shared/images/global-environment-variables.png)

By default, all variables are stored as string values. When using variables, you can click the lock icon to hide the value from all read-only users. Any data you “lock” is encrypted at REST and in flight on our back end and is only decrypted when needed. 

Secrets are never visible for any user, and are always encrypted.