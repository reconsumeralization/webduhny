import { AbstractMigrator } from "./AbstractMigrator";
import { GqlClient } from "./utils";
import { SecurityApiKeysMigrator } from "./SecurityMigrator/apiKeys/SecurityApiKeysMigrator";
import { SecurityRolesMigrator } from "./SecurityMigrator/roles/SecurityRolesMigrator";

export class SecurityMigrator extends AbstractMigrator {
    readonly sourceGqlClient: GqlClient;
    readonly targetGqlClient: GqlClient;

    constructor(
        sourceApiUrl: string,
        sourceApiKey: string,
        targetApiUrl: string,
        targetApiKey: string,
        tenantId: string
    ) {
        super(sourceApiUrl, sourceApiKey, targetApiUrl, targetApiKey, tenantId);

        this.sourceGqlClient = new GqlClient(
            this.sourceApiUrl + "/graphql",
            this.sourceApiKey,
            tenantId
        );
        this.targetGqlClient = new GqlClient(
            this.targetApiUrl + "/graphql",
            this.targetApiKey,
            tenantId
        );
    }

    async run() {
        const start = Date.now();
        console.log("🌀 Starting Security migration...");

        const securityRolesMigrator = new SecurityRolesMigrator(this);
        const securityApiKeys = new SecurityApiKeysMigrator(this);

        console.log("Migrating Security Roles...");
        await securityRolesMigrator.run();

        console.log("Migrating Security API keys...");
        await securityApiKeys.run();

        console.log("🟢 Security migration completed in", Date.now() - start, "ms");
        console.log();
    }
}
