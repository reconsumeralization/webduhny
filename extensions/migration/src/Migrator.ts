import { AbstractMigrator } from "./AbstractMigrator";
import { PbMigrator } from "./PbMigrator";

export class Migrator extends AbstractMigrator {
    constructor(
        sourceApiUrl: string,
        sourceApiKey: string,
        targetApiUrl: string,
        targetApiKey: string
    ) {
        super(sourceApiUrl, sourceApiKey, targetApiUrl, targetApiKey);
    }

    async run() {
        const migrations = [
            new PbMigrator(
                this.sourceApiUrl,
                this.sourceApiKey,
                this.targetApiUrl,
                this.targetApiKey
            )
        ].map(m => m.run());
        await Promise.all(migrations);
    }
}
