module.exports = () => [
    require("./build")(),
    require("./open"),
    require("./deploy")(),
    require("./destroy")(),
    require("./info"),
    require("./aws")
];
