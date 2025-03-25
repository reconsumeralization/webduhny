import { CREATE_MENU, LIST_MENUS, ListMenusGqlResponse, CreateMenuGqlResponse } from "./graphql";
import { GqlClient } from "../../utils";

export class PbMenusMigrator {
    private readonly sourceGqlClient: GqlClient;
    private readonly targetGqlClient: GqlClient;

    constructor(sourceGqlClient: GqlClient, targetGqlClient: GqlClient) {
        this.sourceGqlClient = sourceGqlClient;
        this.targetGqlClient = targetGqlClient;
    }

    async run() {
        // Migrate menus.
        const sourceListMenusRes =
            await this.sourceGqlClient.run<ListMenusGqlResponse>(LIST_MENUS);
        const targetListMenusRes =
            await this.targetGqlClient.run<ListMenusGqlResponse>(LIST_MENUS);

        const { data } = sourceListMenusRes.pageBuilder.listMenus;

        if (data.length === 0) {
            console.log("No menus to migrate.");
            return;
        }

        console.log(`Found ${data.length} menu(s) to migrate.`);
        for (const menu of data) {
            const alreadyExists = targetListMenusRes.pageBuilder.listMenus.data.some(
                m => m.slug === menu.slug
            );

            if (alreadyExists) {
                console.log(`Menu "${menu.title}" already exists in the target environment.`);
                continue;
            }

            console.log(`Migrating menu "${menu.title}"...`);

            // Migrate menu items.
            await this.targetGqlClient.run<CreateMenuGqlResponse>(CREATE_MENU, {
                data: {
                    title: menu.title,
                    description: menu.description,
                    slug: menu.slug,
                    items: menu.items,
                    id: menu.id,
                    createdBy: menu.createdBy,
                    createdOn: menu.createdOn
                }
            });
        }
    }
}
