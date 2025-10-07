#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function getLatestReleases() {
  const { data: releases } = await octokit.repos.listReleases({
    owner: 'checkly',
    repo: 'checkly-cli',
    per_page: 20
  });
  
  return releases.filter(r => !r.prerelease);
}

async function getCurrentChangelog() {
  const changelogPath = path.join(process.cwd(), 'site/content/docs/changelog/cli.md');
  return await fs.readFile(changelogPath, 'utf8');
}

function parseReleaseNotes(body) {
  const sections = {
    breaking: [],
    added: [],
    changed: [],
    fixed: [],
    deprecated: [],
    removed: [],
    security: []
  };
  
  if (!body) return sections;
  
  const lines = body.split('\n');
  let currentSection = null;
  
  lines.forEach(line => {
    const trimmed = line.trim();
    
    // Match section headers
    if (trimmed.match(/^#+\s*(breaking\s*changes?)/i)) {
      currentSection = 'breaking';
    } else if (trimmed.match(/^#+\s*added/i) || trimmed.match(/^#+\s*features?/i)) {
      currentSection = 'added';
    } else if (trimmed.match(/^#+\s*changed/i)) {
      currentSection = 'changed';
    } else if (trimmed.match(/^#+\s*fixed/i) || trimmed.match(/^#+\s*bug\s*fixes/i)) {
      currentSection = 'fixed';
    } else if (trimmed.match(/^#+\s*deprecated/i)) {
      currentSection = 'deprecated';
    } else if (trimmed.match(/^#+\s*removed/i)) {
      currentSection = 'removed';
    } else if (trimmed.match(/^#+\s*security/i)) {
      currentSection = 'security';
    }
    // Capture list items
    else if (currentSection && (trimmed.startsWith('-') || trimmed.startsWith('*'))) {
      // Clean up the line
      let cleanLine = trimmed.replace(/^[-*]\s*/, '- ');
      
      // Remove PR links but keep context
      cleanLine = cleanLine.replace(/\s*\(#\d+\)\s*/, '');
      cleanLine = cleanLine.replace(/\s*\[#\d+\]\([^)]+\)\s*/, '');
      
      // Remove commit hashes
      cleanLine = cleanLine.replace(/\s*\([0-9a-f]{7,40}\)\s*/, '');
      
      sections[currentSection].push(cleanLine);
    }
  });
  
  return sections;
}

function extractRuntimeInfo(body) {
  // Try to find runtime information in the release notes
  const runtimeMatch = body.match(/runtime[s]?\s*(20\d{2}\.\d{2})/i);
  return runtimeMatch ? runtimeMatch[1] : null;
}

function formatChangelogEntry(release) {
  const version = release.tag_name.replace(/^v/, '');
  const date = new Date(release.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const sections = parseReleaseNotes(release.body);
  const runtime = extractRuntimeInfo(release.body || '');
  
  let entry = `## Version ${version} - ${date}\n\n`;
  
  // Add runtime info if found
  if (runtime) {
    entry += `**Runtime support**: ${runtime}\n\n`;
  }
  
  // Add sections in preferred order
  const sectionOrder = ['breaking', 'added', 'changed', 'fixed', 'deprecated', 'removed', 'security'];
  
  sectionOrder.forEach(section => {
    if (sections[section].length > 0) {
      const title = section.charAt(0).toUpperCase() + section.slice(1);
      const sectionTitle = section === 'breaking' ? 'Breaking Changes' : title;
      
      entry += `### ${sectionTitle}\n`;
      sections[section].forEach(item => {
        entry += `${item}\n`;
      });
      entry += '\n';
    }
  });
  
  return entry;
}

async function updateChangelog() {
  try {
    const releases = await getLatestReleases();
    const currentChangelog = await getCurrentChangelog();
    
    // Extract existing versions
    const versionRegex = /## Version ([\d.]+)/g;
    const existingVersions = new Set();
    let match;
    
    while ((match = versionRegex.exec(currentChangelog)) !== null) {
      existingVersions.add(match[1]);
    }
    
    // Find new releases
    const newReleases = releases.filter(release => {
      const version = release.tag_name.replace(/^v/, '');
      return !existingVersions.has(version);
    });
    
    if (newReleases.length === 0) {
      console.log('No new releases found');
      process.exit(0);
    }
    
    // Sort by date (newest first)
    newReleases.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    
    // Generate new entries
    const newEntries = newReleases.map(formatChangelogEntry).join('\n');
    
    // Insert new entries after the header section
    const insertPoint = currentChangelog.indexOf('## Version compatibility');
    let updatedChangelog;
    
    if (insertPoint !== -1) {
      updatedChangelog = 
        currentChangelog.slice(0, insertPoint) +
        newEntries + '\n' +
        currentChangelog.slice(insertPoint);
    } else {
      // Fallback: insert after the initial description
      const lines = currentChangelog.split('\n');
      const headerEnd = lines.findIndex(line => line.startsWith('##'));
      
      updatedChangelog = [
        ...lines.slice(0, headerEnd),
        '',
        newEntries.trim(),
        '',
        ...lines.slice(headerEnd)
      ].join('\n');
    }
    
    // Write updated changelog
    const changelogPath = path.join(process.cwd(), 'site/content/docs/changelog/cli.md');
    await fs.writeFile(changelogPath, updatedChangelog);
    
    console.log(`Added ${newReleases.length} new releases to changelog`);
    console.log(`Latest version: ${newReleases[0].tag_name}`);
    
    // Output for GitHub Actions
    console.log(`::set-output name=has_updates::true`);
    console.log(`::set-output name=latest_version::${newReleases[0].tag_name}`);
    console.log(`::set-output name=release_count::${newReleases.length}`);
    
  } catch (error) {
    console.error('Error updating changelog:', error);
    process.exit(1);
  }
}

updateChangelog();