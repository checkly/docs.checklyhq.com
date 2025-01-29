---
sitemapExclude: true
---

## Variables and secrets
There are two ways to store configuration information in Checkly: Variables and secrets. Both variables and secrets are encrypted at rest and in flight.
- **Variables** are used to store non-sensitive information. Variables are shown in plaintext when being edited, on the check result page and in logs. Variables can be accessed via the CLI and API.
- **Secrets** allow you to store sensitive data for use in checks. Once saved secrets are never shown in the UI or in logs. The secret value cannot be accessed via the CLI or API.

> Secrets are available for [Private Locations](/docs/private-locations/) on agent version `3.3.4` and later. Secrets are available on [CLI](/docs/cli/) version `4.9.0` and later.

> [!WARNING]
> To ensure the integrity of Playwright artifacts (traces, videos and screenshots), the following are not scrubbed, even when saved as secrets: The characters `/` and `*` and the full or partial match of the strings `/artifact/`, `https://`, `http://`, `*********`, and the number `123`.
> Values of the keys `sha1`, `_sha1`, `pageref`, `downloadsPath`, `tracesDir`, `pageId` and any string that ends with `sha1` will not be scrubbed from the Playwright trace, but will be scrubbed from the general check result.
> Numbers are not scrubbed from the Playwright trace, but from the general check result.

From here on, in this document, we refer to both variables and secrets as 'variables' for ease of reading, unless explicitly mentioned.
