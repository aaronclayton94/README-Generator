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


function generateMD(data) {
    return `
# ${data.title}
${data.description}

## Repository url / Deployed application url

## Table of Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Tests](#Tests)

## Installation
${data.installation}

## Usage
${data.usage}

## Contributing
${data.contributing}

## Tests
${data.tests}

## GitHub username & Email
${data.name}
${data.email}

\n[![aaron](https://img.shields.io/github/followers/aaronclayton94?label=follow&style=social)](https://github.com/aaronclayton94)
`;
}



promptUser()
    .then(function(data) {
        const md = generateMD(data);

        return writeFileAsync("README.md", md);
    })
    .then(function() {
        console.log("Successfully generated README file");
    })
    .catch(function(err) {
        console.log(err);
    });
