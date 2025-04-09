import React from "react";
import { ReactComponent as TextIcon } from "@webiny/icons/text_fields.svg";
import { Grid, Input } from "@webiny/admin-ui";
import { FbBuilderFieldPlugin } from "../../../../types";

const plugin: FbBuilderFieldPlugin = {
    type: "form-editor-field-type",
    name: "form-editor-field-type-text",
    field: {
        name: "text",
        type: "text",
        validators: ["required", "minLength", "maxLength", "pattern"],
        label: "Short Text",
        description: "Titles, names, single line input",
        icon: <TextIcon />,
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
                        <Bind name={"settings.defaultValue"}>
                            <Input
                                size={"lg"}
                                label={"Default value"}
                                description={"Default value (optional)"}
                            />
                        </Bind>
                    </Grid.Column>
                </>
            );
        }
    }
};

export default plugin;
