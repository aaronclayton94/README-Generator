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
            name: "contents",
            message: "Table of Contents",
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
            name: "questions",
            message: "Questions",
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
${answers}

### Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## Questions
${answers.questions}

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

        return writeFileAsync("readme.md", md);
    })
    .then(function() {
        console.log("success");
    })
    .catch(function(err) {
        console.log(err);
    });
