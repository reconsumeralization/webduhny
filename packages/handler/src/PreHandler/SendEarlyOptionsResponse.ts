import { FastifyReply, FastifyRequest } from "fastify";
import { Action, IPreHandler } from "~/PreHandler/IPreHandler";
import { ModifyResponseHeadersPlugin } from "~/plugins/ModifyResponseHeadersPlugin";
import { ResponseHeaders, StandardHeaders } from "~/ResponseHeaders";

export class SendEarlyOptionsResponse implements IPreHandler {
    private readonly plugins: ModifyResponseHeadersPlugin[];

    constructor(plugins: ModifyResponseHeadersPlugin[]) {
        this.plugins = plugins;
    }

    async execute(request: FastifyRequest, reply: FastifyReply): Promise<Action> {
        /**
         * IMPORTANT! Do not send anything if reply was already sent.
         */
        if (reply.sent) {
            /**
             * At this point throwing an exception will not do anything with the response. So just log it.
             */
            console.error(
                JSON.stringify({
                    message: `Output was already sent. Please check custom plugins of type "HandlerOnRequestPlugin".`,
                    explanation:
                        "This error can happen if the user plugin ended the reply, but did not return false as response."
                })
            );
            return Action.DONE;
        }

        const headers = ResponseHeaders.create(reply.getHeaders() as StandardHeaders);

        this.plugins.forEach(plugin => {
            plugin.modify(request, headers);
        });

        reply.headers(headers.getHeaders());

        reply.code(204).send("").hijack();

        return Action.DONE;
    }
}
