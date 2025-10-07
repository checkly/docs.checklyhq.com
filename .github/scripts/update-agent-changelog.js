#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const https = require('https');

/**
 * Fetch tags from Docker Hub API
 */
async function fetchDockerHubTags() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'hub.docker.com',
      path: '/v2/repositories/checkly/agent/tags?page_size=50',
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    };

    https.get(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result.results || []);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Parse version from tag name
 */
function parseVersion(tagName) {
  // Match semantic version pattern
  const match = tagName.match(/^v?(\d+\.\d+\.\d+)$/);
  return match ? match[1] : null;
}

/**
 * Compare semantic versions
 */
function compareVersions(a, b) {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);
  
  for (let i = 0; i < 3; i++) {
    if (partsA[i] > partsB[i]) return 1;
    if (partsA[i] < partsB[i]) return -1;
  }
  return 0;
}

/**
 * Read current changelog and extract documented versions
 */
async function getDocumentedVersions() {
  const changelogPath = path.join(process.cwd(), 'site/content/docs/changelog/private-locations-agent.md');
  const content = await fs.readFile(changelogPath, 'utf8');
  
  const versionRegex = /### Version ([\d.]+)/g;
  const versions = new Set();
  let match;
  
  while ((match = versionRegex.exec(content)) !== null) {
    versions.add(match[1]);
  }
  
  return versions;
}

/**
 * Format date for changelog
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Generate changelog entry template
 */
function generateChangelogTemplate(version, date) {
  return `### Version ${version} (${date})

<!-- PLEASE FILL IN THE SECTIONS BELOW WITH ACTUAL RELEASE INFORMATION -->

**Breaking changes**

<!-- List any breaking changes that require user action -->
- 

**Features**

<!-- List new features and capabilities -->
- 

**Improvements**

<!-- List improvements and optimizations -->
- 

**Security updates**

<!-- List security-related updates -->
- 

**Bug fixes**

<!-- List bug fixes -->
- 

**Runtime support**

<!-- Specify supported Checkly runtime versions -->
- Runtime: <!-- e.g., 2025.04, 2024.09 -->

**Dependencies**

<!-- Specify dependency versions -->
- Node.js: <!-- e.g., v22.11.0 -->
- Docker minimum: <!-- e.g., 20.10 -->
- Playwright: <!-- e.g., 1.51.1 -->

`;
}

/**
 * Update changelog file
 */
async function updateChangelog(newVersions) {
  const changelogPath = path.join(process.cwd(), 'site/content/docs/changelog/private-locations-agent.md');
  let content = await fs.readFile(changelogPath, 'utf8');
  
  // Sort versions newest first
  newVersions.sort((a, b) => compareVersions(b.version, a.version));
  
  // Generate new entries
  const newEntries = newVersions
    .map(v => generateChangelogTemplate(v.version, v.date))
    .join('\n');
  
  // Find insertion point (after "## Checkly Agent Releases" heading)
  const insertRegex = /## Checkly Agent Releases\n/;
  const insertMatch = content.match(insertRegex);
  
  if (insertMatch) {
    const insertIndex = insertMatch.index + insertMatch[0].length;
    content = 
      content.slice(0, insertIndex) + 
      '\n' + newEntries +
      content.slice(insertIndex);
  } else {
    // Fallback: insert after the main description
    const lines = content.split('\n');
    const headerEnd = lines.findIndex(line => line.startsWith('## '));
    
    content = [
      ...lines.slice(0, headerEnd),
      '',
      '## Checkly Agent Releases',
      '',
      newEntries.trim(),
      '',
      ...lines.slice(headerEnd)
    ].join('\n');
  }
  
  await fs.writeFile(changelogPath, content);
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Fetching Docker Hub tags...');
    const tags = await fetchDockerHubTags();
    
    console.log('Getting documented versions...');
    const documentedVersions = await getDocumentedVersions();
    
    // Process tags and find new versions
    const newVersions = [];
    
    for (const tag of tags) {
      const version = parseVersion(tag.name);
      
      if (version && !documentedVersions.has(version)) {
        // Skip if it's a beta/rc/alpha version
        if (tag.name.includes('beta') || tag.name.includes('rc') || tag.name.includes('alpha')) {
          continue;
        }
        
        newVersions.push({
          version,
          date: formatDate(tag.last_updated),
          tag: tag.name
        });
      }
    }
    
    if (newVersions.length === 0) {
      console.log('No new versions found');
      process.exit(0);
    }
    
    console.log(`Found ${newVersions.length} new version(s):`, newVersions.map(v => v.version).join(', '));
    
    // Update changelog
    await updateChangelog(newVersions);
    
    // Set output for GitHub Actions
    const latestVersion = newVersions.sort((a, b) => compareVersions(b.version, a.version))[0].version;
    
    // Update commit message to include version
    await require('child_process').execSync(
      `git commit --amend -m "docs: add Private Locations Agent version ${latestVersion} to changelog"`,
      { stdio: 'inherit' }
    );
    
    console.log('Changelog updated successfully');
    
  } catch (error) {
    console.error('Error updating changelog:', error);
    process.exit(1);
  }
}

main();