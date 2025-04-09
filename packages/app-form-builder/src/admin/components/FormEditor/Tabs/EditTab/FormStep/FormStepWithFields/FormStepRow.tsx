import React, { useCallback, useMemo } from "react";
import { FbFormModelField, FbFormStep } from "~/types";
import Draggable, { BeginDragProps } from "~/admin/components/FormEditor/Draggable";
import { ReactComponent as DragIcon } from "@webiny/icons/drag_indicator.svg";
import { Horizontal } from "~/admin/components/FormEditor/DropZone";
import { useFormStep } from "~/admin/components/FormEditor/Tabs/EditTab/FormStep/useFormStep";
import { DragObjectWithFieldInfo } from "~/admin/components/FormEditor/Droppable";
import { FormStepRowField } from "./FormStepRowField";
import { cn, Icon } from "@webiny/admin-ui";

export interface FormStepRowProps {
    formStep: FbFormStep;
    rowIndex: number;
    row: FbFormModelField[];
    isLastRow: boolean;
}

export const FormStepRow = (props: FormStepRowProps) => {
    const { formStep, rowIndex, row, isLastRow } = props;

    const { handleDrop } = useFormStep();

    const rowBeginDragParams: BeginDragProps = useMemo(() => {
        return {
            ui: "row",
            pos: { row: rowIndex },
            container: {
                type: "step",
                id: formStep.id
            }
        };
    }, [rowIndex, formStep]);

    const onRowHorizontalZoneDrop = useCallback(
        (item: DragObjectWithFieldInfo) => {
            handleDrop({
                item,
                formStep,
                destinationPosition: {
                    row: rowIndex,
                    index: null
                }
            });

            return undefined;
        },
        [handleDrop, formStep, rowIndex]
    );

    const onLastRowHorizontalZoneDrop = useCallback(
        (item: DragObjectWithFieldInfo) => {
            handleDrop({
                item,
                formStep,
                destinationPosition: {
                    row: rowIndex + 1,
                    index: null
                }
            });

            return undefined;
        },
        [handleDrop, formStep, rowIndex]
    );

    return (
        <Draggable beginDrag={rowBeginDragParams} key={`step-row-${rowIndex}`}>
            {({ drag, isDragging }) => (
                /* RowContainer start - includes drag handle, drop zones and the Row itself. */
                <div
                    className={cn([
                        "wby-flex wby-flex-column",
                        "wby-relative",
                        "wby-mt-md",
                        "wby-border-sm wby-border-neutral-smoked wby-rounded-sm",
                        isDragging ? "wby-opacity-30" : "wby-opacity-100"
                    ])}
                >
                    <div
                        className={cn([
                            "wby-cursor-grab",
                            "wby-absolute wby-left-sm-plus wby-top-sm-plus wby-z-10"
                        ])}
                        ref={drag}
                    >
                        <Icon
                            icon={<DragIcon />}
                            label={"Drag to move this row"}
                            color={"neutral-light"}
                            size={"sm"}
                        />
                    </div>
                    <Horizontal
                        onDrop={onRowHorizontalZoneDrop}
                        isVisible={item => item.ui !== "step"}
                    />

                    {/* Row start - includes field drop zones and fields */}
                    <div
                        className={cn([
                            "wby-w-full wby-flex wby-justify-between",
                            "wby-pl-xl wby-pr-sm wby-py-sm"
                        ])}
                        data-testid={"cms.editor.field-row"}
                    >
                        {row.map((field, fieldIndex) => (
                            <FormStepRowField
                                key={`field-${field._id}`}
                                formStep={formStep}
                                row={row}
                                rowIndex={rowIndex}
                                field={field}
                                fieldIndex={fieldIndex}
                            />
                        ))}
                    </div>

                    {/* Row end */}
                    {isLastRow && (
                        <Horizontal
                            last
                            onDrop={onLastRowHorizontalZoneDrop}
                            isVisible={item => item.ui !== "step"}
                        />
                    )}
                </div>
            )}
        </Draggable>
    );
};
