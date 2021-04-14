---
title: How we store data
weight: 4
menu:
  docs:
    parent: "Monitoring"
---

Every check we run generates a certain amount of data. We call these the "results". Results are made up of various parts:

- Metadata like timestamps, response times, fail/success flags, run location etc.
- JSON or other response bodies, response headers, request timing data
- Screenshot files
- Run logs with debug or `console.log` statements.

## Data Retention

We keep the results data according to the following retention policy:

- Raw events for 30 days
- 1 hour resolution forever

Simply put, you can "scroll back" up to 30 days and inspect all the details of each result. After that, we store aggregates
of the relevant statistics like average, p95 and p99 response time and success ratio.

*We are continuously working on tweaking and improving our data retention policy. Expect updates.*
