import { FunnelModel, FunnelModelDto } from "../../../shared/models/FunnelModel";
import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "../../../shared/models/FunnelFieldDefinitionModel";

interface FunnelVmOptions {
    onChange?: (funnel: FunnelModelDto) => void;
}

export class FunnelVm {
    funnel: FunnelModel;
    options: FunnelVmOptions;

    activeStepIndex = 0;

    constructor(funnel?: FunnelModel | FunnelModelDto, options: FunnelVmOptions = {}) {
        if (funnel instanceof FunnelModel) {
            this.funnel = funnel;
        } else {
            this.funnel = new FunnelModel(funnel);
        }

        this.options = options;
    }

    static fromDto(dto: any) {
        const funnel = FunnelModel.fromDto(dto);
        return new FunnelVm(funnel);
    }

    toDto() {
        return this.funnel.toDto();
    }

    addField(field: FunnelFieldDefinitionModelDto) {
        const newField = new FunnelFieldDefinitionModel(field);
        this.funnel.fields.push(newField);
        this.onChange();
    }

    removeField(fieldId: string) {
        this.funnel.fields = this.funnel.fields.filter(field => field.id !== fieldId);
        this.onChange();
    }

    updateField(fieldId: string, fieldData: Partial<FunnelFieldDefinitionModelDto>) {
        const field = this.funnel.fields.find(field => field.id === fieldId);
        if (field) {
            Object.assign(field, fieldData);
            this.onChange();
        }
    }

    getFields() {
        return this.funnel.fields;
    }

    getFieldsForActiveStep() {
        const step = this.funnel.steps[this.activeStepIndex];
        if (!step) {
            return [];
        }
        return this.funnel.fields.filter(field => field.stepId === step.id);
    }

    private onChange() {
        if (!this.options.onChange) {
            return;
        }

        this.options.onChange(this.funnel.toDto());
    }
}
