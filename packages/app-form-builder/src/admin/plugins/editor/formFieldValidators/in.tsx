import React from "react";
import { Grid } from "@webiny/admin-ui";
import { Tags } from "@webiny/ui/Tags";
import { validation } from "@webiny/validation";
import { FbBuilderFormFieldValidatorPlugin } from "~/types";

const plugin: FbBuilderFormFieldValidatorPlugin = {
    type: "form-editor-field-validator",
    name: "form-editor-field-validator-in",
    validator: {
        name: "in",
        label: "Specific values",
        description:
            "You won't be able to submit the form if the field value is not in the list of specified values",
        defaultMessage: "Value is not allowed.",
        renderSettings({ Bind }) {
            return (
                <Grid.Column span={12}>
                    <Bind name={"settings.values"} validators={validation.create("required")}>
                        <Tags label={"Allowed values"} description={"Hit ENTER to add values"} />
                    </Bind>
                </Grid.Column>
            );
        }
    }
};

export default plugin;
