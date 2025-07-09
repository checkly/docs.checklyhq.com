# Checkly

- Refer to docs for Checkly CLI v6.0.0 and above.
- Check the Checkly CLI output to figure out into which folder the setup was generated.
- Use the [Checkly CLI reference documentation](https://www.checklyhq.com/docs/cli/command-line-reference).
- Use the [Checkly construct reference documentation](https://www.checklyhq.com/docs/cli/constructs-reference).
- Import and / or require any constructs you need in your code, such as `ApiCheck`, `BrowserCheck` from the `checkly/constructs` package.
- Always ground generated code and CLI commands against the official documentation and examples in this file.

## Installing the Checkly CLI

- ALWAYS use `npm create checkly@latest`.
- NEVER make up commands that do not exist.

## Project Structure

- `checkly.config.ts` - Mandatory global project and CLI configuration. We recommend using TypeScript.
- `*.check.ts|js` - TS / JS files that define the checks.
- `*.spec.ts|js` - TS / JS files that contain Playwright code for Browser and MultiStep checks.
- `src/__checks__` - Default directory where all your checks are stored. Use this directory if it already exists, otherwise create a new directory for your checks.
- `package.json` - Standard NPM project manifest.

Here is an example directory tree of what that would look like:

.
|-- checkly.config.ts
|-- package.json
`-- src
    `-- __checks__
|-- alert-channels.ts
|-- api-check.check.ts
`-- homepage.spec.ts

The `checkly.config.ts` at the root of your project defines a range of defaults for all your checks.

## Check Constructs

### API Check

- Import the `ApiCheck` construct from `checkly/constructs`.
- Reference [the docs for API checks](https://www.checklyhq.com/docs/cli/constructs-reference/#apicheck) before generating any code.
- When adding `assertions`, always use `AssertionBuilder` class for API Checks which are [documented here](https://www.checklyhq.com/docs/cli/constructs-reference/#assertionbuilder).
- When referencing environment variables always use the handlebar syntax `{{MY_ENV_VAR}}`.
- When referencing secrets always use the handlebar syntax `{{MY_SECRET}}`.
- If endpoints require authentication ask the user which authentication method to use and then generate a setupScript to authenticate the given requests.
- Referenced `setupScript.ts` and `teardownScript.ts` for API checks must be plain ts files and not export anything.
- Check in the code if API endpoints require authentication.

```typescript
import { AlertEscalationBuilder, ApiCheck, RetryStrategyBuilder } from 'checkly/constructs'

new ApiCheck('example-api-check', {
  name: 'Example API Check',
  request: {
    url: 'https://api.example.com/v1/products',
    method: 'GET',
    ipFamily: 'IPv4',
  },
  setupScript: {
    entrypoint: './setup-script.ts',
  },
  tearDownScript: {
    entrypoint: './teardown-script.ts',
  },
  degradedResponseTime: 5000,
  maxResponseTime: 20000,
  activated: true,
  muted: false,
  shouldFail: false,
  locations: [
    'eu-central-1',
    'eu-west-2',
  ],
  frequency: 5,
  alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1, {
    amount: 0,
    interval: 5,
  }, {
    enabled: false,
    percentage: 10,
  }),
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
  runParallel: true,
})

```

#### Authentication Setup Scripts for API Checks

- Setup scripts should be flat scripts, no functions, no exports, they will be executed straight by Checkly.
- Use axios for making HTTP requests.
- Read the input credentials from env variables using `process.env`.
- Pass auth tokens to the request object using `request.headers['key'] = AUTH_TOKEN_VALUE`.

### Browser Check

- Import the `BrowserCheck` construct from `checkly/constructs`.
- Reference [the docs for Browser checks](https://www.checklyhq.com/docs/cli/constructs-reference/#browsercheck) before generating any code.
- Generate a separate `.spec.ts` file for the Playwright code referenced in the `BrowserCheck` construct.
- Use the `code.entrypoint` property to specify the path to your Playwright test file.

```typescript
import { AlertEscalationBuilder, BrowserCheck, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('example-browser-check', {
  name: 'Example Browser Check',
  code: {
    entrypoint: './example-browser-check.spec.ts',
  },
  activated: false,
  muted: false,
  shouldFail: false,
  locations: [
    'eu-central-1',
    'eu-west-2',
  ],
  frequency: 10,
  alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1, {
    amount: 0,
    interval: 5,
  }, {
    enabled: false,
    percentage: 10,
  }),
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
  runParallel: true,
})

```

### MultiStep Check

- Import the `MultiStepCheck` construct from `checkly/constructs`.
- Reference [the docs for Multistep checks](https://www.checklyhq.com/docs/cli/constructs-reference/#multistepcheck) before generating any code.
- Generate a separate `.spec.ts` file for the Playwright code referenced in the `MultiStepCheck` construct.
- Use the `code.entrypoint` property to specify the path to your Playwright test file.

```typescript
import { AlertEscalationBuilder, MultiStepCheck, RetryStrategyBuilder } from 'checkly/constructs'

new MultiStepCheck('example-multi-step-check', {
  name: 'Example Multistep Check',
  code: {
    entrypoint: './example-multistep-check.spec.ts',
  },
  activated: true,
  muted: false,
  shouldFail: false,
  locations: [
    'eu-central-1',
    'eu-west-2',
  ],
  frequency: 60,
  alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1, {
    amount: 0,
    interval: 5,
  }, {
    enabled: false,
    percentage: 10,
  }),
  retryStrategy: RetryStrategyBuilder.noRetries(),
  runParallel: true,
})

```

### Tcp Monitor

- Import the `TcpMonitor` construct from `checkly/constructs`.
- Check out the reference docs for [TCP Monitors](https://www.checklyhq.com/docs/cli/constructs-reference/#TcpMonitor) before generating any code.
- When adding `assertions`, always use `TcpAssertionBuilder` class for TcpMonitors which are [documented here](https://www.checklyhq.com/docs/cli/constructs-reference/#tcpassertionbuilder)

```typescript
import { AlertEscalationBuilder, RetryStrategyBuilder, TcpAssertionBuilder, TcpMonitor } from 'checkly/constructs'

new TcpMonitor('example-tcp-check', {
  name: 'Example TCP Check',
  request: {
    hostname: 'tcp.example.com',
    port: 4242,
    ipFamily: 'IPv4',
    assertions: [
      TcpAssertionBuilder.responseTime().lessThan(200),
      TcpAssertionBuilder.responseData().isEmpty(),
    ],
  },
  degradedResponseTime: 5000,
  maxResponseTime: 5000,
  activated: true,
  muted: false,
  shouldFail: false,
  locations: [
    'eu-central-1',
    'eu-west-2',
  ],
  frequency: 60,
  alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1, {
    amount: 0,
    interval: 5,
  }, {
    enabled: false,
    percentage: 10,
  }),
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
  runParallel: true,
})

```

### URL Monitor

- Import the `UrlMonitor` construct from `checkly/constructs`.
- Reference [the docs for URL monitors](https://www.checklyhq.com/docs/cli/constructs-reference/#urlmonitor) before generating any code.
- When adding `assertions`, always use `AssertionBuilder` class which is [documented here](https://www.checklyhq.com/docs/cli/constructs-reference/#assertionbuilder)

```typescript
import { AlertEscalationBuilder, RetryStrategyBuilder, UrlAssertionBuilder, UrlMonitor } from 'checkly/constructs'

new UrlMonitor('example-url-monitor', {
  name: 'Example URL Monitor',
  request: {
    url: 'https://example.com',
    ipFamily: 'IPv4',
    assertions: [
      UrlAssertionBuilder.statusCode().equals(200),
    ],
  },
  degradedResponseTime: 5000,
  maxResponseTime: 20000,
  activated: true,
  muted: false,
  shouldFail: false,
  locations: [
    'eu-central-1',
    'eu-west-2',
  ],
  frequency: 5,
  alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1, {
    amount: 0,
    interval: 5,
  }, {
    enabled: false,
    percentage: 10,
  }),
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
  runParallel: true,
})

```

### Heartbeat Check

- Import the `HeartbeatCheck` construct from `checkly/constructs`.
- Reference [the docs for Heartbeat check](https://www.checklyhq.com/docs/cli/constructs-reference/#heartbeatcheck) before generating any code.

```typescript
import { AlertEscalationBuilder, HeartbeatCheck, RetryStrategyBuilder } from 'checkly/constructs'

new HeartbeatCheck('example-heartbeat-check', {
  name: 'Example Heartbeat Check',
  period: 1,
  periodUnit: 'hours',
  grace: 30,
  graceUnit: 'minutes',
  activated: true,
  muted: false,
  shouldFail: false,
  frequency: 0,
  alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1, {
    amount: 0,
    interval: 5,
  }, {
    enabled: false,
    percentage: 10,
  }),
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
  runParallel: true,
})

```

### Check Group

- Import the `CheckGroupV2` construct from `checkly/constructs`.
- Reference [the docs for Check Groups](https://www.checklyhq.com/docs/cli/constructs-reference/#checkgroupv2) before generating any code.
- Check Groups are used to group checks together for easier management and organization.
- Checks are added to Check Groups by referencing the group in the `group` property of a check.

```typescript
import { CheckGroupV2 } from 'checkly/constructs'

export const exampleGroup = new CheckGroupV2('example-group', {
  name: 'Example Group',
})

```

## Alert Channel Constructs

- Alert channels are used to send notifications when checks and monitors fail or recover.
- Alert channels are added to checks, monitors, and check groups constructs by adding them to the `alertChannels` array property.

Here are some examples of how to create different types of alert channels. All alert are described in the [Checkly docs](https://www.checklyhq.com/docs/cli/constructs-reference/#alertchannel).

### Email Alert Channel

```typescript
import { EmailAlertChannel } from 'checkly/constructs'

export const testEmailAlert = new EmailAlertChannel('example-email-alert-channel', {
  address: 'test@example.com',
  sslExpiry: true,
})

```


### Phone Call Alert Channel

```typescript
import { PhoneCallAlertChannel } from 'checkly/constructs'

export const testUserPhoneCallAlert = new PhoneCallAlertChannel('example-call-alert-channel', {
  name: 'Test User',
  phoneNumber: '+311234567890',
})

```


### Slack Alert Channel

```typescript
import { SlackAlertChannel } from 'checkly/constructs'

export const generalSlackAlert = new SlackAlertChannel('example-slack-alert-channel', {
  url: 'https://hooks.slack.com/services/TK123456789123/12345/123456789',
  channel: '#general',
})

```


## Supporting Constructs

### Status Page

- Import the `StatusPage` construct from `checkly/constructs`.
- Reference [the docs for StatusPages](https://www.checklyhq.com/docs/cli/constructs-reference/#statuspage) before generating any code.
- Status pages are used to display the status of your services to your users.
- A Status Page consists of cards which include Status Page Services.

```typescript
import { StatusPage } from 'checkly/constructs'
import { exampleService } from './services/example-service.check'

new StatusPage('example-status-page', {
  name: 'Example Status Page',
  url: 'example-status-page',
  cards: [
    {
      name: 'Example service',
      services: [
        exampleService,
      ],
    },
  ],
  customDomain: 'status.example.com',
  defaultTheme: 'AUTO',
})

```

### Status Page Service

- Import the `StatusPageService` construct from `checkly/constructs`.
- Reference [the docs for Status Page Services](https://www.checklyhq.com/docs/cli/constructs-reference/#statuspageservice) before generating any code.
- Status Page Services are used to represent individual services on a Status Page.

```typescript
import { StatusPageService } from 'checkly/constructs'

export const exampleService = new StatusPageService('example-status-page-service', {
  name: 'Example Service',
})

```

### Dashboard

- Import the `Dashboard` construct from `checkly/constructs`.
- Reference [the docs for Dashboards](https://www.checklyhq.com/docs/cli/constructs-reference/#dashboard) before generating any code.
- Dashboards are used to display the results of your checks on screens external to Checkly.

```typescript
import { Dashboard } from 'checkly/constructs'

new Dashboard('example-dashboard', {
  tags: [
    'app:webshop',
  ],
  customUrl: 'example-dashboard',
  customDomain: 'dash.example.com',
  header: 'Example Dashboard',
  description: 'Example dashboard',
  width: 'FULL',
  refreshRate: 60,
  paginate: true,
  paginationRate: 60,
  checksPerPage: 15,
  useTagsAndOperator: false,
  hideTags: false,
  enableIncidents: false,
  expandChecks: false,
  showHeader: true,
  isPrivate: false,
  showP95: true,
  showP99: true,
})

```

### Maintenance Window

- Import the `MaintenanceWindow` construct from `checkly/constructs`.
- Reference [the docs for Maintenance Windows](https://www.checklyhq.com/docs/cli/constructs-reference/#maintenancewindow) before generating any code.
- Maintenance windows are used to pause checks during maintenance periods so no alerts are sent.
- Checks are referenced by their tags in the `tags` property.

```typescript
import { MaintenanceWindow } from 'checkly/constructs'

new MaintenanceWindow('example-maintenance-window', {
  name: 'Example Maintenance Window',
  tags: [
    'app:webshop',
  ],
  startsAt: new Date('2025-07-01T09:00:00.000Z'),
  endsAt: new Date('2025-07-01T10:00:00.000Z'),
  repeatInterval: 1,
  repeatUnit: 'WEEK',
  repeatEndsAt: new Date('2025-08-01T00:00:00.000Z'),
})

```

### Private Location

- Import the `PrivateLocation` construct from `checkly/constructs`.
- Reference [the docs for Private Locations](https://www.checklyhq.com/docs/cli/constructs-reference/#privatelocation) before generating any code.
- Private locations are used to run checks from your own infrastructure with the Checkly Agent, an OCI compatible container.

```typescript
import { PrivateLocation } from 'checkly/constructs'

export const examplePrivateLocation = new PrivateLocation('example-private-location', {
  name: 'Example Private Location',
  slugName: 'example-private-location',
  icon: 'location',
})

```

## Testing and Debugging

- Test checks using `npx checkly test` command pass env variables using `-e` param, use `--record` to persist results and `--verbose` to be able to see all errors
