---
title: Automation in incident response - Can we automate response playbooks?
displayTitle: Automation in incident response
navTitle:  Playbooks & Automation
description: 
date: 2025-02-15
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
menu:
  learn_incidents
weight: 50
menu:
  learn_incidents:
      parent: Classification
---

While human judgment remains essential, automation can significantly reduce response times, minimize human error, and streamline workflows. This guide explores how developers can integrate automation into incident playbooks effectively, balancing speed with safety. Often SaaS offerings will promise to ‘handle outages fully automatically’ but that’s generally not the reality. Why can’t we automate incident response, and what levels of automation make sense for your team?

### **1. Automation Spectrum in Incident Response**

Automation in incident playbooks exists on a spectrum:

- **Manual Execution** (Engineers follow step-by-step instructions)
- **Semi-Automated** (Engineers trigger scripts/commands via ChatOps or runbooks)
- **Fully Automated** (Self-healing systems execute remediation without human intervention)

Most organizations lean toward **semi-automation** due to risk tolerance, but the right approach depends on:

- **System complexity** (e.g., cloud-native vs. legacy infrastructure)
- **Failure domain isolation** (Can automation safely fix this without cascading failures?)
- **Regulatory/compliance requirements** (Some industries require human approval for changes.)

## **2. Key Automation Use Cases in Playbooks**

**A. Alert Enrichment & Context Gathering**

Automation can pre-fetch diagnostic data before engineers engage:

- **PagerDuty workflows** that query monitoring systems (Prometheus, Datadog) and attach metrics to incidents.
- **ChatOps bots** that dump recent logs, deployment history, or topology maps into the incident channel.

Example:

```ts
// PagerDuty automation script to fetch error rates
async function enrichIncident(incidentId: string): Promise<void> {
    const metrics = await datadogApi.query(`system.error_rate by ${service}`);
    await pagerduty.updateIncident(incidentId, { context: metrics });
}
```

One example of alert enrichment is the large amount of easily readable information offered in an alert from Checkly. At the high level, failures are shown along with failed attempts that didn’t trigger an alert because of a successful retry: 

**B. Safe, Repeatable Remediation Steps**

Automate actions with well-understood outcomes:

- **Restarting a stuck service** (e.g., `kubectl rollout restart deployment/{service}`)
- **Scaling up resources** (e.g., AWS Lambda concurrency increase)
- **Blocking a malicious IP** (e.g., via Cloudflare API)

Example (ChatOps):

```
!runbook restart_service --env=prod --service=payment-gateway
```

*→ Bot executes pre-approved Ansible playbook and reports back.*

**C. Automated Triage & Escalation**

- **Classify incidents** for example"Is this a database issue or network flakiness?")
- **Route to the right team** based on symptoms (e.g., SRE vs. Data Engineering)
- **Follow availability and escalation rules** this is the kind of thing that is closely associated with PagerDuty: notifying the person who’s currently on-call, and escalating as needed if that person doesn’t respond

## **3. Tools & Integration Patterns**

| **Tool** | **Use Case** | **Example Integration** |
| --- | --- | --- |
| **PagerDuty** | Orchestrating workflows, notifications | Auto-trigger AWS Lambda on incident creation |
| **ChatOps (Slack/MS Teams)** | Human-in-the-loop automation | Bot executes `kubectl` commands after approval |
| **Runbook Tools (Confluence, Git)** | Documentation-as-code | Markdown with embedded Terraform snippets |
| **Ansible/Chef** | Safe, idempotent remediation | Rollback to last known good config |
| **Serverless (AWS Lambda)** | Lightweight automation hooks | Auto-mitigate S3 bucket throttling |

## **4. Security & Guardrails**

Automation introduces risks—**fail-safes are critical**:

- **Approval workflows** (e.g., "Execute repair? ✅/❌" in Slack)
- **Dry-run modes** ("What would this script do?")
- **Blast radius control** (Limit parallelism, region scoping)
- **Audit logs** (All actions should be traceable to an incident ID.)

Example safety check:

```bash
if [[ $ENVIRONMENT == "prod" ]]; then
   echo "Prod changes require manual approval." | slack-notify
   exit 1
fi

```

## **5. Cultural & Organizational Factors**

- **Start small**: Automate only the most repetitive, low-risk tasks.
- **Trust through transparency**: Engineers should see what automation is doing (e.g., ChatOps command logging).
- **Post-mortem feedback loops**: Analyze if automation helped or caused issues.

A quote from one engineer talking about how automation can get rolled back after errors:

> "At one company, we automated DNS failover—until it once failed over unnecessarily. Now it pings the on-call first."
> 

### The final word on Automation in playbooks

Automation in incident playbooks isn’t about replacing humans—it’s about **augmenting response efforts** while minimizing toil. By focusing on **enrichment, safe remediation, and guardrails**, developers can build systems that accelerate recovery without sacrificing reliability.

**Final tip**: If your automation can’t explain its actions in a post-mortem, it’s not ready for production.