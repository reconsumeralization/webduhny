const getProject = require("./getProject");

/**
 * @deprecated
 */
module.exports = ({ cwd }) => {
    const project = getProject();

    return project.getApplication(cwd);
};
