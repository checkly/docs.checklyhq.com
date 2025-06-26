---
title: Getting started with Private Locations - Checkly Docs
displayTitle: Getting started with Private Locations
navTitle: Overview
weight: 51
slug: /
menu:
  resources:
    parent: "Private Locations"
aliases:
- "/docs/private-locations/private-locations-getting-started/"
- "/docs/private-locations/"

---

A Private Location is a monitoring location that you manage by simply deploying a lightweight Checkly Agent.

Running a check from a Private Location allows you to:

- **Monitor internal systems**: Test the performance and reliability of applications and APIs that are only accessible from within your network (e.g., development environments, intranet tools)

- **Test from anywhere**: Test the performance and reliability of applications and APIs from different parts of the world. Install your Checkly Agent(s) for location-based performance insights, that we don't cover with our [Global Locations](/docs/monitoring/global-locations/)

Configure your checks to use your Private Location and that's it. As long as you have at least one operational Checkly Agent, checks will run in your Private Location. [Adding more agents](/docs/private-locations/scaling-and-redundancy/) will distribute the load and improve resilience automatically.

> Your Checkly user account must be either an **Owner** or **Admin** to create Private Locations.

## Requirements

Here are the requirements before you get started:

- A container runtime (we test using Docker, but other runtimes should work)
- Outbound internet access for the Agent to https://agent.checklyhq.com (proxy configuration is supported)
- Access to your API or browser-based applications and services from the Private Location network

## Configuring a Private Location

1. Navigate to the [Private Locations page](https://app.checklyhq.com/private-locations) and click "New private location"

    ![private locations screen](/docs/images/private-locations/pl_started_1.png)

2. Provide a name and icon for the new private location. The ID is automatically generated ID for API access. Click create.

    ![new private location](/docs/images/private-locations/pl_started_2.png)

3. You will receive an API key for the new location. Copy this key and keep it safe as you will need it to add agents to the location, and you won’t be able to see it again.

    ![private location key](/docs/images/private-locations/pl_started_3.png)

4. Start the Checkly agent by running the following command in a terminal, making sure to replace the `API_KEY` with the key you just received.
For more configuration options, check the detailed instructions in the [installing Checkly agent guide](/docs/private-locations/checkly-agent-configuration/).

```bash
docker run -e API_KEY="pl_...." -d checkly/agent:latest
```


5. Refresh the Private Locations page in the Checkly app and you will see a count of the number of running agents.

    ![agent running](/docs/images/private-locations/pl_started_4.png)

6. Create a new check as you normally would in Checkly. You will now see your new private location in the list of available locations. Select it and deselect any other locations.

    ![select private location](/docs/images/private-locations/pl_started_5.png)


## Using Private Locations with the CLI

You can configure any check to run on a Private Location by adding the slug name to the `privateLocations` array. For example

```ts {title="api.check.ts"}
import { ApiCheck } from 'checkly/constructs'

new ApiCheck('hello-api-1', {
  name: 'Hello API',
  activated: true,
  maxResponseTime: 10000,
  degradedResponseTime: 5000,
  privateLocations: ['blairs-private-network'],
  request: {
    method: 'GET',
    url: ' https://checklyhq.com.org/',
  }
})
```

## Unavailable private locations

If a private location has had no Checkly agents connected for more than 10 minutes, it will be flagged as unavailable. Checkly will email account owners and admins that the location has become unavailable.

While a location is unavailable, no checks will be scheduled to run on it. When a location becomes available, check scheduling and execution will resume automatically.

## Using Playwright Check Suites in private locations

We recommend to update the Checkly agent regularly. However, [Playwright Check Suites](/docs/playwright-checks/) are available in private locations since Checkly Agent `6.0.3`.

Please use a minimum container size of 2 CPU cores and 4 GB of RAM when running Playwright Check Suites.
