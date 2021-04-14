---
title: Response time limits
weight: 5
menu:
  docs:
    parent: "API checks"
---

Sometimes an API is just slow, but not broken. We call that "degraded" and you can specify when an API checks should be 
marked as degraded using the simple slider in the API check editor.

![api soft limits and degradation thresholds](/docs/images/api-checks/limits.png)

Using this slider you set two thresholds:

1. The **Degraded at** threshold e.g. 8 seconds.
2. The **Fail at** threshold when we consider the check to be failing due to being too slow, e.g. 20 sec.

The benefit of using the degraded state is that it does not affect your check's success ratio like a failed state does. 

You can enable alerts to be send when an API checks is degraded. This way you are notified of possible problems before things
get out of hand. See [alerting](/docs/alerting) for more details.


> All API checks are hard capped at a timeout of **30 seconds**, this means the **"Fail at"** threshold has a maximum value of 30 seconds.

