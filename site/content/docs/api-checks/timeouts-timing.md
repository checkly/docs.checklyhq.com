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

## ESOCKETTIMEDOUT

Sometimes API checks return this error, without any other information on what caused it. Essentially what is happening is Checkly closing the connection after the 30 seconds timeout because the server didn’t respond. 

- Usually this indicates something is causing intermittent network issues on the application side.
- There will probably be no errors in the application logs, as it was not even possible to stablish a connection.
- The response headers will be empty. A socket timeout means there is no successful connection with the API at the TCP and/or DNS level. Therefore, there are no response headers. If Checkly doesn't get a connection, there is nothing to send back, e.g. the response headers.

