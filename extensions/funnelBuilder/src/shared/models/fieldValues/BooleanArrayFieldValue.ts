import { FunnelFieldValueModel, FunnelFieldValueModelDto } from "../FunnelFieldValueModel";

export class BooleanArrayFieldValue extends FunnelFieldValueModel<boolean[]> {
    constructor(dto: FunnelFieldValueModelDto<boolean[]>) {
        super(dto);
        this.type = "booleanArray";
        this.array = true;
    }
}
