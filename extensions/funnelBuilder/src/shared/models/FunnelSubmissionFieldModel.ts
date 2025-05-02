import { FunnelFieldDefinitionModel } from "./FunnelFieldDefinitionModel";
import { FunnelSubmissionModel } from "./FunnelSubmissionModel";
import { FunnelFieldValueModel } from "./FunnelFieldValueModel";

export interface FunnelSubmissionFieldModelDto<TValue = unknown> {
    value: FunnelFieldValueModel<TValue>;
}

export type FunnelSubmissionFieldValidationResult =
    | {
          isValid: true;
          errorMessage: null;
      }
    | {
          isValid: false;
          errorMessage: string;
      };

export class FunnelSubmissionFieldModel<TValue = unknown> {
    submission: FunnelSubmissionModel;
    definition: FunnelFieldDefinitionModel<TValue>;
    value: FunnelFieldValueModel<TValue>;

    constructor(
        funnelSubmission: FunnelSubmissionModel,
        funnelFieldDefinition: FunnelFieldDefinitionModel<TValue>,
        funnelSubmissionFieldDto?: FunnelSubmissionFieldModelDto<TValue>
    ) {
        this.submission = funnelSubmission;
        this.definition = funnelFieldDefinition;
        if (funnelSubmissionFieldDto?.value) {
            this.value = FunnelFieldValueModel.fromDto(funnelSubmissionFieldDto?.value);
        } else {
            this.value = this.definition.value.clone();
        }
    }

    toDto(): FunnelSubmissionFieldModelDto {
        return {
            value: this.value
        };
    }

    static fromDto(
        funnelSubmission: FunnelSubmissionModel,
        funnelFieldDefinition: FunnelFieldDefinitionModel,
        dto: FunnelSubmissionFieldModelDto
    ): FunnelSubmissionFieldModel {
        return new FunnelSubmissionFieldModel(funnelSubmission, funnelFieldDefinition, dto);
    }

    getValue() {
        return this.value.value;
    }

    setValue(value: TValue) {
        this.value.value = value;
    }

    get disabled() {
        // Get the actions from the evaluator
        const actions = this.submission.evaluateConditionRulesFieldsForActiveStep();

        // Check if any action is to disable this field
        return actions.some(
            action =>
                action.type === "disableField" &&
                action.target.type === "field" &&
                action.target.id === this.definition.fieldId
        );
    }

    validate(): FunnelSubmissionFieldValidationResult {
        const validators = this.definition.validators;
        for (const validator of validators) {
            if (!validator.isValid(this.value)) {
                return {
                    isValid: false,
                    errorMessage: validator.getErrorMessage()
                };
            }
        }

        return {
            isValid: true,
            errorMessage: null
        };
    }
}
