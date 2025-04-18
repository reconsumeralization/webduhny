import type { AcoFolderLevelPermissionsStorageOperations } from "~/flp/flp.types";
import type { Folder } from "~/folder/folder.types";
import type { AcoContext } from "~/types";
import { ROOT_FOLDER } from "~/constants";
import WError from "@webiny/error";

export class GetFlp {
    private operations: AcoFolderLevelPermissionsStorageOperations;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations) {
        this.operations = operations;
    }

    public execute = async (data: Folder, context: AcoContext) => {
        const tenant = context.tenancy.getCurrentTenant().id;
        const locale = context.i18n.getContentLocale()!.code;
        const { parentId, id, type, slug, permissions = [] } = data;

        let path = `${ROOT_FOLDER}/${slug}`;

        if (parentId) {
            const parent = await this.operations.get({
                where: { tenant, locale, type, id: parentId }
            });

            if (!parent) {
                throw new WError(
                    `Cannot find parent FLP record with id ${parentId}.`,
                    "ERROR_GET_FLP_UTIL"
                );
            }

            path = `${parent.path}/${slug}`;
        }

        return {
            tenant,
            locale,
            id,
            parentId: parentId ?? ROOT_FOLDER,
            type,
            slug,
            path,
            permissions
        };
    };
}
