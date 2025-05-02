import { FunnelFieldValueModel, FunnelFieldValueModelDto } from "../FunnelFieldValueModel";

export class NumberArrayFieldValue extends FunnelFieldValueModel<number[]> {
    constructor(dto: FunnelFieldValueModelDto<number[]>) {
        super(dto);
        this.type = "numberArray";
        this.array = true;
    }
}
