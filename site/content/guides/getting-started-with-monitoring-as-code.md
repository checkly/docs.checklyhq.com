---
title: Getting Started with Monitoring as Code
description: >-
  Monitoring is essential to ensure that your applications run smoothly, efficiently, and reliably. As systems grow more complex, the need for scalable and automated monitoring has never been greater. This is where Monitoring as Code (MaC) comes into play, allowing you to define, deploy, and manage monitoring configurations programmatically.
author: Sara Miteva
avatar: 'images/avatars/sara-miteva.jpeg'
tags:
  - FAQ
---
Checkly offers a powerful Command Line Interface (CLI) that enables teams to implement Monitoring as Code seamlessly. This article will guide you through the initial steps of getting started with Checkly's CLI to set up your MaC environment.

## **Why Monitoring as Code?**

Before diving into the specifics of Checkly’s CLI, it's important to understand why MaC is beneficial:

1. **Version Control**: With MaC, you can store your monitoring configurations in a version control system, such as Git. This allows you to track changes, revert to previous configurations, and collaborate with your team more effectively.
2. **Scalability**: MaC allows you to define and manage monitoring for multiple environments (development, staging, production) and services in a consistent manner.
3. **Collaboration**: Engineers and operations teams can collaborate more effectively, as monitoring configurations are treated as code and reviewed through pull requests.
4. **Automation**: Automated checks and alerts can be integrated into CI/CD pipelines, providing real-time feedback on the application's health and performance before it reaches production.
5. **Consistency and Reproducibility:** Monitoring configurations are versioned alongside the application code, ensuring that changes are tracked and can be rolled back if necessary.

## **Introducing Checkly’s CLI**

The [Checkly CLI](https://www.checklyhq.com/docs/cli/) gives you a JavaScript/TypeScript-native workflow for coding, testing and deploying synthetic monitoring at scale, from your code repository.

Getting started is pretty easy. You can be up and running in no time to ensure your crucial web apps and sites are performing up to spec. The Checkly CLI provides two main workflows:

- **Coding**: These encompass scripts (such as ApiCheck, BrowserCheck, or SlackAlertChannel) written in JavaScript/TypeScript. They are intended to be deployed and executed on the Checkly cloud backend.
- **Command**: These constitute the fundamental commands for executing your monitoring scripts. The `test` command is utilized for running monitoring checks locally or in continuous integration, while the `deploy` command is employed to push your monitoring scripts to the Checkly cloud backend.

Let's jump into the step-by-step process.

## **Getting Started with Checkly’s CLI**

### **1. Installation**

We’re going to pretend we are working on adding a feature to a web application that also requires some updates to our API backend. We will assume we already bootstrapped our repository with a Checkly CLI project using:

```bash
npm create checkly@latest
```

This command sets up all the basics to kickstart your MaC workflow in your repo.

![starting the MaC workflow in your repo](/guides/images/guides-getting-started-installation.png "Installing the Checkly CLI")

In your project directory, you will find a folder named “**checks**” containing the following check templates:

```jsx
|__checks__
    |- api.check.ts
    |- heartbeat.check.ts
    |- homepage.spec.ts
```

Once this setup is complete, log in to your Checkly account via the CLI using the following command:

`npx checkly login`

You can choose to log in from the browser or in your terminal. After logging in, you'll be able to update Checkly Checks from your local machine as long as you're connected to the internet.

### **2. Write Your First Check**

In your development environment, write JavaScript/TypeScript tests for your code updates, similar to unit tests. We typically use the Playwright testing framework in the .spec.ts or .check.ts file.

Consider a scenario where you want to monitor the title of the Checkly documentation and take a screenshot of the page. To do this, replace the code in the homepage.spec.ts with the following:

```jsx
import { test, expect } from '@playwright/test';

test('Checkly Docs', async ({ page }) => {
  const response = await page.goto('https://www.checklyhq.com/docs/browser-checks/');
  
  // Ensure the page is loaded successfully
  expect(response?.status()).toBeLessThan(400);

  // Check if the page title is as expected
  const pageTitle = await page.title();
  const expectedTitle = 'Introduction to Checkly | Checkly';
  expect(pageTitle).toBe(expectedTitle);

  // Optionally, you can take a screenshot if needed
  await page.screenshot({ path: 'homepage.jpg' });
});
```

---

This test uses the page.goto method to navigate to the specified URL (‘[https://www.checklyhq.com/docs/browser-checks/’](https://www.checklyhq.com/docs/browser-checks/%E2%80%99)). The method returns a response object, which is stored in the response variable.

Then we use the expect function to assert that the HTTP status code of the response is less than 400. This is a way to ensure that the page is loaded successfully without any HTTP errors.

page.title() retrieves the title of the page and compares it with the expected title ('Introduction to Checkly | Checkly') using the expect function. This ensures that the page title matches the expected value.

Finally, we take a screenshot of the page and save it as 'homepage.jpg'.

### **3. Running Test Sessions**

Now that we have our test scripts ready, let’s execute them. We can use the Check CLI command to execute our monitoring pipeline in our staging environment, recording the results for inspection if something fails. Run the following command in the terminal of your project repository to execute the test:

`npx checkly test --record`

The `--record` flag is optional, you can use it if you want to record a test session with git info, full logging, videos and traces. `--record` sessions can be reviewed within the Checkly web interface.

Here is the result of the test we just executed:

![test sessions result](/guides/images/guides-getting-started-testsessions.jpeg "Test Session Result")

There are also links to the detailed summary of the test at the end of the result in the terminal. Here is an example of the test summary:


![test summary](/guides/images/guides-getting-started-test-summary.jpeg "Test Summary Example")

As seen in the result, the test failed because if you browse the URL (https://www.checklyhq.com/docs/browser-checks/) the title of the site is “Getting started | Checkly” and not “Introduction to Checkly | Checkly” as expected in the test case.

If we update the test case to expect “Getting started | Checkly” we will have a passed test. Here is the result of the test after updating the correct title:


![correct test results](/guides/images/guides-getting-started-correct-results.jpeg "Test Results After Updating")

If you check the detailed summary, we should have a passed test too:

![passed test screenshot](/guides/images/guides-getting-started-passed-test.jpeg "Screenshot of a Passed Test")

### **4. Deploy Your Check**

Now that you've reviewed and updated your tests, you can proceed to deploy your MaC workflow and related resources, such as alerts and dashboards. Run the following command in your project terminal to deploy the tests to your Checkly account:

`npx checkly deploy`

Once the deployment is complete, you'll see a success message in your terminal, indicating that the project has been deployed to your Checkly account.

To verify this, navigate to the home section on the left side of the Checkly UI, and you'll find the project with the name of the test script from your local repository.

![checkly dashboard](/guides/images/guides-getting-started-project-name.jpeg "Your Project Name in the Checkly Dashboard")


### **5. Setting up Alerts**

Checkly offers alert services to notify you whenever a check fails. Various alert channels are available, including Slack, SMS, webhook, phone call, email, Opsgenie, PagerDuty, etc.

To set up alerts for your check, go to the specific project, in this case, "homepage.spec.ts." At the top right corner of the code editor, click the "Settings" button. In the revealed side panel, access "Alert Settings" under "Retries & alerting."

![setting up alerts with checkly](/guides/images/guides-getting-started-alerts.jpeg "Setting up Alerts with Checkly")

Here, configure monitoring parameters according to your needs, including check frequency, locations, retries and alerting. You can also set up your preferred alert channel using the Checkly CLI. Learn more about the alert channels from the [official documentation](https://www.checklyhq.com/docs/cli/constructs-reference/#alertchannel).

With the appropriate alert channels set up, there is no need for customers to regularly visit the dashboard. Instead, they will be promptly notified, allowing them to react immediately upon receiving alerts.

## Integrating Monitoring as Code into Your CI/CD Pipeline with Checkly

As you just saw, with Checkly’s CLI, you can run your checks directly from your CI/CD pipeline, using them as end-to-end (E2E) tests. This strategy allows you to validate your application and infrastructure before deploying to production, staging, or any other environment. Additionally, you can manage the entire lifecycle of your checks—creating, updating, and deleting—right from your codebase as part of your CI/CD workflow.

Here’s how to integrate your checks and the Checkly CLI if you’re already using one of the popular CI/CD platforms:

- [**GitHub Actions**](https://www.checklyhq.com/docs/cicd/github-actions/): Run the Checkly CLI from GitHub Actions, export summary reports, and integrate with monorepos for streamlined monitoring across multiple projects.
- [**GitLab CI**](https://www.checklyhq.com/docs/cicd/gitlabci/): Use GitLab CI pipelines to run the Checkly CLI, setting up separate jobs for E2E testing and deployment.
- [**Jenkins**](https://www.checklyhq.com/docs/cicd/jenkins/): Integrate the Checkly CLI into a Jenkins pipeline using a Jenkinsfile to automate your monitoring checks and deployments.

### CI/CD Integration Using Vendor Webhooks

For platforms like [Vercel](https://www.checklyhq.com/docs/cicd/vercel/) or [GitHub deployments](https://www.checklyhq.com/docs/cicd/github/), you can trigger your Checkly checks using vendor-specific webhooks. This method provides a streamlined way to initiate monitoring as part of your deployment process without needing a fully-fledged CI/CD pipeline.

By integrating Checkly’s monitoring checks into your CI/CD pipeline, you ensure that your application is thoroughly validated before and after deployment, reducing the risk of issues in production and maintaining a high level of reliability.

## The Most Reliable Way of Monitoring

Monitoring as Code (MaC) simplifies how you manage your monitoring setups by leveraging automation, scalability, and version control. With Checkly's CLI, implementing MaC is straightforward, allowing you to define and manage your monitoring configurations directly from your codebase.

By following the steps in this guide, you can integrate Monitoring as Code into your projects, ensuring your applications are consistently monitored, reliable, and ready to meet the demands of modern software development. 

Get started with Checkly's CLI today to automate and scale your monitoring, and start detecting issues faster.
