import React from "react";
import { ReactComponent as HiddenIcon } from "@webiny/icons/visibility_off.svg";
import { FbBuilderFieldPlugin } from "../../../../types";
import { Grid, Input } from "@webiny/admin-ui";

const plugin: FbBuilderFieldPlugin = {
    type: "form-editor-field-type",
    name: "form-editor-field-type-hidden",
    field: {
        type: "hidden",
        name: "hidden",
        label: "Hidden",
        description: "Predefined values, hidden text",
        icon: <HiddenIcon />,
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
            return (
                <Grid.Column span={12}>
                    <Bind name={"settings.defaultValue"}>
                        <Input
                            size={"lg"}
                            label={"Default value"}
                            description={"Default value (optional)"}
                        />
                    </Bind>
                </Grid.Column>
            );
        }
    }
};

export default plugin;
