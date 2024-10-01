---
sitemapExclude: true
---

## Variables and secrets
There are two ways to store configuration information in Checkly: Variables and secrets. Both variables and secrets are encrypted at rest and in flight.
- **Variables** are used to store non-sensitive information. Variables are shown in plaintext when being edited, on the check result page and in logs. Variables can be accessed via the CLI and API.
- **Secrets** allow you to store sensitive data for use in checks. Once saved secrets are never shown in the UI or in logs. The secret value cannot be accessed via the CLI or API.

{{< warning >}}
Note that for browser checks, secrets are only hidden in the Checkly native UI, not in any generated Playwright artifacts, such as Traces, Screenshots or Videos.
{{< /warning >}}
{{<info>}}
Secrets are available for [Private Locations](/docs/private-locations/) on agent version `3.3.4` and later.
{{</info>}}

From here on, in this document, we refer to both variables and secrets as 'variables' for ease of reading, unless explicitly mentioned.