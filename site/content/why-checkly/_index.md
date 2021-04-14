---
title: Why Checkly
hero:
  label: 'Why Checkly?'
  title: More reliable with less effort
  description: >-
    Checkly helps developers set up, maintain, and scale monitoring with little effort, so you can focus on shipping great products.
  heroBg: "/why-checkly/hero@2x.png"
  logos:
    - logo: "/why-checkly/vercel.svg"
      alt: "vercel"
      width: "92px"
      height: "21px"
    - logo: "/why-checkly/ibm@2x.png"
      alt: "IBM"
      width: "65px"
      height: "26px"
    - logo: "/why-checkly/1password@2x.png"
      alt: "1password"
      width: "112px"
      height: "22px"
    - logo: "/why-checkly/nyc@2x.png"
      alt: "NYC"
      width: "64px"
      height: "23px"
    - logo: "/why-checkly/jumbo@2x.png"
      alt: "jumbo"
      width: "94px"
      height: "19px"
feature:
  title: "Every minute of downtime equals $5,600 to $9,000 in losses."
  description: >-
    Checkly helps you to mitigate risk and recover from incidents faster!
  features:
    - title: Easy monitoring at scale
      description: "Instantly setup deep monitoring for your web apps and APIs."
      icon: "/why-checkly/package-dependent.svg"
    - title: Faster problem detection
      description: "Be the first one to know when things break or slow down."
      icon: "/why-checkly/bell.svg"
    - title: Less downtime
      description: "Immediately take action and shorten your time to recover."
      icon: "/why-checkly/smiley.svg"
videosection:
  title: "Monitoring has never been easier"
  description: >-
    Checkly is easy to use across the board. The intuitive UI lets you create checks seamlessly. From signup to running your first checks, it will only take you a few minutes.
  video: "/why-checkly/plugandplay_amazon_nobars.mp4"
codes:
  title: Flexible and programmable
  description: >-
    Checkly is built with the developer in mind. While easy to use, it comes with flexible and powerful features for in-depth monitoring. Cover complex E2E scenarios using JavaScript. Adapt checks with Node.js-based setup & teardown scripts.
integrates:
  title: Integrates with your workflow
  description: >-
    Checkly natively integrates with the tools you love. Trigger checks from Github and Vercel, manage checks with Terraform, and get alerts via Slack, Pagerduty, Discord, and more. Something is missing? Use our top-notch webhooks to build your own integration!
  image: "/why-checkly/integrates@2x.png"
monitor:
  title: Monitoring as code
  description: >-
    We support a git-based workflow to create and manage large suites. Use our best in class Terraform provider to configure synthetic and API monitoring as part of your existing infrastructure codebase.
  image: "/why-checkly/monitor@2x.png"
alerting:
  title: Reliable
  description: >-
    Being called at night when things go sideways - and only then! - is key. We use reliable frameworks to run millions of checks every day. Checkly has deep-grained alerting with distributed auto retries to separate the signal from the noise.
  icon: "/why-checkly/code.svg"
open:
  title: Open
  description: >-
    Checkly runs on open-source and integrates with popular open-source tools. We are supporting Puppeteer and Playwright for reliable and blazing fast E2E tests and synthetic monitoring.
  icon: "/why-checkly/smiley.svg"
testimonial:
  author: Connor Hicks
  avatar: "/why-checkly/conner_hicks@2x.png"
  role: Lead developer
  companyLogo: "/why-checkly/1password.svg"
  description: >-
    “Checkly is a fabulous developer tool! The flexible features and developer-friendly API made the integration super easy.”
scale:
  title: "Built for developers<br /> and engineering teams of all sizes"
  first:
    title: From small to large teams
    features:
      - header: "Free plan"
        description: >-
          We support solo developers and small projects with a powerful forever free plan.
      - header: "Fair and flexible pricing"
        description: >-
          You can easily configure paid plans precisely to your needs, so you only pay for what you use.
      - header: "Easy to start and use"
        description: >-
          Checkly is designed to make it simple and fun. You won't need technical support to get started
      - header: "Friendly support"
        description: >-
          We are proud of our excellent documentation and API reference. When you encounter issues, you get knowledgeable and friendly support via chat.
  second:
    title: Enterprise
    features:
      - header: "Scalable"
        description: >-
          Checkly is built to support a high load. We run millions of checks daily. Do you need to grow instantly? We are ready!
      - header: "Flexible"
        description: >-
          Checkly is programmable and open. It can adapt to your organizations' workflow, from team structure to asset management to alerting.
      - header: "Secure and reliable"
        description: >-
          Checkly is built on a secure and modern cloud infrastructure.
      - header: "Customer Success"
        description: >-
          We are industry experts who can actively support you with the right strategy to become more reliable.
---

<div class="code-block show" id="puppeteer">

```js
const puppeteer = require("puppeteer");
​
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
​
  await page.goto("https://awesomeweb.app/");
​
  await page.waitForSelector("#login");
  await page.click("#login");
​
  await page.waitForSelector("#email");
  await page.type("#email", process.env.USER_EMAIL);
  await page.type("#password", process.env.USER_PASSWORD);
​
  await page.waitForSelector("#button-signup");
  await page.click("#button-signup");
​
  await page.waitForSelector("#message-login", { visible: true });
​
  await browser.close();
})();
```

</div>

<div class="code-block hidden" id="playwright">

```js
const { chromium } = require("playwright");
​
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
​
  await page.goto("https://awesomeweb.app/");
​
  await page.click("#login");
​
  await page.type("#email", process.env.USER_EMAIL);
  await page.type("#password", process.env.USER_PASSWORD);
​
  await page.click("#button-signup");
​
  await page.waitForSelector("#message-login", { visible: true });
​
  await browser.close();
})();
```

</div>