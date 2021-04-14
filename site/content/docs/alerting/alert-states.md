---
title: Alert states
weight: 3
menu:
  docs:
    parent: "Alerting"
---

Sending out alert notifications like emails and Slack hooks depends on four factors:

1. The **alert state** of the check, e.g. "passing", "degraded" or "failing".
2. The **transition** between these states.
3. Your **threshold alerting** preferences, e.g. "alert after two failures" or "alert after 5 minutes of failures".
4. Your **notification preferences** per alert channel.

As you can see, 1 and 2 are how Checkly works in the backend; you have no influence on this. But 3 and 4 are user configurable.
We can even add a fifth factor: if the check is muted, no alerts are send out at all.

> Note: Browser checks currently do not have a degraded states.

## Alert states & transitions

The following table shows all states and their transitions. There are some exceptions to some of the more complex states, 
as the history or "vector" of the state transition influences how we alert.

| transition | notification | threshold  | code | notes |
|------------|----------|--------------|-------|-----------|
✅ --> ✅ | None |-|`NO_ALERT`| Nothing to see here, keep moving|   
✅ --> ⚠️ | Degraded | x|`ALERT_DEGRADED`|Send directly, if threshold is *"alert after 1 failure"*|
✅ --> ❌ | Failure  |x |`ALERT_FAILURE`|Send directly, if threshold is *"alert after 1 failure"*|
⚠️ --> ⚠️ | Degraded|x |`ALERT_DEGRADED_REMAIN` |i.e. when threshold is *"alert after 2 failures"* or *"after 5 minutes"*| 
⚠️ --> ✅ | Recovery |-|`ALERT_DEGRADED_RECOVERY`|Send but only if you received a degraded notification before|
⚠️ --> ❌ | Failure |-|`ALERT_DEGRADED_FAILURE`|This is an **escalation**, it overrides any threshold setting. We send this even if you already received degraded notifications| 
❌ --> ❌ | Failure | x|`ALERT_FAILURE_REMAIN` |i.e. when threshold is *"alert after 2 failures"* or *"after 5 minutes"*|
❌ --> ⚠️ | Degraded  |-|`ALERT_FAILURE_DEGRADED`|This is a **deescalation**, it overrides any thresholds settings. We send this even if you already received failure notifications|
❌️ --> ✅ | Recovery |-|`ALERT_RECOVERY`|Send directly|

✅  = passing  
⚠️  = degraded  
❌  = "hard" failing  
