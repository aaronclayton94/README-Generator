const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Project title?",
        },
        {
            type: "input",
            name: "description",
            message: "Project description",
        },
        {
            type: "input",
            name: "installation",
            message: "Installation",
        },
        {
            type: "input",
            name: "usage",
            message: "Usage",
        },
        {
            type: "input",
            name: "license",
            message: "License",
        },
        {
            type: "input",
            name: "contributing",
            message: "Contributing",
        },
        {
            type: "input",
            name: "tests",
            message: "Tests",
        },
        {
            type: "input",
            name: "name",
            message: "What is your GitHub username?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your GitHub email?",
        },
    ])
}

function generateMD(answers) {
    return `
# Project Title
${answers.title}

## Project description
${answers.description}

## Table of Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Questions](#Questions)

### Installation
${answers.installation}

## Usage <a name="usage"></a>
${answers.usage}

## Contributing
${answers.contributing}

##Tests
${answers.tests}

## GitHub username:
${answers.name}
## GitHub email:
${answers.email}
[![aaron](https://img.shields.io/github/followers/aaronclayton94?label=follow&style=social)](https://github.com/aaronclayton94)
`;
}

promptUser()
    .then(function(answers) {
        const md = generateMD(answers);

        return writeFileAsync("README.md", md);
    })
    .then(function() {
        console.log("success");
    })
    .catch(function(err) {
        console.log(err);
    });
