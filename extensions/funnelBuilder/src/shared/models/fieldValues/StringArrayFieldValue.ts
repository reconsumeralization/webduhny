import { FunnelFieldValueModel, FunnelFieldValueModelDto } from "../FunnelFieldValueModel";

export class StringArrayFieldValue extends FunnelFieldValueModel<string[]> {
    constructor(dto: FunnelFieldValueModelDto<string[]>) {
        super({ ...dto, type: "stringArray", array: true, value: dto.value });
    }
}
