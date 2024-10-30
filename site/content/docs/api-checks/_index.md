---
title: Overview
weight: 7
slug: /
menu:
  resources:
    parent: "API checks"
    identifier: overview-api-checks
aliases:
- 'docs/api-checks'
cli: true
---

API checks consist of few parts:

**1. Name and tags**

Start as you mean to go on. Pick a sensible name, something that other members of your team are going to understand. A meaningful name will not only help you and others identify your checks within Checkly, but it will help provide better a better alerting experience if your checks fall into an alert state.
Tags can relate your checks together, they also determine which checks are shown on your public [dashboards](/docs/dashboards/).
![http request](/docs/images/api-checks/overview-name-tag.png)

**2. The HTTP request**

This is where you configure the API endpoint. You define the request method, URL, body data, headers, query parameters and authentication for the API check. These [request settings](request-settings) determine the actions taken by the API and therefore the response sent back. The most important part of your API check is its URL and its method.

Endpoints can be accessed and manipulated through [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), not all methods are valid for all endpoints.

![http request](/docs/images/api-checks/overview-http.png)

You can import a cURL command, Swagger.json or OpenAPI specification here too. 

**3. Setup and teardown scripts**

Setup scripts allow you to do last minute processing of test data and request options. The scripts execute before any requests are made.
Teardown scripts are run after the HTTP request has finished, but before any assertions are validated. With a maximum execution time of 10 seconds, these scripts are really useful for things like signing HMAC requests, requesting tokens, setting up or cleaning up test data and scrubbing sensitive response data for regulatory reasons.

[Read more about setup and teardown scripts](setup-teardown-scripts/)
![setup and teardown scripts](/docs/images/api-checks/overview-scripts.png)

**4. Response time limits**

Our [time limits](limits) are customisable, sometimes API's can be slow, but not broken. We call that **degraded**. We let you specify when an API check should be marked as **degraded** and when it should be marked as **failed**.
![response times](/docs/images/api-checks/overview-response-time.png)

**5. Assertions**

This is where you determine whether the response of the HTTP request is correct or within acceptable bounds.
You can assert on different sources. These could be:
- The HTTP status code returned from the API
- Something missing or required within the response body
- A specific response header
- A specific response time

[Read more about assertions](assertions)
![assertions](/docs/images/api-checks/overview-assertions.png)

**6. Locations**

You can configure your checks to run from our ever-growing amount of global [public](/docs/monitoring/global-locations/) locations or use a Checkly Agent to host your own [private](/docs/private-locations/)
If you don't select more than one data center location, we will pick a random location when retrying checks if you have "double check" enabled.
![locations](/docs/images/api-checks/overview-locations.png)

**7. Scheduling**

Checkly runs your API checks based on an interval you select. We have a minimum and maximum interval for your API checks.
The quickest schedule you can run is every 10 seconds and the slowest is every 24 hours.
![schedule](/docs/images/api-checks/overview-schedule.png)

**8. Alerting**

Our alerting is pretty flexible. You can configure any of our [alert channels](/docs/alerting/alert-channels/#managing-alert-channels) for whichever checks you like. If we don't have your preferred alert method, why not try out our [Webhooks](/docs/alerting/webhooks/)?
> [SMS](/docs/alerting/sms-delivery/) and [Phone call](/docs/alerting/phone-calls/) alerts are only available on our [Team and Enterprise plans](https://www.checklyhq.com/pricing/#features) 

![alerting](/docs/images/api-checks/overview-alerting.png)
