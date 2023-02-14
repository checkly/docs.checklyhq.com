---
title: "finn.auto uses Checkly to ensure booking processes work all the time, everywhere!"
description: >-
  <a href="https://www.finn.auto/?utm_source=blog&utm_medium=article&utm_campaign=checklycase" target="_blank">finn.auto</a> provides you with easy and flexible access to vehicles. You either sign up for a new car subscription or buy a used car online and have your dream model delivered to your home—a real e-commerce experience. finn.auto tests and monitors with Checkly to make sure all processes are working seamlessly, all the time, everywhere.
logo: '/case-studies/hero_logo.svg'
problem:
  label: The Problem
  title: Ensure the money-making process works
  description1: >-
    finn.auto makes getting access to your dream car as easy as ordering shoes online. The Munich-based startup is one of the leading car subscription platforms rapidly expanding internationally. Therefore, finn.auto relies on a super modern technology stack with a Next.js-based frontend, Vercel for hosting, Gitlab for source control and Sentry to monitor the application stack.
  description2: >-
    While finn.auto saw great results in team productivity and performance, user-reported issues showed that the testing and monitoring approach was lagging behind. A self-hosted monitoring solution required a lot of maintenance effort and, at the same time, did not work reliably to monitor what end-users were experiencing. If you ever worked in e-commerce, you know that this is key, especially when the product you sell is easy access to a high-value car.
  logos:
    - src: '/case-studies/checkly_logo.svg'
      alt: "checkly logo"
    - src: '/case-studies/nextjs-logo.svg'
      alt: "nextjs logo"
    - src: '/case-studies/vercel-logo.svg'
      alt: "vercel logo"
    - src: '/case-studies/gitlab-logo.svg'
      alt: "gitlab logo"
    - src: '/case-studies/sentry-logo.svg'
      alt: "sentry logo"
quote:
  author: Andreas Wixler
  role: 'CTO & Co-Founder of finn.auto'
  avatar: "/case-studies/andreas@2x.png"
  description: >-
    Checkly is super easy to use and fits perfectly in our toolchain. We monitor our Vercel projects on preview and production to catch issues earlier and we can trust that we are the first ones to know about problems in production. A nice side effect is that we were able to replace 3 different solutions for testing, monitoring, and alerting with Checkly.
solution:
  label: The Solution
  title: Continuous monitoring on preview and deploy with Checkly
  image: '/case-studies/macbook-finnauto@2x.png'
  description: >-
    It became apparent that finn.auto needed a better approach for active monitoring to stay ahead of issues. “Our tech platform is our building block to be able to bring ten-thousands of cars on the streets. It is super crucial that the customer processes work all the time, especially the booking flow. I call that the money-making process.” says Andreas Wixler, CTO. finn.auto started looking for a highly reliable solution that could monitor the customer processes from an end-user perspective and, most importantly, fit in the cross-functional teams’ development toolchain.<br/>
    As a heavy Vercel customer, finn.auto discovered Checkly in the Vercel marketplace and enabled the integration with a few clicks. The teams saw value in the auto-generated browser checks that scan, for example, the console log for JavaScript errors on each deployment.<br/>
    In the following days, the teams wrote more Playwright end-to-end scripts to run on a schedule and, thanks to the Vercel integration, also on each deployment. In addition, the teams created full-fledged HTTP requests to monitor crucial booking and payment APIs, constantly. After a two-week evaluation, the team was convinced to move all active monitoring to Checkly.
result:
  label: The result
  title: Higher reliability with less effort
  description: >-
    After implementing Checkly, the teams quickly saw massive improvements. The engineers were able to triple the number of E2E checks to increase test coverage. Compared to the in-house solution, the false-failure rate decreased by 80%, giving back the teams confidence in their testing and monitoring. As a result, the user-reported issues have reduced significantly as the teams can test earlier, more reliably, and monitor user experience in short intervals in target regions across the globe. “Checkly is super easy to use and fits perfectly in our toolchain. We monitor our Vercel projects on preview and production to catch issues earlier, and we can trust that we are the first ones to know about problems in production. A nice side effect is that we were able to replace three different solutions for testing, monitoring, and alerting with Checkly”, says Andreas. finn.auto’s laser focus on performance and customer experience pays off. Only one year after launch the startup counts more than 1000 active subscriptions and an outstanding rating of 4.7 on Trustpilot. 
---
