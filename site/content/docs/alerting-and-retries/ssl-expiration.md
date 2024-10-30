---
title: Monitoring SSL certificate expiration in Checkly - Checkly Docs
displayTitle: Monitoring SSL certificate expiration in Checkly
navTitle: SSL Cert expiration
weight: 33
menu:
  resources:
    parent: "Alerting & retries"
aliases:
- "/whats-new/summer-update/docs/alerting/ssl-expiration/"
- "/whats-new/introducing-sms-pagerduty/docs/alerting/ssl-delivery/"
---

An expired SSL certificate can cause havoc to sites and APIs. Checkly performs an hourly check on your certificate and can
alert you up to 30 days before your certificate expires. All alert channels (e-mail, SMS, OpsGenie, Webhook etc.) can be used for this alert.

Simply create or pick an existing alert channel that your check subscribes to and enable *SSL certificate expiration* and
set the day threshold to your preference. If you don't have your alert channels set up yet, see [Alert Channels](/docs/alerting-and-retries/alert-channels/).

![Example alert channel form](/docs/images/alerting/ssl_check_example.png)

Some tips on using SSL alerts

- You can create specific alert channels for certificate expirations and subscribe all checks/groups to that channel.
- You can create multiple alert channels with different thresholds if you want to be alerted at multiple thresholds.

## API checks
The domain for the certificate is parsed from the `URL` in the HTTP request settings so it does not require any setup.


{{<warning>}}
When using [environment variables in the URL](/docs/api-checks/variables/#accessing-variables-in-api-checks), make sure that the domain is fully specified.
SSL monitoring cannot parse the domain from a URL like `{{BASE_URL}}/test-endpoint`, but using environment variables in other parts of the URL like `https://checklyhq.com/{{TEST_PATH}}` works.
{{</warning>}}

### Getting `Error: unable to verify the first certificate`
If prompted with this error, the usual cause is the certificate chain of the given website being incomplete. This will
not happen with a browser check, because the browser will complete the certificate chain on its own. When running an API check,
though, no browser is involved - therefore the error takes place. You can use an online SSL checker
(e.g.: [SSLHopper](https://www.sslshopper.com/ssl-checker.html)) to help you diagnose issues with your certificate.

## Browser checks
Since browser checks can connect to multiple domains, you need to set the SSL certificate domain to receive certificate alerts for them.

![SSL checks for browser checks](/docs/images/alerting/browser_ssl_check.png)
