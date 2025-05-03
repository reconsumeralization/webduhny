import { FunnelConditionOperatorModel, FunnelConditionOperatorModelDto } from "./FunnelConditionOperatorModel";
import { AbstractModel } from "./AbstractModel";

export interface FunnelConditionModelDto {
    id: string;
    sourceFieldId: string; // the field whose value we're checking
    operator: FunnelConditionOperatorModelDto; // the operator to use for comparison
}

export class FunnelConditionModel extends AbstractModel<FunnelConditionOperatorModelDto> {
    id: string;
    sourceFieldId: string;
    operator: FunnelConditionOperatorModel;

    constructor(dto: FunnelConditionModelDto) {
        super();
        this.id = dto.id;
        this.sourceFieldId = dto.sourceFieldId;
        this.operator = FunnelConditionOperatorModel.fromDto(dto.operator);
    }

    toDto(): FunnelConditionModelDto {
        return {
            id: this.id,
            sourceFieldId: this.sourceFieldId,
            operator: this.operator,
        };
    }

    static fromDto(dto: FunnelConditionModelDto): FunnelConditionModel {
        return new FunnelConditionModel(dto);
    }
}
