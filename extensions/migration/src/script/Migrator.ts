import { AbstractMigrator } from "./AbstractMigrator";
import { FmMigrator } from "./FmMigrator";
import { PbMigrator } from "./PbMigrator";
import { TenancyMigrator } from "./TenancyMigrator";
import { CmsMigrator } from "./CmsMigrator";

export class Migrator extends AbstractMigrator {
    constructor(
        sourceApiUrl: string,
        sourceApiKey: string,
        targetApiUrl: string,
        targetApiKey: string,
        tenantId: string
    ) {
        super(sourceApiUrl, sourceApiKey, targetApiUrl, targetApiKey, tenantId);
    }

    async run() {
        const start = Date.now();
        console.log("Starting migration...");
        console.log();

        const migrators = [
            // TenancyMigrator
            // FmMigrator,
            // PbMigrator,
            CmsMigrator,
        ];

        for (const MigratorClass of migrators) {
            const migrator = new MigratorClass(
                this.sourceApiUrl,
                this.sourceApiKey,
                this.targetApiUrl,
                this.targetApiKey,
                this.tenantId
            );
            await migrator.run();
        }

        console.log("Migration completed in", Date.now() - start, "ms");
    }
}
