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

    activeStepId: string;

    constructor(funnel?: FunnelModel | FunnelModelDto, options: FunnelVmOptions = {}) {
        if (funnel instanceof FunnelModel) {
            this.funnel = funnel;
        } else {
            this.funnel = new FunnelModel(funnel);
        }

        this.activeStepId = this.funnel.steps[0]?.id || "";

        this.options = options;
    }

    static fromDto(dto: any) {
        const funnel = FunnelModel.fromDto(dto);
        return new FunnelVm(funnel);
    }

    addField(dto: FunnelFieldDefinitionModelDto) {
        const newField = new FunnelFieldDefinitionModel(dto);
        this.funnel.fields.push(newField);
        this.onChange();
    }

    removeField(id: string) {
        this.funnel.fields = this.funnel.fields.filter(field => field.id !== id);
        this.onChange();
    }

    updateField(fieldId: string, fieldData: Partial<FunnelFieldDefinitionModelDto>) {
        const field = this.funnel.fields.find(field => field.id === fieldId);
        if (field) {
            field.populate(fieldData);
            this.onChange();
        }
    }

    getFields() {
        return this.funnel.fields;
    }

    getField(id: string) {
        return this.funnel.fields.find(field => field.id === id);
    }

    getFieldsForActiveStep() {
        const step = this.funnel.steps.find(step => step.id === this.activeStepId);
        if (!step) {
            return [];
        }
        return this.funnel.fields.filter(field => field.stepId === step.id);
    }

    getActiveStepId() {
        return this.activeStepId;
    }

    getActiveStep() {
        return this.funnel.steps.find(step => step.id === this.activeStepId);
    }

    private onChange() {
        if (!this.options.onChange) {
            return;
        }

        this.options.onChange(this.funnel.toDto());
    }
}
