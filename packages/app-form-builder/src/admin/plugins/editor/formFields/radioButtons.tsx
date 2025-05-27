import React from "react";
import { ReactComponent as Icon } from "@webiny/icons/radio_button_checked.svg";
import { Grid } from "@webiny/admin-ui";
import OptionsList from "./components/OptionsList";
import { FbBuilderFieldPlugin } from "~/types";

const plugin: FbBuilderFieldPlugin = {
    type: "form-editor-field-type",
    name: "form-editor-field-type-radio",
    field: {
        type: "radio",
        name: "radio",
        validators: ["required"],
        label: "Radio",
        description: "Choose a single option",
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
                    <OptionsList form={form} otherOption />
                </Grid.Column>
            );
        }
    }
};

export default plugin;
