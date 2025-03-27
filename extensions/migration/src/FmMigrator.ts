import { AbstractMigrator } from "./AbstractMigrator";
import { GqlClient } from "./utils";
import { FmFilesMigrator } from "./FmMigrator/files/FmFilesMigrator";

export class FmMigrator extends AbstractMigrator {
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
        const fmFilesMigrator = new FmFilesMigrator(this.sourceGqlClient, this.targetGqlClient);

        await fmFilesMigrator.run();
    }
}
