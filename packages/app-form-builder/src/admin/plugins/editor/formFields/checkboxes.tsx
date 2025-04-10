import React from "react";
import { Grid } from "@webiny/admin-ui";
import { ReactComponent as Icon } from "@webiny/icons/check_box.svg";
import OptionsList from "./components/OptionsList";
import { FbBuilderFieldPlugin } from "~/types";

const plugin: FbBuilderFieldPlugin = {
    type: "form-editor-field-type",
    name: "form-editor-field-type-checkbox",
    field: {
        type: "checkbox",
        name: "checkbox",
        validators: ["required"],
        label: "Checkboxes",
        description: "Choose one or more options",
        icon: <Icon />,
        createField() {
            return {
                _id: "",
                fieldId: "",
                type: this.type,
                name: this.name,
                validation: [],
                settings: {
                    defaultValue: [],
                    otherOption: false
                }
            };
        },
        renderSettings({ form }) {
            return (
                <Grid.Column span={12}>
                    <OptionsList form={form} multiple otherOption />
                </Grid.Column>
            );
        }
    }
};

export default plugin;
