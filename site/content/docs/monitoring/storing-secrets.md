---
title: Storing secrets
weight: 5
menu:
  docs:
    parent: "Monitoring"
---

For many monitoring situations you will want to use some secrets like user names, password and even credit card numbers.
Here are our guidelines on using secrets with Checkly:

**1. Use dedicated test users, test cards** etc. These test users should have minimal privileges in your app. Do not use your 
`admin` or `root` user. Make sure you can easily disable or block these users without recourse.

**2. Keep secrets separate** from your browser scripts and store them as environment variables in Checkly. This 
way you can reuse secrets in multiple scripts and rotate them as needed.

**3. Checkly encrypts your secrets**: at rest in the database and in flight as we transport it to the check locations. 
Decryption is only done when we need to read it.


