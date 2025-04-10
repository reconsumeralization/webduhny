import React from "react";
import { Grid, Input } from "@webiny/admin-ui";
import { validation } from "@webiny/validation";
import { FbBuilderFormFieldValidatorPlugin } from "~/types";

const plugin: FbBuilderFormFieldValidatorPlugin = {
    type: "form-editor-field-validator",
    name: "form-editor-field-validator-max-length",
    validator: {
        name: "maxLength",
        label: "Max length",
        description: "Entered value must not be longer than the provided max length.",
        defaultMessage: "Value is too long.",
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
                            description={"This is the maximum allowed length."}
                        />
                    </Bind>
                </Grid.Column>
            );
        }
    }
};
export default plugin;
