---
title: CLI vs. Terraform & Pulumi
weight: 9
menu:
  platform:
    parent: "CLI"
---

Creating, debugging and managing E2E and synthetic monitoring at scale is best done "as code". Currently, Checkly supports
three tools you can use for your **monitoring as code** (MaC) workflow:

1. The Checkly CLI.
2. Terraform (through our Terraform provider)
3. Pulumi (through our Pulumi provider)

In most cases, the choice depends on what your goals are and how your organization is set up.

We believe the **Checkly CLI delivers the best-of-breed workflow**. However, there are always trade-offs. Let's list some 
pros and cons based on our own experience and user feedback.

## Terraform vs. Checkly CLI

If you are a Terraform shop, you can use Checkly to its full capacity. The Checkly CLI adds core capabilities like TS/JS coding 
, simple Git integration and test execution.

**Pros**

`+` Terraform integrates very well with Checkly. We have a well maintained Terraform provider.

`+` Terraform is comfortable for many Devops engineers used to writing HCL scripts.

`+` Checkly can be configured almost completely through Terraform resources.

**Cons**

`-` Terraform does not allow you to test checks or use TS/JS programming.

`-` Terraform and its HCL syntax is hard to learn for many app developers.

`-` Using Terraform with Git is non-trivial.

## Pulumi vs. Checkly CLI

**Pros**

`+` Pulumi integrates well with Checkly. We have a maintained Pulumi provider.

`+` Pulumi is comfortable with app developers across many languages.

`+` Checkly can be configured almost completely through Pulumi resources.

**Cons**

`-` Pulumi does not really work without signing up for a Pulumi account.

`-` Pulumi does not allow you to run and debug checks from your local dev environment.

`-` Pulumi is not optimized for testing and monitoring use cases.



