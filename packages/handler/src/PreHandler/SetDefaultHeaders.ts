import type { FastifyReply, FastifyRequest } from "fastify";
import { getWebinyVersionHeaders } from "@webiny/utils";
import { ResponseHeaders } from "~/ResponseHeaders";
import { DefinedContextRoutes, HTTPMethods } from "~/types";
import { Action, IPreHandler } from "~/PreHandler/IPreHandler";

function createDefaultHeaders() {
    return ResponseHeaders.create({
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "*",
        "access-control-allow-methods": "OPTIONS,POST,GET,DELETE,PUT,PATCH",
        ...getWebinyVersionHeaders()
    });
}

const getDefaultOptionsHeaders = () => {
    return ResponseHeaders.create({
        "access-control-max-age": "86400",
        "cache-control": "public, max-age=86400"
    });
};

const getDefaultHeaders = (routes: DefinedContextRoutes): ResponseHeaders => {
    const headers = createDefaultHeaders();

    /**
     * If we are accepting all headers, just output that one.
     */
    const keys = Object.keys(routes) as HTTPMethods[];
    const all = keys.every(key => routes[key].length > 0);
    if (all) {
        headers.set("access-control-allow-methods", "*");
    } else {
        const allowedMethods = keys
            .filter(type => {
                if (!routes[type] || !Array.isArray(routes[type])) {
                    return false;
                }
                return routes[type].length > 0;
            })
            .sort()
            .join(",");

        headers.set("access-control-allow-methods", allowedMethods);
    }

    return headers;
};

export class SetDefaultHeaders implements IPreHandler {
    private readonly definedRoutes: DefinedContextRoutes;

    constructor(definedRoutes: DefinedContextRoutes) {
        this.definedRoutes = definedRoutes;
    }

    execute(request: FastifyRequest, reply: FastifyReply) {
        const isOptionsRequest = request.method === "OPTIONS";
        /**
         * Our default headers are always set. Users can override them.
         */
        const defaultHeaders = getDefaultHeaders(this.definedRoutes);

        const initialHeaders = isOptionsRequest
            ? defaultHeaders.merge(getDefaultOptionsHeaders())
            : defaultHeaders;

        reply.headers(initialHeaders.getHeaders());

        return Action.CONTINUE;
    }
}
