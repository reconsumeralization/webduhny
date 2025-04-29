import { FunnelConditionModel, FunnelConditionModelDto } from "./FunnelConditionModel";

export type LogicalOperator = "and" | "or";
export type ConditionGroupItem = FunnelConditionModel | FunnelConditionGroupModel;

export interface FunnelConditionGroupModelDto {
    operator: LogicalOperator;
    items: Array<FunnelConditionModelDto | FunnelConditionGroupModelDto>;
}

export class FunnelConditionGroupModel {
    operator: LogicalOperator;
    items: Array<ConditionGroupItem>;

    constructor(dto?: FunnelConditionGroupModelDto) {
        this.operator = dto?.operator ?? "and";
        this.items = (dto?.items || []).map(item => {
            if ("sourceFieldId" in item) {
                return FunnelConditionModel.fromDto(item);
            }
            return FunnelConditionGroupModel.fromDto(item);
        });
    }

    toDto(): FunnelConditionGroupModelDto {
        return {
            operator: this.operator,
            items: this.items.map(item => {
                return item.toDto();
            })
        };
    }

    static fromDto(dto: FunnelConditionGroupModelDto): FunnelConditionGroupModel {
        return new FunnelConditionGroupModel(dto);
    }
}
