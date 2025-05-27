import { CREATE_PAGE, LIST_PAGES, RENDER_PAGE, GET_PAGE, GET_PUBLISHED_PAGE } from "./graphql";
import { PbMigrator } from "../../PbMigrator";

export class PbPagesMigrator {
    private readonly pbMigrator: PbMigrator;

    constructor(pbMigrator: PbMigrator) {
        this.pbMigrator = pbMigrator;
    }

    async run() {
        const { sourceGqlClient } = this.pbMigrator;

        // Repeat until we have no more pages to migrate.
        let cursor = null;

        do {
            const sourcePagesList: Record<string, any> = await sourceGqlClient
                .run(LIST_PAGES, { after: cursor, limit: 50 })
                .then(res => {
                    return res.pageBuilder.listPages;
                });

            cursor = sourcePagesList.meta.cursor;

            for (const { id: pageId } of sourcePagesList.data) {
                // We have to get the page because `listPages` does not return the content.
                const sourceLatestPage = await sourceGqlClient
                    .run(GET_PAGE, { id: pageId })
                    .then(res => res.pageBuilder.getPage.data);

                if (!sourceLatestPage) {
                    console.log(`Page with ID "${pageId}" not found in source.`);
                    continue;
                }

                // If the latest page is also the published page, we can create it directly.
                if (sourceLatestPage.status === "published") {
                    await this.migratePage(sourceLatestPage);
                    continue;
                }

                const sourcePublishedPage = await sourceGqlClient
                    .run(GET_PUBLISHED_PAGE, { id: pageId })
                    .then(res => res.pageBuilder.getPublishedPage.data);

                // Does a published revision exist?
                if (!sourcePublishedPage) {
                    await this.migratePage(sourceLatestPage);
                    continue;
                }

                await this.migratePage(sourcePublishedPage);
                await this.migratePage(sourceLatestPage, {skipRender: true});
            }
        } while (cursor);
    }

    private fromSourceToTargetPageData(sourcePage: Record<string, any>): Record<string, any> {
        const contentWithReplacedFmUrls = JSON.parse(
            JSON.stringify(sourcePage.content).replaceAll(
                this.pbMigrator.sourceApiUrl,
                this.pbMigrator.targetApiUrl
            )
        );

        return {
            pid: sourcePage.pid,
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
        };
    }

    private async migratePage(page: Record<string, any>, options: { skipRender?: boolean } = {}) {
        const variables = { data: this.fromSourceToTargetPageData(page) };
        const latestRes = await this.pbMigrator.targetGqlClient.run(CREATE_PAGE, variables);

        const { error: latestError } = latestRes.pageBuilder.createPageV2;
        if (latestError) {
            console.log(`Failed to migrate page "${page.title}". Error:`, latestError);
        }

        if (options.skipRender) {
            return;
        }

        // Finally, let's issue a render page job to ensure the page is rendered.
        const renderPageVariables = { id: page.id };
        const { error: renderError } = await this.pbMigrator.targetGqlClient
            .run(RENDER_PAGE, renderPageVariables)
            .then(res => res.pageBuilder.rerenderPage);

        if (renderError) {
            console.log(`Failed to render page "${page.title}". Error:`, renderError);
        }
    }
}
