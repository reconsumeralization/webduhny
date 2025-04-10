import React, { useMemo } from "react";
import { Button, cn } from "@webiny/admin-ui";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import Draggable, { BeginDragProps } from "~/admin/components/FormEditor/Draggable";
import { FbFormStep } from "~/types";
import { Horizontal } from "~/admin/components/FormEditor/DropZone";
import { useEditTab } from "./EditFieldDialog/useEditTab";
import { EditTabStepRow } from "./EditTabStepRow";

interface EditTabStepProps {
    setIsEditStep: (params: { isOpened: boolean; id: string }) => void;
    formStep: FbFormStep;
    index: number;
}

const AddStepButton = ({
    addStepButtonVisible,
    addStep
}: {
    addStepButtonVisible: boolean;
    addStep: () => void;
}) => {
    return addStepButtonVisible ? (
        <div className={"wby-flex wby-justify-center wby-items-center wby-mt-xl"}>
            <Button
                variant={"tertiary"}
                size={"lg"}
                text={"Add new step"}
                icon={<AddIcon />}
                onClick={addStep}
                data-testid="add-step-action"
            />
        </div>
    ) : null;
};

export const EditTabStep = ({ setIsEditStep, formStep, index }: EditTabStepProps) => {
    const { handleStepMove, renderTopDropZone, renderBottomDropZone, isAddStepVisible, addStep } =
        useEditTab();

    const beginDragStepProps: BeginDragProps = useMemo(() => {
        return {
            ui: "step",
            name: "step",
            pos: { row: index, index },
            container: {
                type: "step",
                id: formStep.id
            }
        };
    }, [index, formStep]);

    const addStepButtonVisible = isAddStepVisible(formStep);

    return (
        <Draggable beginDrag={beginDragStepProps}>
            {({ drag, isDragging }) => (
                <>
                    <div
                        className={cn([
                            "wby-w-full",
                            "wby-relative",
                            "wby-mb-md last-of-type:wby-mb-none",
                            isDragging ? "wby-opacity-30" : "wby-opacity-100"
                        ])}
                    >
                        <EditTabStepRow
                            dragRef={drag}
                            setIsEditStep={setIsEditStep}
                            formStep={formStep}
                            index={index}
                        />
                        <Horizontal
                            onDrop={item => handleStepMove(item, formStep)}
                            isVisible={item => renderTopDropZone(item, formStep.id)}
                        />
                        <Horizontal
                            last
                            onDrop={item => handleStepMove(item, formStep)}
                            isVisible={item => renderBottomDropZone(item, formStep.id)}
                        />
                    </div>
                    <AddStepButton addStep={addStep} addStepButtonVisible={addStepButtonVisible} />
                </>
            )}
        </Draggable>
    );
};
