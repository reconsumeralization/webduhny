import {
    type FunnelConditionOperatorModel,
    type FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { GteConditionOperator } from "./GteConditionOperator";

const registry: Record<
    string,
    (dto: FunnelConditionOperatorModelDto<any>) => FunnelConditionOperatorModel<any>
> = {
    gte: dto => new GteConditionOperator(dto)
};

export function conditionOperatorFromDto(
    dto: FunnelConditionOperatorModelDto<unknown>
): FunnelConditionOperatorModel<unknown> {
    const create = registry[dto.id];
    if (!create) {
        throw new Error(`Unknown condition operator: ${dto.id}`);
    }
    return create(dto);
}
