import { FunnelFieldValueModel, FunnelFieldValueModelDto } from "../FunnelFieldValueModel";

export class StringArrayFieldValue extends FunnelFieldValueModel<string[]> {
    constructor(dto: FunnelFieldValueModelDto<string[]>) {
        super(dto);
        this.type = "stringArray";
        this.array = true;
    }
}
