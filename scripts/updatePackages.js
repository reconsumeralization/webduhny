const { updatePackages, presets, getUserInput } = require("./updatePackagesLib/index");

(async () => {
    const { dryRun, matching, skipResolutions } = await getUserInput({
        presets
    });

    return updatePackages({
        matching,
        dryRun,
        skipResolutions
    });
})();
