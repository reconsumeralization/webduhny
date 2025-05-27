import { CREATE_ROLE, LIST_ROLES } from "./graphql";
import { SecurityMigrator } from "../../SecurityMigrator";

export class SecurityRolesMigrator {
    private readonly securityMigrator: SecurityMigrator;

    constructor(securityMigrator: SecurityMigrator) {
        this.securityMigrator = securityMigrator;
    }

    async run() {
        const { sourceGqlClient, targetGqlClient } = this.securityMigrator;
        const sourceListRoles = await sourceGqlClient.run(LIST_ROLES).then(res => {
            return res.security.listGroups;
        });
        const targetListRoles = await targetGqlClient.run(LIST_ROLES).then(res => {
            return res.security.listGroups;
        });

        if (sourceListRoles.data.length === 2) {
            console.log("No roles to migrate.");
            return;
        }

        for (const role of sourceListRoles.data) {
            const alreadyExists = targetListRoles.data.some(
                (m: Record<string, any>) => m.slug === role.slug
            );

            if (alreadyExists) {
                console.log(`Role "${role.title}" already exists in the target environment.`);
                continue;
            }

            console.log(`Migrating role "${role.title}"...`);

            // Migrate role items.
            const res = await targetGqlClient.run(CREATE_ROLE, {
                data: {
                    // id: role.id,
                    name: role.name,
                    slug: role.slug,
                    description: role.description,
                    permissions: role.permissions
                }
            });

            const { error } = res.security.createRole;
            if (error) {
                console.log(`Failed to migrate role "${role.title}". Error:`, error);
            }
        }
    }
}
