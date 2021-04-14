---
title: Runner specification
weight: 9999
menu:
  docs:
    parent: "Browser checks"
---

All browser checks run in a sandboxed runtime environment on our cloud backend. You do not have full access to the Node.js
standard library or to arbitrary NPM modules. Currently every runner is equipped with the following libraries:

- **[node](https://nodejs.org/docs/latest-v10.x/api/)** 10.x LTS: The general Node.js execution environment.
- **[puppeteer](https://github.com/GoogleChrome/puppeteer)** 2.0.0: Framework for controlling browsers from Node.js.
  - **[chromium](https://github.com/chromium/chromium/releases/tag/77.0.3844.0)** 77.0.3844.0 (r674921): Chrome browser used with Puppeteer.
- **[playwright](https://github.com/microsoft/playwright)** 1.4.0: Framework for controlling browsers from Node.js.
  - **[chromium](https://github.com/chromium/chromium/releases/tag/83.0.4103.0)** 83.0.4103.0: Chrome browser used with Playwright.
- **[chai](https://www.chaijs.com/)** 4.2.0: Popular assertion library.
- **[expect](https://www.npmjs.com/package/expect)** 26.6.2: The Jest expect assertion library.
- **[mocha](https://mochajs.org/)** 5.0.0: Popular test runner library.
- **[assert](https://nodejs.org/docs/latest-v10.x/api/assert.html)** 10.x: Built-in assertion function.
- **[moment](https://momentjs.com)** 2.22.2: Popular library for all things time related.
- **[axios](https://github.com/axios/axios)**  0.18.0: A modern HTTP library. Support async/await.
- **[crypto-js](https://github.com/brix/crypto-js)** 3.1.9: Cryptographic function library.
- **[lodash](https://lodash.com)** 4.x.x: Javascript toolkit for many object, array and other functions.
- **[aws4](https://github.com/mhart/aws4)** 1.8.0: Third-party library for easily signing AWS API requests.
- **[form-data](https://github.com/form-data/form-data)** 3.x.x: Third-party library for creating form data.

> By default, all our runners have their timezone set to UTC, regardless of their location.

{{< warning >}} 
Note: It is not possible to use both Puppeteer and Playwright in the same Browser Check script.  
{{< /warning >}}
