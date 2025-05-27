import { CREATE_TENANT, INSTALL_TENANT, LIST_TENANTS } from "./graphql";
import { TenancyMigrator } from "../../TenancyMigrator";

const ROOT_TENANT_HEADERS = { "x-tenant": "root" };

export class TenantsMigrator {
    private readonly tenancyMigrator: TenancyMigrator;

    constructor(tenancyMigrator: TenancyMigrator) {
        this.tenancyMigrator = tenancyMigrator;
    }

    async run() {
        const tenantId = this.tenancyMigrator.tenantId;
        if (tenantId === "root") {
            console.log("No need to run this in a non-root tenant.");
            return;
        }

        const { sourceGqlClient, targetGqlClient } = this.tenancyMigrator;
        const sourceListTenants = await sourceGqlClient
            .run(LIST_TENANTS, {}, ROOT_TENANT_HEADERS)
            .then(res => {
                return res.tenancy.listTenants;
            });

        const targetListTenants = await targetGqlClient
            .run(LIST_TENANTS, {}, ROOT_TENANT_HEADERS)
            .then(res => {
                return res.tenancy.listTenants;
            });

        const sourceTenant = sourceListTenants.data.find(
            (m: Record<string, any>) => m.id === tenantId
        );

        if (!sourceTenant) {
            throw new Error(`Tenant "${tenantId}" not found in the source environment.`);
        }

        const tenantExists = targetListTenants.data.some(
            (m: Record<string, any>) => m.id === tenantId
        );

        if (tenantExists) {
            console.log(
                `Tenant "${sourceTenant.name}" ("${tenantId}") already exists in the target environment.`
            );
            return;
        }

        console.log(`Migrating tenant "${sourceTenant.name}"...`);

        // Migrate tenant items.
        const createTenantResponse = await targetGqlClient.run(
            CREATE_TENANT,
            {
                data: {
                    id: sourceTenant.id,
                    tags: sourceTenant.tags,
                    name: sourceTenant.name,
                    description: sourceTenant.description,
                    settings: sourceTenant.settings
                }
            },
            ROOT_TENANT_HEADERS
        );

        const { error: createTenantError } = createTenantResponse.tenancy.createTenant;
        if (createTenantError) {
            console.log(
                `Failed to migrate tenant "${sourceTenant.title}". Error:`,
                createTenantError
            );
            return;
        }

        // Install tenant.
        const installTenantResponse = await targetGqlClient.run(
            INSTALL_TENANT,
            {
                tenantId: sourceTenant.id
            },
            ROOT_TENANT_HEADERS
        );

        const { error: installTenantError } = installTenantResponse.tenancy.installTenant;
        if (installTenantError) {
            console.log(
                `Failed to migrate tenant "${sourceTenant.title}". Error:`,
                installTenantError
            );
        }
    }
}
