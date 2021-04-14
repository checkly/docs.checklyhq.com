---
title: Timeouts and timing phases
weight: 7
menu:
  docs:
    parent: "API checks"
---

All API checks are capped at a timeout of **30 seconds**. With each request, we record the most relevant timing phases. This can help you troubleshoot slow responses, e.g. your DNS might be slow.

The timing phases correspond to the Node.js request library timing phases:

- `wait`: Duration of socket initialization
- `dns`: Duration of DNS lookup
- `tcp`: Duration of TCP connection
- `firstByte`: Duration of HTTP server response
- `download`: Duration of HTTP download

![api monitoring timing phases](/docs/images/api-checks/timing-phases.png)
