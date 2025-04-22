import { FunnelFieldDefinitionModel } from "./FunnelFieldDefinitionModel";
import { FunnelEntryModel } from "./FunnelEntryModel";

export interface FunnelEntryFieldModelDto {
    fieldId: string;
    value: any;
}

export class FunnelEntryFieldModel {
    fieldId: string;
    value: any;
    definition: FunnelFieldDefinitionModel;

    constructor(funnelEntry: FunnelEntryModel, funnelEntryFieldDto: FunnelEntryFieldModelDto) {
        this.fieldId = funnelEntryFieldDto.fieldId;
        this.value = funnelEntryFieldDto.value;
        this.definition = funnelEntry.funnel.fields.find(f => f.fieldId === this.fieldId)!;
    }

    toDto(): FunnelEntryFieldModelDto {
        return {
            fieldId: this.fieldId,
            value: this.value
        };
    }

    static fromDto(
        funnelEntry: FunnelEntryModel,
        dto: FunnelEntryFieldModelDto
    ): FunnelEntryFieldModel {
        return new FunnelEntryFieldModel(funnelEntry, dto);
    }

    getDefinition() {
        return this.definition;
    }

    getValue() {
        return this.value;
    }

    isValid() {
        return this.definition.validators.every(validator => validator.validate(this.value));
    }
}
