const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { updatePackages, presets } = require("./updatePackagesLib/index");

const argv = yargs(hideBin(process.argv))
    .usage("Usage: $0 <command> [options]")
    .options({
        matching: {
            type: "string"
        },
        preset: {
            type: "string",
            choices: presets
        },
        "dry-run": {
            type: "boolean",
            demandOption: false,
            default: true
        },
        skipResolutions: {
            type: "boolean",
            demandOption: false,
            default: false
        }
    })
    .parseSync();

updatePackages({
    matching: argv.matching,
    preset: argv.preset,
    dryRun: argv.dryRun || argv["dry-run"],
    skipResolutions: argv.skipResolutions
});
