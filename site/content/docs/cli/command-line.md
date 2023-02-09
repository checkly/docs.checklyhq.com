---
title: Command Line
weight: 4
menu:
  docs:
    parent: "CLI"
---

Dry run all checks in your repo:

```bash
npx checkly test
```

Dry run checks that have `product` and `api` in the file name

```bash
npx checkly test product api
```

Dry run checks while passing a specific URL and a password. These variables are available on `process.env`

```bash
npx checkly test --env "ENVIRONMENT_URL=https://preview.acme.com" --env PASSWORD=doremiabc123
```

Dry run all checks against a specific location:

```bash
npx checkly test --location eu-west-1
```

Preview the differences between your actual configuration and your account

```bash
npx checkly deploy --preview
```

Deploy all resources to your Checkly account

```bash
npx checkly deploy
```

## Reference

### `npx checkly test`

Executes all the checks in the scope of your project on the Checkly cloud infrastructure. You can specify files to run by
appending a pattern, e.g. `npx checkly test home.spec.js api`.

This is very powerful when combined with passing environment variables using one of the flags `--env` or `--env-file` as you
can target staging, test and preview environment with specific URLs, credentials and other common variables that differ
between environments.

- `--env <key=value>` or `-e`: Pass environment variables to the check execution runtime. Variables passed here overwrite any existing variables stored in your Checkly account.
- `--grep <pattern>` or `-g`: Only run checks where the check name matches a regular expression.
- `--location <location>` or `-l`: Run checks against a specified location, e.g. `eu-west-1`. Defaults to `us-east-1`.
- `--private-location <private location ID>`: Run checks against the specified private location.
- `--env-file`: You can read variables from a `.env` file by passing the file path e.g. `--env-file="./.env"`
- `--list`: Just list the checks in your project, but don't run them.
- `--timeout`: A fallback timeout (in seconds) to wait for checks to complete.

### `npx checkly deploy`

Deploys all your checks and associated resources like alert channels to your Checkly account.

- `--force` or `-f`: Skips the confirmation dialog when deploying. Handy in CI environments.
- `--preview` or `-p`: Preview the differences between your actual configuration and your account.
- `--output` or `-o`: Show applied differences after deploying.

### `npx checkly login`

Logs you in to your Checkly account and clear local credentials.

### `npx checkly logout`

Logs you out of your Checkly account.

### `npx checkly whoami`

Prints the account and user you are currently logged in with.

### `npx checkly switch`

Switch which account you are logged into based on the accounts you can access with your credentials.

### `npx checkly runtimes`

List all available runtimes and their dependencies.
