import React from "react";
import { ReactComponent as TextIcon } from "@webiny/icons/text_fields.svg";
import { Grid, Input, Textarea } from "@webiny/admin-ui";
import { FbBuilderFieldPlugin } from "../../../../types";

const plugin: FbBuilderFieldPlugin = {
    type: "form-editor-field-type",
    name: "form-editor-field-type-textarea",
    field: {
        name: "textarea",
        type: "textarea",
        validators: ["required", "minLength", "maxLength", "pattern"],
        label: "Long Text",
        description: "Descriptions, comments or paragraphs or text",
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
                            <Textarea
                                size={"lg"}
                                rows={4}
                                label={"Default value"}
                                description={"Default value (optional)"}
                            />
                        </Bind>
                    </Grid.Column>
                    <Grid.Column span={12}>
                        <Bind name={"settings.rows"}>
                            <Input
                                size={"lg"}
                                type={"number"}
                                label={"Text area rows"}
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
