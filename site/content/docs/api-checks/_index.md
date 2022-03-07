---
title: Overview
weight: 1
slug: /
menu:
  docs:
    parent: "API checks"
    identifier: overview-api-checks
---

API checks consist of two parts:

**1. An HTTP request** 

This is where you configure the method, body, headers etc. which determines the response sent back by your API.  
[Read more about HTTP request settings]({{< ref "request-settings.md" >}})

**2. One or more assertions** 

This is where you determine whether the response of the HTTP request is correct or within acceptable bounds.  
[Read more about assertions]({{< ref "assertions.md" >}})

These two phase are executed under the hood by the Node.js request library and the chai.js assertions library. All checks are executed on Amazon's AWS Lambda infrastructure.

##
||
| ------------- |
<div class="contribute-doc">
<p><img src="/docs/images/icons/edit.png" width="14px" height="14px">
You can contribute to this documentation by 
<a href="https://github.com/checkly/checklyhq.com/tree/main/site/content/docs" target="_blank"> editing this page on Github </a></p>
</div>
