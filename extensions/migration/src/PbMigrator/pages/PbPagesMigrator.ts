import { CREATE_PAGE, LIST_PAGES, GET_PAGE } from "./graphql";
import { PbMigrator } from "../../PbMigrator";

export class PbPagesMigrator {
    private readonly pbMigrator: PbMigrator;

    constructor(pbMigrator: PbMigrator) {
        this.pbMigrator = pbMigrator;
    }

    async run() {
        const { sourceGqlClient, targetGqlClient } = this.pbMigrator;
        const sourcePagesList = await sourceGqlClient.run(LIST_PAGES).then(res => {
            return res.pageBuilder.listPages;
        });

        if (sourcePagesList.data.length === 0) {
            console.log("No pages to migrate.");
            return;
        }

        console.log(`Found ${sourcePagesList.data.length} page(s) to migrate.`);
        for (const { id: pageId } of sourcePagesList.data) {
            console.log(`Migrating page "${pageId}"...`);

            const sourcePage = await sourceGqlClient
                .run(GET_PAGE, {
                    id: pageId
                })
                .then(res => res.pageBuilder.getPage.data);

            // Migrate page items.
            const { sourceApiUrl, targetApiUrl } = this.pbMigrator;
            const contentWithReplacedFmUrls = JSON.parse(
                JSON.stringify(sourcePage.content).replaceAll(sourceApiUrl, targetApiUrl)
            );

            const res = await targetGqlClient.run(CREATE_PAGE, {
                data: {
                    id: sourcePage.id,
                    category: sourcePage.category.slug,
                    title: sourcePage.title,
                    path: sourcePage.path,
                    content: contentWithReplacedFmUrls,
                    savedOn: sourcePage.savedOn,
                    status: sourcePage.status,
                    publishedOn: sourcePage.publishedOn,
                    settings: sourcePage.settings,
                    createdOn: sourcePage.createdOn,
                    createdBy: sourcePage.createdBy
                }
            });

            const { error } = res.pageBuilder.createPageV2;
            if (error) {
                console.log(`Failed to migrate page "${sourcePage.title}". Error:`, error);
            }
        }
    }
}
