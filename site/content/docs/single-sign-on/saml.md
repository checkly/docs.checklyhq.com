---
title: SAML
weight: 72
menu:
  docs:
    parent: "Single sign-on"
---

This page illustrates the standard procedure to follow in order to get started with SAML SSO on Checkly.

> SSO is only available for Checkly's [enterprise plans](/pricing).

## Initial SSO setup

Setting up SSO for your organisation starts with providing [Checkly Support](mailto:support@checklyhq.com) with the following information:

- name / type / brand of your identity provider
- email domain
- sign in URL
- sign out URL
- public X509 certificate

## IdP configuration

After configuration has taken place on Checkly's side, you will receive the following information to configure your IdP:

- a redirect URL (e.g. `https://auth.checklyhq.com/login/callback?connection=<YOUR_CONNECTION_ID>`)
- a signout URL (normally `https://auth.checklyhq.com/logout`)
- XML metadata (e.g. `https://auth.checklyhq.com/samlp/metadata?connection=<YOUR_CONNECTION_ID>`)

Please make sure that Checkly is sent the email address back from your SSO Idp. This way Checkly can map the existing Checkly user to your Idp user. The object returned should have an “email” field, e.g.:

```json
{
	"email": "<EMAIL_ADDRESS>",
	...
}
```

> Note: in case of issues, you might want to double-check your **Entity ID**, which should be: `urn:auth0:checkly:<YOUR_CONNECTION_ID>`

## Testing the integration

Once that is taken care of, you should be able to log in to Checkly via SSO already. Entering an email address associated with the domain you have provided in the login prompt should result in the password field disappearing:

![checkly login prompt without password screenshot](/docs/images/single-sign-on/checkly-login-prompt-sso.png)

After submitting the Checkly login form, you should be redirected to your SSO login interface. Completing the login procedure will then lead you to your existing Checkly account, if you have one, or to the new account creation screen, in case you don't.

> Note: once SAML SSO has been set up, you will still need to invite new users from your organization to your Checkly account, as they will not be added automatically.