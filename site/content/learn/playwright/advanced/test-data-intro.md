---
title: Handling test data
subTitle: Introduction to fixture handling
date: 2020-07-16
author: Giovanni Rago
githubUser: ragog
tags:
  - test data
  - testing
weight: 26
menu:
  learn:
    parent: "Best practices"
---

We define _test data_ as any data we consistently use to verify properties such as a system's functionality or performance. Another popular term for the same concept is _fixture_. We will use these interchangeably.

<!-- more -->

## Avoiding duplication

It is often desirable to [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) up our scripts by factoring out test data. In the case of simple tests, it's usually not an issue to embed test data directly inside our script, but complex end-to-end scenarios might require moving this information elsewhere, like a dedicated file.

Looking at our [test webshop](https://danube-store.herokuapp.com/), we might want to verify that a specific item list is loaded on the store's front page. As this list contains several tens of elements, each with different attributes, keeping our fixtures inside our script would be impractical. Let's add this data to a JSON file instead:

```json
[
    { "title": "Haben oder haben", "author": "Fric Eromm", "price": "9.95" },
    { "title": "Parry Hotter", "author": "J/K Rowlin'", "price": "9.95" },
    { "title": "Laughterhouse-Five", "author": "Truk Tugennov", "price": "9.95" },
    { "title": "To Mock a Killingbird", "author": "Larper Hee", "price": "9.95" },
    { "title": "1498", "author": "Gorge Norwell", "price": "9.95" },
    { "title": "The Grand Grotsby", "author": "Gerald F. Scott", "price": "9.95" },
    { "title": "The Pickled Lynx", "author": "Ant One", "price": "9.95" },
    { "title": "Celsius 233", "author": "Bay Radbdury", "price": "9.95" },
    { "title": "The Rye in the Catcher", "author": "DJ Salinger", "price": "9.95" },
    { "title": "Of Mouse and Man", "author": "Johannes Beckstein", "price": "9.95" },
    ...
]
```

We are then able to feed this file into our test...

```js
const fs = require('fs')
...
let rawdata = fs.readFileSync('books.json')
const bookList = JSON.parse(rawdata)
const foundList = bookList
```

...and have each comparison executed to ensure the right elements are being shown.

```js
  // remove every element found from the control array...
  for  (i = 0; i < resultsNumber; i++) {
      const bookTitle = await page.$eval(`.preview:nth-child(${i+1}) > .preview-title`, e => e.innerText)
      const bookAuthor = await page.$eval(`.preview:nth-child(${i+1}) > .preview-author`, e => e.innerText)
      foundList = foundList.filter(e => (!((e.title === bookTitle) && (e.author === bookAuthor))))
  }

  // ...then assert that the control array is now empty
  assert.equal(foundList.length, 0)
```

## Retrieving test data

If the platform you are testing exposes an API endpoint to pull up-to-date test data, you could fetch the file as part of the setup phase of your test and then utilize it:

```js
const axios = require('axios')
...
const { data } = await axios.get('https://danube-store.herokuapp.com/api/books')
const bookList = JSON.parse(data)
const foundList = bookList
```

This approach enables testing with production data, so you don't have to maintain the test data yourself.

## Generating test data

If you test form submissions, relying on generated data might also make sense to avoid only testing the happy path. [Faker](https://fakerjs.dev/) is a library to create fake but realistic data sets.

```js
const { faker } = require("@faker-js/faker")
...
await page.type('#s-name', faker.name.firstName()) // Leif
await page.type('#s-surname', faker.name.lastName()) // Kirlin
await page.type('#s-address', faker.address.streetAddress(true)) // 2629 Ross Glens Suite 089
await page.type('#s-zipcode', faker.address.zipCode()) // 03651
await page.type('#s-city', faker.address.city()) // Rohanfort
await page.type('#s-company', faker.company.companyName()) // Reynolds Group
```

Faker covers a wide range of data that includes names, addresses, products, images and much more.

## Takeaways

1. Keep test data separate from your scripts.
2. REST APIs can be useful for retrieving test data.
3. Libraries such as Faker can help generate test data.
