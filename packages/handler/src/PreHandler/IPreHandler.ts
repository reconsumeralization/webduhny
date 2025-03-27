import type { FastifyReply, FastifyRequest } from "fastify";

export enum Action {
    CONTINUE = "continue",
    DONE = "done"
}

export interface IPreHandler {
    execute(request: FastifyRequest, reply: FastifyReply): Promise<Action> | Action;
}
