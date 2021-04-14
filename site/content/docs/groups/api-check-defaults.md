---
title: API check defaults
weight: 2
menu:
  docs:
    parent: "Groups"
---

Using a set of shared defaults for API checks helps you manage checks that go to the same basic 
endpoint, share headers and other settings. 

## HTTP request defaults

You can set defaults for many aspects of an API request, see the separate paragraphs below. The following properties are
still controlled at the check level:

- HTTP method & body
- response time limits 

### Base URL

Use the **base url** to define the shared protocol, domain and path for URLs in your group's API checks. This works
as follows:

1. Set the base URL, i.e. `https://api.example.com/v1`
2. The base URL is now available in the `{{GROUP_BASE_URL}}` variable
3. In your API check, append path and query params, i.e. `{{GROUP_BASE_URL}}/customers?page=1` 

### Headers & query parameters

Any headers and query parameters defined in the API check defaults are injected into each API check.

{{<info >}}

Headers and query parameters at the check level override those at the group level with the same name.

{{</info >}}

An example:

1. At the group level, you define the header `X-Custom:` with value `123`
2. At the API check level, you define the same header `X-Custom` just with the value `abc`
3. Checkly will call your API with the `X-Custom: abc` header 

### Basic Auth

Use the basic auth username and password to inject it into each API check in the group.

## Assertions

Any [assertions](/docs/api-checks/assertions/) are injected into each API check's assertion list. Use this to always 
assert common response codes or headers for your API checks.

## Setup & teardown scripts

You can add [setup and teardown scripts](/docs/api-checks/setup-teardown-scripts/) at the group level as well as the 
individual group level. 

This is the execution flow:

1. Group level setup script
2. Check level setup script
3. **Execute your API check**
4. Check level teardown script
5. Group level teardown script

A common scenario for having two levels of setup scripts is the following:

1. Group level setup: Fetch a token from a common authentication endpoint.
2. Check level: prep some specific test data for this individual check.


 
