---
title: Checkly CLI Changelog - Checkly Docs
displayTitle: Checkly CLI Changelog
navTitle: CLI
weight: 10
---

Release notes for the Checkly command-line interface. For installation and usage, see the [CLI documentation](/docs/cli).

## Latest version

Check your current version:

```bash
checkly --version
```

Update to the latest version:

```bash
npm install checkly@latest
```

## Checkly CLI Releases

### Version 6.0.1 (June 26, 2025)

**Fixed**

- Fix Playwright Test crash when importing date-fns. Disable tree-shaking for ESM bundling

### Version 6.0.0 (June 23, 2025)

**Runtime support**: [2025.04](/docs/runtimes/specs/#202504)

**Added**

- Support for runtime [2025.04](/docs/runtimes/specs/#202504)

### Version 5.2.2 (June 11, 2025)

**Fixed**

- Ensure we exclude `__checks__` build directory from the file watcher

### Version 5.2.1 (June 5, 2025)

**Fixed**

- Allow nested projects in monorepos by using a stable Playwright Test cache folder. The cache folder will be placed in `checkly.config.ts`'s directory

### Version 5.2.0 (May 23, 2025)

**Changed**

- Extract and handle Playwright Test annotations in runtime [2025.04](/docs/runtimes/specs/#202504), allowing `@playwright/test` test runs with `.skip` and `.only` annotations

### Version 5.1.5 (May 14, 2025)

**Fixed**

- Fix passing env vars into testSessions

### Version 5.1.4 (May 8, 2025)

**Fixed**

- Update axios to fix the "Cannot set headers after they are sent to the client" errors

### Version 5.1.3 (May 2, 2025)

**Fixed**

- Build correct external list for esbuild. Exclude all dependencies, include devDependencies

### Version 5.1.2 (April 30, 2025)

**Fixed**

- Fix external bundling options so Node dependencies can be excluded correctly

### Version 5.1.1 (April 11, 2025)

**Fixed**

- Add missing location details to global result when using test sessions (in the CLI)

### Version 5.1.0 (April 4, 2025)

**Added**

- Add `AlertEscalationPolicy`, allowing the configuration of multi-channel alerts

### Version 5.0.1 (March 21, 2025)

**Fixed**

- Fix the usage of the `checklyPropsPath` option for check resources

### Version 5.0.0 (March 18, 2025)

**Added**

- Update the CLI with the improved Pagerduty v2 integration

### Version 4.9.1 (February 29, 2025)

**Fixed**

- Increase server shutdown timer to avoid sudden connection closes while reporting results back

### Version 4.9.0 (February 2, 2025)

**Added**

- Add `runParallel`, which replaces `runInParallel`

**Deprecated**

- `runInParallel` is deprecated and will be removed in a future version. Please use `runParallel` instead

### Version 4.8.0 (January 25, 2025)

**Added**

- Support `testMatch` for Monitoring as Code projects

### Version 4.7.0 (January 11, 2025)

**Added**

- Support for the `api-only` project type in the `test` command

### Version 4.6.0 (December 7, 2024)

**Added**

- Add `syncOnDeploy` option to opt out of syncing Terraform resources

### Version 4.5.1 (November 29, 2024)

**Fixed**

- Export `testSessionId` from Checkly

### Version 4.5.0 (November 8, 2024)

**Added**

- Add test session support to group results from a single test run

### Version 4.4.0 (October 31, 2024)

**Added**

- Add support for Multistep check test-only mode

### Version 4.3.1 (October 29, 2024)

**Fixed**

- Fix missing named export from CLI constructs (`defineConfig`)

### Version 4.3.0 (October 25, 2024)

**Breaking Changes**

- The `--list` flag has been repurposed from listing all checks to listing all resources
- Private location slugs now require the prefix `private-` to match the API behavior
- The `--record` flag now has no effect on Browser or Multistep checks
- The constructs are now built using TypeScript v5

**Added**

- Heartbeat monitoring support
- New Playwright Test runner (`@playwright/test`)
- Standardized config file with `defineConfig`
- Support for browser checks created from `@playwright/test` files
- Support for `.only` & `.skip` annotations in check files

**Changed**

- Support Node 22 when using runtime [2025.04](/docs/runtimes/specs/#202504)
- The `init` command is now deprecated in favor of scaffolding

### Version 4.2.0 (May 23, 2024)

**Added**

- Support for external check IDs

### Version 4.1.0 (April 10, 2024)

**Runtime support**: [2024.02](/docs/runtimes/specs/#202402)

**Breaking Changes**

- Node.js 16 is no longer supported

**Added**

- Support for runtime [2024.02](/docs/runtimes/specs/#202402)

### Version 4.0.0 (March 14, 2024)

**Added**

- Support for `connectTimeout` in API check defaults

### Version 3.3.0 (February 22, 2024)

**Added**

- Add `--tags` filter to `checkly test` command

### Version 3.2.0 (January 18, 2024)

**Added**

- Add support for `cookies` prop on API checks

### Version 3.1.0 (December 14, 2023)

**Added**

- Add support for headers in Multistep checks

### Version 3.0.2 (November 30, 2023)

**Added**

- Support for `pathName` and `followRedirects` on API checks

### Version 3.0.1 (November 16, 2023)

**Added**

- Add support for new alerting reminders
- Add support for snapshot testing

### Version 3.0.0 (October 12, 2023)

**Runtime support**: [2023.09](/docs/runtimes/specs/#202309)

**Added**

- Support for runtime [2023.09](/docs/runtimes/specs/#202309)

### Version 2.8.0 (September 21, 2023)

**Added**

- Support for `retryStrategy` on checks
- Support for `checkRunId` in browser checks

### Version 2.7.0 (August 24, 2023)

**Runtime support**: [2023.02](/docs/runtimes/specs/#202302)

**Breaking Changes**

- The `checkly test` command now runs location-based scheduling by default
- Default runtime changed to [2023.02](/docs/runtimes/specs/#202302)

**Added**

- Support for runtime [2023.02](/docs/runtimes/specs/#202302)
- Support for missing response and request properties on API checks

> Note: For historical information about versions prior to 2.7.0, please refer to the GitHub releases page.

## Migration guides

Before upgrading major versions:

1. Review breaking changes in release notes
2. Test in a non-production environment
3. Update configuration files as needed
4. Run `checkly test` to verify compatibility

## Additional resources

- **All releases**: View complete history on [GitHub releases](https://github.com/checkly/checkly-cli/releases)
- **Major updates**: See summarized releases in the [product changelog](https://feedback.checklyhq.com/changelog?c=Checkly+CLI)

## Getting help

- Join the [developer community](https://www.checklyhq.com/slack/) for discussions
- [Contact support](https://app.checklyhq.com/?support=true) for assistance