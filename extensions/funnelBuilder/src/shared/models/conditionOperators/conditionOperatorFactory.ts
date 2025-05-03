import {
    type FunnelConditionOperatorModel,
    type FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { GteConditionOperator } from "./GteConditionOperator";
import { GtConditionOperator } from "./GtConditionOperator";
import { LtConditionOperator } from "./LtConditionOperator";
import { LteConditionOperator } from "./LteConditionOperator";
import { EqConditionOperator } from "./EqConditionOperator";
import { NeqConditionOperator } from "./NeqConditionOperator";
import { IncludesConditionOperator } from "./IncludesConditionOperator";
import { NotIncludesConditionOperator } from "./NotIncludesConditionOperator";
import { EmptyConditionOperator } from "./EmptyConditionOperator";
import { NotEmptyConditionOperator } from "./NotEmptyConditionOperator";

const registry: Record<
    string,
    (dto: FunnelConditionOperatorModelDto<any>) => FunnelConditionOperatorModel<any>
> = {
    empty: dto => new EmptyConditionOperator(),
    eq: dto => new EqConditionOperator(dto),
    gt: dto => new GtConditionOperator(dto),
    gte: dto => new GteConditionOperator(dto),
    includes: dto => new IncludesConditionOperator(dto),
    lt: dto => new LtConditionOperator(dto),
    lte: dto => new LteConditionOperator(dto),
    neq: dto => new NeqConditionOperator(dto),
    notEmpty: dto => new NotEmptyConditionOperator(),
    notIncludes: dto => new NotIncludesConditionOperator(dto)
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
