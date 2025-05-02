import { FunnelFieldValueModel, FunnelFieldValueModelDto } from "../FunnelFieldValueModel";

export class BooleanArrayFieldValue extends FunnelFieldValueModel<boolean[]> {
    constructor(dto: FunnelFieldValueModelDto<boolean[]>) {
        super({ ...dto, type: "booleanArray", array: true, value: dto.value });
    }
}
