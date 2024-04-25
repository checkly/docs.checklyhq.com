---
sitemapExclude: true
---
To start sending traces to Checkly, you need to have the following prerequisites in place:

| Environment variable        | value                     | description                                                                                           |
|-----------------------------|---------------------------|-------------------------------------------------------------------------------------------------------|
| `CHECKLY_OTEL_API_KEY`      | Your OTel API key         | Grab this key in the "send traces" section of the Open Telemetry integration page of the Checkly app. |
| `CHECKLY_OTEL_API_ENDPOINT` | The US or EU API endpoint | Either `https://otel.us-east-1.checklyhq.com/v1/traces` or `https://otel.eu-west-1.checklyhq.com/v1/traces`                                           |
