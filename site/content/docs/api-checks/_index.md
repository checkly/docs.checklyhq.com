---
title: Getting started with API checks - Checkly Docs
displayTitle: Getting started with API checks
navTitle: Overview
weight: 7
slug: /
menu:
  resources:
    parent: "API checks"
    identifier: overview-api-checks
aliases:
- 'docs/api-checks'

---

Ensure your API is working properly with API checks. API checks work by sending an HTTP request to a URL endpoint, then verifying the speed and correctness of the response.

![Screenshot of the API check overview page](/docs/images/api-checks/overview-check-overview.png)

You can use these checks to verify that:
* Your endpoint returns a 200 status code.
* Your endpoint responds with valid JSON that matches the expected schema.
* Your endpoint is properly authenticating requests.

If your endpoint is unresponsive or fails assertions, the check will trigger any configured alerts.

## Creating an API check

![Screenshot of the create API check page](/docs/images/api-checks/overview-create-check.png)

### Name and tags

A meaningful name will not only help you and others identify your checks within Checkly, but it will help provide a better alerting experience if your checks fall into an alert state.

Tags can relate your checks together. They also determine which checks are shown on your [dashboards](/docs/dashboards/).


### HTTP request

This is where you configure the API endpoint. The most important part of your API check is its URL and method. Optionally, you can define body data, headers, query parameters and authentication for the API check. These [request settings](request-settings) determine the actions taken by the API and the response sent back. 

Endpoints can be accessed and manipulated through [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). Not all methods are valid for all endpoints.

You can import a cURL command, Swagger.json or OpenAPI specification here too. 

### Setup and teardown scripts

Setup scripts allow you to do last minute processing of test data and request options. These scripts execute before any requests are made. Teardown scripts are run after the HTTP request has finished, but before any assertions are validated. With a maximum execution time of 10 seconds, these scripts are useful for things like signing HMAC requests, requesting tokens, setting up or cleaning up test data and scrubbing sensitive response data for regulatory reasons.

[Read more about setup and teardown scripts](setup-teardown-scripts/)

### Response time limits

Sometimes APIs can be slow, but not broken. We call this **degraded**. You can set [response time limits](/docs/api-checks/limits/) to specify when an API check should be marked as **degraded** and when it should be marked as **failed**.

### Assertions

This is where you determine whether the response of the HTTP request is correct or not.
You can assert on different sources. These could be:
- The HTTP status code returned from the API
- Something missing or required within the response body
- A specific response header
- A specific response time

[Read more about assertions](assertions)

### Scheduling & locations

You can configure your checks to run from our [public](/docs/monitoring/global-locations/) locations, or use a Checkly Agent to host your own [private](/docs/private-locations/) locations. If you don't select more than one location and you've disabled retrying checks from the same location, we will pick a random location when retrying checks.

Checkly runs your API checks based on an interval you set. The shortest interval you can run is every 10 seconds and the longest is every 24 hours.

### Retries & alerting

Select your preferred [retry strategy](/docs/alerting-and-retries/retries/) for failed checks.

Our alerting is pretty flexible. You can configure any of our [alert channels](/docs/alerting-and-retries/alert-channels/) for whichever checks you like. If we don't have your preferred alert method, why not try out our [webhooks](/docs/alerting-and-retries/webhooks/)?
> [SMS](/docs/alerting-and-retries/sms-delivery/) and [phone call](/docs/alerting-and-retries/phone-calls/) alerts are only available on our [Team and Enterprise plans](https://www.checklyhq.com/pricing) 

### Testing

You can run your check as an [E2E test](/docs/testing) locally or from your CI/CD pipeline to validate your freshly deployed application. Use the Checkly CLI, or configure integrations with Vercel and GitHub.

## CLI example

The [Checkly CLI](/guides/getting-started-with-monitoring-as-code/) gives you a JavaScript/TypeScript-native workflow for coding, testing and deploying synthetic monitoring at scale, from your code base.

You can define an API check via the CLI. For example:

```ts {title="hello-api.check.ts"}
import { ApiCheck, AssertionBuilder, Frequency } from 'checkly/constructs'

new ApiCheck('hello-api-1', {
  name: 'Hello API',
  activated: true,
  frequency: Frequency.EVERY_1M,
  request: {
    method: 'GET',
    url: 'https://mac-demo-repo.vercel.app/api/hello',
    assertions: [
      AssertionBuilder.statusCode().equals(200)
    ],
  }
})
```

The above example defines:
- The basic check properties like `name`, `activated` etc.
- The HTTP method `GET` the `url`.
- An array of assertions to assert the HTTP response status is correct.

For more options, see the [Check construct reference](/docs/cli/constructs-reference/#check).

## Next steps

* Learn about the benefits of [Monitoring as Code](/guides/monitoring-as-code/).
* Store commonly-used or sensitive data, like usernames and auth tokens, in [environment variables and secrets](/docs/api-checks/variables/).
* Troubleshoot slow responses with [timing phases](/docs/api-checks/timeouts-timing/).
* Use [client certificates](/docs/api-checks/client-certificates/) to authenticate with APIs that require mTLS.
* Monitor an entire API flow with [Multistep checks](/docs/multistep-checks/).
