# Automated Changelog Workflows

This directory contains GitHub Actions workflows that automatically detect new releases and create pull requests to update the documentation changelogs.

## Workflows

### 1. Update CLI Changelog (`update-cli-changelog.yml`)

- **Trigger**: Daily at 9 AM UTC, manual dispatch, or webhook
- **Source**: GitHub releases from `checkly/checkly-cli`
- **Behavior**: Parses release notes and creates PRs with formatted changelog entries
- **PR Type**: Ready for review (contains parsed release information)

### 2. Update Private Locations Agent Changelog (`update-agent-changelog.yml`)

- **Trigger**: Daily at 10 AM UTC or manual dispatch
- **Source**: Docker Hub tags from `checkly/agent`
- **Behavior**: Detects new versions and creates PRs with template entries
- **PR Type**: Draft (requires human to fill in release details)

## Key Differences

| Feature | CLI Workflow | Agent Workflow |
|---------|-------------|----------------|
| Data source | GitHub API | Docker Hub API |
| Release notes | Available | Not available |
| PR content | Complete | Template |
| PR status | Ready | Draft |
| Human input | Review only | Fill details |

## Setup

1. Ensure Node.js dependencies are installed:
   ```bash
   cd .github
   npm install
   ```

2. No additional secrets required (uses default `GITHUB_TOKEN`)

## Manual Execution

To manually trigger either workflow:

1. Go to Actions tab in GitHub
2. Select the workflow
3. Click "Run workflow"
4. Select branch and run

## Maintenance

- Update Node.js version in workflows as needed
- Check API endpoints if Docker Hub or GitHub change their APIs
- Review and update the changelog template format as needed