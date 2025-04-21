---
title: Playwright Check suites reference -- Checkly Docs
displayTitle: All options available in Playwright Check suites
navTitle: Reference
weight: 14
slug: /reference
menu:
  resources:
    parent: "Playwright check suites (Alpha)"

{{< markdownpartial "/_shared/playwright-check-suites-alpha.md" >}}

To define your Playwright Check suite, you use the `checkly.config.ts/js` file.

Each Playwright Check suite is connected to an existing reference in your `playwright.config.ts/js` file. 
During the Alpha, a Playwright Check suite can last up to 20 minutes. This limit is open to be increased / decreased after the alpha.

## Playwright references

The following Playwright references are available to create a Playwright Monitor:

* `pwProjects` --- select existing project names from your playwright configuration to create a playwright check.

* `pwTags` --- select witch tags will be grouped into a playwright check.

You can combine pwTags and pwProjects to generate your check. For example: 

```typescript {title="checkly.config.ts"}
checks: {
    playwrightConfigPath: './playwright.config.ts',
    playwrightChecks: [
      {
        // Run critical tagged tests in Chromium every minute from 4 locations
		name:"critical-tagged",
        pwTags: 'critical',
        pwProjects: 'chromium',
        frequency: Frequency.EVERY_1M,
		locations: ['us-east-1', 'eu-west-1','eu-central-1', 'ap-south-1'],
      },
    ],
  },
```

## Monitoring customizations

These are the available monitoring configuration options:

* `installCommand:` Override the command to install dependencies, by default it'll use `npm install --dev`.

* `activated:` A boolean value to activate/run your check or not.

* `muted:` A boolean value to mute Alert notifications.

* `frequency:` How often the check will run. It supports:
  * Formatted time: `frequency: Frequency.EVERY_10M,`
  * Actual seconds: `frequency:60,`

* `locations:` An array of locations where to run your Checks.

* `groupName:` The group this check belongs to,

```typescript {title="checkly.config.ts"}

checks: {
   playwrightConfigPath: './playwright.config.ts', // specify your config file
   playwrightChecks: [
    {
	// Run E2E tagged tests across browsers in 4 locations
	name: 'E2E',
	pwProjects: ['chromium', 'firefox', 'webkit'], // Reference the project or projects in playwright.config file
	pwTags: 'e2e', // Reference an existing tag in your tests
	installCommand: 'npm install --dev', // Optionally override default dependencies install command
	testCommand: 'npx playwright test --grep@checkly --config=playwright.foo.config.ts', //Optionally override the default test command
	activated: true, // Optional - Activate the check so that it runs on a schedule, true by default
	muted: false, // Optional - Mute the check so that it doesn't send alerts
	groupName: 'production-group', // use the name of the group you created
	frequency: Frequency.EVERY_5M,
	locations: ['us-east-1', 'eu-west-1','eu-central-1', 'ap-south-1'],
	}
    ]
 },
```
