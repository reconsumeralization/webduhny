import { TextFieldValue } from "./TextFieldValue";
import { TextArrayFieldValue } from "./TextArrayFieldValue";

import {
    type FunnelFieldValueModel,
    type FunnelFieldValueModelDto
} from "../FunnelFieldValueModel";

const registry: Record<string, (dto: FunnelFieldValueModelDto<any>) => FunnelFieldValueModel<any>> =
    {
        text: dto => new TextFieldValue(dto),
        textArray: dto => new TextArrayFieldValue(dto),
    };

export function fieldFromDto(dto: FunnelFieldValueModelDto<unknown>): FunnelFieldValueModel<unknown> {
    const create = registry[dto.type];
    if (!create) {
        throw new Error(`Unknown field value type: ${dto.type}`);
    }
    return create(dto);
}
