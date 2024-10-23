---
title: How to monitor your e-commerce application using Terraform
description: >-
  The trend of declaring infrastructure as code has been picking up steam over the last few years, offering a way for DevOps teams to transparently manage and scale cloud infrastructure. Why should the way we manage monitoring be any different? In this article, we address this point and illustrate it with a practical example of Monitoring-as-Code on Checkly.
author: Giovanni Rago
avatar: 'images/avatars/giovanni-rago.png'
tags:
  - Terraform
---
The trend of declaring infrastructure as code has been picking up steam over the last few years, offering a way for DevOps teams to transparently manage, monitor and scale cloud infrastructure. Why should the way we manage monitoring be any different? In this article, we address this point and illustrate it with a practical example of Monitoring-as-Code on Checkly.

## What is Monitoring as Code?

Monitoring as Code is a transformative approach to maintaining the reliability and performance of modern web applications by integrating monitoring processes directly into the software development lifecycle. This method is fully compatible with Infrastructure as Code (IaC) and configuration management tools, allowing your monitoring solution to be managed alongside other infrastructure components.

### Key Aspects of Monitoring as Code:

1. Developer-First Monitoring:

  * Seamless Integration: Checkly allows developers to define and manage their monitoring configurations alongside their application code. This means monitoring scripts and configurations can be version-controlled, reviewed, and tested just like any other part of the codebase.

  * CI/CD Pipeline Support: With Checkly, you can embed monitoring checks directly into your CI/CD pipelines. This ensures that every deployment is automatically verified against your monitoring criteria, reducing the risk of undetected issues reaching production and enabling hassle-free continuous delivery.

2. Programmatic Configuration:

  * Infrastructure as Code (IaC) Compatibility: Checkly's API and CLI tools make it easy to programmatically set up and manage monitoring. This aligns with the principles of IaC, allowing teams to define their monitoring infrastructure using code, ensuring consistency and reproducibility across environments.

  * Programmable Monitoring Checks: Define advanced monitoring checks using JavaScript and TypeScript. This flexibility enables you to create highly specific and complex checks tailored to your application's unique requirements.

Let's dive deeper into Checkly's Monitoring as Code solution powered by the Checkly CLI.

## Infrastructure-as-Code (IaC)

We've released our brand new CLI and recommend giving it a try for the best [Monitoring as Code experience](/guides/monitoring-as-code-cli/).

Please visit our [documentation](/docs/cli/cli-vs-terraform-pulumi/) if you want to learn more about the pros & cons of the Terraform provider vs. the CLI for code monitoring automation.


Historically, IT infrastructure has been provisioned manually, both on-premise and in the cloud. This presented several challenges, including fragmented workflows, lack of transparency, and scalability issues. In response to these problems, the last few years have seen a shift to the Infrastructure-as-Code (IaC) paradigm, in which large-scale systems are declared in configuration files, a method that code monitoring adopts to enhance operational efficiency.

A new generation of tools has emerged to serve this use case, the most notable example of which is {{< newtabref  href="https://www.terraform.io/" title="HashiCorp Terraform" >}}. Terraform provides a CLI workflow that allows users to specify the desired final infrastructure setup, handling all the intermediate steps and processes needed to achieve it, embodying the principle of **monitoring as code**.

{{< figure src="/guides/images/guides-terraform-aws.png" alt="provisioning aws infrastructure - code snippet" title="Provisioning AWS infrastructure via Terraform" >}}

Terraform can provision infrastructure on many cloud vendors thanks to its provider ecosystem. Each provider maps to the vendor's API, offering resources in a domain-specific language known as {{< newtabref  href="https://www.terraform.io/docs/language/syntax/configuration.html" title="HCL" >}}, a cornerstone for both IaC and code monitoring operations.

## Monitoring the IaC way

Setting up monitoring tools and monitoring in general can present some of the same issues as provisioning infrastructure. This becomes apparent when scaling beyond the initial rollout or proof-of-concept phase, as monitoring as code helps manage the growing scope and maintenance needs efficiently.

Monitoring-as-Code learns from IaC and brings your monitoring config closer to your application and your development workflows. How? By having it also declared as code, much like you would do with any kind of IT infrastructure.

## Why Monitoring-as-Code

What does one gain when moving from a manual process to a Monitoring-as-Code approach? The **main advantages** are:

1. Better scalability through faster provisioning and easier maintenance.
2. Better history and documentation: config files can be checked into source control.
3. Shared monitoring setup visibility (and easier shared ownership) in DevOps teams.

## Monitoring-as-Code with Checkly

Users who have just started out will be familiar with creating checks, groups, alert channels and other resources through the Checkly UI. However, the official Terraform provider for Checkly allows for these elements to be declared as code, streamlining the provisioning and deployment of active monitoring setups, a practice central to code monitoring.

You can {{< newtabref  href="https://registry.terraform.io/providers/checkly/checkly/latest" title="find the Checkly Terraform provider" >}} on the official Terraform registry.

{{< figure src="/guides/images/guides-provider.png" alt="official Checkly Terraform provider on Terraform Registry" title="Official Checkly Terraform provider" >}}

## Monitoring an e-commerce website - as code

Exploring code monitoring in practice, we set up a small monitoring configuration for our {{< newtabref  href="https://danube-web.shop/" title="demo e-commerce website" >}} using Terraform and Playwright scripts, showcasing the efficiency, reliability and scalability of monitoring as code.

### Setting up our Terraform project

For our example we will be creating browser checks using {{< newtabref  href="https://playwright.dev" title="Playwright" >}} scripts we have previously written as part of our Playwright guides.

{{< tabs "Web shop example" >}}
{{< tab "Login" >}}
```js
const { chromium } = require("playwright");

(async () => {

  // launch the browser and open a new page
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // navigate to our target web page
  await page.goto("https://danube-web.shop/");

  // click on the login button and go through the login procedure
  await page.click("#login");
  await page.type("#n-email", "user@email.com");
  await page.type("#n-password2", "supersecure1");
  await page.click("#goto-signin-btn");

  // wait until the login confirmation message is shown
  await page.waitForSelector("#login-message", { visible: true });

  // close the browser and terminate the session
  await browser.close();
})();
```
{{< /tab >}}
{{< tab "Search" >}}
 ```js
const { chromium } = require("playwright");
const assert = require("chai").assert;

(async () => {

  // launch the browser and open a new page
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const bookList = [
    "The Foreigner",
    "The Transformation",
    "For Whom the Ball Tells",
    "Baiting for Robot",
  ];

  // navigate to our target web page
  await page.goto("https://danube-web.shop/");

  // search for keyword
  await page.click(".topbar > input");
  await page.type(".topbar > input", "for");
  await page.click("#button-search");
  await page.waitForSelector(
    ".shop-content > ul > .preview:nth-child(1) > .preview-title"
  );

  // halt immediately if results do not equal expected number
  let resultsNumber = (await page.$$(".preview-title")).length;
  assert.equal(resultsNumber, bookList.length);

  // remove every element found from the original array...
  for (i = 0; i < resultsNumber; i++) {
    const resultTitle = await page.$eval(
      `.preview:nth-child(${i + 1}) > .preview-title`,
      (e) => e.innerText
    );

    const index = bookList.indexOf(resultTitle);
    bookList.splice(index, 1);
  }

  // ...then assert that the original array is now empty
  assert.equal(bookList.length, 0);

  // close the browser and terminate the session
  await browser.close();
})();
```
{{< /tab >}}
{{< tab "Checkout" >}}
 ```js
const { chromium } = require("playwright");

(async () => {

  // launch the browser and open a new page
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  // navigate to our target web page
  await page.goto("https://danube-web.shop/");

  // add the first item to the cart
  await page.click(`.preview:nth-child(1) > .preview-author`);
  await page.click(".detail-wrapper > .call-to-action");
  await page.click("#logo");

  // wait until navigation is complete
  await navigationPromise;

  // navigate to cart and proceed
  await page.click("#cart");
  await page.click(".cart > .call-to-action");
  await page.click("#s-name");

  // fill out checkout info
  await page.type("#s-name", "Max");
  await page.type("#s-surname", "Mustermann");
  await page.type("#s-address", "Charlottenstr. 57");
  await page.type("#s-zipcode", "10117");
  await page.type("#s-city", "Berlin");
  await page.type("#s-company", "Firma GmbH");
  await page.click(".checkout > form");
  await page.click("#asap");

  // confirm checkout
  await page.click(".checkout > .call-to-action");

  // wait until the order confirmation message is shown
  await page.waitForSelector("#order-confirmation", { visible: true });

  // close the browser and terminate the session
  await browser.close();
})();
 ```
{{< /tab >}}
{{< /tabs >}}

Let's start off by creating a brand new folder:

`mkdir checkly-terraform-example && cd $_`

To keep things easy, we create a subdirectory...

`mkdir scripts`

...and copy all our scripts from above into separate files, for example `login.js`.

Next up, we want to create our `main.tf` file and include the basic configuration as follows:

{{< tabs "Terraform example" >}}
{{< tab "main.tf" >}}
```terraform
variable "checkly_api_key" {}

terraform {
  required_providers {
    checkly = {
      source = "checkly/checkly"
      version = "0.8.1"
    }
  }
}

provider "checkly" {
  api_key = var.checkly_api_key
}
```
{{< /tab >}}
{{< /tabs >}}

We are ready to initialise our project and have the Checkly Terraform provider set up for us. That is achieved by running:

`terraform init`

After a few seconds, you should see a similar message to the following:

```bash
ragog@macpro learn-terraform % terraform init

Initializing the backend...

Initializing provider plugins...
- Finding checkly/checkly versions matching "0.8.1"...
- Installing checkly/checkly v0.8.1...
- Installed checkly/checkly v0.8.1 (signed by a HashiCorp partner, key ID 4E5AC4D95E185A57)

...

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

...
```

### Creating our first browser checks

In the same file, right below our initial instructions, we can now add resources one after the other. They will be browser checks based on the Playwright scripts we previously stored in the `scripts` directory. Here is what each resource could look like:

{{< tabs "Terraform example 2" >}}
{{< tab "Login resource" >}}
```terraform
resource "checkly_check" "login" {

  name                      = "Login E2E"
  type                      = "BROWSER"
  activated                 = true
  should_fail               = false
  frequency                 = 10
  double_check              = true
  ssl_check                 = false
  use_global_alert_settings = true
  locations = [
    "us-west-1",
    "eu-central-1"
  ]

    script = file("${path.module}/scripts/login.js")

}
```
{{< /tab >}}
{{< tab "Search resource" >}}
```terraform
resource "checkly_check" "search" {

  name                      = "Search E2E"
  type                      = "BROWSER"
  activated                 = true
  should_fail               = false
  frequency                 = 15
  double_check              = true
  ssl_check                 = false
  use_global_alert_settings = true
  locations = [
    "us-west-1",
    "eu-central-1"
  ]

    script = file("${path.module}/scripts/search.js")

}
```
{{< /tab >}}
{{< tab "Checkout resource" >}}
```terraform
resource "checkly_check" "checkout" {

  name                      = "Checkout E2E"
  type                      = "BROWSER"
  activated                 = true
  should_fail               = false
  frequency                 = 60
  double_check              = true
  ssl_check                 = false
  use_global_alert_settings = true
  locations = [
    "us-west-1",
    "eu-central-1"
  ]

    script = file("${path.module}/scripts/checkout.js")

}
```
{{< /tab >}}
{{< /tabs >}}

Now that our Terraform project has been initialised and we have added some resources, we can generate a Terraform plan by running `terraform plan`.

Terraform will determine all the needed changes to be performed to replicate our monitoring software configuration on Checkly. In doing so, we will be asked for our Checkly API key, which we can find under our account settings as shown below. Not on Checkly yet? [Register a free account](https://app.checklyhq.com/signup) and enjoy your free monthly checks!

{{< figure src="/guides/images/guides-terraform-api.png" alt="screenshot of how to get api key from checkly dashboard" title="Retrieving the Checkly API KEY" >}}

 We can expose this as an environment variable in order to spare developers from having to copy-paste it all the time: `export TF_VAR_checkly_api_key=<YOUR_API_KEY>`.

```
ragog@macpro learn-terraform % terraform plan

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # checkly_check.checkout will be created
  + resource "checkly_check" "checkout" {
      + activated                 = true
      + degraded_response_time    = 15000
      + double_check              = true
      + frequency                 = 60
      + id                        = (known after apply)
      + locations                 = [
          + "eu-central-1",
          + "us-west-1",
        ]
      + max_response_time         = 30000
      + name                      = "Checkout E2E"
      + script                    = <<-EOT
            const { chromium } = require("playwright");

            ...

Plan: 3 to add, 0 to change, 0 to destroy.
```

We can now finally apply our changes with `terraform apply`. We might be asked for one final confirmation in the command prompt, after which we will be greeted by the following confirmation message:

```bash
...

checkly_check.checkout: Creating...
checkly_check.login: Creating...
checkly_check.search: Creating...
checkly_check.checkout: Creation complete after 3s [id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx]
checkly_check.login: Creation complete after 3s [id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx]
checkly_check.search: Creation complete after 4s [id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx]

Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
```

Logging in to our Checkly account, we will see the dashboard has been populated with data from our three checks, which will soon start executing on their set schedules.

{{< figure src="/guides/images/guides-terraform-checks.png" alt="terraform-created checks on checkly dashboard" title="Terraform-provisioned checks on Checkly" >}}

### Monitoring API correctness and performance

Browser checks are now there to keep us informed on the status of our key website flows. What about our APIs, though? Whether they make up the foundation of our service or they are consumed directly by the customer, we need to ensure our endpoints are working as expected. This is easily achieved by setting up API check resources.

{{< tabs "Terraform example 3" >}}
{{< tab "API check resource" >}}
```terraform
resource "checkly_check" "webstore-list-books" {
  name                      = "list-books"
  type                      = "API"
  activated                 = true
  should_fail               = false
  frequency                 = 1
  double_check              = true
  ssl_check                 = true
  use_global_alert_settings = true
  degraded_response_time    = 5000
  max_response_time         = 10000

  locations = [
    "eu-central-1",
    "us-west-1"
  ]

  request {
    url              = "https://danube-web.shop/api/books"
    follow_redirects = true
    assertion {
      source     = "STATUS_CODE"
      comparison = "EQUALS"
      target     = "200"
    }
    assertion {
      source     = "JSON_BODY"
      property   = "$.length"
      comparison = "EQUALS"
      target     = "30"
    }
  }
}
```
{{< /tab >}}
{{< /tabs >}}

We can now once more run `terraform plan`, followed by `terraform apply` to see the new check on Checkly:

{{< figure src="/guides/images/guides-terraform-api-check.png" alt="terraform-created api check on checkly" title="Our API and Browser checks on Checkly" >}}

### Alerting

Now that we have our checks in place, we want to set up alerting to ensure we are informed as soon as a failure takes place. Alert channels can be declared as resources, just like the checks. Let's add the following to our `main.tf` file:

```terraform
resource "checkly_alert_channel" "alert-email" {
  email {
    address = "<YOUR_EMAIL_ADDRESS>"
  }
  send_recovery = true
  send_failure = true
  send_degraded = false
}
```

We are setting up things so that we are alerted when our check starts failing, as well as when it recovers. But we still need to decide which checks will subscribe to this channel, and therefore be able to trigger the alerts. This is done by adding the following inside the resource declaration of each check, e.g.:

```terraform
resource "checkly_check" "login" {

  name                      = "Login E2E"
  type                      = "BROWSER"
  activated                 = true
  should_fail               = false
  frequency                 = 10
  double_check              = true
  ssl_check                 = false
  use_global_alert_settings = true
  locations = [
    "us-west-1",
    "eu-central-1"
  ]

    script = file("${path.module}/scripts/login.js")

  alert_channel_subscription {
    channel_id = checkly_alert_channel.alert-email.id
    activated  = true
  }

}
```

Going through the usual `terraform plan` and `terraform apply` sequence will apply the changes on our Checkly account:

{{< figure src="/guides/images/guides-terraform-alerts.png" alt="terraform-created alert on checkly" title="Terraform-provisioned alert on Checkly" >}}

We are now fully up and running with our monitoring-as-code setup. Our checks will run on a schedule, informing us promptly if critical anything were to go wrong. Rapidly getting to know about failures in our API and key website flows will allow us to react fast and mitigate impact on our users, ensuring a better experience with our product.

You can find the complete setup described in this guide on our {{< newtabref  href="https://github.com/checkly/guides-monitoring-as-code" title="dedicated repository" >}}.

### Expanding our setup

As our setup expands, we might want to deploy additional tools to make our lives easier. We could:

1. Iterate over existing Playwright scripts and [create multiple checks while declaring only one resource](/blog/scaling-puppeteer-playwright-on-checkly-with-terraform/#iterating-through-scripts-for-shorter-config).
2. [Group checks together](/blog/scaling-puppeteer-playwright-on-checkly-with-terraform/#grouping-checks-together) to better handle them in large numbers.
3. [Use code snippets](/blog/scaling-puppeteer-playwright-on-checkly-with-terraform/#reducing-code-duplication-with-snippets) to avoid code duplication and reduce maintenance.
4. Move your workflow to {{< newtabref  href="https://www.terraform.io/cloud" title="Terraform Cloud" >}} to easily collaborate with your team when managing your Monitoring-as-Code configuration.

## Read More

<div class="cards-list">
{{< doc-card class="three-column-card" title="Checkly CLI" description="Understand monitoring as code (MaC) via our Checkly CLI." link="/guides/monitoring-as-code-cli/" >}}

{{< doc-card class="three-column-card" title="End to end monitoring" description="Learn end-to-end monitoring with playwright to test key website flows." link="/guides/end-to-end-monitoring/" >}}

{{< doc-card class="three-column-card" title="Setup scripts for API monitoring" description="Setup scripts are a fundamental tool to tailor API checks to your own target endpoints." link="/guides/setup-scripts/" >}}
</div>