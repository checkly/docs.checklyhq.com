---
title: Private Locations Agent Changelog - Checkly Docs
displayTitle: Private Locations Agent Changelog
navTitle: Private Locations Agent
weight: 20
---

Release history for the Checkly Private Locations Agent. For setup instructions, see the [Private Locations documentation](/docs/private-locations).

- **Major releases**: View summarized releases in the [product changelog](https://feedback.checklyhq.com/changelog?c=Checkly+Agent)

## Checkly Agent Releases

### Version 6.0.6 (June 26, 2025)

**Security improvements**

- Updated container to use GID 10001 for enhanced Kubernetes compatibility
- Configure with `runAsGroup: 10001` in your security context

**Stability fixes**

- Improved error handling for missing `await` statements in Playwright tests
- Fixed JSON report generation issues with oversized or unparsable values

### Version 6.0.5 (June 23, 2025)

**Features**

- Added support for [Playwright check suites](/docs/playwright-checks/).
- Added debug logging with `DEBUG=checkly:*` environment variable
- Bundled Node.js for offline installations

**Security updates**

- Enhanced secret scrubbing in logs
- Patched all reported npm vulnerabilities

**Improvements**

- Added retry logic for artifact uploads
- Improved fault tolerance

### Version 6.0.0 (May 9, 2025)

**Breaking changes**

- Minimum Docker version 20.10 required
- Updated configuration schema

**New features**

- Support for runtimes [2024.09](/docs/runtimes/specs/#202409) and [2025.04](/docs/runtimes/specs/#202504)
- Disabled `PLAYWRIGHT_NO_COPY_PROMPT` for better reporter compatibility

## Version history

- **Summary**: [Product changelog](https://feedback.checklyhq.com/changelog?c=Checkly+Agent)
- **Latest versions pusblished**: [Docker Hub tags](https://hub.docker.com/r/checkly/agent/tags)

## Compatibility matrix

| Agent version | Docker minimum | Supported runtimes | Node.js |
|--------------|----------------|-------------------|---------|
| 6.x | 20.10 | [2025.04](/docs/runtimes/specs/#202504), [2024.09](/docs/runtimes/specs/#202409) | v22.11.0 |
| 5.x | 19.03 | [2025.04](/docs/runtimes/specs/#202509) | v22.11.0 |
| 4.x | 19.03 | [2024.09](/docs/runtimes/specs/#202409) | v18 |
| 3.x | 19.03 | [2023.09](/docs/runtimes/specs/#202309) | v18 |

## Update checklist

When [updating to the lates agent](/docs/private-locations/checkly-agent-configuration/#updating-the-agent-container), ensure:

1. Confirm Docker version compatibility
2. Review breaking changes like Node.js supported version.
3. Test in staging environment
4. Update configuration files
5. Deploy changes

## Getting help

- View logs with `docker logs <container-id>`
- Enable debug mode for detailed diagnostics
- Join the global [developer community](https://www.checklyhq.com/slack/) discussions
- [Contact the support team](https://app.checklyhq.com/?support=true) for help