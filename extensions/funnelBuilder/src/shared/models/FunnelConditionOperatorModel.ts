import { AbstractModel } from "./AbstractModel";
import { FunnelFieldValueModel } from "./FunnelFieldValueModel";

export type ConditionOperatorParams<TExtra = Record<string, any>> = {
    extra: TExtra;
};

export type ConditionOperatorParamsDto<TExtra = Record<string, any>> = Partial<
    ConditionOperatorParams<TExtra>
>;

export interface FunnelConditionOperatorModelDto<TExtra = Record<string, any>> {
    id: string;
    params?: ConditionOperatorParamsDto<TExtra>; // Additional parameters for the validator.
}

export class FunnelConditionOperatorModel<TExtra = Record<string, any>, TValue = FunnelFieldValueModel> extends AbstractModel<FunnelConditionOperatorModelDto<TExtra>> {
    id: string;
    params: ConditionOperatorParams<TExtra>;

    constructor(dto: FunnelConditionOperatorModelDto) {
        super();
        this.id = dto.id;
        this.params = {
            extra: (dto.params?.extra || {}) as TExtra
        };
    }

    evaluate(value: TValue) {
        return false;
    }

    toDto(): FunnelConditionOperatorModelDto<TExtra> {
        return { id: this.id, params: this.params };
    }

}
