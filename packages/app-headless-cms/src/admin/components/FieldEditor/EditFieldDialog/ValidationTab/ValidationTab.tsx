import React from "react";
import { ValidationsSection } from "~/admin/components/FieldEditor/EditFieldDialog/ValidationTab/ValidationsSection";
import {
    getFieldValidators,
    getListValidators
} from "~/admin/components/FieldEditor/EditFieldDialog/getValidators";
import { useModelField } from "~/admin/components/ModelFieldProvider";
import { ValidatorsList } from "~/admin/components/FieldEditor/EditFieldDialog/ValidationTab/ValidatorsList";
import type { CmsModelField } from "@webiny/app-headless-cms-common/types";

interface ValidationTabProps {
    field: CmsModelField;
}

export const ValidationTab = ({ field }: ValidationTabProps) => {
    const { fieldPlugin } = useModelField();

    const individualValidation = getFieldValidators(field, fieldPlugin);
    const hasValidators = individualValidation.validators.length > 0;
    const listValidation = getListValidators(field, fieldPlugin);

    return (
        <>
            {field.multipleValues ? (
                <>
                    <ValidationsSection
                        validators={listValidation.validators}
                        fieldKey={"listValidators"}
                        title={listValidation.title || "List validators"}
                        description={
                            listValidation.description ||
                            "These validators are applied to the entire list of values."
                        }
                    />

                    {hasValidators ? (
                        <ValidationsSection
                            fieldKey={"validators"}
                            validators={individualValidation.validators}
                            title={individualValidation.title || "Individual value validators"}
                            description={
                                individualValidation.description ||
                                "These validators are applied to each value in the list."
                            }
                        />
                    ) : null}
                </>
            ) : null}

            {!field.multipleValues && hasValidators ? (
                <ValidatorsList name={"validation"} validators={individualValidation.validators} />
            ) : null}
        </>
    );
};
