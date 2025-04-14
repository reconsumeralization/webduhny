import React from "react";
import { ReactComponent as NumberIcon } from "@webiny/icons/looks_3.svg";
import { Grid, Input } from "@webiny/admin-ui";
import { FbBuilderFieldPlugin } from "../../../../types";

const plugin: FbBuilderFieldPlugin = {
    type: "form-editor-field-type",
    name: "form-editor-field-type-number",
    field: {
        type: "number",
        name: "number",
        label: "Number",
        description: "ID, order number, rating, quantity",
        icon: <NumberIcon />,
        validators: ["required", "gte", "lte", "in"],
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
        renderSettings({ form: { Bind } }) {
            // TODO: @ts-adrian: spread Bind komponente na donju komponentu
            return (
                <Grid.Column span={12}>
                    <Bind name={"placeholderText"}>
                        <Input
                            size={"lg"}
                            label={"Placeholder text"}
                            description={"Placeholder text (optional)"}
                        />
                    </Bind>
                </Grid.Column>
            );
        }
    }
};

export default plugin;
