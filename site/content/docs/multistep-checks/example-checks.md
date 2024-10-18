---
title: Multistep check examples
navTitle: Examples
weight: 22
menu:
  resources:
    parent: "Multistep checks"
    identifier: "multistep-example-checks"
cli: true
---

Below are a number of checks showcasing how to use Multistep checks. These are similar to the templates provided in Checkly when creating a new Multistep check and should give you an idea of how to get started building various types of checks.

Some of the examples require setting up authentication tokens to function.

### API authentication and CRUD testing
This check will monitor the functionality of the Checkly check groups API. It will create, get, update and delete a group, cleaning up any data afterwards. [You can find the Checkly API documentation here](https://developers.checklyhq.com/reference). Learn how to:

The Checkly Public API uses API keys to authenticate requests. [You can generate a key for your account here](https://app.checklyhq.com/settings/user/api-keys). 

This example uses environment variables to avoid sharing secrets in clear text. You can learn more about how to use evironment variables in Checkly [here](/docs/browser-checks/variables/).

```ts
import { test, expect } from "@playwright/test"

const baseUrl = "https://api.checklyhq.com/v1"

const headers = {
  Authorization: `Bearer ${process.env.API_KEY}`,
  "x-checkly-account": process.env.ACCOUNT_ID,
}

test("Verify Group API", async ({ request }) => {
  /**
   * Create a group
   */
  const group = await test.step("POST /check-groups", async () => {
    const response = await request.post(`${baseUrl}/check-groups/`, {
      data: {
        locations: ["eu-west-1"],
        name: "createdViaApiCheck",
      },
      headers,
    })
    expect(response).toBeOK()

    return response.json()
  })

  /**
   * Get the newly created group
   */
  await test.step("GET /check-groups/{id}", async () => {
    const response = await request.get(`${baseUrl}/check-groups/${group.id}`, {
      headers,
    })
    expect(response).toBeOK()

    const receivedGroup = await response.json()
    expect(receivedGroup.id).toEqual(group.id)
  })

  /**
   * Update the new group
   */
  await test.step("PUT /check-groups/{id}", async () => {
    const response = await request.put(`${baseUrl}/check-groups/${group.id}`, {
      data: {
        tags: ["public-api", "added-by-check"],
      },
      headers,
    })
    expect(response).toBeOK()
  })

  /**
   * Delete the new group
   */
  await test.step("DELETE /check-group/{id}", async () => {
    const response = await request.delete(
      `${baseUrl}/check-groups/${group.id}`,
      { headers },
    )
    expect(response).toBeOK()
  })
})

```

### Using setup and teardown scripts to prepare and clean up test data
In this example we use `beforeAll` to verify that there's no old test data that will pollute the test, and `afterAll` to remove any data created by the test before it ends. 

To learn more about these methods see the [Playwright documentation](https://playwright.dev/docs/api/class-test#test-after-all).

An API_KEY from https://crudapi.co.uk/ is required for this example to work.

```ts
import { test, expect } from "@playwright/test"

const baseUrl = "https://crudapi.co.uk/api/v1/todo"

const headers = {
  Authorization: `Bearer ${process.env.CRUD_API_KEY}`,
  "Content-Type": "application/json",
}

/**
 * Share state between hooks and test.steps
 */
let createdResources = null

/**
 * Use `beforeAll` as a setup script
 * to make sure no todo's exist.
 */
test.beforeAll(async ({ request }) => {
  const response = await request.get(baseUrl, { headers })
  const { items } = await response.json()
  expect(items.length).toEqual(0)
})

/**
 * Use `afterAll` as a teardown script
 * to remove the created todo before the check ends
 */
test.afterAll(async ({ request }) => {
  if (createdResources) {
    const response = await request.delete(baseUrl, {
      headers,
      data: createdResources,
    })
    expect(response).toBeOK()
  }
})

test("Todo List", async ({ request }) => {
  await test.step("Create a Todo", async () => {
    const response = await request.post(baseUrl, {
      headers,
      data: [
        {
          title: "Testing Checkly Multistep checks",
          done: true,
        },
      ],
    })

    expect(response).toBeOK()
    const { items } = await response.json()
    createdResources = items
  })
})

```

### Verifying binary payloads
One way to ensure that e.g. CDN endpoints are serving images correctly is by verifying its binary. 

Here is an example of how to verify several images in a loop, checking each image against a unique binary.

```ts
import { test, expect } from "@playwright/test"
import crypto from "crypto"

test("Verify Binary Payloads", async ({ request }) => {
  // SpaceX Launch Images
  const IMAGES_TO_VERIFY = [
    {
      url: "https://farm1.staticflickr.com/856/28684550147_49802752b3_o.jpg",
      hash: "46df689c0016e4f06746f07b83546d5e",
    },
    {
      url: "https://farm1.staticflickr.com/927/28684552447_956a9744f1_o.jpg",
      hash: "ffb011da0c7cc45413c632ccd62947cf",
    },
    {
      url: "https://farm2.staticflickr.com/1828/29700007298_8ac5891d2c_o.jpg",
      hash: "eab74946120df579967922794e387276",
    },
    {
      url: "https://farm1.staticflickr.com/914/29700004918_31ed7b73ef_o.jpg",
      hash: "5e20e98a63522a0829aa5ad0003e52c6",
    },
  ]

  for (const [index, { url, hash }] of IMAGES_TO_VERIFY.entries()) {
    await test.step(`Fetch image #${index}`, async () => {
      const response = await request.get(url)

      const body = await response.body()
      expect(crypto.createHash("md5").update(body).digest("hex")).toBe(hash)
    })
  }
})
```

If you have suggestions for additional check examples to add here, please do not hesitate to reach out to our [support](mailto:support@checklyhq.com), join our [Slack community](https://www.checklyhq.com/slack/) or submit a PR to our [public Docs repository](https://github.com/checkly/docs.checklyhq.com/).