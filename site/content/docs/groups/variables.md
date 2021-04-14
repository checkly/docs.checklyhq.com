---
title: Environment variables
weight: 3
menu:
  docs:
    parent: "Groups"
    identifier: variables-groups    
---

Similar to setting variables at the account level, you can set variables at the group level. For browser checks, you can 
even set variables at the check level! 

## Variable hierarchy

As checks are scheduled, Checkly merges the check, group and global environment variables into one data set and exposes them
to the runtime environment. During merging, any check variable with the same name as a global or group variable **overrides that variable.**  

Or in another words:

> **check** variables trump **group** variables trump **global** variables.  

You can make use of this by providing a default value for a specific variable at the global or group level, but allow 
that variable to be overridden at the group level or check level.


