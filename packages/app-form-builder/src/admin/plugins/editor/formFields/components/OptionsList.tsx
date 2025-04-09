import React, { useState } from "react";
import camelCase from "lodash/camelCase";
import cloneDeep from "lodash/cloneDeep";
import { OptionsListItem, AddOptionInput, EditFieldOptionDialog } from "./OptionsListComponents";
import { ReactComponent as HandleIcon } from "@webiny/icons/drag_indicator.svg";
import { validation } from "@webiny/validation";
import { FormRenderPropParams } from "@webiny/form/types";
import { FieldOption } from "./types";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
    SortableContainerContextProvider,
    FieldOptionWithId
} from "./OptionsListComponents/OptionsListItem";
import { Grid, Icon, Label, Switch } from "@webiny/admin-ui";

const DragHandle = () => (
    <Icon
        icon={<HandleIcon />}
        label={"Drag to reorder"}
        color={"neutral-light"}
        className={"wby-cursor-grab"}
    />
);

interface SetEditOptionParams {
    index: number | null;
    data: FieldOption | null;
}
interface OptionsListProps {
    form: FormRenderPropParams;
    multiple?: boolean;
    otherOption?: boolean;
}
interface OptionsListBindParams {
    validation: any;
    value: FieldOption[];
    onChange: (values: FieldOption[]) => void;
}

const OptionsList = ({ form, multiple, otherOption }: OptionsListProps) => {
    const { Bind } = form;

    const [editOption, setEditOption] = useState<SetEditOptionParams>({
        data: null,
        index: null
    });
    const clearEditOption = (): void =>
        setEditOption({
            data: null,
            index: null
        });

    const onEditOption = (option: FieldOption, optionIndex: number) => {
        return setEditOption({ index: optionIndex, data: cloneDeep(option) });
    };

    return (
        <Bind name={"options"} validators={validation.create("required,minLength:1")}>
            {(bind: OptionsListBindParams) => {
                const {
                    validation: optionsValidation,
                    value: optionsValue,
                    onChange: setOptionsValue
                } = bind;

                // We are adding prop id to the list of options because SortableContext requires it.
                // SortableContext needs to have an id in order to make "sort" work.
                const optionsValueWithId: FieldOptionWithId[] = optionsValue?.map(
                    (option, index) => ({
                        ...option,
                        id: (index += 1)
                    })
                );

                const onSubmit = (data: FieldOptionWithId): void => {
                    // We need to remove id prop from option before saving it in graphql,
                    // because we do not store id for option in graphql.
                    delete data.id;
                    const newValue = [...optionsValueWithId].map(option => {
                        delete option.id;
                        return option;
                    });

                    newValue.splice(editOption.index as number, 1, data);
                    setOptionsValue(newValue);
                    clearEditOption();
                };

                const onDragEnd = (event: DragEndEvent) => {
                    const { active, over } = event;

                    if (active.id === over?.id) {
                        return;
                    }

                    const oldIndex = optionsValueWithId.findIndex(
                        (option: FieldOptionWithId) => option.id === active.id
                    );
                    const newIndex = optionsValueWithId.findIndex(
                        (option: FieldOptionWithId) => option.id === over?.id
                    );

                    const sortedOptions = arrayMove(optionsValueWithId, oldIndex, newIndex).map(
                        option => {
                            delete option.id;

                            return option;
                        }
                    );
                    setOptionsValue(sortedOptions);
                };

                return (
                    <>
                        <Label text={"Options"} className={"wby-mb-sm"} />
                        <Grid>
                            <>
                                <Grid.Column span={otherOption ? 9 : 12}>
                                    <AddOptionInput
                                        options={optionsValue}
                                        validation={optionsValidation}
                                        onAdd={label => {
                                            const newValue = Array.isArray(optionsValue)
                                                ? [...optionsValue]
                                                : [];
                                            newValue.push({
                                                value: camelCase(label),
                                                label
                                            });
                                            setOptionsValue(newValue);
                                        }}
                                    />
                                </Grid.Column>
                                {otherOption && (
                                    <Grid.Column span={3}>
                                        <div className={"wby-h-full wby-flex wby-items-center"}>
                                            <Bind name={"settings.otherOption"}>
                                                <Switch label={`Allow "Other"`} />
                                            </Bind>
                                        </div>
                                    </Grid.Column>
                                )}
                            </>
                        </Grid>

                        <div className={"wby-relative wby-mt-md"}>
                            {Array.isArray(optionsValueWithId) && optionsValueWithId.length > 0 ? (
                                <>
                                    <SortableContainerContextProvider
                                        optionsValue={optionsValueWithId}
                                        onDragEnd={onDragEnd}
                                    >
                                        {optionsValueWithId.map((item, index) => (
                                            <div key={`item-${index}`}>
                                                <OptionsListItem
                                                    dragHandle={<DragHandle />}
                                                    multiple={!!multiple}
                                                    option={item}
                                                    Bind={Bind}
                                                    editOption={() => onEditOption(item, index)}
                                                    deleteOption={() => {
                                                        const newValue = [...optionsValue];
                                                        newValue.splice(index, 1);
                                                        setOptionsValue(newValue);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </SortableContainerContextProvider>
                                </>
                            ) : (
                                <div className={"wby-p-xl wby-text-center"}>No options added.</div>
                            )}
                        </div>

                        <EditFieldOptionDialog
                            onClose={clearEditOption}
                            open={!!editOption.data}
                            options={optionsValue}
                            option={editOption.data}
                            optionIndex={editOption.index as number}
                            onSubmit={onSubmit}
                        />
                    </>
                );
            }}
        </Bind>
    );
};

export default OptionsList;
