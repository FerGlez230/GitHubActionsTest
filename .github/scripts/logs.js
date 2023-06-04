const { Octokit } = require('@octokit/rest');

const owner = 'FerGlez230';
const repo = 'GitHubActionsTest';
const branch = 'main'; // Replace with your GitHub Pages branch name

const content = 'Hello, GitHub Pages!'; // The content to be written to the file
const path = 'example-file.txt'; // The path and name of the file to be created

const octokit = new Octokit();

octokit.repos.createOrUpdateFileContents({
  owner,
  repo,
  path,
  message: 'Create file via API',
  content: Buffer.from(content).toString('base64'),
  branch,
  token: process.env.GITHUB_TOKEN, // Use the GITHUB_TOKEN provided by GitHub Actions
})
  .then(() => {
    console.log('File created successfully!');
  })
  .catch(error => {
    console.error('Error:', error);
  });
