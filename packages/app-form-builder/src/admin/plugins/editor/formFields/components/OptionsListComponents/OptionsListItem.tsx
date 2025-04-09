import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    closestCenter,
    DragEndEvent,
    UniqueIdentifier
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, SortableContext } from "@dnd-kit/sortable";
import { ReactComponent as EditIcon } from "@webiny/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { BindComponent } from "@webiny/form/types";
import { FieldOption } from "~/admin/plugins/editor/formFields/components/types";
import { IconButton, Switch, Text, Tooltip } from "@webiny/admin-ui";

interface DefaultValueSwitchProps {
    multiple: boolean;
    option: FieldOption;
    value: string[] | string;
    onChange: (value: string[] | string) => void;
}

const DefaultValueSwitch = ({
    multiple,
    option,
    value: currentDefaultValue,
    onChange: setDefaultValue
}: DefaultValueSwitchProps) => {
    if (multiple) {
        const selected =
            Array.isArray(currentDefaultValue) && currentDefaultValue.includes(option.value);

        return (
            <Switch
                label={""}
                checked={selected}
                onChange={() => {
                    if (selected) {
                        const value = Array.isArray(currentDefaultValue)
                            ? [...currentDefaultValue]
                            : [];

                        value.splice(value.indexOf(option.value), 1);
                        setDefaultValue(value);
                    } else {
                        const value = Array.isArray(currentDefaultValue)
                            ? [...currentDefaultValue]
                            : [];
                        value.push(option.value);
                        setDefaultValue(value);
                    }
                }}
            />
        );
    }

    const selected = currentDefaultValue === option.value;
    return (
        <Switch
            label={""}
            checked={selected}
            onChange={() => {
                const newValue = selected ? "" : option.value;
                setDefaultValue(newValue);
            }}
        />
    );
};

export type SortableContextItemsProp = (
    | UniqueIdentifier
    | {
          id: UniqueIdentifier;
      }
)[];

export type FieldOptionWithId = FieldOption & { id?: number };

interface SortableContainerWrapperProps {
    optionsValue: FieldOptionWithId[];
    children: React.ReactNode;
    onDragEnd: (event: DragEndEvent) => void;
}

export const SortableContainerContextProvider = ({
    optionsValue,
    children,
    onDragEnd
}: SortableContainerWrapperProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={optionsValue as unknown as SortableContextItemsProp}>
                <div className={"wby-p-sm wby-border-sm wby-border-neutral-muted wby-rounded-sm"}>
                    {children}
                </div>
            </SortableContext>
        </DndContext>
    );
};

type OptionsListItemProps = {
    multiple: boolean;
    dragHandle: React.ReactNode;
    option: { label: string; value: string; id?: number };
    Bind: BindComponent;
    deleteOption: () => void;
    editOption: () => void;
};

export default function OptionsListItem(props: OptionsListItemProps) {
    const { multiple, dragHandle, Bind, option, deleteOption, editOption } = props;

    const { attributes, listeners, setNodeRef, transform } = useSortable({ id: option.id || "" });
    const style = {
        transform: CSS.Transform.toString(transform)
    };

    return (
        <div
            className={
                "wby-flex wby-justify-between wby-items-center wby-gap-lg wby-p-sm hover:wby-bg-neutral-dimmed"
            }
        >
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <div className={"wby-flex wby-justify-between wby-items-center wby-gap-sm"}>
                    <Tooltip
                        side={"bottom"}
                        content={"Drag to rearrange the order"}
                        trigger={dragHandle}
                    />
                    <div>
                        <Text as={"div"}>{option.label}</Text>
                        <Text size={"sm"} as={"div"}>
                            {option.value}
                        </Text>
                    </div>
                </div>
            </div>
            <div className={"wby-flex wby-justify-start wby-items-center wby-gap-sm"}>
                <IconButton
                    size={"sm"}
                    variant={"ghost"}
                    icon={<EditIcon />}
                    onClick={editOption}
                />
                <IconButton
                    size={"sm"}
                    variant={"ghost"}
                    icon={<DeleteIcon />}
                    onClick={deleteOption}
                />
                <Bind name={"settings.defaultValue"}>
                    {({ onChange, value }) => (
                        <Tooltip
                            side={"bottom"}
                            content={"Set as default value"}
                            trigger={
                                <DefaultValueSwitch
                                    onChange={onChange}
                                    value={value}
                                    multiple={multiple}
                                    option={option}
                                />
                            }
                        />
                    )}
                </Bind>
            </div>
        </div>
    );
}
