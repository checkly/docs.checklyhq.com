---
title: Kubernetes Events - A Native Resource for State Insight
displayTitle: Kubernetes Events
navTitle: Events
description: In Kubernetes, **Events** are a native resource, providing insight into actions and state changes of objects in the cluster. Events are platform-generated messages accessible through the Kubernetes API, often used by operators and users to understand what has happened to various Kubernetes objects.
date: 2024-11-08
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: How events can help you explore change of state on your cluster

menu:
  learn:
    parent: "Kubernetes"
weight: 65
---

## Introduction

In Kubernetes, **Events** are a native resource, providing insight into actions and state changes of objects in the cluster. Events are platform-generated messages accessible through the Kubernetes API, often used by operators and users to understand what has happened to various Kubernetes objects. While they act similarly to logs, Events differ in that they aren’t usually stored in logging backends; instead, they are stored in Kubernetes’ etcd and retained for a short period, typically around one hour.

Events serve as valuable resources for monitoring and debugging, allowing users to quickly gather information about object actions in the cluster. This document introduces Kubernetes Events, their mechanics, and how to use them for effective alerting and monitoring.

---

## Event Mechanics

Kubernetes Events can be accessed by querying the Kubernetes API. Each Event describes an action related to a Kubernetes object, such as a Pod, Deployment, or Node. These Events are often labeled with the following attributes:
- **Type**: Indicates whether the Event is `Normal` (standard actions) or `Warning` (indicating potential issues).
- **Reason**: Short code identifying the type of action.
- **Age**: How long ago the Event occurred.
- **From**: The source component generating the Event, such as `kubelet`.
- **Message**: Describes the action taken or the issue observed.

---

### Example: Viewing Events for a Pod

To see Events associated with a specific Pod, use the `kubectl describe` command. Here’s an example output for a Pod named `webapp-5d8dbbd4bb-2lqfs`:

```bash
$ kubectl describe pod webapp-5d8dbbd4bb-2lqfs
Name: webapp-5d8dbbd4bb-2lqfs
Namespace: production
...
Events:
Type    Reason     Age   From                                 Message
----    ------     ----  ----                                 -------
Normal  Scheduled  <unknown>  default-scheduler               Successfully assigned production/webapp-5d8dbbd4bb-2lqfs
Normal  Pulling    45s    kubelet, ip-10-0-1-233              Pulling image "webapp:v1.2"
Normal  Pulled     42s    kubelet, ip-10-0-1-233              Successfully pulled image "webapp:v1.2"
Normal  Created    42s    kubelet, ip-10-0-1-233              Created container webapp
Warning BackOff    40s    kubelet, ip-10-0-1-233              Back-off restarting failed container
```

In this output, each Event shows a timestamp and message about actions related to the Pod, from scheduling to a restart back-off warning.

### Example: Viewing Events for a Namespace

To retrieve Events for all resources in a namespace, you can use the `kubectl get events` command:

```bash
$ kubectl get events -n production
LAST SEEN   TYPE    REASON               OBJECT                     MESSAGE
1m12s       Normal  Scheduled            pod/webapp-5d8dbbd4bb-2lqfs Successfully assigned production/webapp-5d8dbbd4bb-2lqfs
1m10s       Normal  Pulling              pod/webapp-5d8dbbd4bb-2lqfs Pulling image "webapp:v1.2"
1m8s        Normal  Pulled               pod/webapp-5d8dbbd4bb-2lqfs Successfully pulled image "webapp:v1.2"
1m8s        Normal  Created              pod/webapp-5d8dbbd4bb-2lqfs Created container webapp
1m8s        Warning BackOff              pod/webapp-5d8dbbd4bb-2lqfs Back-off restarting failed container
1m15s       Normal  SuccessfulCreate     replicaset/webapp-5d8dbbd4bb Created pod: webapp-5d8dbbd4bb-2lqfs
1m15s       Normal  ScalingReplicaSet    deployment/webapp            Scaled up replica set webapp-5d8dbbd4bb to 1
```

This output shows Events from the namespace, covering various resources, such as Pods, ReplicaSets, and Deployments, with some Events indicating a container restart issue for further investigation.
---

## Monitoring and Alerting with Events

Events provide real-time insights, allowing operators to monitor Kubernetes activity. Although not commonly used for direct automation, some approaches leverage Events for alerting and monitoring:

### Event Exporters

An **Event exporter** can expose Events as metrics to external monitoring systems. For example, Prometheus can scrape metrics derived from Events, enabling alerting based on conditions like frequent container restarts or persistent failures in Pod scheduling. 

Using an Event exporter requires deploying a tool that collects Events and converts them into Prometheus metrics. This setup enables teams to build custom alerts and dashboards, adding proactive monitoring capabilities that go beyond Kubernetes’ default Event retention period.

---

## Conclusion

Kubernetes Events offer valuable information about the actions and status of objects within a cluster. With Events, operators gain a straightforward way to monitor and troubleshoot Kubernetes activities. When integrated with external monitoring solutions, Events can also play a significant role in proactive alerting and incident management.