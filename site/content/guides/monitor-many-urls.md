---
title: Monitor 500 pages in 2 minutes with Checkly
displayTitle: Monitor 500 pages in 2 minutes with Checkly
description: >-
  By leveraging arrays, sitemap parsing, and dynamic monitor creation, you can ensure comprehensive coverage of your website, API routes, and third-party services—all from a single configuration file.
author: Nočnica Mellifera
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - FAQ
---

Checkly’s model of [Monitoring as Code](https://www.checklyhq.com/guides/getting-started-with-monitoring-as-code/) lets you create site monitors right from your IDE. With the recent release of uptime monitoring, we have the ability to monitor every single URL, API route, and even third party service that makes up our product. We don’t want to write out dozens or hundreds of files for all this monitoring coverage. 

If this is your first interaction with Monitoring as Code, check out our guide on [creating URL Monitors with Monitoring as Code](https://www.checklyhq.com/guides/url-monitoring/). That guide is all you need to create a project with a first monitor.

## tl;dr Here’s how to create lots of monitors at once

Here’s a single file that will create URL monitors from an array:

```ts
//urlArrayMonitors.check.ts
//this will create URL monitors in your Checkly dashboard

import { Frequency, UrlMonitor, UrlAssertionBuilder } from 'checkly/constructs'

//just two URLs in this example, add as many as you want
const sitemapUrls = [
    'https://docs.anthropic.com/de/api/admin-api/workspace_members/get-workspace-member',
    'https://docs.anthropic.com/de/api/admin-api/workspace_members/list-workspace-members'
]

//create paths and friendly names for each monitor
sitemapUrls.forEach((url, index) => {
  const urlPath = new URL(url).pathname.replace(/\//g, '-').replace(/^-+|-+$/g, '') || 'root'
  const monitorId = `checkly-${urlPath}-ping`
  const monitorName = `${urlPath.replace(/-/g, ' ')} pinger`

//create each monitor with a five minute interval
  new UrlMonitor(monitorId, {
    frequency: Frequency.EVERY_5M,
    name: monitorName,
    activated: true,
    request: {
      url: url,
      skipSSL: false,
      followRedirects: true,
      assertions: [
        UrlAssertionBuilder.statusCode().equals(200),
      ]
    }
  })
})
```

This takes an array of URLs and creates a new monitor with a unique ID and name. We can test run these tests with `npx checkly test` and both monitors will run in our CLI’s default region.

![A terminal](/guides/images/monitor-many-urls-01.png)

You can add as many URLs as you’d like to the array and get them monitored at the settings listed. Some lines from this file are worth noting:

```ts
const urlPath = new URL(url).pathname.replace(/\//g, '-').replace(/^-+|-+$/g, '') || 'root'
```

Depending on how you format your input array, this cleanup step may be unnecessary.

```ts
const monitorId = `checkly-${urlPath}-ping`
```

The monitor’s logical ID should stay as stable as possible in later updates. When you deploy this monitor to Checkly, a matching ID will be updated with the history of the monitor preserved. A new Logical ID will mean a new monitor is created, and any IDs that were previously deployed from this project that are now missing will be deleted! If you want to double-check your settings, be sure to run the preview command `npx checkly deploy -p` before deploying (for more detail on this, check out the [guide to creating URL Monitors](https://www.checklyhq.com/guides/url-monitoring/)). By contrast, feel free to update the syntax on the `name` value as much as you would like, this just updates the displayed name.

```ts
UrlAssertionBuilder.statusCode().equals(200),
```

A URL Monitor is the most basic type of monitor that Checkly offers, so the `UrlAssertionBuilder` class only allows you to check the status code. For more advanced assertions on the response, try an [API check](https://www.checklyhq.com/docs/api-checks/#cli-example).

## Parse a Sitemap and Monitor Every URL

As just one extension of this concept, rather than manually downloading and parsing a list of URLs into an array, why don’t we parse our site’s sitemap into a list of URLs to monitor? This extension of the check above grabs a sitemap from a given URL and parses it to create our URL array.

```ts
// sitemapUrlMonitors.check.js
import * as https from 'https';
import { Frequency, UrlMonitor, UrlAssertionBuilder } from 'checkly/constructs'
const sitemapUrl = 'https://openai.com/sitemap.xml/webinar/';

function downloadSitemap(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve(data);
      });
      
      response.on('error', (error) => {
        reject(error);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

function parseSitemap(xmlContent: string): string[] {
  const urls: string[] = [];
  // Simple regex to extract URLs from <loc> tags
  // this should work for most sitemaps but isn't universal.
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  
  while ((match = locRegex.exec(xmlContent)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

console.log(`Downloading sitemap from: ${sitemapUrl}`);

try {
  const xmlContent = await downloadSitemap(sitemapUrl);
  console.log('Sitemap downloaded successfully');
  
  const sitemapUrls = parseSitemap(xmlContent);
  console.log(`Found ${sitemapUrls.length} URLs in sitemap`);
  console.log('\nSitemap URLs:');
  console.log(sitemapUrls);

  //create paths and friendly names for each monitor
  sitemapUrls.forEach((url, index) => {
    const urlPath = new URL(url).pathname.replace(/\//g, '-').replace(/^-+|-+$/g, '') || 'root'
    const monitorId = `checkly-${urlPath}-ping`
    const monitorName = `Checkly ${urlPath.replace(/-/g, ' ')} Monitor`

    //create each monitor with a five minute interval
    new UrlMonitor(monitorId, {
      frequency: Frequency.EVERY_5M,
      name: monitorName,
      activated: true,
      request: {
        url: url,
        skipSSL: false,
        followRedirects: true,
        assertions: [
          UrlAssertionBuilder.statusCode().equals(200),
        ]
      }
    })
  })
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
```

Let's test these URL monitors and preview their deployment with:

```bash
npx checkly test && npx checkly deploy -p
```

If you're using the sitemap URL above (for a list of OpenAI webinar pages), you'll get a short list of monitors that have been tested:

![A terminal](/guides/images/monitor-many-urls-02.png)

Followed by the deployment preview:

![A terminal](/guides/images/monitor-many-urls-03.png)

If these look correct, you’re ready to run `npx checkly deploy` and create your new monitors!

## Next Steps: Grouping, and More Advanced Checks

With all of our monitors managed with a single file, we can update their configuration just by changing the values in the `new UrlMonitor` block above. However, as we have more detailed and nuanced monitoring, it would be nice to have a single place to manage configuration for timing, alerting, and notification channels for a group of checks. All of that is possible with Checkly Groups.

Next, we’d like to apply these tools to more advanced check types like API checks and Browser checks written with Playwright. Check out our documentation on [dynamic monitor creation](https://www.checklyhq.com/docs/cli/dynamic-check-creation/) to see examples of these more complex checks. 

# Conclusion

Can you really monitor 500 pages in two minutes? Absolutely!

With Checkly’s **Monitoring as Code** approach, scaling your monitoring to hundreds or even thousands of pages is effortless. By leveraging Checkly constructs, sitemap parsing, and dynamic monitor creation, you can ensure comprehensive coverage of your website, API routes, and third-party services—all from a single configuration file.

**Key Takeaways:**

- Bulk URL Monitoring: Easily create multiple URL monitors from an array or sitemap.
- Flexible Configuration: Adjust frequency, assertions, and naming dynamically.
- Preview Before Deploy: Use `npx checkly deploy -p` to verify changes before applying them.
- Extend to Advanced Checks: Apply the same principles to [API checks](https://www.checklyhq.com/docs/api-checks/) and [browser checks](https://www.checklyhq.com/docs/browser-checks/).

For more details on structuring and managing your monitors, check out our guides on:

- [Creating URL Monitors](https://www.checklyhq.com/docs/url-monitors/)
- [Dynamic Monitor Creation](https://www.checklyhq.com/docs/cli/dynamic-check-creation/)
- [Organizing Checks with Groups](https://www.checklyhq.com/docs/groups/)

Ready to supercharge your monitoring? Start deploying with Checkly and keep your applications reliable at scale! 🚀