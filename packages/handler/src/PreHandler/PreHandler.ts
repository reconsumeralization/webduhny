import { FastifyReply, FastifyRequest } from "fastify";
import { Action, IPreHandler } from "~/PreHandler/IPreHandler";

export class PreHandler implements IPreHandler {
    private readonly handlers: IPreHandler[];

    constructor(handlers: IPreHandler[]) {
        this.handlers = handlers;
    }

    async execute(request: FastifyRequest, reply: FastifyReply): Promise<Action> {
        for (const handler of this.handlers) {
            const action = await handler.execute(request, reply);
            if (action === Action.DONE) {
                return Action.DONE;
            }
        }

        return Action.CONTINUE;
    }
}
