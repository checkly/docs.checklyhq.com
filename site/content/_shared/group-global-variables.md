---
sitemapExclude: true
---

Group variables are added on the Variables tab in a group. The variables stored here are accessible only in the group context.

![set group environment variable](/shared/images/group-environment-variables.png)

Global variables are added on the Variables tab. The variables stored here are globally accessible throughout Checkly.

![set global environment variable](/shared/images/global-environment-variables.png)

All variables are stored as string values. For environment variables specifically, you can click the lock icon to hide the value from all read-only users. Any data you “lock” is encrypted at rest and in flight on our back end and is only decrypted when needed. Secrets are never visible for any user, and are always encrypted.