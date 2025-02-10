import React from "react";

import { FbFormModelField, FbFormStep } from "~/types";
import { StyledAccordion, StyledAccordionItem } from "../Styled";
import { AccordionItem } from "@webiny/ui/Accordion";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete_outline.svg";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/edit.svg";
import { EmptyFormStep } from "./EmptyFormStep";
import { FormStepWithFields } from "./FormStepWithFields";

import EditFieldDialog from "../EditFieldDialog";
import { useFormStep } from "./useFormStep";

export interface FormStepProps {
    title: string;
    deleteStepDisabled: boolean;
    formStep: FbFormStep;
    onDelete: () => void;
    onEdit: () => void;
    getStepFields: (stepId: string) => FbFormModelField[][];
    updateField: (field: FbFormModelField) => void;
    deleteField: (field: FbFormModelField, stepId: string) => void;
}

export const FormStep = (props: FormStepProps) => {
    const { title, deleteStepDisabled, formStep, onDelete, onEdit, getStepFields, updateField } =
        props;

    const { dropDestination, editingField, editField, createCustomField } = useFormStep();

    const fields = getStepFields(formStep.id);

    return (
        <StyledAccordion data-testid="form-step-element">
            <StyledAccordionItem
                title={title}
                open={true}
                handle={<AccordionItem.Handle />}
                actions={
                    <AccordionItem.Actions>
                        <AccordionItem.Action icon={<EditIcon />} onClick={onEdit} />
                        <AccordionItem.Action
                            icon={<DeleteIcon />}
                            onClick={onDelete}
                            disabled={deleteStepDisabled}
                        />
                    </AccordionItem.Actions>
                }
            >
                {fields.length === 0 ? (
                    <EmptyFormStep formStep={formStep} />
                ) : (
                    <FormStepWithFields formStep={formStep} fields={fields} />
                )}
                <EditFieldDialog
                    field={editingField}
                    onClose={() => {
                        editField(null);
                    }}
                    onSubmit={initialData => {
                        const data = initialData as FbFormModelField;

                        if (data._id) {
                            updateField(data);
                        } else if (dropDestination) {
                            createCustomField({
                                data,
                                dropDestination
                            });
                        }

                        editField(null);
                    }}
                />
            </StyledAccordionItem>
        </StyledAccordion>
    );
};
