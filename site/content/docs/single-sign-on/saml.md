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

# JIT User Provisioning

All accounts with SSO enabled come with Just-in-time (JIT) user provisioning.

This allows all users from your SSO organisation to join your Checkly account by simply by logging in. You don’t need to invite anyone manually (although you still can).

There are two ways your users can access Checkly:

1. Go through your SSO provider and access Checkly from the list of your approved apps.
2. Access the [Checkly Login Page](https://app.checklyhq.com/) directly. 
    1. This requires a user to enter their email in the email field, and then click Continue.

Both approaches seamlessly allow the user to be added to your Checkly account.

## Default user roles

By default, all users provisioned via SSO receive Read & Write permission within Checkly. You are able to modify this behaviour by going to the SSO Configuration and choosing a different role.

## Removing users

If you want to remove users provisioned through SSO, this is a two-step process:

1. Remove their access within your SSO provider.
2. Remove them from your Checkly Team.