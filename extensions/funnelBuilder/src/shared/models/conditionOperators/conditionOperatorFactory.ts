import {
    type FunnelConditionOperatorModel,
    type FunnelConditionOperatorModelDto
} from "../FunnelConditionOperatorModel";
import { EmptyConditionOperator } from "./EmptyConditionOperator";
import { EqConditionOperator } from "./EqConditionOperator";
import { GtConditionOperator } from "./GtConditionOperator";
import { GteConditionOperator } from "./GteConditionOperator";
import { IncludesConditionOperator } from "./IncludesConditionOperator";
import { LtConditionOperator } from "./LtConditionOperator";
import { LteConditionOperator } from "./LteConditionOperator";
import { NeqConditionOperator } from "./NeqConditionOperator";
import { NotEmptyConditionOperator } from "./NotEmptyConditionOperator";
import { NotIncludesConditionOperator } from "./NotIncludesConditionOperator";

const registry = [
    EmptyConditionOperator,
    EqConditionOperator,
    GtConditionOperator,
    GteConditionOperator,
    IncludesConditionOperator,
    LtConditionOperator,
    LteConditionOperator,
    NeqConditionOperator,
    NotEmptyConditionOperator,
    NotIncludesConditionOperator
];

export function conditionOperatorFromDto(
    dto: FunnelConditionOperatorModelDto
): FunnelConditionOperatorModel<unknown> {
    const OperatorClass = registry.find(operatorClass => operatorClass.id === dto.id);
    if (!OperatorClass) {
        throw new Error(`Unknown condition operator: ${dto.id}`);
    }
    return new OperatorClass(dto);
}
