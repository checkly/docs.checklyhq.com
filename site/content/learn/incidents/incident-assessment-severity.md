---
title: Incident Assessment & Severity | Checkly Guide
displayTitle: Incident Assessment & Severity Guide for Engineering Teams (+ Cheat Sheet)
navTitle:  Incident Assessment & Severity Guide
description: Not every alert is an incident—and not every incident is equally urgent. How to classify incidents and determine their severity? 
date: 2025-05-23
author: Sara Miteva
githubUser: SaraMiteva
displayDescription: How to classify incidents and determine their severity? 
menu:
  learn_incidents
weight: 20
menu:
  learn_incidents:
      parent: Classification
---

## **Incident Assessment & Severity**

Not every alert is an incident—and not every incident is equally urgent.

That’s where **incident assessment** and **severity classification** come in. Without clear definitions, teams get stuck in limbo: 

- Should we wake someone up?
- Should we inform customers?
- Should we prepare a support strategy?
- Is this critical or just annoying?

The goal of incident assessment is to **evaluate the scope and impact** of a problem, determine its urgency, and trigger the appropriate response. Done right, this step aligns engineering, support, and leadership around a shared understanding of what matters—and what to do next.

Let’s break down what effective assessment looks like and how to build your own severity classification system.

### **What Is Incident Assessment?**

Incident assessment is the process of determining whether an observed issue qualifies as an incident—and if so, how serious it is.

To assess an incident, you typically ask:

- What’s broken?
- Who is impacted?
- Is there a workaround?
- How fast do we need to act?

The outcome of this process is a **severity level** that maps to your internal response playbook: who gets paged, how quickly you communicate, and how visible the incident becomes across the company.

### **Why Severity Levels Matter**

Clear severity definitions help your team:

- Act faster under pressure
- Escalate the right issues
- Prevent over-alerting or under-reacting
- Set communication expectations internally and externally

They also create psychological safety. When engineers know exactly what qualifies as a SEV1, they don’t waste time debating—they act.

## Severity Levels: Example Framework

Here’s a simple, 3-tier severity model you can adopt or adapt:

| **Severity** | **Impact** | **Example Incident** | **Expected Action** |
| --- | --- | --- | --- |
| **SEV1** | Critical / Total Outage | Full production outage, major security breach, data loss | All-hands on deck. Wake people up. 24/7 response. Execs informed. |
| **SEV2** | High / Partial Outage | 10% of users can’t log in, degraded performance, partial failure | Escalate to on-call immediately. Frequent updates. Prioritized fix. |
| **SEV3** | Moderate / Minor Bug | Broken styling, slow dashboard load, minor UX issue | Fix during business hours. Log the issue. May not require updates. |

### A Score-Based System for Classifying Severity

You can use a weighted scoring system that evaluates incidents across five dimensions. This adds structure and reduces subjective decisions:

| **Dimension** | **Low (1 pt)** | **Medium (2 pts)** | **High (3 pts)** |
| --- | --- | --- | --- |
| **User Impact** | <5% affected | 5–25% affected | >25% or all users affected |
| **Functionality** | Cosmetic / minor bug | Partial functionality loss | Core feature broken, no workaround |
| **Business Impact** | No SLA/revenue/legal risk | Mild SLA concern or revenue impact | Revenue loss, SLA breach, or legal exposure |
| **Urgency** | Can wait for a sprint | Fix in a day or two | Requires immediate attention |
| **Workaround** | Easy workaround exists | Workaround is possible but painful | No workaround available |

Then, you can map the final score as follows:

| **Total Score** | **Severity Level** |
| --- | --- |
| 5–7 | SEV3 (Low) |
| 8–11 | SEV2 (Medium) |
| 12–15 | SEV1 (High) |
### Example: Users on an unusual browser cannot check out

Let’s say our business is a review site with an ecommerce store. Users on Microsoft Edge can’t check out due to an incompatibility with our payment provider implementation.

- User Impact: Low (1) — Less than 5% of all our users are on Microsoft Edge
- Functionality: High (3) — Users are prevented from a final checkout step, and are unlikely to switch browsers, instead abandoning their cart
- Business: High (3) — This will cost revenue
- Urgency: Medium (2) — At our estimate, this only requires updates to dependencies, and can be fixed in a day or two
- Workaround: Medium (2) - We definitely don’t want to add a ‘please switch browsers’ message to our site
    
    → **Score: 12 → SEV1**
    
## Downloadable Incident Severity Cheat Sheet

If you want to adopt or adapt this process, you can make a copy of our own [incident severity cheat sheet](https://docs.google.com/spreadsheets/d/18L2r8u5h8ylRWNbfMZv0Ff-amJ-ySk5ZU1FLxW2G4uY/edit?usp=sharing).

## Creating Your Own Severity Rules

Every organization operates differently, and what counts as a critical incident for one team may be a routine alert for another. Here’s how to build a severity scoring system that reflects your team’s priorities, customer expectations, and business context.

### **1. Pick Dimensions That Matter to You**

Start by identifying the dimensions of impact that are most relevant to your systems and stakeholders. Common ones include **user impact**, **feature impact**, **business risk**, **urgency**, and **workaround availability**—but you might also include **compliance violations**, **customer tier affected**, or **data integrity** if those are key concerns. The goal is to capture the real-world consequences of an incident in a way that reflects your product and risk model.

### **2. Agree on What “High”, “Medium”, and “Low” Mean**

Without clear definitions, severity scoring quickly becomes subjective. What one engineer sees as a “minor issue” might be considered “urgent” by someone in customer success. To avoid this, document clear criteria for each level of impact. For example, define “High User Impact” as “more than 25% of users affected” or “SEV1 Business Impact” as “any outage that causes revenue loss or legal risk.” These definitions become your north star for consistent triage.

### **3. Add Automation Where Possible**

Manual severity scoring can slow things down and introduce inconsistencies, especially during high-pressure incidents. Automate as much of the process as you can. A shared Google Sheet or Notion template can help teams select impact levels via dropdowns, with scores and severity levels calculated automatically. For more mature teams, connect this logic directly into your alerting pipeline or incident management tool so severity is auto-assigned on alert creation.

### **4. Train Your Incident Responders**

Severity models only work if everyone is aligned on how to use them. Run training sessions or tabletop exercises with your incident response team. Use past incidents to “test” the model—how would they score it now, and does the outcome feel right in hindsight? Over time, this helps calibrate judgment, improves consistency across teams, and creates shared understanding between engineering, support, and leadership.

## Final Words

Clear severity rules turn gut-feel decisions into structured, confident responses. With a shared scoring model, your team can triage faster, communicate better, and stay focused when it matters most.
