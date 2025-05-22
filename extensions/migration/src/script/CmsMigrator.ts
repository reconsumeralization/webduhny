import { AbstractMigrator } from "./AbstractMigrator";
import { GqlClient } from "./utils";
import { CmsGroupsMigrator } from "./CmsMigrator/groups/CmsGroupsMigrator";
import { CmsModelsMigrator } from "./CmsMigrator/models/CmsModelsMigrator";

export class CmsMigrator extends AbstractMigrator {
    readonly sourceGqlClient: GqlClient;
    readonly targetGqlClient: GqlClient;
    readonly sourceGqlManageClient: GqlClient;
    readonly targetGqlManageClient: GqlClient;

    constructor(
        sourceApiUrl: string,
        sourceApiKey: string,
        targetApiUrl: string,
        targetApiKey: string,
        tenantId: string
    ) {
        super(sourceApiUrl, sourceApiKey, targetApiUrl, targetApiKey, tenantId);

        // The `en-US` locale is hardcoded here, but it can be changed to any other locale.
        // We could probably make this more dynamic in the future. For now, it's fine.
        this.sourceGqlClient = new GqlClient(
            this.sourceApiUrl + "/graphql",
            this.sourceApiKey,
            this.tenantId
        );
        this.targetGqlClient = new GqlClient(
            this.targetApiUrl + "/graphql",
            this.targetApiKey,
            this.tenantId
        );

        // The `en-US` locale is hardcoded here, but it can be changed to any other locale.
        // We could probably make this more dynamic in the future. For now, it's fine.
        this.sourceGqlManageClient = new GqlClient(
            this.sourceApiUrl + "/cms/manage/en-US",
            this.sourceApiKey,
            this.tenantId
        );
        this.targetGqlManageClient = new GqlClient(
            this.targetApiUrl + "/cms/manage/en-US",
            this.targetApiKey,
            this.tenantId
        );
    }

    async run() {
        const start = Date.now();
        console.log("🌀 Starting CMS migration...");

        const cmsGroupsMigrator = new CmsGroupsMigrator(this);
        const cmsModelsMigrator = new CmsModelsMigrator(this);

        console.log("Migrating model groups...");
        await cmsGroupsMigrator.run();

        console.log("Migrating models...");
        await cmsModelsMigrator.run();

        console.log("🟢 Headless CMS migration completed in", Date.now() - start, "ms");
        console.log();
    }
}
