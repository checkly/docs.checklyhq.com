---
title: IP information & versions
weight: 8
menu:
  platform:
    parent: "Monitoring"
---

##  IPv4 and IPv6 support

Checkly supports both IPv4 and IPv6. We have a dual stack setup, meaning that we can reach both IPv4 and IPv6 addresses from
our check runtime.

Note that for most workloads (API checks, browser checks, etc.) the IPv6 stack is preferred over IPv4. This means that 
if your endpoint is reachable over IPv6, we will use that. If not, we will fall back to IPv4.

You can actually influence this behaviour in a browser check by passing the `--host-resolver-rules` flag to a `chromium`
instance. In the code example below, we force the browser to use IPv4, whereas the host `dual.tlund.se` is reachable over 
both IPv4 and IPv6.

```ts
import { test, chromium } from '@playwright/test'

test('Set host resolver to IPv4', async () => {

  const browser = await chromium.launch({
    args: ['--host-resolver-rules=MAP dual.tlund.se 193.15.228.195']
  });

  const page = await browser.newPage();
  await page.goto('http://dual.tlund.se/')
});
```

### Known limitations

Puppeteer-based browser checks do not support IPv6 and will not in the future as we are deprecating Puppeteer support.

## Static IP ranges

We currently do not have a set of fixed, public IP ranges but are working on this. See and follow [our public roadmap item on static
IPs](https://checkly.featurebase.app/submissions/6464dc4c0f356460eca41435) for updates.

Note, if you are looking to allowlist Checkly traffic, [see our docs on allowlisting](/docs/monitoring/allowlisting/).
