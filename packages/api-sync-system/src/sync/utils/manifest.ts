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
    getDocumentClient(): Pick<DynamoDBDocument, "send">;
}

export const getManifest = async (params: IGetManifestParams) => {
    const documentClient = params.getDocumentClient();
    try {
        ServiceDiscovery.setDocumentClient(documentClient);
        const manifest = await ServiceDiscovery.load();
        if (!manifest?.sync) {
            return {
                /**
                 * This error will be silent. We do not want to log or throw at this point.
                 */
                error: new Error(
                    "Sync System Manifest not found. Probably Sync System is not turned on."
                )
            };
        }
        const { data, error } = validateManifest.safeParse(manifest);
        if (error) {
            console.error("Sync System: Failed to validate manifest.");
            const err = createZodError(error);
            console.info(JSON.stringify(convertException(err)));
            return {
                error: err
            };
        }
        return {
            data
        };
    } catch (ex) {
        console.error("Sync System: Failed to load manifest.");
        console.info(convertException(ex));
        return {
            error: ex
        };
    }
};
