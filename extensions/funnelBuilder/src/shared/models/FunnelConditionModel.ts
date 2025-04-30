export type FunnelOperator =
    | "eq"
    | "neq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "includes"
    | "notIncludes";

export interface FunnelConditionModelDto {
    id: string
    sourceFieldId: string; // the field whose value we're checking
    operator: FunnelOperator; // the operator to use for comparison
    value: any;
}

export class FunnelConditionModel {
    id: string
    sourceFieldId: string;
    operator: FunnelOperator;
    value: any;

    constructor(dto: FunnelConditionModelDto) {
        this.id = dto.id;
        this.sourceFieldId = dto.sourceFieldId;
        this.operator = dto.operator;
        this.value = dto.value;
    }

    toDto(): FunnelConditionModelDto {
        return {
            id: this.id,
            sourceFieldId: this.sourceFieldId,
            operator: this.operator,
            value: this.value
        };
    }

    static fromDto(dto: FunnelConditionModelDto): FunnelConditionModel {
        return new FunnelConditionModel(dto);
    }
}
