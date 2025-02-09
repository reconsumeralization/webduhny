const { prepublishOnly } = require("./prepublishOnly");

(async () => {
    await prepublishOnly();
    process.exit();
})();
