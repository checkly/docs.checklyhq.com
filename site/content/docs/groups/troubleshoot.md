---
title: Troubleshoot validation of Group - Checkly Docs
displayTitle: Troubleshoot validation of Group
navTitle: Troubleshoot
weight: 30
menu:
  resources:
    parent: "Groups"
    identifier: troubleshoot-groups

---

Groups in Checkly allow you to apply shared settings like API check defaults, scheduling strategy, locations, retries, and alerting across multiple checks. However, uptime monitors (TCP, URL, HTTP) and synthetic checks (Browser, API, Multi-step) don't always support the same features, which can lead to validation errors when mixing check types or using certain configurations on specific [plan tiers](https://www.checklyhq.com/pricing/).

## Understanding Group Validation Rules

When configuring groups, Checkly validates that all checks within the group can support the selected settings. The validation rules depend on your plan tier and the types of checks in your group.

### Group Types and Validation

**Synthetic-only groups:** All group overrides are available (same functionality as today).

**Monitor-only groups:** Overrides are limited by your plan type. For example, only round-robin scheduling and limited retry options may be available.

**Mixed groups (Synthetics & Monitors):** Only monitor overrides are allowed (lowest common denominator).

> [!WARNING]
> By default, all overrides are shown if a group is created without any checks.
>
> If you set scheduling or retry overrides before adding checks, this initializes the group as either synthetic-only or monitor-only. If features like parallel runs or advanced retries are selected, monitors cannot be added to the group.

## Affected Properties by Plan Tier

The following table shows which group properties are supported by different check types across plan tiers:

| Group Property | Check Type | Hobby | Starter | Team | Enterprise |
|---|---|---|---|---|---|
| **Scheduling Strategy** | *Uptime* | Round robin | Round robin | Round robin | Round robin & Parallel |
| | *Synthetics* | Round robin & Parallel | Round robin & Parallel | Round robin & Parallel | Round robin & Parallel |
| **Retries** | *Uptime* | No retries | No retries | 1 retry | Full retries |
| | *Synthetics* | Full retries | Full retries | Full retries | Full retries |
| **Locations** | *Uptime* | 4 locations | 4 locations | 22 locations | 22 locations |
| | *Synthetics* | 4 locations | 4 locations | 22 locations | 22 locations |
| **Private Locations** | *Uptime* | No | No | Yes | Yes |
| | *Synthetics* | No | No | Yes | Yes |
| **Setup & Teardown** | *Uptime (HTTP)* | No | No | No | No |
| | *Synthetics (API)* | Yes | Yes | Yes | Yes |

## Common Validation Errors

### Scheduling Strategy Conflicts

**Error:** "Parallel scheduling is not supported for uptime monitors on your current plan."

**Solution:**

- If your group contains uptime monitors and you're on a Hobby, Starter, or Team plan, change the scheduling strategy to "Round robin"
- Alternatively, separate uptime monitors into a different group
- Upgrade to Enterprise plan

### Retry Configuration Conflicts

**Error:** "Advanced retry settings are not supported for uptime monitors on your current plan."

**Solution:**

- On Hobby and Starter plans: Remove retry configuration for groups containing uptime monitors
- On Team plans: Limit retries to 1 for groups containing uptime monitors
- Alternatively, separate uptime monitors into a different group
- Upgrade to Enterprise plan

### Location and Private Location Restrictions

**Error:** "Some of the selected locations are not available on your current plan."

**Solution:**

- Ensure you're only using locations available on your plan tier
- Upgrade to Team or Enterprise plan

**Error:** "Private locations are not supported on your current plan."

**Solution:**

- Upgrade to Team or Enterprise plan

## Resolving Validation Errors

### For New Groups

When creating a new group, validation occurs in real-time. If you encounter errors:

1. [**Check your plan tier**](https://app.checklyhq.com/settings/account/billing) and review the [supported features table](/docs/groups/troubleshoot/#affected-properties-by-plan-tier) above
2. **Consider the check types** you plan to add to the group
3. **Adjust group settings** to match the lowest common denominator of supported features
4. **Separate check types** into different groups if you need advanced features for synthetic checks

### For Existing Groups

Existing groups that have invalid rules will show errors when you attempt to save changes. To resolve these issues:

1. **Review the specific error message** to identify the conflicting setting
2. **Update group configuration** to use only supported features for your plan and check types
3. **Move checks to separate groups** if you need different configurations for different check types

> [!WARNING]
> When downgrading your plan (e.g., from Team to Starter), existing groups with advanced features will show validation errors. You'll need to update the group configuration to match your new plan's limitations before you can save any changes.

## API Check Defaults

API check defaults defined at the group level (including request config, assertions, and setup/teardown scripts) are only applied to API checks within the group. These settings don't apply to URL monitors, even if some properties like base URL or status code assertions could technically be used.

If you need similar defaults for URL monitors, consider creating separate groups or configure these settings individually at the check level.

## Best Practices

To avoid validation issues:

- **Plan your group structure** based on check types and required features
- **Use separate groups** for uptime monitors and synthetic checks if you need advanced features
- **Start with basic configurations** and add advanced features only when all checks in the group support them
- **Review plan limitations** before configuring group overrides
- **Test group settings** with a single check before adding multiple checks to the group