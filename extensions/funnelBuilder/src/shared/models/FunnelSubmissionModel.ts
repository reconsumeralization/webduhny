import { FunnelModel } from "./FunnelModel";
import { FunnelSubmissionFieldModel } from "./FunnelSubmissionFieldModel";
import { createObjectHash } from "../createObjectHash";
import { FunnelConditionRulesEvaluator } from "./FunnelConditionRulesEvaluator";

export interface FunnelSubmissionModelDto {
    fields?: Record<string, any>;
    activeStep?: string;
}

export interface FunnelEntryValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

export type FunnelSubmissionStepSubmissionResult =
    | {
          success: true;
          errors: null;
          data: Record<string, any>;
      }
    | {
          success: false;
          errors: Record<string, any>;
          data: Record<string, any>;
      };

export class FunnelSubmissionModel {
    funnel: FunnelModel;
    fields: Record<string, FunnelSubmissionFieldModel>;
    activeStepId: string;

    constructor(funnel: FunnelModel, funnelEntryDto: FunnelSubmissionModelDto = {}) {
        this.funnel = funnel;
        this.activeStepId = funnelEntryDto.activeStep || funnel.steps[0].id;
        this.fields = funnel.fields.reduce((acc, field) => {
            acc[field.fieldId] = new FunnelSubmissionFieldModel(
                this,
                field,
                funnelEntryDto.fields?.[field.fieldId] || {}
            );
            return acc;
        }, {} as Record<string, FunnelSubmissionFieldModel>);
    }

    toDto(): FunnelSubmissionModelDto {
        return {
            activeStep: this.activeStepId,
            fields: Object.values(this.fields).reduce((acc, field) => {
                acc[field.definition.fieldId] = field.toDto();
                return acc;
            }, {} as Record<string, any>)
        };
    }

    static fromDto(funnel: FunnelModel, dto: FunnelSubmissionModelDto): FunnelSubmissionModel {
        return new FunnelSubmissionModel(funnel, dto);
    }

    setData(data: Record<string, any>) {
        Object.keys(data).forEach(key => {
            if (this.fields[key]) {
                this.fields[key].value = data[key];
            }
        });
    }

    getData() {
        return Object.values(this.fields).reduce((acc, field) => {
            acc[field.definition.fieldId] = field.getValue();
            return acc;
        }, {} as Record<string, any>);
    }

    getDataForActiveStep() {
        const activeStepFields = this.getFieldsForActiveStep();
        return activeStepFields.reduce((acc, field) => {
            acc[field.definition.fieldId] = field.getValue();
            return acc;
        }, {} as Record<string, any>);
    }

    validate() {
        const validationResult: FunnelEntryValidationResult = {
            isValid: true,
            errors: {}
        };

        for (const field of Object.values(this.fields)) {
            const fieldValidation = field.validate();
            if (!fieldValidation.isValid) {
                validationResult.isValid = false;
                validationResult.errors[field.definition.fieldId] = fieldValidation.errorMessage;
            }
        }

        return validationResult;
    }

    submitActiveStep(): FunnelSubmissionStepSubmissionResult {
        const validationResult = this.validateActiveStep();
        const data = this.getDataForActiveStep();

        if (!validationResult.isValid) {
            return {
                success: false,
                errors: validationResult.errors,
                data
            };
        }

        if (!this.isLastStep()) {
            this.activateNextStep();
        }

        return {
            success: true,
            errors: null,
            data
        };
    }

    validateActiveStep() {
        const activeStepFields = this.getFieldsForActiveStep();
        const validationResult: FunnelEntryValidationResult = {
            isValid: true,
            errors: {}
        };

        for (const field of activeStepFields) {
            const fieldValidation = field.validate();
            if (!fieldValidation.isValid) {
                validationResult.isValid = false;
                validationResult.errors[field.definition.fieldId] = fieldValidation.errorMessage;
            }
        }

        return validationResult;
    }

    // Fields-related methods. 👇
    getField(fieldId: string) {
        return this.fields[fieldId];
    }

    fieldExists(fieldId: string) {
        return !!this.fields[fieldId];
    }

    getFieldsForActiveStep() {
        const activeStep = this.funnel.steps.find(step => step.id === this.activeStepId);
        if (!activeStep) {
            return [];
        }

        return Object.values(this.fields).filter(
            field => field.definition.stepId === activeStep.id
        );
    }

    // Steps-related methods. 👇
    getActiveStep() {
        return this.funnel.steps.find(step => step.id === this.activeStepId);
    }

    getActiveStepIndex() {
        return this.funnel.steps.findIndex(step => step.id === this.activeStepId);
    }

    getStepsCount() {
        return this.funnel.steps.length;
    }

    isLastStep() {
        return this.getActiveStepIndex() === this.funnel.steps.length - 1;
    }

    activateNextStep() {
        const activeIndex = this.getActiveStepIndex();
        if (activeIndex < this.funnel.steps.length - 1) {
            this.activeStepId = this.funnel.steps[activeIndex + 1].id;
        }
    }

    activatePreviousStep() {
        const activeIndex = this.getActiveStepIndex();
        if (activeIndex > 0) {
            this.activeStepId = this.funnel.steps[activeIndex - 1].id;
        }
    }

    // Other methods. 👇
    getChecksum() {
        return createObjectHash(this.toDto());
    }

    evaluateConditionRulesFieldsForActiveStep() {
        // Evaluate condition rules for the active step fields.
        const activeStep = this.getActiveStep();
        if (!activeStep) {
            return [];
        }

        // Create a new evaluator and get the actions for the active step
        const evaluator = new FunnelConditionRulesEvaluator(this.funnel, this);
        return evaluator.evaluateForActiveStep();
    }
}
