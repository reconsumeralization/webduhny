import React from "react";
import { Grid, Input } from "@webiny/admin-ui";
import { validation } from "@webiny/validation";
import { FbBuilderFormFieldValidatorPlugin } from "~/types";

const plugin: FbBuilderFormFieldValidatorPlugin = {
    type: "form-editor-field-validator",
    name: "form-editor-field-validator-lte",
    validator: {
        name: "lte",
        label: "Smaller or equal",
        description: "Entered value must be equal or lower than the provided min value.",
        defaultMessage: "Value is too great.",
        renderSettings({ Bind }) {
            return (
                <Grid.Column span={12}>
                    <Bind
                        name={"settings.value"}
                        validators={validation.create("required,numeric")}
                    >
                        <Input
                            size={"lg"}
                            type={"number"}
                            label={"Value"}
                            description={"This is the greatest value that will be allowed"}
                        />
                    </Bind>
                </Grid.Column>
            );
        }
    }
};
export default plugin;
