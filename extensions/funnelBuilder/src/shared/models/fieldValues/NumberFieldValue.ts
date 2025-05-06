import { FunnelFieldValueModel, FunnelFieldValueModelDto } from "../FunnelFieldValueModel";

export class NumberFieldValue extends FunnelFieldValueModel<number> {
    static override type: string = "number";
    constructor(dto: FunnelFieldValueModelDto<number>) {
        super({ ...dto, type: "number" });
    }
}
