import React from "react";
import { Grid, Input } from "@webiny/admin-ui";
import { validation } from "@webiny/validation";
import { FbBuilderFormFieldValidatorPlugin } from "~/types";

const plugin: FbBuilderFormFieldValidatorPlugin = {
    type: "form-editor-field-validator",
    name: "form-editor-field-validator-gte",
    validator: {
        name: "gte",
        label: "Greater or equal",
        description: "Entered value must be equal or greater than the provided max value.",
        defaultMessage: "Value is too small.",
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
