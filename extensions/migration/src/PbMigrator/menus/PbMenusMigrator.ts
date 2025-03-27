import { CREATE_MENU, LIST_MENUS } from "./graphql";
import { PbMigrator } from "../../PbMigrator";

export class PbMenusMigrator {
    private readonly pbMigrator: PbMigrator;

    constructor(pbMigrator: PbMigrator) {
        this.pbMigrator = pbMigrator;
    }

    async run() {
        const { sourceGqlClient, targetGqlClient } = this.pbMigrator;
        const sourceListMenusRes = await sourceGqlClient.run(LIST_MENUS);
        const targetListMenusRes = await targetGqlClient.run(LIST_MENUS);

        const { data } = sourceListMenusRes.pageBuilder.listMenus;

        if (data.length === 0) {
            console.log("No menus to migrate.");
            return;
        }

        console.log(`Found ${data.length} menu(s) to migrate.`);
        for (const menu of data) {
            const alreadyExists = targetListMenusRes.pageBuilder.listMenus.data.some(
                (m: Record<string, any>) => m.slug === menu.slug
            );

            if (alreadyExists) {
                console.log(`Menu "${menu.title}" already exists in the target environment.`);
                continue;
            }

            console.log(`Migrating menu "${menu.title}"...`);

            // Migrate menu items.
            const res = await targetGqlClient.run(CREATE_MENU, {
                data: {
                    title: menu.title,
                    description: menu.description,
                    slug: menu.slug,
                    items: menu.items,
                    createdBy: menu.createdBy,
                    createdOn: menu.createdOn
                }
            });

            const { error } = res.pageBuilder.createMenu;
            if (error) {
                console.log(`Failed to migrate menu "${menu.title}". Error:`, error);
            }
        }
    }
}
