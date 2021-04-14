---
title: Private beta feature updates
date: 2018-03-15
author: Tim Nolet
sitemapExclude: true
---

The first couple of weeks of the private beta have been extremely fruitful thanks to you! A lot of the 100+ beta users
came forward with suggestions, bug reports and cool ideas. Here's an overview of the last changes and additions that are
now live.  

<!--more-->

##  Environment variables

You can now extract environment variables from your scripts and refer to them with process.env.MY_VAR. Clicking the lock icon encrypts these values in the Checkly backend. Thanks Spencer and Ilari for the useful feedback!

![](/whats-new/secret_variables.png)


## TV Mode scaling and refresh

TV Mode public dashboard can now paginate through multiple pages and you can set the refresh rate.

![](/whats-new/tv_mode_frequency.png)

## Alert channel ping

You can now quickly check if your Slack or Webhook alert channel is responding by clicking the paper plane icon.

![](/whats-new/channel_ping.png)


## Auto complete on API headers input

Filling out headers for an API request now shows a handy auto complete drop down. Never type Access-Control-Request-Method again!

![](/whats-new/api_headers_autocomplete.gif)

And much more...

- You can now select the time range for the response time graph.
- Script errors are now reported correctly in the interactive run script dialog.
- Passwords in the basic auth section of the API check is by default encrypted.
