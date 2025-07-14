---
title: Use Uptime Monitoring as Your First Line of Defense
displayTitle: Uptime Monitoring as Your First Line of Defense
description: >-
  The three main components of uptime monitors.
author: Nočnica Mellifera
date: 2025-07-12
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - FAQ
---

Uptime Monitoring is part of a ‘[reliability in depth](https://www.checklyhq.com/blog/the-defense-in-depth-approach-to-app-monitoring/)’ strategy of guaranteeing that your services maintain available and performant while allowing you to meet your Service Level Agreements (SLAs) with your customers. You can combine Uptime Monitoring with [Synthetinc Monitoring](https://www.checklyhq.com/learn/monitoring/synthetic-monitoring/) and full-stack traces for a deep, 360 degree view into your applications health. The following guide will focus on your first layer of defense, Uptime Monitoring, and show you how to monitor every endpoint, service, and URL that your service supports. As an extension, you may consider monitoring third-party services that your service relies on. This guide will cover the three types of uptime monitors we have at Checkly:

- URL Monitors
- TCP Monitors
- Heartbeat Monitors

## URL Monitors

While Synthetic Monitoring can simulate complex user behaviors in a browser and alert you if performance or functionality degrades, Uptime Monitoring excels at continous validation that URLs and Services are available. URL monitoring sends high-frequency requests and can alert you of failures within seconds.

This can be useful for monitoring your homepage, landing pages, product pages, and even blog and docs. Our scalable, affordable approach of implementing monitors as code makes Checkly perfect for applying blanketed monitor coverage across your entire digitial footprint.

It’s easy to create a URL Monitor from your IDE with Checkly CLI, just create a check file in your project with the `URLMonitor` type:

```tsx
//urlPinger.check.js
import { Frequency, UrlMonitor, UrlAssertionBuilder } from 'checkly/constructs'

new UrlMonitor('url-pinger-1', {
  frequency: Frequency.EVERY_60S,
  name: 'URL pinger 1',
  activated: true,
  request: {
    url: 'https://httpbin.org/get',
    skipSSL: false,
    followRedirects: true,
    assertions: [
      UrlAssertionBuilder.statusCode().equals(200),
    ]
  }
})
```

*Note that this check is set to run every 60 seconds!*

And deploy your check with the `npx checkly deploy` command. 

Along with monitoring your own services, both URL monitors and synthetics checks can monitor third party services. With the high frequency and low cost of URL monitors, they’re an easy way to ensure the services you rely on are up and running.

## TCP requests for TCP services

While URL checks will send regular HTTP requests, we all still have services that will only respond to TCP requests, for example mail services and ftp services. For these there’s TCP checks. Just like the other checks in this guide, you can create monitors from your IDE with Monitoring as code. Here’s an example:

```tsx
import { TcpMonitor, TcpAssertionBuilder } from 'checkly/constructs'

new TcpMonitor('hello-tcp-1', {
  name: 'Hello TCP',
  activated: true,
  maxResponseTime: 5000,
  degradedResponseTime: 4000,
  request: {
    hostname: 'tcpbin.com',
    port: 4242,
    data: 'ping\n',
    ipFamily: 'IPv6',
    assertions: [
        TcpAssertionBuilder.responseTime().lessThan(1000),
        TcpAssertionBuilder.responseData().contains('ping')
    ]
  }
})
```

*A basic URL monitor ready to deploy*

TCP monitors offer similar options to URL monitors, with the addition of assertions to evaluate the responses. Read more about [TCP check assertions on our docs site](https://www.checklyhq.com/docs/cli/constructs-reference/#tcpassertionbuilder). 

![A TCP check dashboard](/guides/images/uptime-01.png)

*Results for TCP checks include the status of your SSL certification, and can send alerts if your certs are close to expiring.*

TCP checks are also helpful at identifying any DNS issues, as these request will also perform DNS lookup if you provide a hostname and, like the other checks in this guide, [the results for a TCP check](https://www.checklyhq.com/docs/monitoring/check-results/#tcp-monitor-results) will include DNS lookup time.

## The Heartbeat Monitor, for services that don’t accept incoming requests

Another type of service you’ll want to monitor is one that doesn’t accept any kind of incoming requests. 

There’s really not much to getting one to work, just set up a heartbeat in the Checkly UI or with the Checkly CLI. For example, the following code 

```tsx
//heartbeat.check.ts
import { HeartbeatCheck } from 'checkly/constructs'

new HeartbeatCheck('heartbeat-check-1', {
  name: 'Send weekly newsletter job',
  period: 7,
  periodUnit: 'days',
  grace: 2,
  graceUnit: 'hours',
})
```

will create a new Heartbeat monitor called ‘Send Weekly Newsletter job’ that expects a ping every 7 days, and will alert if 7 days and 2 hours pass without a request. After saving `hearbeatDemo.check.ts` to your project file, you can create this check with `npx checkly deploy`

![The Checkly deploy command returning to the CLI](/guides/images/uptime-02.png)

*The deploy command will return the URL for your heartbeat*

The heartbeat monitor expects a HTTP request (GET or POST) to the ping URL once per period. Configure your monitored task to ping the URL when successful. Even this simplest of monitors still has a helpful dashboard of results.

![A Heartbeat check dashboard](/guides/images/uptime-03.png)

### Conclusion

Uptime monitoring is a critical component of maintaining reliable services and meeting SLAs, and Checkly provides versatile tools to ensure your systems—and the third-party services they depend on—remain operational. 

By integrating these monitors into your workflow—either through the Checkly CLI or UI—you can proactively detect and resolve issues before they impact users. With URL monitors for simple HTTP checks, TCP monitors for specialized services, and heartbeat monitors for background jobs, you’ll have full visibility into your system’s health.

Start implementing these uptime monitoring strategies today to strengthen your "[defense in depth](https://www.checklyhq.com/blog/the-defense-in-depth-approach-to-app-monitoring/)" approach and keep your services running smoothly. For more details on configuring checks, explore [Checkly’s documentation](https://www.checklyhq.com/docs/) and take control of your reliability monitoring.
