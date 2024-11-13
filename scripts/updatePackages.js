const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { updatePackages } = require("./updatePackagesLib/index");

const argv = yargs(hideBin(process.argv))
    .usage("Usage: $0 <command> [options]")
    .options({
        matching: {
            type: "string"
        },
        preset: {
            type: "string",
            choices: ["babel", "aws-sdk"]
        },
        "dry-run": {
            type: "boolean",
            demandOption: false,
            default: true
        }
    })
    .parseSync();

updatePackages({
    matching: argv.matching,
    preset: argv.preset,
    dryRun: argv.dryRun || argv["dry-run"]
});
