import React from "react";
import { useRouter } from "@webiny/react-router";
import { useMutation } from "@apollo/react-hooks";
import { Form } from "@webiny/form";
import {
    CREATE_FORM,
    CreateFormMutationResponse,
    CreateFormMutationVariables
} from "../../graphql";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { Dialog, Input, OverlayLoader } from "@webiny/admin-ui";
import { addFormToListCache } from "../cache";
import { i18n } from "@webiny/app/i18n";
import { validation } from "@webiny/validation";

const t = i18n.namespace("Forms.NewFormDialog");

export interface NewFormDialogProps {
    open: boolean;
    onClose: () => void;
}

const NewFormDialog = ({ open, onClose }: NewFormDialogProps) => {
    const [loading, setLoading] = React.useState(false);
    const { showSnackbar } = useSnackbar();
    const { history } = useRouter();

    const [create] = useMutation<CreateFormMutationResponse, CreateFormMutationVariables>(
        CREATE_FORM
    );

    return (
        <Form
            onSubmit={formData => {
                setLoading(true);

                create({
                    /**
                     * We know that formData is CreateFormMutationVariables.
                     */
                    variables: formData as unknown as CreateFormMutationVariables,
                    update(cache, result) {
                        if (!result.data) {
                            return;
                        }
                        const { data } = result;
                        const { data: revision, error } = data.formBuilder.form;

                        setLoading(false);
                        if (error) {
                            showSnackbar(error.message);
                            return;
                        } else if (!revision) {
                            showSnackbar(`Missing revision data in Create Form Mutation.`);
                            return;
                        }

                        addFormToListCache(cache, revision);
                        console.log("push before");
                        history.push(`/form-builder/forms/${encodeURIComponent(revision.id)}`);
                        console.log("push after");
                    }
                });
            }}
        >
            {({ Bind, submit }) => (
                <Dialog
                    open={open}
                    onClose={onClose}
                    title={t`New form`}
                    data-testid="fb-new-form-modal"
                    actions={
                        <>
                            <Dialog.CancelButton />
                            <Dialog.ConfirmButton
                                data-testid="fb.form.create"
                                text={"Create"}
                                onClick={ev => {
                                    submit(ev);
                                }}
                            />
                        </>
                    }
                >
                    <>
                        {loading && <OverlayLoader text={"Creating form..."} />}
                        <Bind name={"name"} validators={validation.create("required")}>
                            <Input
                                size={"lg"}
                                label={t`Name`}
                                placeholder={"Enter a name for your new form"}
                            />
                        </Bind>
                    </>
                </Dialog>
            )}
        </Form>
    );
};

export default NewFormDialog;
