---
title: Use cases
weight: 50
menu:
  docs:
    parent: "Analytics"
---

### Building a Grafana dashboard

Following these instructions you'll see how to use the **Analytics API** within a [Grafana](https://grafana.com/) dashboard:

1. Creating the Data Source

First, you need to create the Data Source with the Analytics API connection. Installing the [JSON API](https://grafana.com/grafana/plugins/marcusolsson-json-datasource/) plugin you'll be able to consume any REST API and handle JSON response output.

![grafana data source creation](/docs/images/analytics/grafana-data-source-creation.png)

2. Configuring a component

Then, you can pick a **Time series** component and configure it by selecting the `Checkly Analytics API` data source and setting the HTTP required header and query parameters to fetch the output JSON. You'll find detailed parameters documentation in the [API docs](https://developers.checklyhq.com/reference/getv1analyticsapichecksid)

In the following image you'll see all required configuration for a component:

- ![#cc66ff](https://placehold.co/15x15/cc66ff/cc66ff.png) `Fields`
- ![#cc9900](https://placehold.co/15x15/cc9900/cc9900.png) `Path`
- ![#3399ff](https://placehold.co/15x15/3399ff/3399ff.png) `Query parameters`
- ![#ff0000](https://placehold.co/15x15/ff0000/ff0000.png) `Header`
- ![#33cc66](https://placehold.co/15x15/33cc66/33cc66.png) `Variables` (optional)

![grafana component configuration](/docs/images/analytics/grafana-component-configuration.png)

1. Designing the dashboard

You can mix multiple data presentation components to create useful and beautiful showing different response. The following screenshot image shows a dashboard with three types of results: aggregated, non-aggregated and summarized grouped by location.

![grafana dashboard design](/docs/images/analytics/grafana-dashboard-design.png)

### Creating reports with Google Sheets

You can start creating your reports by making using our public Google Sheets report example template. The spreadsheet includes the `=ChecklyAPI()` function to consume the Checkly Public API just entering configuring your credentials.

1. Make a copy of our public Google Sheets template (available [here](https://docs.google.com/spreadsheets/d/1ChcFMzuO2LOJVqu7kLGjqXf-0WmnD49_ghRLmm-OQAc/edit#gid=747858019))
2. Add your `Account Id` and `API Key` in the Apps Script code (be careful if you'll share your spreadsheet with your credentials)
![google sheets apps script menu](/docs/images/analytics/google-sheets-apps-script-menu.png)
![google sheets apps script credentials](/docs/images/analytics/google-sheets-apps-script-credentials.png)
1. Navigate the `Metrics` and `Checks` pages to confirm `Checkly Public API` requests are working
2. Go to the `Analytics Report` page, pick a check, pick a metric and see if the chart shows the correct information
![google sheets report](/docs/images/analytics/google-sheets-reports.png)
![google sheets report summarized](/docs/images/analytics/google-sheets-reports-summarized.png)

You'll find dropdown cells to select the check, number of results, quick time range presets, or grouping attribute.
