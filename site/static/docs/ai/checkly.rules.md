# Checkly

- refer to docs for checkly cli v5
- to generate the initial setup for checkly use the command `npm create checkly@latest`
- check the checkly cli output to figure out into which folder the setup was generated
- use the [checkly cli reference](https://www.checklyhq.com/docs/cli/command-line-reference)
- use the [checkly test api](https://www.checklyhq.com/docs/cli/constructs-reference)
- always ground generated code and cli commands against the official documentation
- when referencing environment variables always use the handlebar syntax `{{MY_ENV_VAR}}`
- when referencing secrets always use the handlebar syntax `{{MY_SECRET}}`
- after the initial setup is done ask the user for which endpoints to generate api checks
- check in the code if api endpoints require authentication
- if endpoints require authentication ask the user which authentication method to use and then generate a setupScript to authenticate the given requests
- referenced setupScript for ApiChecks must be plain ts files and not export anything

## Project Structure

checkly.config.ts - Mandatory global project and CLI configuration. We recommend using TypeScript.
src/__checks__/* - TS/JS files defining your checks and other resources.
package.json - Standard NPM project manifest.
Here is an example directory tree of what that would look like:

.
|-- checkly.config.ts
|-- package.json
`-- src
    `-- __checks__
      |-- alert-channels.ts
      |-- api-check.check.ts
      `-- homepage.spec.ts

The checkly.config.ts at the root of your project defines a range of defaults for all your checks.
## `ApiCheck`

- Checkout the api docs for [API Checks](https://www.checklyhq.com/docs/cli/constructs-reference/#apicheck) before generating any code.
- Only use assertions for Api Checks which are [documented](https://www.checklyhq.com/docs/cli/constructs-reference/#assertionbuilder)
- test api checks using `npx checkly test` command pass env variables using `-e` parama, use `--record` to persist results and `--verbose` to be able to see all errors

### Authentication Setup Scripts

- setupScripts should be flat scripts, no functions, no exports, they will be executed straight by Checkly
- use axios for making http requests
- read the input credentials from env variables using process.env
- pass auth tokens to the request object using `request.headers['key'] = AUTH_TOKEN_VALUE`
