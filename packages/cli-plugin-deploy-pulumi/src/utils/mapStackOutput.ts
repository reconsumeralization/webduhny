import get from "lodash/get";
import { yellow } from "chalk";

export const mapStackOutput = (output: Record<string, any>, map: Record<string, any>) => {
    const values: Record<string, any> = {};
    const regex = /\${(.*)}/;

    Object.keys(map).forEach(key => {
        const valuePattern = map[key];
        const match = regex.exec(valuePattern);
        if (match) {
            const [replace, valuePath] = match;
            const value = get(output, valuePath);
            if (!value) {
                console.log(yellow(`Could not map "${valuePath}" to "${key}" - value missing.`));
                return;
            }

            if (typeof value === "object" && value !== null) {
                values[key] = valuePattern.replace(replace, JSON.stringify(value));
            } else {
                values[key] = valuePattern.replace(replace, value);
            }
        }
    });

    return values;
};
