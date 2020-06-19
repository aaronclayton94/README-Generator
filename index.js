const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const util = require("util");

const api = require("./utils/api");

const generateMD = require("./utils/generateMD");

const questions = [
  {
    type: "input",
    message: "What is your Github username?",
    name: "github",
    default: "username",
  },
  {
    type: "input",
    message: "What is the name of your project?",
    name: "title",
    default: "Title",
  },
  {
    type: "input",
    message: "Add a description for your project.",
    name: "description",
    default: "Description",
  },
  {
    type: "input",
    message: "What command to install the necessary packages?",
    name: "installation",
    default: "Installation",
  },
  {
    type: "input",
    message: "What command to run the testing for this application?",
    name: "tests",
  },
  {
    type: "input",
    message: "What should the user know to use this package?",
    name: "usage",
    default: "Usage",
  },
  {
    type: "input",
    message: "How would the user be able to contribute?",
    name: "contributing",
  },
  {
    type: "input",
    message: "License",
    name: "license",
    default: "MIT",
  },
];

function writeToFile(fileName, data) {
  return fs.writeFileSync(path.join(process.cwd(), fileName), data);
};

function init() {
  inquirer.prompt(questions).then((response) => {
    api.getUser(response.github).then(({ data }) => {
      writeToFile("README.MD", generateMD({ ...response, ...data }));
      console.log("Successfully generated README file");
    });
  });
};

init();
