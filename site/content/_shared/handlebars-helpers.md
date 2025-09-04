---
sitemapExclude: true
---
| helpers              | description                                                                                                                                                                                                                                                                                                                                                                                                                        |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `{{REGION}}`         | Resolves to the AWS region name, i.e. us-east-1.                                                                                                                                                                                                                                                                                                                                                                                 |
| `{{$UUID}}`          | Generates a random UUID/v4, i.e.  9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.                                                                                                                                                                                                                                                                                                                                                          |
| `{{$RANDOM_NUMBER}}` | Generates a random decimal number between 0 and 10000, i.e. 345.                                                                                                                                                                                                                                                                                                                                                                 |
| `{{moment}}`           | Generates a date or time using **moment.js** and allows for formatting:<br><br> <ul> <li>`{{moment "YYYY-MM-DD"}}` generates a date, i.e. 2020-08-26</li> <li>`{{moment "2 days ago" "YYYY-MM-DD"}}` generates the date two days ago: 2020-08-24</li> <li>`{{moment "last week" "X"}}` generates a UNIX timestamp from last week: 1597924480</li> </ul> |

A practical example of using the `{{moment}}` helper would be setting the pagination options on a typical API endpoint:

```
 GET https://api.acme.com/events?from={{moment "last week" "X"}}&to={{moment "X"}}
```

> You can find the [full list of helpers in the README.md file](https://github.com/checkly/handlebars) of the underlying library we are using.
For a full overview of date formatting option, check the [moment.js docs](https://momentjs.com/docs/#/displaying/format/).
