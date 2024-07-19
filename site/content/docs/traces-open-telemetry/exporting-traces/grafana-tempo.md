---
title: Grafana Tempo
head:
  title: "Exporting traces to Grafana Tempo from Checkly"
metatags:
  title: "Exporting traces to Grafana Tempo from Checkly"
  description: "Export traces from Checkly to Grafana Tempo for better observability."
weight: 22
menu:
  platform:
    parent: "Export traces to 3rd party tools"
beta: true
aliases:
  - "/docs/open-telemetry/exporting-traces/grafana-tempo/"
---

1. Make sure you have Grafana Tempo installed, running and accessible. If you are running Grafana Cloud, the Tempo
   datasource is already pre-configured. Find it at **Connections** > **Datasources** > **Tempo**.
2. After installing, grab the Tempo endpoint URL. It should look like `https://tempo-eu-west-0.grafana.net/tempo`.
3. Under the section **Authentication**, grab the user and password for the Tempo endpoint.
4. As Tempo uses Basic Authentication, you need to provide the user and password in a `Authorization: Basic user:password` HTTP header in
   Checkly integration settings, where the `user:password` section is base64 encoded. You can use an online tool like [base64encode.net](https://www.base64encode.net/)
   to encode your user and password.

Find all the details in the [Grafana Tempo OpenTelemetry documentation](https://grafana.com/docs/tempo/latest/).

