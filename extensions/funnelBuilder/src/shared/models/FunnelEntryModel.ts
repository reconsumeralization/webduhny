import { FunnelModel } from "./FunnelModel";
import {FunnelEntryFieldModel} from "./FunnelEntryFieldModel";

export interface FunnelEntryModelDto {
    fields?: Record<string, any>;
    activeStep?: string;
}

export class FunnelEntryModel {
    funnel: FunnelModel;
    fields: Record<FunnelEntryFieldModel["fieldId"], FunnelEntryFieldModel>;
    activeStep: string;

    constructor(funnel: FunnelModel, funnelEntryDto: FunnelEntryModelDto = {}) {
        this.funnel = funnel;
        this.activeStep = funnelEntryDto.activeStep || funnel.steps[0].id;
        this.fields = funnel.fields.reduce((acc, field) => {
            acc[field.fieldId] = FunnelEntryFieldModel.fromDto(this, {
                fieldId: field.fieldId,
                value: funnelEntryDto.fields?.[field.fieldId] ?? null
            });
            return acc;
        }, {} as Record<FunnelEntryFieldModel["fieldId"], FunnelEntryFieldModel>);
    }

    toDto(): FunnelEntryModelDto {
        return {
            activeStep: this.activeStep
        };
    }

    setData(data: Record<string, any>) {
        Object.keys(data).forEach(key => {
            if (this.fields[key]) {
                this.fields[key].value = data[key];
            }
        });
    }

    static fromDto(funnel: FunnelModel, dto: FunnelEntryModelDto): FunnelEntryModel {
        return new FunnelEntryModel(funnel, dto);
    }

    validate(): boolean {
        return Object.values(this.fields).every(field => field.validate());
    }

    // Steps-related methods. 👇
    getActiveStep() {
        return this.funnel.steps.find(step => step.id === this.activeStep);
    }

    getActiveStepIndex() {
        return this.funnel.steps.findIndex(step => step.id === this.activeStep);
    }

    getStepsCount() {
        return this.funnel.steps.length;
    }

    goToNextStep() {
        const currentIndex = this.getActiveStepIndex();
        if (currentIndex < this.funnel.steps.length - 1) {
            this.activeStep = this.funnel.steps[currentIndex + 1].id;
        }
    }

    goToPreviousStep() {
        const currentIndex = this.getActiveStepIndex();
        if (currentIndex > 0) {
            this.activeStep = this.funnel.steps[currentIndex - 1].id;
        }
    }
}
