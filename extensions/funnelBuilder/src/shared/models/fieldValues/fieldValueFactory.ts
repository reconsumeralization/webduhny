import { StringFieldValue } from "./StringFieldValue";

import {
    type FunnelFieldValueModel,
    type FunnelFieldValueModelDto
} from "../FunnelFieldValueModel";
import { NumberFieldValue } from "./NumberFieldValue";
import { BooleanFieldValue } from "./BooleanFieldValue";
import { StringArrayFieldValue } from "./StringArrayFieldValue";
import { NumberArrayFieldValue } from "./NumberArrayFieldValue";
import { BooleanArrayFieldValue } from "./BooleanArrayFieldValue";

const registry: Record<string, (dto: FunnelFieldValueModelDto<any>) => FunnelFieldValueModel<any>> =
    {
        string: dto => new StringFieldValue(dto),
        stringArray: dto => new StringArrayFieldValue(dto),
        number: dto => new NumberFieldValue(dto),
        numberArray: dto => new NumberArrayFieldValue(dto),
        boolean: dto => new BooleanFieldValue(dto),
        booleanArray: dto => new BooleanArrayFieldValue(dto)
    };

export function fieldValueFromDto(
    dto: FunnelFieldValueModelDto<unknown>
): FunnelFieldValueModel<unknown> {
    const create = registry[dto.type];
    if (!create) {
        throw new Error(`Unknown field value type: ${dto.type}`);
    }
    return create(dto);
}
