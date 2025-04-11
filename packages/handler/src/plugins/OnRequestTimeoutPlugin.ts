import { Plugin } from "@webiny/plugins";

export interface IOnRequestTimeoutPluginCallable {
    (): Promise<void>;
}

export class OnRequestTimeoutPlugin extends Plugin {
    public static override type: string = "handler.onRequestTimeout";

    private readonly cb: IOnRequestTimeoutPluginCallable;

    public constructor(cb: IOnRequestTimeoutPluginCallable) {
        super();
        this.cb = cb;
    }

    public async exec(): Promise<void> {
        return this.cb();
    }
}

export const createOnRequestTimeout = (cb: IOnRequestTimeoutPluginCallable) => {
    return new OnRequestTimeoutPlugin(cb);
};
