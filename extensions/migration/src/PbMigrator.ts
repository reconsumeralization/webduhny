import { AbstractMigrator } from "./AbstractMigrator";
import { GqlClient } from "./utils";
import { PbMenusMigrator } from "./PbMigrator/menus/PbMenusMigrator";
import { PbPagesMigrator } from "./PbMigrator/pages/PbPagesMigrator";

export class PbMigrator extends AbstractMigrator {
    private readonly sourceGqlClient: GqlClient;
    private readonly targetGqlClient: GqlClient;

    constructor(
        sourceApiUrl: string,
        sourceApiKey: string,
        targetApiUrl: string,
        targetApiKey: string
    ) {
        super(sourceApiUrl, sourceApiKey, targetApiUrl, targetApiKey);

        this.sourceGqlClient = new GqlClient(this.sourceApiUrl + "/graphql", this.sourceApiKey);
        this.targetGqlClient = new GqlClient(this.targetApiUrl + "/graphql", this.targetApiKey);
    }

    async run() {
        const pbMenusMigrator = new PbMenusMigrator(this.sourceGqlClient, this.targetGqlClient);
        const pbPagesMigrator = new PbPagesMigrator(this.sourceGqlClient, this.targetGqlClient);

        // await pbMenusMigrator.run();
        await pbPagesMigrator.run();
    }
}
