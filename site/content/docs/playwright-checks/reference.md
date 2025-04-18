---
title: Playwright Checks reference -- Checkly Docs
displayTitle: All options available in Playwright Checks
navTitle: Reference
weight: 14
slug: /reference
menu:
  resources:
    parent: "Playwright checks (Alpha)"

---
> Playwright Checks are currently in private Alpha. Reach out to [support](https://app.checklyhq.com/?support=true) to get an invite and join the [Slack community](https://checklycommunity.slack.com/join/shared_invite/zt-2qc51mpyr-5idwVD4R4izkf5FC4CFk1A#/shared-invite/email) to get live updates on feature development and get help getting started.

To define your Playwright Check, you use the `checkly.config.ts/js` file.

> During the Alpha, a Playwright Check can last up to 20 minutes. This limit is open to be increased / decreased after the alpha.

Each Playwright Check is connected to an existing reference in your `playwright.config.ts/js` file.

The following Playwright references are available to create a Playwright Monitor:

* `pwProjects` --- select existing project names from your playwright configuration to create a playwright check.

* `pwTags` --- select witch tags will be grouped into a playwright check.

These are the available monitoring configuration options:

* `installCommand:` Override the command to install dependencies, by default it'll use `npm install --dev`.

* `activated:` A boolean value to activate/run your check or not.

* `muted:` A boolean value to mute Alert notifications.

* `frequency:` How often the check will run. It supports:
  * Formatted time: `frequency: Frequency.EVERY_10M,`
  * Actual seconds: `frequency:60,`

* `locations:` An array of locations where to run your Checks.

```typescript {title="checkly.config.ts"}
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