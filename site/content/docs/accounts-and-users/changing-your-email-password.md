---
title: Changing your email or password in Checkly - Checkly Docs
displayTitle: Changing your email or password in Checkly
navTitle: Changing email or password
weight: 52
menu:
  resources:
    parent: "Accounts & Users"
---

Changing your email and / or password is handled differently depending on how you signed up for Checkly. Please check 
below for the scenario that applies to you:

## Changing your email

All user authentication management for Checkly is handled by Auth0. This means that changing your email address is not possible directly from the Checkly UI.
This means that changing your email address is equivalent to adding a new user (with a different email address) to Checkly and transferring any roles or permissions to the new user.

The simplest way to achieve this is to:

1. Go to the [members section of your account settings](https://app.checklyhq.com/settings/account/members).
2. Invite the user with the new email address to your account. That email address will receive an invite email.
3. Sign up with the new email address by clicking the link in the invite email.
4. Transfer any roles or permissions from the old user to the new user.
5. Optionally, remove your "old" user from the account.

## Changing your password

{{<warning>}}
Changing your password is not available on SSO connections or social login providers like Google and GitHub. Password changes are only available for users who have signed up with an email and password.
{{</warning>}}

To change your password, follow these steps:

1. Log out of your current session.
2. Go to the [login page](https://app.checklyhq.com/login).
3. Click the **Don't remember your password?** link.
4. Follow the instructions to reset your password.

After successfully resetting your password, you can log in with your new password.
