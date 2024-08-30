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
You can connect the Traces export to Grafana using the OpenTelemetry Integration and Grafana Tempo.

1. Make sure that you have Tempo running on your Grafana Cloud Instance at `yourOrganization.grafana.net`. Find it at **Connections > Search for Tempo > Check if Tempo Data source is marked as installed**.
   
1. In Grafana Cloud (`grafana.com/orgs/yourOrganization`), head over to **Connections** > **Add new connection** > **OpenTelemetry (OTLP)**.
  ![Add an OTLP connection in Grafana Cloud](/docs/images/otel/export-traces/grafana-cloud-opentelemetry.png)

1. Copy the endpoint URL and append `v1/traces` to it.
  ![Grafana OTLP endpoint](/docs/images/otel/export-traces/grafana-otlp-endpoint-config.png)
  It should be similar to:`https://otlp-gateway-prod-eu-west-2.grafana.net/otlp/v1/traces`.
   
1. Generate an OTLP Token, and copy both the Instance ID and the OTLP Token as well.
  ![Generate an OTLP token](/docs/images/otel/export-traces/create-otlp-token-grafana.png)

1. Head back to the [Traces Settings page](https://app.checklyhq.com/settings/account/traces) on Checkly.

  * Enable exporting traces and add the endpoint URL from step 3.
  * and in the **Headers** section, specify the HTTP Header:  `Authorization` and `Basic instance:token`, where `instance:token` is base64 encoded.
    You can use an online tool like [base64encode.net](https://www.base64encode.net/)
   to encode your instance and token.
    ![Export Traces configuration](/docs/images/otel/export-traces/export-traces-to-grafana-config.png)

2. Back in your Grafana Cloud Instance (for example danube.grafana.net), head over to "Explore", select the *Tempo* source that is named `grafanacloud-yourOrganization-traces`:
  ![Select Tempo traces data source](/docs/images/otel/export-traces/grafana-cloud-tempo-source.png)

    Now, click **Search** to see the table of Traces received. The ones exported by Checkly, have `checkly` in the service column.
    ![See Checkly Traces in Grafana](/docs/images/otel/export-traces/grafana-explore-checkly-traces.png)


Find more the details in the [Grafana OpenTelemetry documentation](https://grafana.com/docs/grafana-cloud/send-data/otlp/send-data-otlp/?pg=traces&plcmt=hero-btn-2#before-you-begin).
