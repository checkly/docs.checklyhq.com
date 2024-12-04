---
title: Introduction to Kubernetes Operators - scraping metrics with Prometheus
displayTitle: 
navTitle: Operators
description: Operators in Kubernetes enable custom automation by encapsulating specific operational knowledge within Kubernetes itself. They function as custom controllers that manage complex applications and provide features like automated deployment, scaling, and management.
date: 2024-11-08
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: How to create a first Kubernetes operator, and monitor the operator state with Prometheus.

menu:
  learn:
    parent: "Kubernetes"
weight: 70
---

Operators in Kubernetes enable custom automation by encapsulating specific operational knowledge within Kubernetes itself. They function as custom controllers that manage complex applications and provide features like automated deployment, scaling, and management. Operators work by observing resources and adjusting Kubernetes state based on custom logic, extending beyond standard deployment and service management.

With operators, you can manage resources beyond the built-in types like Pods and Services. For example, creating an operator to deploy a database that automatically scales, backs up, and restores adds significant automation capability to Kubernetes.

#### What is Kubebuilder?

Kubebuilder is a development framework for building Kubernetes operators using the Go programming language. It provides project scaffolding, resource definitions, and controller logic to simplify operator creation. In short, Kubebuilder allows developers to create CRDs (Custom Resource Definitions) and controllers, which watch Kubernetes resources and act upon changes.

#### Setting Up a Project with Kubebuilder

The typical process starts by setting up a basic project structure using the `kubebuilder init` command. This scaffolds the folders and files necessary for an operator project. The following commands initialize a project and create a custom API for a simple application:

```bash
kubebuilder init --domain example.com --repo github.com/example/my-operator
kubebuilder create api --group app --version v1 --kind WebApp
```

This creates a project structure that includes an API definition for `WebApp`, a custom resource that will deploy and manage a Kubernetes Deployment and Service.

#### Adding Metrics to the Operator

For observability, we can integrate Prometheus metrics into the operator. In Kubernetes, Prometheus can scrape data from custom endpoints to provide insights into application behavior. By using the `prometheus.NewCounter` method from the Prometheus Go client, we set up counters to track resource actions, such as the creation and deletion of `WebApp` instances.

In the controller’s main loop, you might add code like this to register counters:

```go
var (
    createCounter = prometheus.NewCounter(
        prometheus.CounterOpts{
            Name: "webapp_create_total",
            Help: "Total number of WebApp creations",
        },
    )
)

func init() {
    prometheus.MustRegister(createCounter)
}
```

Each time the reconciliation loop (the main loop of the controller) handles a creation or update event, the counter increments.

#### Deploying Prometheus to Scrape Metrics

You must configure Prometheus to scrape the operator’s metrics endpoint. To achieve this, add a scrape configuration to the Prometheus setup, pointing to the operator service endpoint:

```yaml
scrape_configs:
  - job_name: 'webapp_operator'
    static_configs:
      - targets: ['webapp-operator-service.default.svc.cluster.local:8080']
    metrics_path: /metrics
    scrape_interval: 15s
```

With Prometheus deployed, the operator exposes metrics under the `/metrics` path, which Prometheus regularly scrapes to collect data.

#### Running the Operator and Observing Metrics

After deploying the operator to a Kubernetes cluster (e.g., a local KIND cluster), we can create custom `WebApp` resources that initiate deployments. By applying YAML files with the custom `WebApp` definitions, developers can observe metrics that Prometheus scrapes and view them in a dashboard like Grafana.

For instance, creating or updating a `WebApp` resource increases the counter for created deployments, visible in both the Prometheus and Grafana dashboards:

```yaml
apiVersion: app.example.com/v1
kind: WebApp
metadata:
  name: sample-webapp
spec:
  replicas: 2
  image: nginx:latest
  port: 80
```

Upon applying this YAML, Prometheus will capture the increment in creation counters. Similarly, any updates to the deployment reflect in the metrics, making it possible to track deployment status directly from Prometheus.

#### Conclusion

Operators with custom metrics offer a valuable mechanism for managing Kubernetes resources and observing application behavior in real time. Using Kubebuilder and Prometheus, developers can integrate meaningful metrics into their operators, enabling better monitoring and automation within Kubernetes.

This combination of Kubebuilder for operator creation and Prometheus for metric collection allows teams to leverage Kubernetes for more than just basic application hosting—it becomes a powerful automation and observability platform.