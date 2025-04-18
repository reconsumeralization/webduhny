import { FunnelModel, FunnelModelDto } from "../models/FunnelModel";
import {FunnelFieldModel, FunnelFieldModelDto} from "../models/FunnelFieldModel";

interface FunnelVmOptions {
    onChange?: (funnel: FunnelModelDto) => void;
}

export class FunnelVm {
    funnel: FunnelModel;
    options: FunnelVmOptions;

    activeStepIndex = 0;

    constructor(funnel?: FunnelModel | Partial<FunnelModel>, options: FunnelVmOptions = {}) {
        if (funnel instanceof FunnelModel) {
            this.funnel = funnel;
        } else {
            this.funnel = new FunnelModel(funnel);
        }

        this.options = options;
    }

    static fromJSON(json: any) {
        const funnel = FunnelModel.fromDto(json);
        return new FunnelVm(funnel);
    }

    toJSON() {
        return this.funnel.toDto();
    }

    addField(field: FunnelFieldModelDto) {
        const newField = new FunnelFieldModel(field);
        this.funnel.fields.push(newField);
        this.onChange();
    }

    removeField(fieldId: string) {
        this.funnel.fields = this.funnel.fields.filter(field => field.id !== fieldId);
        this.onChange();
    }

    updateField(fieldId: string, fieldData: Partial<FunnelFieldModelDto>) {
        const field = this.funnel.fields.find(field => field.id === fieldId);
        if (field) {
            console.log('field', field);
            console.log('fieldData', fieldData);
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

        console.log('pozivam onchange sa', this.funnel.toDto())
        this.options.onChange(this.funnel.toDto());
    }
}
