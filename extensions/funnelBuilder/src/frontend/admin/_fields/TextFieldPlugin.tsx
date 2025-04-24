import React from "react";
import { ReactComponent as TextIcon } from "./icons/round-text_fields-24px.svg";
import { Grid, Cell } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";
import { FbBuilderFieldPlugin } from "../../../../types";
import { PbEditorFunnelFieldPlugin } from "../PbEditorFunnelFieldPlugin";
import { Bind } from "@webiny/form";

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
        }
    }
};

export const TextFieldPlugin = () => {
    return (
        <PbEditorFunnelFieldPlugin
            fieldType={"text"}
            // validators={["required", "minLength", "maxLength", "pattern"]}
            renderer={() => {
                return (
                    <Grid>
                        <Cell span={12}>
                            <Bind name={"extra.placeholderText"}>
                                <Input
                                    label={"Placeholder text"}
                                    description={"Placeholder text (optional)"}
                                />
                            </Bind>
                        </Cell>
                        <Cell span={12}>
                            <Bind name={"defaultValue"}>
                                <Input
                                    label={"Default value"}
                                    description={"Default value (optional)"}
                                />
                            </Bind>
                        </Cell>
                    </Grid>
                );
            }}
        />
    );
};
