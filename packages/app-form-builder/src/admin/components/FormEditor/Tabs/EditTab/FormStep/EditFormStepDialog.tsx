import React from "react";
import { Dialog, Input } from "@webiny/admin-ui";
import { Form, FormOnSubmit } from "@webiny/form";
import { validation } from "@webiny/validation";

export interface DialogProps {
    isEditStep: {
        isOpened: boolean;
        id: string | null;
    };
    stepTitle: string;
    setIsEditStep: (params: { isOpened: boolean; id: string | null }) => void;
    updateStep: (title: string, id: string | null) => void;
}

type SubmitData = { title: string };

export const EditFormStepDialog = ({
    isEditStep,
    stepTitle,
    setIsEditStep,
    updateStep
}: DialogProps) => {
    const onSubmit: FormOnSubmit<SubmitData> = (_, form) => {
        updateStep(form.data.title, isEditStep.id);
        setIsEditStep({ isOpened: false, id: null });
    };
    return (
        <>
            <Form onSubmit={onSubmit} data={{ title: stepTitle }}>
                {({ Bind, submit }) => (
                    <Dialog
                        open={isEditStep.isOpened}
                        onClose={() => {
                            setIsEditStep({
                                isOpened: false,
                                id: null
                            });
                        }}
                        title={"Change step title"}
                        actions={
                            <>
                                <Dialog.CancelButton
                                    onClick={() => setIsEditStep({ isOpened: false, id: null })}
                                />
                                <Dialog.ConfirmButton onClick={submit} />
                            </>
                        }
                    >
                        <>
                            <Bind name={"title"} validators={[validation.create("required")]}>
                                <Input size={"lg"} label={"Step title"} />
                            </Bind>
                        </>
                    </Dialog>
                )}
            </Form>
        </>
    );
};
