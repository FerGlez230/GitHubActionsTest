const { Octokit } = require('@octokit/rest');
const githubToken = process.env.GITHUB_TOKEN;
console.log(`The GITHUB_TOKEN is: ${githubToken}`);
const octokit = new Octokit({ 
  auth: process.env.GITHUB_TOKEN,
});

const owner = 'FerGlez230';
const repo = 'GitHubActionsTest';
const branch = 'main'; // Replace with your GitHub Pages branch name

const content = 'Hello, GitHub Pages!'; // The content to be written to the file
const path = new Date().toISOString()+'.txt'; // The path and name of the file to be created

/*octokit.repos.createOrUpdateFileContents({
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
  });*/

octokit.request("GET /repos/{owner}/{repo}/issues", {
  owner,
  repo,
  per_page: 2
})
.then((response) => {
  console.log('hi', process.env)
  // console.log('File created successfully!', response);
})
.catch(error => {
  console.error('Error:', error);
})

octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
  owner,
  repo,
  path,
  message: 'my commit message',
  committer: {
    name: owner,
    email: 'ferglez@gmail.com'
  },
  content: 'bXkgbmV3IGZpbGUgY29udGVudHM=',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})
.then((response) => {
  console.log('File created successfully!', response);
})
.catch(error => {
  console.error('Error:', error);
})
