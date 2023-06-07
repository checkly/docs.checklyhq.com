---
title: Getting started with Private Locations
weight: 51
slug: /
menu:
  resources:
    parent: "Private Locations"
aliases:
- "/docs/private-locations/private-locations-getting-started/"
- "/docs/private-locations/"
cli: true
---

A Private Location is similar to our existing public locations, but you have control over it. A Private Location can be
in your own segregated network, on-premises or cloud-based. You need one or more Checkly Agents installed in that location/network
with access to your applications.

Checkly checks are configured and scheduled in the Checkly cloud-based web UI or using the CLI as usual, but selecting a Private Location
runs the check on the agent(s) in your infrastructure. **Agents are stateless and ephemeral**. As long as you have at
least one operational Checkly Agent, checks will run in your Private Location. Adding more agents will distribute the load and
improve resilience automatically.

{{< info >}}
You must have the Owner or Admin role on your Checkly account to create Private Locations.
{{< /info >}}

## Requirements

Here are the requirements/questions before you get started:

- Container runtime (we test using Docker, but other OCI-compliant runtimes should work)
- Outbound internet access to https://agent.checklyhq.com (proxy configuration is supported)
- Access to your internal API- or browser-based application
- A Checkly account that you will use for testing Private Locations

## Configuring a Private Location

1. Navigate to the [Private Locations page](https://app.checklyhq.com/private-locations) and click "New private location"

    ![private locations screen](/docs/images/private-locations/pl_started_1.png)

2. Provide a name and icon for the new private location. The ID is automatically generated ID for API access. Click create.

    ![new private location](/docs/images/private-locations/pl_started_2.png)

3. You will receive an API key for the new location. Copy this key and keep it safe as you will need it to add agents to the location, and you won’t be able to see it again.

    ![private location key](/docs/images/private-locations/pl_started_3.png)

4. Start the Checkly agent by running the following command in a terminal, making sure to replace the `API_KEY` with the key you just received.
For more configuration options, check the detailed instructions in the [installing Checkly agent guide](/docs/private-locations/checkly-agent-guide/).

```bash
docker run -e API_KEY="pl_...." -d checkly/agent:latest`
```


5. Refresh the Private Locations page in the Checkly app and you will see a count of the number of running agents.

    ![agent running](/docs/images/private-locations/pl_started_4.png)

6. Create a new API or Browser check as you normally would in Checkly. You will now see your new private location in the list of available locations. Select it and deselect any other locations.

    ![select private location](/docs/images/private-locations/pl_started_5.png)


## Using Private Locations with the CLI

You can configure any check to run on a Private Location by adding the slug name to the `privateLocations` array. For example

```ts
// api.check.ts

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

## Known limitations

- The Checkly Agent currently only supports x86/AMD64 architecture and not ARM64. This means Apple Mac M1 systems are not currently supported.
