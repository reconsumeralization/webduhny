import { FunnelFieldValueModel, FunnelFieldValueModelDto } from "../FunnelFieldValueModel";

export class NumberFieldValue extends FunnelFieldValueModel<number> {
    constructor(dto: FunnelFieldValueModelDto<number>) {
        super(dto);
        this.type = "number";
    }
}
