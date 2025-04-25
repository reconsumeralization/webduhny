import { FunnelFieldDefinitionModel } from "./FunnelFieldDefinitionModel";
import { FunnelSubmissionModel } from "./FunnelSubmissionModel";

export interface FunnelEntryFieldModelDto {
    value: any;
}

export type FunnelEntryFieldValidationResult =
    | {
          isValid: true;
          errorMessage: null;
      }
    | {
          isValid: false;
          errorMessage: string;
      };

export class FunnelSubmissionFieldModel {
    submission: FunnelSubmissionModel;
    definition: FunnelFieldDefinitionModel;
    value: any;

    constructor(
        funnelSubmission: FunnelSubmissionModel,
        funnelFieldDefinition: FunnelFieldDefinitionModel,
        funnelEntryFieldDto: FunnelEntryFieldModelDto
    ) {
        this.submission = funnelSubmission;
        this.definition = funnelFieldDefinition;
        this.value = funnelEntryFieldDto.value;
    }

    toDto(): FunnelEntryFieldModelDto {
        return {
            value: this.value
        };
    }

    static fromDto(
        funnelEntry: FunnelSubmissionModel,
        funnelFieldDefinition: FunnelFieldDefinitionModel,
        dto: FunnelEntryFieldModelDto
    ): FunnelSubmissionFieldModel {
        return new FunnelSubmissionFieldModel(funnelEntry, funnelFieldDefinition, dto);
    }

    getValue() {
        return this.value;
    }

    validate(): FunnelEntryFieldValidationResult {
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
