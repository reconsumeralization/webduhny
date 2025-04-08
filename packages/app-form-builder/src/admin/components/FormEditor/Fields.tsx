import React from "react";
import { useFormEditor } from "./Context";
import { plugins } from "@webiny/plugins";
import { ReactComponent as HandleIcon } from "@webiny/icons/drag_indicator.svg";
import Draggable from "./Draggable";
import { FbBuilderFieldPlugin, FbEditorFieldGroup, FbFormModelField } from "~/types";
import { Accordion, cn, Heading, Icon } from "@webiny/admin-ui";

interface FieldProps {
    onFieldDragStart: () => void;
    fieldType: Pick<FbFormModelField, "name" | "label">;
    className?: string;
}
const Field = ({ onFieldDragStart, fieldType: { name, label }, className }: FieldProps) => {
    return (
        <Draggable beginDrag={{ ui: "field", name }}>
            {({ drag }) => (
                <div
                    ref={drag}
                    className={cn(
                        [
                            "wby-bg-neutral-base wby-rounded-sm wby-mb-sm wby-px-md wby-py-sm-extra wby-cursor-grab last-of-type:wby-mb-none hover:wby-opacity-80 wby-transition-opacity"
                        ],
                        className
                    )}
                    data-testid={`fb.editor.fields.field.${name}`}
                    onDragStart={onFieldDragStart}
                >
                    <div className={"wby-flex wby-items-center wby-gap-sm-extra"}>
                        <div>
                            <Icon
                                icon={<HandleIcon />}
                                label={"Handle"}
                                size={"md"}
                                color={"neutral-light"}
                            />
                        </div>
                        <div>
                            <Heading level={6}>{label}</Heading>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

interface FieldsProps {
    onFieldDragStart: () => void;
}
export const Fields = ({ onFieldDragStart }: FieldsProps) => {
    const { getField } = useFormEditor();

    function getGroups() {
        const presetFieldPlugins = plugins
            .byType<FbBuilderFieldPlugin>("form-editor-field-type")
            .filter(pl => pl.field.group)
            .filter(pl => {
                if (pl.field.unique) {
                    return !getField({ name: pl.field.name });
                }
                return true;
            });

        return plugins.byType<FbEditorFieldGroup>("form-editor-field-group").map(pl => ({
            ...pl.group,
            name: pl.name,
            fields: presetFieldPlugins.filter(f => f.field.group === pl.name).map(pl => pl.field)
        }));
    }

    return (
        <React.Fragment>
            <Field
                fieldType={{ name: "custom", label: "Custom field" }}
                onFieldDragStart={onFieldDragStart}
            />

            <Accordion variant={"container"} color={"neutral"}>
                {getGroups().map(group => (
                    <Accordion.Item key={group.name} title={group.title} data-testid={group.name}>
                        <>
                            {!group.fields.length && (
                                <span>No fields are available at the moment!</span>
                            )}
                            {group.fields.map(fieldType => {
                                return (
                                    <Field
                                        key={fieldType.name}
                                        fieldType={fieldType}
                                        onFieldDragStart={onFieldDragStart}
                                        className={"wby-bg-neutral-light"}
                                    />
                                );
                            })}
                        </>
                    </Accordion.Item>
                ))}
            </Accordion>
        </React.Fragment>
    );
};
