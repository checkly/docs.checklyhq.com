---
title: Running Checkly on Kubernetes - Checkly Docs
displayTitle: Running Checkly on Kubernetes 
navTitle: Running on Kubernetes
weight: 54
menu:
  resources:
    parent: "Private Locations"

---

We advise running any production-grade Checkly Agent deployments on a container orchestrator like Kubernetes. To help you get started, we provide a [public Helm chart](https://github.com/checkly/helm-charts) for deploying the agent.

## Prerequisites

- You've [created a Private Location](/docs/private-locations/) and have an API key
- You have a running Kubernetes cluster
- [Helm](https://helm.sh/) is installed

## Deploying the Checkly Agent with Helm

See the [Checkly Helm Charts README](https://github.com/checkly/helm-charts/tree/main/charts/agent#readme) for installation instructions and configuration options.

If you run into any issues, feel free to open an issue on the repository or reach out via the [Community Slack](https://join.slack.com/t/checklycommunity/shared_invite/zt-2qc51mpyr-5idwVD4R4izkf5FC4CFk1A).