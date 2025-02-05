const inquirer = require("inquirer");
const setup = require("./setup");
const { regions } = require("@webiny/cli");

const choices = {
    ddb: {
        value: "ddb",
        name: "DynamoDB (for small and medium sized projects)"
    },
    ddbOs: {
        value: "ddb-os",
        name: "Amazon DynamoDB + Amazon OpenSearch (for larger projects)"
    }
};

const runInquirer = async cwp => {
    if (!cwp.interactive) {
        return setup(cwp);
    }

    console.log(
        "In order to create your new Webiny project, please answer the following questions."
    );
    console.log();

    const templateOptions = await inquirer.prompt([
        {
            type: "list",
            name: "region",
            default: "us-east-1",
            message: "Please choose the AWS region in which your project will be deployed:",
            // Some of the regions might be commented out (not all service supported).
            choices: regions
        },
        {
            type: "list",
            name: "storageOperations",
            default: "ddb",
            message: `Please choose the database setup you wish to use with your project (cannot be changed later):`,
            choices: Object.values(choices)
        }
    ]);

    return setup({
        ...cwp,
        templateOptions
    });
};

module.exports = runInquirer;
