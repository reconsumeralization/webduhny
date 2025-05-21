import { Plugin } from "@webiny/plugins";
import type { Reply as FastifyReply, Request as FastifyRequest } from "~/types.js";

export interface IOnRequestResponsePluginCallable {
    (request: FastifyRequest, reply: FastifyReply): Promise<void>;
}

export class OnRequestResponsePlugin extends Plugin {
    public static override type: string = "handler.onRequestResponse";

    private readonly cb: IOnRequestResponsePluginCallable;

    public constructor(cb: IOnRequestResponsePluginCallable) {
        super();
        this.cb = cb;
    }

    public async exec(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        return this.cb(request, reply);
    }
}

export const createOnRequestResponse = (cb: IOnRequestResponsePluginCallable) => {
    return new OnRequestResponsePlugin(cb);
};
