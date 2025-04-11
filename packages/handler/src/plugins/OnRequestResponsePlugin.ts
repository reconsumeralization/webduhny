import { Plugin } from "@webiny/plugins";

export interface IOnRequestResponsePluginCallable {
    (): Promise<void>;
}

export class OnRequestResponsePlugin extends Plugin {
    public static override type: string = "handler.onRequestResponse";

    private readonly cb: IOnRequestResponsePluginCallable;

    public constructor(cb: IOnRequestResponsePluginCallable) {
        super();
        this.cb = cb;
    }

    public async exec(): Promise<void> {
        return this.cb();
    }
}

export const createOnRequestResponse = (cb: IOnRequestResponsePluginCallable) => {
    return new OnRequestResponsePlugin(cb);
};
