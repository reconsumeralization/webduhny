import { StringFieldValue } from "./StringFieldValue";
import { StringArrayFieldValue } from "./StringArrayFieldValue";

import {
    type FunnelFieldValueModel,
    type FunnelFieldValueModelDto
} from "../FunnelFieldValueModel";

const registry: Record<string, (dto: FunnelFieldValueModelDto<any>) => FunnelFieldValueModel<any>> =
    {
        string: dto => new StringFieldValue(dto),
        stringArray: dto => new StringArrayFieldValue(dto),
    };

export function fieldValueFromDto(dto: FunnelFieldValueModelDto<unknown>): FunnelFieldValueModel<unknown> {
    const create = registry[dto.type];
    if (!create) {
        throw new Error(`Unknown field value type: ${dto.type}`);
    }
    return create(dto);
}
