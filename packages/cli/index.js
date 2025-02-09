const { getContext, createContext } = require("./context");
const regions = require("./regions");

const initializeProject = async () => {
    return await createContext();
};

module.exports = { initializeProject, getCli: getContext, regions };
