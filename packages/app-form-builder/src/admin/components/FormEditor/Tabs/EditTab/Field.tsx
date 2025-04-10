import React, { useCallback } from "react";
import { Heading, IconButton, Separator, Switch, Text } from "@webiny/admin-ui";
import { ReactComponent as EditIcon } from "@webiny/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { useFormEditor } from "../../Context";
import { FbFormModelField } from "~/types";

interface FieldProps {
    field: FbFormModelField;
    onEdit: (field: FbFormModelField) => void;
    onDelete: (field: FbFormModelField) => void;
}
const Field = (props: FieldProps) => {
    const { field, onEdit, onDelete } = props;
    const { getFieldPlugin, updateField } = useFormEditor();
    const fieldPlugin = getFieldPlugin({ name: field.name });

    const isRequired = field.validation?.some(validation => validation.name === "required");

    const toggleRequiredValidator = useCallback(() => {
        if (isRequired) {
            updateField({
                ...field,
                validation: field.validation?.filter(validation => validation.name !== "required")
            });
        } else {
            updateField({
                ...field,
                validation: [
                    ...(field.validation || []),
                    {
                        message: "Value is required.",
                        name: "required",
                        settings: {}
                    }
                ]
            });
        }
    }, [isRequired, field]);

    return (
        <div className={"wby-flex wby-justify-between wby-align-center"}>
            <div>
                <Heading level={6}>{field.label}</Heading>
                <Text size={"sm"} className={"wby-text-neutral-strong"}>
                    {fieldPlugin && fieldPlugin.field.label}
                </Text>
            </div>
            <div className={"wby-flex wby-items-center wby-justify-end wby-gap-md"}>
                <Switch
                    label={"Required"}
                    checked={isRequired}
                    onChange={toggleRequiredValidator}
                />
                <Separator orientation={"vertical"} />
                <div className={"wby-flex wby-items-center wby-justify-end wby-gap-sm"}>
                    <IconButton
                        icon={<EditIcon />}
                        onClick={() => onEdit(field)}
                        variant={"ghost"}
                        size={"sm"}
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => onDelete(field)}
                        variant={"ghost"}
                        size={"sm"}
                    />
                </div>
            </div>
        </div>
    );
};

export default Field;
