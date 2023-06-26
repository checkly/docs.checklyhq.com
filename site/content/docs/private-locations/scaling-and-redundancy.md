---
title: Scaling and Redundancy
weight: 55
menu:
  resources:
    parent: "Private Locations"
cli: true
---

At least two running Checkly Agents per Private Location are recommended for redundancy. Agents are stateless and can be scaled horizontally as needed. You can add additional agents to a location at any time and remove them
as necessary.

If one Checkly Agent fails, the other agents in the same Private Location will continue to run the checks assigned to that location. Even checks that are currently in progress on an agent that fails will be rerun by another agent after a timeout period of 140 seconds.

There are two cases where checks assigned to a location could fail to run:

1. All the agents in the Private Location have failed.
2. There is insufficient agent capacity in the Private Location.

**Checks will stay queued for 6 minutes** waiting for an available agent. If there are no agents available or the available
agents are so busy that they cannot process all the pending checks in that timeframe, the pending checks older than 6 minutes will be lost.

Agents can be scaled up and scaled out. Scaling up means adding additional CPU and memory allocations to existing agent
containers. Scaling out means adding additional agent containers.

## Scale up

Scaling up of individual agents is generally memory-constrained. For reference, a Browser check requires about
1.5GB of RAM and an API check requires about 150MB. The number of concurrent checks allowed to run on a single agent is
controlled by the `JOB_CONCURRENCY` environment variable which defaults to 1 and can be increased to 10. We do not
automatically separate browser and API checks on an agent. If you are running only Browser checks or a combination of
browser and API checks in a Private Location, the formula (rounded down) is:

`JOB_CONCURRENCY = Container memory allocation (GB) / 1.5`

For example: if your container has 8GB of memory allocated, you should set `JOB_CONCURRENCY` to 5 (8GB / 1.5GB per check).

If your Private Location is only running API checks:

`JOB_CONCURRENCY = Container memory allocation (GB) / 0.15`

For example: if your container has 1GB of memory allocated, you should set `JOB_CONCURRENCY` to 6 (1GB / 0.15GB per API check).
With 1.5GB of memory you can set `JOB_CONCURRENCY` to the maximum value of 10.

## Scale out

To determine the number of agents you need in a Private Location you first need to know the number of checks assigned to
the location and their frequency. API checks can be scheduled as frequently as every 10 seconds and Browser checks as
frequently as every 1 minute.

Based on your configuration, you should be able to estimate how many checks will run per minute in your Private Location.
API checks have a maximum running time of 30 seconds, Browser checks 2 minutes. This means that in the worst case scenario,
a checkly agent with a `JOB_CONCURRENCY` of 1 can run two API checks per minute, or 1 Browser checks per 2 minutes.
In an average configuration this will be higher and API checks are generally faster than Browser checks.

Once you have an idea of how many checks will be running and you know the per-agent `JOB_CONCURRENCY` limit based on the
agent container memory allocation, you can estimate the number of agents required as

`agents = ((Checks per minute * average check duration in minutes) / JOB_CONCURRENCY) + 1`

- Lower `JOB_CONCURRENCY`, more agents.
- More checks per minute, more agents.
- Longer average check duration in minutes, more agents. I.e. if your estimate is checks run on average for 30 seconds, you plug in `0.5`.
- The `+ 1` is to ensure redundant capacity in case of rolling upgrades or an agent failure.

Let's look at an example:

1. `JOB_CONCURRENCY = 4`
2. I expected `35` checks per minute
3. Checks will take on average 25 seconds. This is ~`0.42` minutes.

This means my estimated number of agents is `((35 * 0.42) / 4) + 1 = 4.675` or rounded up 5 agents.
