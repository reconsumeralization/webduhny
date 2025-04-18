import {getRandomId} from "../../../shared/getRandomId";

export interface FunnelFieldModelDto<TExtra = any> {
    id: string;
    fieldId: string;
    stepId: string;
    type: string;
    label: string;
    helpText: string;
    validators: Array<any>; // todo
    extra: TExtra;
}

export class FunnelFieldModel {
    id: string;
    type: string;
    stepId: string;
    fieldId: string;
    label: string;
    helpText: string;
    validators: Array<any>; // todo
    extra: any; // todo

    constructor(dto: FunnelFieldModelDto) {
        this.id = dto?.id ?? getRandomId();
        this.fieldId = dto?.fieldId ?? this.id; // Use id as fieldId if not provided
        this.stepId = dto?.stepId ?? "";
        this.type = dto?.type ?? "text"; // text, select, etc.
        this.label = dto?.label ?? "";
        this.helpText = dto?.helpText ?? "";
        this.validators = dto?.validators ?? []; // todo
        this.extra = dto?.extra ?? {}; // todo
    }

    toDto():FunnelFieldModelDto {
        return {
            id: this.id,
            fieldId: this.id,
            stepId: this.id,
            type: this.type,
            label: this.label,
            helpText: "",
            validators: [], // todo
            extra: {} // todo
        };
    }

    static fromDto(dto: FunnelFieldModelDto): FunnelFieldModel {
        return new FunnelFieldModel(dto);
    }
}
