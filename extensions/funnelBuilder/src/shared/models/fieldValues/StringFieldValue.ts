import { FunnelFieldValueModel, FunnelFieldValueModelDto } from "../FunnelFieldValueModel";

export class StringFieldValue extends FunnelFieldValueModel<string> {
    constructor(dto: FunnelFieldValueModelDto<string>) {
        super(dto);
        this.type = "string";
    }
}
