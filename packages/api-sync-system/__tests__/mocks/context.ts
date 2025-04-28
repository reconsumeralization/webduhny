import { Context } from "@webiny/api/Context";
import type { Context as ContextType } from "~/types";
import type { Reply as FastifyReply, Request as FastifyRequest } from "@webiny/handler/types.js";

export const createMockContext = () => {
    const request = {} as FastifyRequest;
    const reply = {} as FastifyReply;
    const context = new Context({
        plugins: [],
        WEBINY_VERSION: process.env.WEBINY_VERSION as string
    }) as unknown as ContextType;

    return {
        context,
        request,
        reply
    };
};
