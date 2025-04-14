import { ServiceDiscovery } from "@webiny/api";
import zod from "zod";
import { convertException, createZodError } from "@webiny/utils";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";

const validateManifest = zod.object({
    sync: zod.object({
        eventBusArn: zod.string(),
        eventBusName: zod.string(),
        region: zod.string()
    })
});

export interface IGetManifestParams {
    documentClient: DynamoDBDocument;
}

export const getManifest = async (params: IGetManifestParams) => {
    try {
        ServiceDiscovery.setDocumentClient(params.documentClient);
        const manifest = await ServiceDiscovery.load();
        const { data, error } = validateManifest.safeParse(manifest);
        if (error) {
            console.error("Sync System: Failed to validate manifest.");
            console.info(convertException(createZodError(error)));
            return null;
        }
        return data;
    } catch (ex) {
        console.error("Sync System: Failed to load manifest.");
        console.info(convertException(ex));
    }
    return null;
};
