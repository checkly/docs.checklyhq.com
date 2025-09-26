---
title: Pricing & Billing - Checkly Docs
displayTitle: Pricing & Billing
navTitle: Pricing & Billing
weight: 9
menu:
   platform:
    parent: "Monitoring"
---

## Overview

Checkly supports different kinds of checks and monitors which are billed slightly differently depending on their nature:  

- Synthetic checks include: Browser, API, and Multistep. Those checks are billed per check run.
- Uptime Monitors include: URL, TCP, and Heartbeats and are billed per number of monitors. 

## Billing Concepts

Before diving into pricing details, here are key concepts that affect your costs:

- **Check run**: A single execution of a syntehtic check 
- **Parallel scheduling**: Running checks simultaneously from multiple locations
- **Retries**: Automatic re-execution of failed checks
- **Flaky checks**: Checks that fail intermittently due to network issues or timing problems
- **Prepaid check bundles**: Discounted packages of check runs purchased in advance
- **Overages**: Additional charges when you exceed your plan's included Synthetic Check Runs, typically at higher rates than prepaid bundles

## Pricing Table

Refer to our [Pricing page](https://www.checklyhq.com/pricing/) for the most updated check run and monitor prices and packages. If you are on a Checkly Enterprise contract, your checks' base cost might differ substantially from what is shown above. Also please note, overages are charged at an additional rate than committed consumption packages.

When configuring your check frequency and scheduling strategy, the cost helper will estimate the monthly cost for the check. This widget appears in the check configuration interface and automatically calculates costs based on your settings.

![cost helper widget](/docs/images/monitoring/price-helper.png)

## API and Browser Checks

API, as well as browser checks, have a base price per check run. Always refer to our [pricing page](https://www.checklyhq.com/pricing/) for the latest prices. The base cost is typically listed as $X per 1k or 10k check runs.

> **Example:** If a browser check is running once per hour with a cost of $5 per 1000 check runs, the monthly base cost for the check would be $3.65.

If you use features that multiply the number of check runs, such as parallel scheduling and retries, your cost will increase.

### Parallel Scheduling

When a check is running in [parallel](/docs/monitoring/global-locations/#parallel), it will run once on each selected location per execution. If you change a check from using the round-robin scheduling method to running in parallel, be aware that the cost will multiply by the number of locations you have selected.

Balance the number of locations the check is using to ensure you are quickly made aware of potential issues in critical locations without running an unnecessary amount of checks.

> **Example:** Continuing our example from earlier, if we want our browser check to run in parallel from 5 locations, the monthly cost will increase from $3.65 to $18.25.

### Retries

When a check is [retried](/docs/alerting-and-retries/retries/), this counts as a new check run. A flaky check can increase your check run costs above the expected amount. If you have problems with flaky checks, ask [our community](https://www.checklyhq.com/slack/) or our support for tips on how to improve check stability and reduce cost.

> **Example:** If our check from earlier has a 20% retry rate (meaning 20% of check runs fail and trigger a retry), this will increase the cost from $3.65 to $4.38.

## Multistep Checks

[Multistep check](/docs/multistep-checks/) pricing is slightly different from browser and API checks. A Multistep check is billed based on the number of requests done per check run. Each request in a Multistep check run is billed at the same rate as a regular API check run, as they are performing the same basic operation. 

> **Example:** Let's say you have 4 API checks, where each check does one of the `GET`, `POST`, `PUT` and `DELETE` operations towards the same endpoint. If you replace these 4 checks with a single Multistep check that runs 4 requests towards the same endpoint, checking each method, and the check run frequency is the same as before, your cost stays the same.

A Multistep check with 0 requests is billed as if it has 1 request.

### Parallel Scheduling 

When a Multistep check is run in [parallel](/docs/monitoring/global-locations/#parallel), the whole check (with any number of requests) is run from all included locations. That means that the cost is going to equal the number of locations the check is run from multiplied by the number of requests.

### Retries

As a Multistep check is [retried](/docs/alerting-and-retries/retries/) as a whole, the final cost of a retry is based on the number of requests executed multiplied by the number of retries.

## Uptime Monitors

A given set of Uptime Checks are included in the Starter, Team, and Enterprise plans. Users can extend the plan's allowance by adding packages of monitors. Refer to the [pricing page](https://www.checklyhq.com/pricing/) to see uptime monitor packages.  

Uptime monitors include:
- [URL monitors](/docs/http-checks/)
- [TCP monitors](/docs/tcp-checks/)
- [Heartbeat monitors](/docs/heartbeat-checks)
- DNS monitors (Coming up soon)
- ICMP monitors (Coming up soon)

### Parallel Scheduling

Parallel Scheduling on Uptime monitors is limited to Enterprise plans contact our sales team to know more about Enterprise plans. 

### Retries

Retries on Uptime monitors are included in the price and limited to 1 retry per monitor per run.

## Cost Calculator Examples

Here are some common scenarios to help you estimate costs:

### Simple Single-Location Check
- Browser check running every hour (24 times/day, ~720 times/month)
- Base cost: $5 per 1000 runs
- Monthly cost: $3.60

### Multi-Location Parallel Check
- Same browser check running from 5 locations in parallel
- Monthly runs: 720 × 5 = 3,600 runs
- Monthly cost: $18.00

### Check with Retries
- Same single-location check with 15% retry rate
- Monthly runs: 720 + (720 × 0.15) = 828 runs
- Monthly cost: $4.14

### Multistep Check Comparison
- 4 separate API checks vs 1 Multistep check with 4 requests
- Both scenarios: 4 requests × 720 runs = 2,880 requests/month
- Monthly cost: $0.58 (both scenarios are equivalent)

## Cost Optimization Tips

1. **Use round-robin scheduling** instead of parallel when possible to reduce location multipliers
2. **Optimize check frequency** - not all checks need to run every minute
3. **Fix flaky checks** to reduce unnecessary retries
4. **Consolidate related API checks** into Multistep checks when it makes sense
5. **Monitor your usage** regularly through the Checkly dashboard
6. **Consider prepaid bundles** for predictable cost savings

## Quick Reference

| Scenario | Cost Impact |
|----------|-------------|
| Adding a location (parallel) | Multiply by number of locations |
| Adding a retry | +1 additional run per retry |
| Multistep with N requests | N × base API cost |
| Uptime monitor package | $10 per 25 monitors |

## Overages

When you exceed the check runs or monitors included in your plan, you'll be charged for overages at a higher rate than the prepaid bundle pricing. Overage charges apply to:

- **API check runs** beyond your plan's monthly allowance
- **Browser check runs** beyond your plan's monthly allowance  
- **Multistep requests** beyond your plan's monthly allowance

### How Overages Work

Overages are calculated based on your actual usage beyond your plan limits:

- **Hobby Plan**: Hard-capped at 10k API and 1.5k browser check runs - no overages possible, upgrade required
- **Team & Starter Plans**: Overages charged at standard rates for usage beyond plan limits
- **Enterprise Plan**: Custom overage rates negotiated as part of your contract

### Managing Overage Costs

To avoid unexpected overage charges:

1. **Monitor your usage** regularly through the Checkly dashboard
2. **Consider upgrading** your plan if you consistently exceed limits
3. **Optimize check frequency** and locations to stay within limits

> **Note:** Overage rates are typically higher than prepaid bundle rates. For current overage pricing, check the detailed pricing information on our [pricing page](https://www.checklyhq.com/pricing/) or contact our sales team for Enterprise plans.

For Enterprise pricing or volume discounts, contact our sales team through the [pricing page](https://www.checklyhq.com/pricing/).
