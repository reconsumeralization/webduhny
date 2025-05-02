import React, { useState } from "react";
import styled from "@emotion/styled";
import camelCase from "lodash/camelCase";
import cloneDeep from "lodash/cloneDeep";
import {
    FieldOptionWithId,
    OptionsListItem,
    SortableContainerContextProvider
} from "./OptionsList/OptionsListItem";
import { AddOptionInput } from "./OptionsList/AddOptionInput";
import { EditFieldOptionDialog } from "./OptionsList/EditFieldOptionDialog";
import { FieldOption } from "./OptionsList/types";
import { Icon } from "@webiny/ui/Icon";
import { Cell, Grid } from "@webiny/ui/Grid";
import { ReactComponent as HandleIcon } from "@material-design-icons/svg/outlined/drag_indicator.svg";
import { validation } from "@webiny/validation";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Bind } from "@webiny/form";

const OptionListItem = styled.li`
    z-index: 10;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--mdc-theme-background);
    background: var(--mdc-theme-surface);

    &:hover {
        background: var(--mdc-theme-background);
    }

    &:last-child {
        border: none;
    }
`;

const DragHandle = () => <Icon icon={<HandleIcon style={{ cursor: "pointer" }} />} />;

interface SetEditOptionParams {
    index: number | null;
    data: FieldOption | null;
}

interface OptionsListProps {
    multiple?: boolean;
}

interface OptionsListBindParams {
    validation: any;
    value: FieldOption[];
    onChange: (values: FieldOption[]) => void;
}

const OptionsList = ({ multiple }: OptionsListProps) => {
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
        <Bind name={"extra.options"} validators={validation.create("required,minLength:1")}>
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
                        <div>Options</div>
                        <Grid>
                            <Cell span={12}>
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
                            </Cell>
                        </Grid>

                        <div style={{ position: "relative" }}>
                            {Array.isArray(optionsValueWithId) && optionsValueWithId.length > 0 ? (
                                <>
                                    <SortableContainerContextProvider
                                        optionsValue={optionsValueWithId}
                                        onDragEnd={onDragEnd}
                                    >
                                        {optionsValueWithId.map((item, index) => (
                                            <OptionListItem key={`item-${index}`}>
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
                                            </OptionListItem>
                                        ))}
                                    </SortableContainerContextProvider>
                                </>
                            ) : (
                                <div style={{ padding: 40, textAlign: "center" }}>
                                    No options added.
                                </div>
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
