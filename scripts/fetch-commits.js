import fetch from 'node-fetch';
import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

const owner = 'mswnlz';
const token = process.env.GITHUB_TOKEN; // For higher rate limits, set a GITHUB_TOKEN env variable

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, retries = 3, retryDelay = 10000) {
  for (let i = 0; i < retries; i++) {
    await delay(500 + Math.random() * 1000); // Add random delay to avoid hitting rate limit burst
    const response = await fetch(url, options);
    if (response.ok) {
      return response;
    }
    if (response.status === 403 || response.status === 429) {
      console.warn(`Rate limit hit for ${url}. Retrying in ${retryDelay / 1000}s... (${i + 1}/${retries})`);
      await delay(retryDelay);
    } else {
      console.error(`Failed to fetch ${url}: ${response.statusText}`);
      return null; // Don't retry on other errors
    }
  }
  console.error(`Failed to fetch ${url} after ${retries} retries.`);
  if (!token) {
    console.error('Consider setting a GITHUB_TOKEN environment variable for higher rate limits.');
  }
  return null;
}


async function getLatestCommit(repo) {
  const commitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  try {
    const commitsResponse = await fetchWithRetry(commitsUrl, { headers });
    if (!commitsResponse) return null;
    
    const commits = await commitsResponse.json();
    if (!commits || commits.length === 0) return null;
    
    const latestCommitInfo = commits[0];
    const latestSha = latestCommitInfo.sha;

    const commitDetailUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${latestSha}`;
    const commitDetailResponse = await fetchWithRetry(commitDetailUrl, { headers });
    if (!commitDetailResponse) return null;
    const commitDetails = await commitDetailResponse.json();

    let fileUrl = `/${repo}/`; // Default to repo index
    if (commitDetails.files && commitDetails.files.length > 0) {
      const changedFile = commitDetails.files.find(f => f.filename.endsWith('.md'));
      if (changedFile) {
        const fileName = changedFile.filename.split('/').pop();
        if (fileName.toLowerCase() !== 'readme.md') {
           fileUrl = `/${repo}/${fileName.replace('.md', '')}`;
        }
      }
    }

    return {
      repo: repo,
      message: latestCommitInfo.commit.message.split('\n')[0],
      date: latestCommitInfo.commit.committer.date,
      url: fileUrl,
    };

  } catch (error) {
    console.error(`An unexpected error occurred for repo ${repo}:`, error);
    return null;
  }
}

async function main() {
  // Hard-coded list of repositories to avoid config parsing issues
  const repos = [
    'AIknowledge',
    'auto', 
    'book',
    'chinese-traditional',
    'cross-border',
    'curriculum',
    'edu-knowlege',
    'healthy',
    'movies',
    'self-media',
    'tools'
  ];
  
  console.log('Found repos:', repos);

  const commitData = [];
  for (const repo of repos) {
    if (repo === 'index') continue; // Skip the root index
    const commit = await getLatestCommit(repo);
    if (commit) {
      commitData.push(commit);
    }
  }

  const outputPath = resolve(process.cwd(), 'docs/public/commits.json');
  writeFileSync(outputPath, JSON.stringify(commitData, null, 2));
  console.log(`Successfully wrote commit data to ${outputPath}`);

  // Copy to mswnlz.github.io/docs/public/commits.json
  const targetPath = resolve(process.cwd(), 'mswnlz.github.io/docs/public/commits.json');
  writeFileSync(targetPath, JSON.stringify(commitData, null, 2));
  console.log(`Successfully copied commit data to ${targetPath}`);
}

main();
