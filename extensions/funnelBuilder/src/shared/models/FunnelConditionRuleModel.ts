import {
    FunnelConditionGroupModel,
    FunnelConditionGroupModelDto
} from "./FunnelConditionGroupModel";
import {
    FunnelConditionActionModel,
    FunnelConditionActionModelDto
} from "./FunnelConditionActionModel";
import { getRandomId } from "../getRandomId";

export interface FunnelConditionRuleModelDto {
    id: string;
    // Root condition group.
    conditionGroup: FunnelConditionGroupModelDto;
    actions: FunnelConditionActionModelDto[];
}

export class FunnelConditionRuleModel {
    id: string;
    // Root condition group.
    conditionGroup: FunnelConditionGroupModel;
    actions: FunnelConditionActionModel[];

    constructor(dto?: FunnelConditionRuleModelDto) {
        this.id = dto?.id || getRandomId();
        this.conditionGroup = new FunnelConditionGroupModel(dto?.conditionGroup);
        this.actions = (dto?.actions || []).map(action => {
            return FunnelConditionActionModel.fromDto(action);
        });
    }

    toDto(): FunnelConditionRuleModelDto {
        return {
            id: this.id,
            conditionGroup: this.conditionGroup.toDto(),
            actions: this.actions.map(action => action.toDto())
        };
    }

    static fromDto(dto: FunnelConditionRuleModelDto) {
        return new FunnelConditionRuleModel(dto);
    }
}
