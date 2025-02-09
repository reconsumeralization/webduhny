const { Project } = require("./Project");

let project;

async function initializeProject() {
    project = await Project.load();

    return project;
}

module.exports = () => {
    if (!project) {
        throw Error(
            `Project has not been initialized! Make sure you call "initializeProject" from "@webiny/cli"!`
        );
    }

    return project;
};

module.exports.initializeProject = initializeProject;
