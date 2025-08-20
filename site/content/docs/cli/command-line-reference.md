---
title: Command Line Reference - Checkly Docs
displayTitle: Command Line Reference
navTitle: Command Line Reference
weight: 99
menu:
  platform:
    parent: "CLI"
---

## `npx checkly test`

Executes all the checks in the scope of your project on the Checkly cloud infrastructure. You can specify files to run by
appending a pattern, e.g. `npx checkly test home.spec.js api`.

Dry run all checks in your repo:

```bash
npx checkly test
```

Dry run checks that have `product` and `api` in the file name

```bash
npx checkly test product api
```

Record a test session in Checkly with git branch info, full logging, videos and traces.

```bash
npx checkly test --record
```

Dry run all checks against a specific location:

```bash
npx checkly test --location eu-west-1
```

Dry run checks while passing a specific URL and a password. These variables are available on `process.env`

```bash
npx checkly test --env ENVIRONMENT_URL="https://preview.acme.com" --env PASSWORD=doremiabc123
```

This is very powerful when combined with passing environment variables using one of the flags `--env` or `--env-file` as you can target staging, test and preview environment with specific URLs, credentials and other common variables that differ
between environments.

- `--config` or `-c`: You can specify a particular configuration file, e.g. `--config="./checkly.staging.config.ts"`
- `--env <key=value>` or `-e`: Pass environment variables to the check execution runtime. Passed variables overwrite any existing variables stored in your Checkly account.
- `--env-file`: You can read variables from a `.env` file by passing the file path e.g. `--env-file="./.env"`
- `--grep <pattern>` or `-g`: Only run checks where the check name matches a regular expression.
- `--list`: Just list the checks in your project, but don't run them.
- `--location <location>` or `-l`: Run checks against a specified location, e.g. `eu-west-1`. Defaults to `us-east-1`.
- `--private-location <private location ID>`: Run checks against the specified private location.
- `--record:` Record tests results in Checkly as a test session.
- `--reporter` or `-r`: One or more reporters for the test output. Options are: `list|dot|ci|github|json`. You can
  use multiple reporters by specifying the flag multiple times, e.g. `--reporter=list --reporter=json`.
- `--tags` or `-t`: Filter the checks using a comma separated list of tags. Checks will only be run if
  they contain all the specified tags. Multiple `--tags` flags can be passed, in which case checks will be run if they
  match any of the `--tags` filters, i.e. `--tags production,webapp --tags staging,backend` will run checks with tags
  (production AND webapp) OR (staging AND backend).
- `--retries`: How many times to retry a failing check run. 0 by default and maximum 3.
- `--timeout`: A fallback timeout (in seconds) to wait for checks to complete. 600 seconds by default.
- `--update-snapshots` or `-u`: Update the golden images / reference snapshots of your visual comparison and snapshot tests.
- `--verbose` or `-v`: Always show the full logs of the checks.


## `npx checkly pw-test`

Run Playwright tests with Checkly monitoring features and reuse the Playwright CLI arguments. Records test sessions automatically.

```bash
npx checkly pw-test [checkly flags] -- [playwright flags]
```

Use `--` to separate Checkly flags from Playwright flags.

### Basic examples

Run tests in multiple browsers using different Playwright projects:
```bash
npx checkly pw-test -- --project=chromium --project=firefox
```

Run tests by pattern:
```bash
npx checkly pw-test -- --grep="login"
```

Exclude tests by pattern:
```bash
npx checkly pw-test -- --grep-invert="skip|todo"
```

### Creating scheduled checks

Using `pw-test` with the `--create-check` flag will add the check with a default configuration, so that you can tweak the monitoring configuration for your check. If there's no `checkly.config.ts` file it will create it.

Regression tagged tests in multiple locations:

```bash
npx checkly pw-test --create-check --location=us-east-1 --location=eu-west-1 --frequency=5m -- --grep="@regression"
```

Mobile tests tagged critical every 10 minutes:

```bash
npx checkly pw-test --create-check --frequency=10m -- --project="Mobile Chrome" --grep="@critical"
```

> [!NOTE]
> - `pw-test` automatically records test sessions (no `--record` flag needed)
> - Your Playwright configuration applies automatically (traces, videos, screenshots)
> - View all artifacts in Checkly's UI

### Checkly flags
- `--create-check`: Create a monitor from test results
- `--frequency`: Set monitor frequency (`5m`, `10m`, `30m`, `1h`)
- `--location`: Add monitor locations (use multiple times)
- `--test-session-name`: Name your test session
- `--env`: Pass environment variables
- `--env-file`: Load variables from file
- All other [`checkly test` flags](https://www.checklyhq.com/docs/cli/command-line-reference/#npx-checkly-test) except `--record`

### Playwright flags (after `--`)
- `--project`: Select Playwright projects
- `--grep`: Filter tests by pattern
- `--grep-invert`: Exclude tests by pattern
- All other [Playwright test runner](https://playwright.dev/docs/test-cli) flags


## `npx checkly deploy`

Deploys all your checks and associated resources like alert channels to your Checkly account.

Preview the differences between your actual configuration and your account

```bash
npx checkly deploy --preview
```

Deploy all resources to your Checkly account

```bash
npx checkly deploy
```

- `--config` or `-c`: You can specify a particular configuration file, e.g. `--config="./checkly.staging.config.ts"`
- `--force` or `-f`: Skips the confirmation dialog when deploying. Handy in CI environments.
- `--preview` or `-p`: Preview the differences between your actual configuration and your account.
- `--output` or `-o`: Show applied differences after deploying.
- `--no-schedule-on-deploy`: Do not run checks when deploying.

When you deploy a project, you can attach Git specific information so changes to any resources are displayed in the
Checkly web UI wit the correct commit, owner etc.

{{< markdownpartial "/_shared/cli-env-vars.md" >}}

Some of the above variables will be detected automatically detected from your local or CI environment on a best effort basis.

## `npx checkly destroy`

Destroy all project's resources (checks, groups, alert channels, etc.) from your Checkly account.

- `--config` or `-c`: You can specify a particular configuration file, e.g. `--config="./checkly.staging.config.ts"`
- `--force` or `-f`: Skips the confirmation dialog when deploying. Handy in CI environments.

## `npx checkly trigger`

The `trigger` command is similar to the `test` command, but "triggers" checks already in your Checkly account. This works
regardless of whether you created these checks via a `Project` with CLI constructs, via the UI or using Terraform.

Because `trigger` does not rely on any `Project` or as-code representation of your checks, the invocation is slightly
different, as there are no files to reference for instance.

```bash
npx checkly trigger
```

Trigger checks tagged with "production" and "api" and pass in an `ENVIRONMENT_URL`.

```bash
npx checkly trigger --tags=production,api -e ENVIRONMENT_URL="https://staging.acme.com"
```

Trigger all checks to run in location `eu-west-1` and record a test session named "Adhoc test run".

```bash
npx checkly trigger --record --test-session-name="Adhoc test run" --location=eu-west-1
```

- `--config` or `-c`: You can specify a particular configuration file, e.g. `--config="./checkly.staging.config.ts"`
- `--env <key=value>` or `-e`: Pass environment variables to the check execution runtime. Passed variables overwrite any existing variables stored in your Checkly account.
- `--env-file`: You can read variables from a `.env` file by passing the file path e.g. `--env-file="./.env"`
- `--location <location>` or `-l`: Run checks against a specified location, e.g. `eu-west-1`. Defaults to `us-east-1`.
- `--private-location <private location ID>`: Run checks against the specified private location.
- `--record:` Record tests results in Checkly as a test session.
- `--reporter` or `-r`: One or more reporters for the test output. Options are: `list|dot|ci|github|json`. You can
use multiple reporters by specifying the flag multiple times, e.g. `--reporter=list --reporter=json`.
- `--tags` or `-t`: Filter the checks to be triggered using a comma separated list of tags. Checks will only be run if
they contain all the specified tags. Multiple `--tags` flags can be passed, in which case checks will be run if they
match any of the `--tag`s filters, i.e. `--tags production,webapp --tags staging,backend` will run checks with tags
(production AND webapp) OR (staging AND backend).
- `--test-session-name` A name to use when storing results in Checkly with `--record`.
- `--retries`: How many times to retry a failing check run. 0 by default and maximum 3.
- `--timeout`: A fallback timeout (in seconds) to wait for checks to complete. 600 seconds by default.
- `--verbose` or `-v`: Always show the full logs of the checks.

## `npx checkly login`

Sign up for a new Checkly account or log in to your existing Checkly account.

## `npx checkly logout`

Logs you out of your Checkly account.

## `npx checkly whoami`

Prints the account and user you are currently logged in with.

## `npx checkly switch`

Switch which account you are logged into based on the accounts you can access with your credentials.

## `npx checkly runtimes`

List all available runtimes and their dependencies.

## `npx checkly env`

Manage the global variables of a Checkly account. You can list, add, remove, update and export environment variables.

### `npx checkly env pull`

Export global variables from your Checkly account to a local `.env` file or a different file of your choice. For secrets, only the key will be exported, not the value.

```bash
checkly env pull [FILENAME] [-f]
```

- `FILENAME`: You can specify a particular environment variable file, e.g. `.env.local`
- `--force` or `-f`: Skips the confirmation dialog when pulling environment variables to existing env file.

```bash
npx checkly env pull -f
```
Pull all global variables to the `.env` file and overwrite it if it already exists.

### `npx checkly env ls`

List global variables. This command does not list  variables on group or check level. For secrets, only the key name will be shown, not its value.

```bash
checkly env ls
```

### `npx checkly env add`

Add a global variable.

```bash
checkly env add [KEY] [VALUE] [-l | -s] 
```

- `KEY`: Environment variable key.
- `VALUE`: Environment variable value.
- `--locked` or `-l`: Indicate that the environment variable will be locked, making it private to all read only users.
- `--secret` or `-s`: Indicate that the environment variable will be created as a secret. 

> Secrets are supported on version `4.9.0` and later.

### `npx checkly env update`

Update a global variable.

```bash
checkly env update [KEY] [VALUE] [-l | -s]
```

- `KEY`: Variable key.
- `VALUE`: Variable value.
- `--locked` or `-l`: Indicate that the variable will be locked, making it private to all read only users.
- `--secret` or `-s`: Indicate that the variable will be changed to a secret. Note that secrets cannot be changed to variables. When updating a secret always pass the `-s` flag.

> Secrets are supported on version `4.9.0` and later.

### `npx checkly env rm`

Remove a global variable.

```bash
checkly env rm [KEY] [-f]
```

- `KEY`: Variable key.
- `--force` or `-f`: Skips the confirmation dialog when removing a variable.


## `npx checkly sync-playwright`

Copy Playwright config into the Checkly config file.

```bash
npx checkly sync-playwright
```

## `npx checkly import`

Import resources not yet managed by the CLI from your account. See [Importing an existing account](/docs/cli/import/) for details.

```bash
npx checkly import [--root] [--config] [resource-type:id]
```

- `--root`: Specify the directory where the generated code should be placed. Default is the `checkMatch` directory in your `checkly.config.ts/js`
- `--config` or `-c`: Location of your `checkly.config.ts/js` file. Default is current directory.
- `resource-type:id`: Imports only the specified resource. E.g `npx checkly import alert-channel:59`. Resource types are: `check`|`check-group`|`alert-channel`|`maintenance-window`|`private-location`|`dashboard`|`snippet`|`status-page`|`status-page-service`.

### `npx checkly import apply`
Applies a plan generated by `npx checkly import`:
```bash
npx checkly import apply [--config]
```

- `--config` or `-c`: Location of your `checkly.config.ts/js` file. Default is current directory.

### `npx checkly import commit`
Commits a plan applied by `npx checkly import apply`:
```bash
npx checkly import commit [--config]
```

- `--config` or `-c`: Location of your `checkly.config.ts/js` file. Default is current directory.

### `npx checkly import cancel`
Cancels a generated plan that has not been commited yet:
```bash
npx checkly import cancel
```
