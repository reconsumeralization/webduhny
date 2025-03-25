export abstract class AbstractMigrator {
    protected readonly sourceApiUrl: string;
    protected readonly sourceApiKey: string;
    protected readonly targetApiUrl: string;
    protected readonly targetApiKey: string;

    protected constructor(
        sourceApiUrl: string,
        sourceApiKey: string,
        targetApiUrl: string,
        targetApiKey: string,
    ) {
        this.sourceApiUrl = sourceApiUrl;
        this.sourceApiKey = sourceApiKey;
        this.targetApiUrl = targetApiUrl;
        this.targetApiKey = targetApiKey;
    }

    abstract run(): void;
}