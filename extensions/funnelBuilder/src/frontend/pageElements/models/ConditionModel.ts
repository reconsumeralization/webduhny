export class ConditionModel {
    field: string;
    operator: string;
    value: string;

    constructor(init?: Partial<ConditionModel>) {
        this.field = init?.field ?? "";
        this.operator = init?.operator ?? "equals";
        this.value = init?.value ?? "";
    }

    toJSON() {
        return {
            field: this.field,
            operator: this.operator,
            value: this.value,
        };
    }

    static fromJSON(json: any) {
        return new ConditionModel(json);
    }
}
