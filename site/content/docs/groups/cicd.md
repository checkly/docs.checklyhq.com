---
title: CI/CD
slug: cicd
weight: 3
menu:
  docs:
    parent: "Groups"
---

Triggering a group of checks in your CI/CD pipeline works exactly the same as triggering a single check. 

There are two big differences:

1. We run all the checks in your group. Checkly looks at your **concurrency** setting to determine how many checks we
fire at once.

![Check group concurrency screenshot](/docs/images/groups/group-concurrency.png)

2. The result reported now is an aggregate of all check runs, with individual check results as part of the message, i.e.


## GitHub deployment triggers

We can run your check group whenever GitHub sends out a deployment webhook. Works great with services like 
[Vercel](https://vercel.com) and [Heroku](https://heroku.com).

To get started:
 1. [install the Checkly GitHub app as described here](/docs/cicd/github/)
 2. Link a repo from the **CI/CD** tab in your group
 3. Trigger your first deployment
 
Checkly will run your group and provide a detailed report right in GitHub:

 ![Check group GitHub deployment result screenshot](/docs/images/groups/group-cicd-github.png)

## Command line triggers

On any CI/CD platform, you can just call our API with a dedicated URL and get the results of a group run.
Command line trigger for group work exactly the same as described in our [CI/CD command line trigger documentation](/docs/cicd/trigger/) 

The only difference is the result we send back. Instead of a single object, we return an array of results that details the
name, UUID, response time and failure status of each check in the group.

```
http http://api.checklyhq.com/check-groups/23/trigger/TdzYPsRgKjDa
HTTP/1.1 200 OK
Date: Fri, 21 Feb 2020 20:52:32 GMT
cache-control: no-cache
content-encoding: gzip
content-type: application/json; charset=utf-8
[
    {
        "checkId": "6d6f0bf6-816c-4a41-bc70-418c5bbe85a2",
        "hasFailures": false,
        "name": "Basic Account variable",
        "responseTime": 150.16614899993874
    },
    {
        "checkId": "d02cb412-ebeb-4f10-85f9-d06cc808180a",
        "hasFailures": false,
        "name": "Edit variables in setup",
        "responseTime": 159.08605000004172
    },
    {
        "checkId": "61cbaa9e-65dd-4507-968a-9c99657e09e6",
        "hasFailures": false,
        "name": "Group Teardown Scripts",
        "responseTime": 164.42142400005832
    },
    {
        "checkId": "6e80a371-f96e-4bef-8e9a-fe93cbf65be7",
        "hasFailures": false,
        "name": "Browser check partial",
        "responseTime": 1479
    },
    {
        "checkId": "6608d223-6d84-4bdb-b319-18ec3d1649eb",
        "hasFailures": false,
        "name": "Setup script at check level",
        "responseTime": 593.488227
    },
    {
        "checkId": "e1b0881d-e0c1-4f14-8059-352d06b43f49",
        "hasFailures": false,
        "name": "Basic Account variable + setup + teardown",
        "responseTime": 582.2815929999999
    }
]
```
 
