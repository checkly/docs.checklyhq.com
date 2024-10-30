---
title: Running Checkly on Kubernetes - Checkly Docs
displayTitle: Running Checkly on Kubernetes 
navTitle: Running on Kubernetes
weight: 54
menu:
  resources:
    parent: "Private Locations"
cli: true
---

We advise running any production-grade Checkly Agent deployments on a container orchestrator like Kubernetes. To help you get started, we created the [checkly-k8s repo](https://github.com/checkly/checkly-k8s) which contains a Helm chart and a few example Kubernetes manifests.

## Prerequisites

- You've [created a Private Location](/docs/private-locations/) and have an API key.
- A running Kubernetes cluster
- [Helm](https://helm.sh/) if you are using Helm charts.

Now, clone the repo with the examples:

```bash
git clone https://github.com/checkly/checkly-k8s.git
cd checkly-k8
```

## Helm chart

Find the Helm chart in the `/helm-chart` directory. The Helm chart does two basic things:
- Creates a secret for the API key.
- Spins up two pods running the Checkly Agent

Assuming you have Helm set up to point at your K8S cluster, run it with the following command, making sure you
**replace the `apikey="pl_..."` with your Checkly Private Location API key**.

```bash
helm install checkly-agent --set apiKey="pl_..."  ./helm-chart
```

## Kubernetes manifests

If you are not using Helm, you can also use K8S manifest files to create your preferred cluster setup for the Checkly
Agent. Here is a rundown of the manifest files you can find in the repo:

### [agentSecret.yaml](https://github.com/checkly/checkly-k8s/blob/main/k8s-manifests/agent-secret.yaml)

Creates a secret containing the API key your agents use to connect to the private location. The pod and deployment manifests are configured
to use this secret.

### [agentPod.yaml](https://github.com/checkly/checkly-k8s/blob/main/k8s-manifests/agent-pod.yaml)

Creates a single pod running the Checkly agent. Connects to the Private Location using the API key specified in
[agentSecret.yaml](https://github.com/checkly/checkly-k8s/blob/main/k8s-manifests/agent-secret.yaml). Uses the
[latest image](https://hub.docker.com/r/checkly/agent/tags).

This is a quick way to test the Checkly Agent on your cluster. Be aware, if the container exits, it will not automatically restarted.

### [agentDeployment.yaml](https://github.com/checkly/checkly-k8s/blob/main/k8s-manifests/agent-deployment.yaml)

Create a deployment of Checkly agent pods (default: 2). Connects to the private location using the API key specified in
[agentSecret.yaml](https://github.com/checkly/checkly-k8s/blob/main/k8s-manifests/agent-secret.yaml)). Uses the
[latest image](https://hub.docker.com/r/checkly/agent/tags). Rolling updates are enabled.

### [checklyNamespace.yaml](https://github.com/checkly/checkly-k8s/blob/main/k8s-manifests/checkly-namespace.yaml)

Optional but recommended - Creates a namespace for the Checkly agent resources. Make sure to have NetworkPolicies in place to your other namespaces.
