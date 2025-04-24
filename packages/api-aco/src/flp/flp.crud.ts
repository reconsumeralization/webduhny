import type { AcoFolderLevelPermissionsCrud, AcoStorageOperations } from "~/types";
import { I18NLocale } from "@webiny/api-i18n/types";
import { Tenant } from "@webiny/api-tenancy/types";

export interface CreateFlpCrudMethodsParams {
    getLocale: () => I18NLocale;
    getTenant: () => Tenant;
    storageOperations: AcoStorageOperations;
}

export const createFlpCrudMethods = ({
    storageOperations,
    getTenant,
    getLocale
}: CreateFlpCrudMethodsParams): AcoFolderLevelPermissionsCrud => {
    return {
        async get({ id, type }) {
            return storageOperations.flp.get({
                where: { id, type, tenant: getTenant().id, locale: getLocale().code }
            });
        },
        async list({ where }) {
            return storageOperations.flp.list({
                where: {
                    ...where,
                    tenant: getTenant().id,
                    locale: getLocale().code
                }
            });
        }
    };
};
