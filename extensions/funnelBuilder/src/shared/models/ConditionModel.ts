export interface ConditionModelDto {
    field: string;
    operator: string;
    value: string;
}

export class ConditionModel {
    field: string;
    operator: string;
    value: string;

    constructor(init?: Partial<ConditionModel>) {
        this.field = init?.field ?? "";
        this.operator = init?.operator ?? "equals";
        this.value = init?.value ?? "";
    }

    toDto(): ConditionModelDto {
        return {
            field: this.field,
            operator: this.operator,
            value: this.value
        };
    }

    static fromDTO(dto: ConditionModelDto) {
        return new ConditionModel(dto);
    }
}
