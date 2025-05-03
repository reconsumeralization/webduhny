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

export class FunnelConditionOperatorModel<
    TValue = FunnelFieldValueModel,
    TExtra = Record<string, any>
> extends AbstractModel<FunnelConditionOperatorModelDto<TExtra>> {
    id: string;
    params: ConditionOperatorParams<TExtra>;

    static id = '';
    static supportedFieldValues: string[] = [];

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

    static fromDto<TValue = unknown, TExtra = Record<string, any>>(
        dto: FunnelConditionOperatorModelDto<TExtra>
    ): FunnelConditionOperatorModel<TValue, TExtra> {
        // Could not import the module directly because of circular dependency.
        return require("./conditionOperators/conditionOperatorFactory").conditionOperatorFromDto(dto);
    }
}
