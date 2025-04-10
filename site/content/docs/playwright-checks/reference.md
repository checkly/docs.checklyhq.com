---
title: Playwright Checks reference -- Checkly Docs
displayTitle: Getting started with Playwright Monitoring
navTitle: Reference
weight: 14
slug: /
menu:
  resources:
    parent: "Playwright checks (Alpha)"

---

Each Playwright Check is connected to an existing reference in your `playwright.config.ts/js` file.

The following Playwright references are available to create a Playwright Monitor:

* `pwProjects` --- select existing project names from your playwright configuration to create a playwright check

* `pwTags` --- select witch tags will be grouped into a playwright check

These are the available monitoring configuration options:

* `installCommand:` Define the install command your code needs, by default it'll use npm install --dev

* `activated:` A boolean value to activate/run your check or not.

* `muted:` A boolean value to mute Alert notifications.

* `frequency:` How often the check will run. Frequency.EVERY_10M

* `locations:` An array of locations where to run your Checks - only eu-west-1 is available right now.


```typescript

checks: {
   playwrightConfigPath: './playwright.config.ts', // specify your config file
   playwrightChecks: [
    {
	// Run Chromium project with checkly config
	name: 'Chromium-checks',
	pwProjects: 'chromium', // Reference the project in playwright.config.js. Throw an error when it is not there
	installCommand: 'npm install --dev', // Custom install command
	  testCommand: 'npx playwright test --grep@checkly --config=playwright.foo.config.ts', // Override the default test command
	  activated: true, // Check related settings
	  muted: false,
	  frequency: Frequency.EVERY_5M,
	  locations:['eu-west-1']
	}
]
 },
```

