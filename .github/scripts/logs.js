const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ 
  auth: process.env.GITHUB_TOKEN,
});

const owner = 'FerGlez230';
const repo = 'GitHubActionsTest';
const branch = 'main'; // Replace with your GitHub Pages branch name

let content = 'Hello, GitHub Pages!'; // The content to be written to the file
const dateISOString = new Date().toISOString();
const path = dateISOString.slice(0, dateISOString.indexOf('T'))+'.txt'; // The path and name of the file to be created

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
.then((issues) => {
  console.log('here', issues.data);
  const jsonContent = JSON.stringify(response.data);
  content = Buffer.from(jsonContent, 'utf-8').toString('base64');
  console.log(content);

})
.catch(error => {
  console.error('Error:', error);
})


octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
  owner,
  repo,
  path,
  sha: 'bf2b116bb316f0d79d4e0a8ae7b1d9a960eb2f56',
  message: 'Get data from API',
  committer: {
    name: owner,
    email: 'fergle230z@gmail.com'
  },
  content,
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