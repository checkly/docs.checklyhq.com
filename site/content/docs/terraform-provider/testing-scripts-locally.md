---
title: Testing scripts locally
weight: 8
menu:
  docs:
    parent: "Terraform provider"
---

Having the possibility to run Playwright scripts for your browser checks locally will allow you to develop them faster and with more confidence.

## Enabling local script execution

You can easily enable local execution by storing your browser check scripts in local folders and passing the path to the right script:

```terraform
resource "checkly_check" "e2e-checkout" {
  name                      = "Checkout Flow"
  type                      = "BROWSER"
  activated                 = true
  should_fail               = false
  frequency                 = 1
  double_check              = true
  ssl_check                 = false
  use_global_alert_settings = true
  locations = [
    "us-west-1",
    "eu-central-1"
  ]

  script = file("${path.module}/scripts/checkout.js") // Our script is contained in this file
}
```

In order to have the script work both locally and on Checkly without changes, make sure your script is wrapped in an async function:

```javascript
async function run () {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const response = await page.goto('https://danube-web.shop')

  // ...
  
  await page.close()
  await browser.close()
}

run()
```

If your script is taking advantage of Checkly's code snippets, you can keep your setup nice and tidy and just `require` your snippets right in your script:

```javascript
require('./snippets/login'); // This gives you access to your snippet locally and on Checkly

async function run () {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const response = await page.goto('https://danube-web.shop')

  performLogin(page) // You can invoke functions from your snippet

  // ...
  
  await page.close()
  await browser.close()
}

run()
```

You can point to the same file you use for your snippet when creating your snippet resource:

```terraform
resource "checkly_snippet" "procedure-login" {
  name   = "Login"
  script = file("${path.module}/snippets/login.js") // Your script is contained in this file
}
```

{{<info>}}
The `./snippets/` path is where Checkly will make your snippets available. Use this directory in your Terraform setup to keep things consistent.
{{</info>}}