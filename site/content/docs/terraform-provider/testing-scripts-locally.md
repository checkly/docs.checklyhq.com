---
title: Testing scripts locally
weight: 8
menu:
  integrations:
    parent: "Terraform provider"
---

Having the possibility to run Playwright Test scripts for your browser checks locally will allow you to develop them faster and with more confidence.

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
  use_global_alert_settings = true
  locations = [
    "us-west-1",
    "eu-central-1"
  ]

  script = file("${path.module}/scripts/checkout.spec.ts") // Or .js - our script is contained in this file
}
```

Basic checks written with `@playwright/test` will run locally with `npx playwright test` and remotely on Checkly without any modifications: 

{{< tabs "Basic Example" >}}
{{< tab "TypeScript" >}}
 ```ts
import { test, expect } from '@playwright/test'

test('Should load the web store', async ({ page }) => {
  await page.goto('https://danube-web.shop')

  await expect(page).toHaveTitle('danube-store')
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
 ```js
const { test, expect } = require('@playwright/test')

test('Should load the web store', async ({ page }) => {
  await page.goto('https://danube-web.shop')

  await expect(page).toHaveTitle('danube-store')
})
 ```
{{< /tab >}}
{{< /tabs >}}

If your script is using [Page Object Models](https://playwright.dev/docs/pom) or imports other files, you can take advantage of Checkly's [code snippets](/docs/terraform-provider/snippets-variables/). Consider the following directory structure:


 ```
scripts /
|--- snippets /
|     |--- shoppingCart.ts // or .js
|--- checkout.spec.ts // or .js
```

`scripts/snippets/shoppingCart.{js,ts}` contains a Page Object Model class encapsulating the logic for the store's shopping cart page:

{{< tabs "Shopping Cart POM" >}}
{{< tab "TypeScript" >}}
 ```ts  
import { type Locator, type Page } from '@playwright/test'

export class ShoppingCart {
  shoppingCartButton: Locator
  summary: Locator

  constructor ({ page }: { page: Page }) {
    this.shoppingCartButton = page.locator('#cart')
    this.summary = page.locator('.cart')
  }

  async clickShoppingCartButton () {
    return this.shoppingCartButton.click()
  }
}
```
{{< /tab >}}
{{< tab "JavaScript" >}}
 ```js
export class ShoppingCart {
  constructor ({ page }) {

    this.shoppingCartButton = page.locator('#cart')
    this.summary = page.locator('.cart')
  }

  async clickShoppingCartButton () {
    return this.shoppingCartButton.click()
  }
}
 ```
{{< /tab >}}
{{< /tabs >}}

`scripts/checkout.spec.{js,ts}` file is your Checkly check with the following content:

{{< tabs "Checkout.spec.ts" >}}
{{< tab "TypeScript" >}}
 ```ts
import { test, expect } from '@playwright/test'
import { ShoppingCart } from './snippets/shoppingCart'

test('Shopping cart should be empty by default', async ({ page }) => {
  await page.goto('https://danube-web.shop')

  const shoppingCart = new ShoppingCart({ page })

  await shoppingCart.clickShoppingCartButton()

  await expect(shoppingCart.summary).toContainText('Your shopping cart is empty')
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
 ```js
const { test, expect } = require('@playwright/test')
const { ShoppingCart } = require('./snippets/shoppingCart')

test('Shopping cart should be empty by default', async ({ page }) => {
  await page.goto('https://danube-web.shop')

  const shoppingCart = new ShoppingCart({ page })

  await shoppingCart.clickShoppingCartButton()

  await expect(shoppingCart.summary).toContainText('Your shopping cart is empty')
})
 ```
{{< /tab >}}
{{< /tabs >}}

As you can see, it imports the `ShoppingCart` class from the `./snippets/shoppingCart` directory and uses its methods and locators within the test. This setup will work out of the box locally with `npx playwright test`. If you'd like to use the external files in Checkly, you'll need to declare them as a `checkly_snippet` resource in your `.tf` file:

```terraform
resource "checkly_snippet" "shopping_cart" {
  name   = "shoppingCart" // This will be the name of your file in Checkly!
  script = file("${path.module}/scripts/snippets/shoppingCart.ts") // Or .js - Your script is contained in this file
}
```

{{<info>}}
What's worth noting:

- Checkly will infer the name for the snippet file based on the `name` property of the resource schema. Hence, it's best to name it the same as the local file.
- The `./snippets/` path is where Checkly will make your snippets available. Use this directory in your Terraform setup to keep things consistent.
{{</info>}}

If you'd like to store the snippet files in a different directory, using environment variables to define the paths for local and remote execution could be a solution. 
