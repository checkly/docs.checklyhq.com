---
title: Using `checkMatch` and `testMatch`
weight: 4
menu:
  docs:
    parent: "CLI"
---

The Project and CheckGroup constructs have two properties that allow you to use file-based routing to find and
include Checks in your Project for testing and deploying.

## `checks.checkMatch`

The `checkMatch` property takes a [glob pattern](https://www.npmjs.com/package/glob) to match files inside your
project structure that contain instances of a Check, i.e. `**/__checks__/*.check.ts`. 

The goal of this property is so you as a developer can **just add some files to an existing repo** and not have to declare
or import those files in some global config. This pattern should be very familiar to unit testing: the test runner takes
care of finding, building and running all the files.

Also, removing a file has the desired effect: on `deploy` the Check is removed from your Checkly account.

Here are some best practices:
1. Store any Checkly related Checks inside a `__checks__` folder. This neatly indicates where your Checks are organized.
2. Use multiple `__checks__` folders throughout your code base, near the functionality it should be checking.

## `browserChecks.testMatch`

The `testMatch` property is very similar to `checkMatch` and works mostly in the same way with some caveats. 

The goal of this property is to allow you to just write standard `*.spec.ts` Playwright files with no proprietary Checkly 
config or code added — this is why it's nested under `browserChecks` as it only applies to Browser Checks. In turn, this
allows you to just use `npx playwright test` on the command line to write and debug these Checks.

Some caveats:
1. As a `.spec.ts` file does not contain any Checkly specific properties like `frequency` or `tags`, the CLI will add 
these properties based on the defaults set inside the `browserChecks` config object. Also, a `logicalId` and `name` will 
be generated based on the file name.
2. If you want to explicitly set the properties for a Browser Check and not use the defaults, you need to add `BrowserCheck`
construct in a separate `.check.ts` file and set file path to the `.spec.ts` file in the `code.entrypoint` property.
3. When you rename a file that was previously deployed, the `logicalId` will change. The effect is that once you deploy
again the new `logicalId` will trigger a deletion of the "old" Check and a creation of this "new" Check and you will lose
any historical metrics.


> Note that the recommended patterns are just conventions. You can set any glob pattern or turn off any globbing by setting
`checkMatch: false` and / or `testMatch: false`. 


