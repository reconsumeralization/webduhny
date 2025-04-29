import {
    FunnelConditionGroupModel,
    FunnelConditionGroupModelDto
} from "./FunnelConditionGroupModel";
import {
    FunnelConditionActionModel,
    FunnelConditionActionModelDto
} from "./FunnelConditionActionModel";

export interface FunnelConditionRuleModelDto {
    // Root condition group.
    conditionGroup: FunnelConditionGroupModelDto;
    actions: FunnelConditionActionModelDto[];
}

export class FunnelConditionRuleModel {
    // Root condition group.
    conditionGroup: FunnelConditionGroupModel;
    actions: FunnelConditionActionModel[];

    constructor(dto?: FunnelConditionRuleModelDto) {
        this.conditionGroup = new FunnelConditionGroupModel(dto?.conditionGroup);
        this.actions = (dto?.actions || []).map(action => {
            return FunnelConditionActionModel.fromDto(action);
        });
    }

    toDto(): FunnelConditionRuleModelDto {
        return {
            conditionGroup: this.conditionGroup.toDto(),
            actions: this.actions.map(action => action.toDto())
        };
    }

    static fromDto(dto: FunnelConditionRuleModelDto) {
        return new FunnelConditionRuleModel(dto);
    }
}
