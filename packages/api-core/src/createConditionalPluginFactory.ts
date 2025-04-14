import { PluginFactory } from "@webiny/plugins/types";

export type Condition = () => boolean;

export const createConditionalPluginFactory = (
    condition: Condition,
    cb: PluginFactory
): PluginFactory => {
    return () => {
        if (condition()) {
            return cb();
        }

        return Promise.resolve([]);
    };
};
