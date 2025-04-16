export class FunnelField {
    id: string;
    name: string;
    type: string;

    constructor(init?: Partial<FunnelField>) {
        this.id = init?.id ?? crypto.randomUUID();
        this.name = init?.name ?? "";
        this.type = init?.type ?? "text"; // text, select, etc.
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
        };
    }

    static fromJSON(json: any): FunnelField {
        return new FunnelField(json);
    }
}
