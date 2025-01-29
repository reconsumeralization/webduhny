module.exports = () => ({
    type: "cli-command-deployment-build-all",
    name: "cli-command-deployment-build-all",
    build: (...args) => require("./build")(...args)
});
