import { SecurityIdentity } from "@webiny/api-security/types";
import { ContextPlugin } from "@webiny/api";
import { CmsContext } from "~/types";
import { Tenant } from "@webiny/api-tenancy/types";

export interface PermissionsArg {
    name: string;
    locales?: string[];
    rwd?: string;
    pw?: string;
    own?: boolean;
}

export const identity = {
    id: "id-12345678",
    displayName: "John Doe",
    type: "admin"
};

const getSecurityIdentity = () => {
    return identity;
};

export const createPermissions = (permissions?: PermissionsArg[]): PermissionsArg[] => {
    if (permissions) {
        return permissions;
    }
    return [
        {
            name: "cms.settings"
        },
        {
            name: "cms.contentModel",
            rwd: "rwd"
        },
        {
            name: "cms.contentModelGroup",
            rwd: "rwd"
        },
        {
            name: "cms.contentEntry",
            rwd: "rwd",
            pw: "rcpu"
        },
        {
            name: "cms.endpoint.read"
        },
        {
            name: "cms.endpoint.manage"
        },
        {
            name: "cms.endpoint.preview"
        },
        {
            name: "content.i18n",
            locales: ["en-US", "de-DE"]
        }
    ];
};

export const createIdentity = (identity?: SecurityIdentity) => {
    if (!identity) {
        return getSecurityIdentity();
    }
    return identity;
};

export interface ICreateDummyLocalesParams {
    tenants: Tenant[];
}

export const createDummyLocales = (params: ICreateDummyLocalesParams) => {
    const { tenants } = params;
    return new ContextPlugin<CmsContext>(async context => {
        const { i18n, security } = context;

        await security.authenticate("");

        const initialTenant = context.tenancy.getCurrentTenant();

        await security.withoutAuthorization(async () => {
            for (const tenant of tenants) {
                context.tenancy.setCurrentTenant(tenant);
                const [items] = await i18n.locales.listLocales({
                    where: {}
                });
                if (items.length > 0) {
                    return;
                }
                await i18n.locales.createLocale({
                    code: "en-US",
                    default: true
                });
                await i18n.locales.createLocale({
                    code: "de-DE",
                    default: true
                });
            }
            context.tenancy.setCurrentTenant(initialTenant);
        });
    });
};
