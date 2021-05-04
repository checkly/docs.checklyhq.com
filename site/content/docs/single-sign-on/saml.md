---
title: SAML
weight: 2
menu:
  docs:
    parent: "Single sign-on"
---

This page illustrates the standard procedure to follow in order to get started with SAML SSO on Checkly.

## Initial SSO configuration

Setting up SSO for your organisation starts with providing [Checkly Support](mailto:support@checklyhq.com) with the following information:

- name / type / brand of your identity provider
- email domain
- sign in URL
- sign out URL
- public X509 certificate

## Testing the SSO integration

After configuration has taken place on Checkly's side, you will receive the following information to configure your IdP:

- a redirect URL
- a signout URL
- configuration details in XML format

Once that is taken care of, you should be able to log in to Checkly via SSO already. Entering an email address associated with the domain you have provided in the login prompt should result in the password field disappearing:

![checkly login prompt without password screenshot](/docs/images/single-sign-on/checkly-login-prompt-sso.png)

After submitting the Checkly login form, you should be redirected to your SSO login interface. Completing the login procedure will then lead you to your existing Checkly account, if you have one, or to the new account creation screen, in case you don't.

> Note: once SAML SSO has been set up, you will still need to invite new users from your organization to your Checkly account, as they will not be added automatically.