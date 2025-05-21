import { Plugin } from "@webiny/plugins";
import type { Reply as FastifyReply, Request as FastifyRequest } from "~/types.js";

export interface IOnRequestTimeoutPluginCallable {
    (request: FastifyRequest, reply: FastifyReply): Promise<void>;
}

export class OnRequestTimeoutPlugin extends Plugin {
    public static override type: string = "handler.onRequestTimeout";

    private readonly cb: IOnRequestTimeoutPluginCallable;

    public constructor(cb: IOnRequestTimeoutPluginCallable) {
        super();
        this.cb = cb;
    }

    public async exec(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        return this.cb(request, reply);
    }
}

export const createOnRequestTimeout = (cb: IOnRequestTimeoutPluginCallable) => {
    return new OnRequestTimeoutPlugin(cb);
};
