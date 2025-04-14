import React, { useState } from "react";
import { useFormEditor } from "~/admin/components/FormEditor";
import { FbFormStep } from "~/types";

import { EditFormStepDialog } from "./FormStep/EditFormStepDialog";

import { FieldErrors } from "./FieldErrors";
import { EditTabStep } from "./EditTabStep";

export const EditTab = () => {
    const { data, errors, updateStep } = useFormEditor();

    const [isEditStep, setIsEditStep] = useState<{ isOpened: boolean; id: string | null }>({
        isOpened: false,
        id: null
    });

    const stepTitle = data.steps.find(step => step.id === isEditStep.id)?.title || "";

    return (
        <div className={"wby-relative"}>
            <FieldErrors errors={errors} />
            {(data.steps || []).map((formStep: FbFormStep, index: number) => (
                <EditTabStep
                    key={`edit-tab-step${index}`}
                    formStep={formStep}
                    index={index}
                    setIsEditStep={setIsEditStep}
                />
            ))}
            <EditFormStepDialog
                isEditStep={isEditStep}
                setIsEditStep={setIsEditStep}
                updateStep={updateStep}
                stepTitle={stepTitle}
            />
        </div>
    );
};
