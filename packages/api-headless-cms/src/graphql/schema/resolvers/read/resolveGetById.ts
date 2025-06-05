import { ErrorResponse, Response } from "@webiny/handler-graphql/responses";
import { CmsEntryResolverFactory as ResolverFactory } from "~/types";
import { NotFoundError } from "@webiny/handler-graphql";

interface CmsEntryResolveGetParams {
    id: string;
}

type ResolveGet = ResolverFactory<any, CmsEntryResolveGetParams>;

export const resolveGetById: ResolveGet =
    ({ model }) =>
    async (_: any, args: CmsEntryResolveGetParams, context) => {
        try {
            const [entry] = await context.cms.getPublishedEntriesByIds(model, [args.id]);

            if (!entry || entry.id !== args.id) {
                throw new NotFoundError(`Entry not found!`);
            }
            return new Response(entry);
        } catch (e) {
            return new ErrorResponse(e);
        }
    };
