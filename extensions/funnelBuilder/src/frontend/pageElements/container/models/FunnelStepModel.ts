export class FunnelStepModel {
    id: string;
    name: string;
    action?: string;
    target?: string;

    constructor(init?: Partial<FunnelStepModel>) {
        this.id = init?.id ?? crypto.randomUUID();
        this.name = init?.name ?? "Step";
        this.action = init?.action ?? "go_to_page";
        this.target = init?.target ?? "";
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            action: this.action,
            target: this.target,
        };
    }

    static fromJSON(json: any): FunnelStepModel {
        return new FunnelStepModel(json);
    }
}
