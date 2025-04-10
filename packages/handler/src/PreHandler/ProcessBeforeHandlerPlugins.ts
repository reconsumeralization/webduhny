import { Action, IPreHandler } from "~/PreHandler/IPreHandler";
import { stringifyError } from "~/stringifyError";
import type { Context } from "~/types";
import { BeforeHandlerPlugin } from "~/plugins/BeforeHandlerPlugin";

export class ProcessBeforeHandlerPlugins implements IPreHandler {
    private readonly plugins: BeforeHandlerPlugin[];
    private readonly context: Context;

    constructor(context: Context, plugins: BeforeHandlerPlugin[]) {
        this.context = context;
        this.plugins = plugins;
    }

    async execute(): Promise<Action> {
        let name: string | undefined;
        try {
            for (const plugin of this.plugins) {
                name = plugin.name;
                await plugin.apply(this.context);
            }
        } catch (ex) {
            console.error(`Error running BeforeHandlerPlugin "${name}".`);
            console.error(stringifyError(ex));
            throw ex;
        }

        return Action.CONTINUE;
    }
}
