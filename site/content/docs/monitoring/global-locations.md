---
title: Global locations & scheduling strategies
weight: 3
menu:
  platform:
    parent: "Monitoring"
---
You can configure your run checks to run from an ever growing amount of global locations. Leveraging global infrastructure allows us to measure what the user experience is in different parts of the world.

We use [Amazon Web Services](https://aws.amazon.com) to host our check runner infrastructure and follow the opening of new datacenter locations as close a possible, i.e. if  a new location opens up, Checkly will be there very soon.

Current locations in Checkly are

| Americas                     | Europe/Middle East/Africa | Asia Pacific               |
|------------------------------|---------------------------|----------------------------|
| North Virginia (us-east-1)   | Ireland (eu-west-1)       | Singapore (ap-southeast-1) |
| Ohio (us-east-2)             | Frankfurt (eu-central-1)  | Tokyo (ap-northeast-1)     |
| North California (us-west-1) | London (eu-west-2)        | Osaka (ap-northeast-3)     |
| Oregon (us-west-2)           | Paris (eu-west-3)         | Hong Kong (ap-east-1)      |
| Montreal (ca-central-1)      | Stockholm (eu-north-1)    | Sydney (ap-southeast-2)    |
| São Paulo (sa-east-1)        | Milan (eu-south-1)        | Seoul (ap-northeast-2)     |
|                              | Bahrain (me-south-1)      | Mumbai (ap-south-1)        |
|                              | Cape Town (af-south-1)    | Jakarta (ap-southeast-3)   |

{{< info >}}
Learn more about <a href="/docs/private-locations/private-locations-getting-started/">private locations</a> to monitor your private and segregated applications and APIs.
{{< /info >}}

## Scheduling strategies

Checkly provides two scheduling strategies for running API, Browser or Multistep checks: Round-robin or Parallel scheduling. 
To select a scheduling strategy go to ‘Scheduling and locations’ when creating or editing a check.

### Round-robin

Using round-robin, your check will run on one of the selected locations each time it is scheduled. The next check run will be scheduled on a different location from the list until all locations have been run once, and the check rotates back to the first location in the list.

When using the round-robin strategy you can choose to have retries to run from a random location of the ones selected, or run it from the same location as the first attempt

Use round-robin when the service you are monitoring can be considered available as long as at least one location is available and detecting a regional outage is not critical.

### Parallel

With parallel scheduling, each time the check is scheduled it will run once from each selected location. When running a check in parallel, retries will always be run from the same location as the first attempt.

Use parallel scheduling to reduce detection times for regional outages and reduce time to detect service degradations that impact the customer experience.