import { FunnelFieldValueModel, FunnelFieldValueModelDto } from "../FunnelFieldValueModel";

export class BooleanFieldValue extends FunnelFieldValueModel<boolean> {
    constructor(dto: FunnelFieldValueModelDto<boolean>) {
        super(dto);
        this.type = "boolean";
    }
}
