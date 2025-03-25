import { CREATE_PAGE, LIST_PAGES } from "./graphql";
import { GqlClient } from "../../utils";
import { Pojo } from "../../types";

export class PbPagesMigrator {
    private readonly sourceGqlClient: GqlClient;
    private readonly targetGqlClient: GqlClient;

    constructor(sourceGqlClient: GqlClient, targetGqlClient: GqlClient) {
        this.sourceGqlClient = sourceGqlClient;
        this.targetGqlClient = targetGqlClient;
    }

    async run() {
        const sourceListPagesRes = await this.sourceGqlClient.run(LIST_PAGES);

        const { data } = sourceListPagesRes.pageBuilder.listPages;

        if (data.length === 0) {
            console.log("No pages to migrate.");
            return;
        }

        console.log(`Found ${data.length} page(s) to migrate.`);
        for (const page of data) {
            const alreadyExists = targetListPagesRes.pageBuilder.listPages.data.some(
                (m: Pojo) => m.slug === page.slug
            );

            if (alreadyExists) {
                console.log(`Page "${page.title}" already exists in the target environment.`);
                continue;
            }

            console.log(`Migrating page "${page.title}"...`);

            // Migrate page items.
            const res = await this.targetGqlClient.run(CREATE_PAGE, {
                data: {
                    title: page.title,
                    description: page.description,
                    slug: page.slug,
                    items: page.items,
                    createdBy: page.createdBy,
                    createdOn: page.createdOn
                }
            });

            const { error } = res.pageBuilder.createPage;
            if (error) {
                console.log(`Failed to migrate page "${page.title}". Error:`, error);
            }
        }
    }
}
