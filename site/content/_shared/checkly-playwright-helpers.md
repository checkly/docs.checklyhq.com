---
sitemapExclude: true
---
To trigger a degraded state, checks use a helper library, `@checkly/playwright-helpers`, which is included in runtimes `2023.09` and later. 
The helper library contains two methods, `markCheckAsDegraded` and `getAPIResponseTime`. 

### Installing and importing

```bash
npm i @checkly/playwright-helpers
```

{{< tabs "import_lib" >}}
{{< tab "Typescript" >}}
```ts
import { getAPIResponseTime, markCheckAsDegraded } from '@checkly/playwright-helpers'
```
{{< /tab >}}
{{< tab "Javascript" >}}
```js
const { getAPIResponseTime, markCheckAsDegraded } = require('@checkly/playwright-helpers')
```
{{< /tab >}}
{{< /tabs >}}

> `@checkly/playwright-helpers` is also available for use in Browser and Multistep checks.

### markCheckAsDegraded
Marks a check as degraded if:
- The check is failing with soft assertions, or
- The check has no failures

> If your check is failing due to a timeout or failed non-soft assertion it will be considered failing, even if `markCheckAsDegraded` is called.

**Usage**
```ts
if (foo.length > 100) {
  markCheckAsDegraded('Foo is too long.')
}
```

**Arguments**
- `reason` String *(optional)*. Logged when the method is called. Used to identify which method caused the degradation.

### getAPIResponseTime
Gets the request response time.

**Usage**
```ts
if (getAPIResponseTime(response) > 100) {
  markCheckAsDegraded('Response was too slow.')
}
```

**Arguments**
- `response` [APIResponse](https://playwright.dev/docs/api/class-apiresponse) *(required)*. A response from a Playwright API request.
