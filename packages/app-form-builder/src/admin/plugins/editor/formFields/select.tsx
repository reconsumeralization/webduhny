import React from "react";
import { ReactComponent as Icon } from "@webiny/icons/list.svg";
import OptionsList from "./components/OptionsList";
import { FbBuilderFieldPlugin } from "~/types";
import { Grid, Input } from "@webiny/admin-ui";

const plugin: FbBuilderFieldPlugin = {
    type: "form-editor-field-type",
    name: "form-editor-field-type-select",
    field: {
        type: "select",
        name: "select",
        validators: ["required"],
        label: "Select",
        description: "Dropdown, select one of the options",
        icon: <Icon />,
        createField() {
            return {
                _id: "",
                fieldId: "",
                type: this.type,
                name: this.name,
                validation: [],
                settings: {
                    defaultValue: ""
                }
            };
        },
        renderSettings({ form }) {
            const { Bind } = form;
            // TODO: @ts-adrian: spread Bind komponente na donju komponentu
            return (
                <>
                    <Grid.Column span={12}>
                        <Bind name={"placeholderText"}>
                            <Input
                                size={"lg"}
                                label={"Placeholder text"}
                                description={"Placeholder text (optional)"}
                            />
                        </Bind>
                    </Grid.Column>
                    <Grid.Column span={12}>
                        <OptionsList form={form} />
                    </Grid.Column>
                </>
            );
        }
    }
};

export default plugin;
