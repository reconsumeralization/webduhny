import React from "react";
import { validation } from "@webiny/validation";
import { FbBuilderFormFieldValidatorPlugin } from "~/types";
import { Grid, Input } from "@webiny/admin-ui";

const plugin: FbBuilderFormFieldValidatorPlugin = {
    type: "form-editor-field-validator",
    name: "form-editor-field-validator-min-length",
    validator: {
        name: "minLength",
        label: "Min length",
        description: "Entered value must not be shorter than the provided min length.",
        defaultMessage: "Value is too short.",
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
                            description={"This is the minimum allowed length."}
                        />
                    </Bind>
                </Grid.Column>
            );
        }
    }
};
export default plugin;
