const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ 
  auth: process.env.GITHUB_TOKEN,
});

const owner = 'FerGlez230';
const repo = 'GitHubActionsTest';
const branch = 'main'; // Replace with your GitHub Pages branch name

let content = {}; // The content to be written to the file
const dateISOString = new Date().toISOString();
const path = dateISOString.slice(0, dateISOString.indexOf('T'))+'.txt'; // The path and name of the file to be created

const currentDate = new Date().toISOString().split("T")[0];
const sprintBegin = new Date();
sprintBegin.setDate(sprintBegin.getDate() - 10);
const sprintBeginDate = sprintBegin.toISOString().split("T")[0];

const query = `repo:${owner}/${repo} is:issue is:closed closed:${sprintBeginDate}..${currentDate}`;


const closedIssues = [];
octokit.request('GET /search/issues', {
  q: query,
})
  .then((response) => {
    const issues = response.data.items;
    console.log("Closed issues in the last 10 days:");
    issues.forEach((issue) => {
      closedIssues.push(issue.title)
      console.log(`- ${issue.title}`);
    });
    const responseContent = {
      numberOfClosedIssues: issues.length,
      closedIssues
    };
    const jsonContent = JSON.stringify(responseContent);
    // content = Buffer.from('jsonContent').toString('base64');
    content = btoa(jsonContent);
    console.log(content);
    octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
      message: 'Get data from API',
      committer: {
        name: owner,
        email: 'fergle230@gmail.com'
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
  })
  .catch((error) => {
    console.error("Error:", error);
  });

/*octokit.request("GET /repos/{owner}/{repo}/issues", {
  owner,
  repo,
  per_page: 2
})
.then((issues) => {
  console.log('here');
  const jsonContent = JSON.stringify(issues);
  // content = Buffer.from('jsonContent').toString('base64');
  content = btoa(jsonContent);
  console.log(content);
  octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    path,
    message: 'Get data from API',
    committer: {
      name: owner,
      email: 'fergle230@gmail.com'
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
})
.catch(error => {
  console.error('Error:', error);
})*/


