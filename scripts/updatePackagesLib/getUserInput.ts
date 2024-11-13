import { IPreset } from "./createPreset";
import inquirer from "inquirer";

export interface IGetUserInputParams {
    presets: IPreset[];
}

export interface IUserInputParams {
    dryRun: boolean;
    skipResolutions: boolean;
    matching: RegExp;
}

export const getUserInput = async ({ presets }: IGetUserInputParams): Promise<IUserInputParams> => {
    const prompt = inquirer.createPromptModule();

    const { dryRun } = await prompt({
        name: "dryRun",
        type: "confirm",
        default: true,
        message: "First, is this a dry run?"
    });

    const { preset } = await prompt({
        name: "preset",
        default: null,
        type: "list",
        choices: [
            { name: "Use custom matching", value: null },

            ...presets.map(p => {
                return {
                    name: p.name,
                    value: p.name
                };
            })
        ]
    });
    if (preset) {
        const matching = presets.find(p => p.name === preset);
        if (!matching) {
            throw new Error(`Preset not found: ${preset}`);
        }
        return {
            ...matching,
            dryRun
        };
    }

    const { matching } = await prompt({
        name: "matching",
        type: "input",
        message: "Enter a regex to match package names."
    });

    const { skipResolutions } = await prompt({
        name: "skipResolutions",
        type: "confirm",
        default: true,
        message: "Skip adding packages to main package.json resolutions?"
    });

    return {
        matching,
        dryRun,
        skipResolutions
    };
};
