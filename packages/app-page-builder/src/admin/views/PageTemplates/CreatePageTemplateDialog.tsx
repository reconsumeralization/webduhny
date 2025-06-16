import React, { useCallback, useState } from "react";
import { makeDecoratable } from "@webiny/app";
import { Form } from "@webiny/form";
import { validation } from "@webiny/validation";
import { Validator } from "@webiny/validation/types";
import { PbPageTemplate } from "~/types";
import { Dialog, Grid, Input, Textarea } from "@webiny/admin-ui";

const slugValidator: Validator = (value: string) => {
    if (!value.match(/^[a-z]+(\-[a-z]+)*$/)) {
        throw new Error(
            "Page template slug must consist of only 'a-z' and '-' characters (for example: 'page-template-slug')."
        );
    }

    if (value.length > 100) {
        throw new Error("Page Template slug must be shorter than 100 characters.");
    }

    return true;
};

type CreatePageTemplateDialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (formData: Pick<PbPageTemplate, "title" | "slug" | "description">) => Promise<void>;
};

export const CreatePageTemplateDialog = makeDecoratable(
    "CreatePageTemplateDialog",
    ({ open, onClose, onSubmit }: CreatePageTemplateDialogProps) => {
        const [loading, setLoading] = useState(false);
        const submitForm = useCallback(
            async (formData: PbPageTemplate) => {
                setLoading(true);
                await onSubmit(formData);
                setLoading(false);
                onClose();
            },
            [onSubmit]
        );

        return (
            <Form onSubmit={submitForm}>
                {({ form, Bind }) => (
                    <>
                        <Dialog
                            open={open}
                            onClose={onClose}
                            title={"Create page template"}
                            actions={
                                <>
                                    <Dialog.CancelButton disabled={loading} />
                                    <Dialog.ConfirmButton
                                        text={"Create"}
                                        disabled={loading}
                                        onClick={form.submit}
                                    />
                                </>
                            }
                        >
                            <Grid>
                                <Grid.Column span={12}>
                                    <Bind name="title" validators={[validation.create("required")]}>
                                        <Input size={"lg"} label="Title" />
                                    </Bind>
                                </Grid.Column>
                                <Grid.Column span={12}>
                                    <Bind
                                        name="slug"
                                        validators={[validation.create("required"), slugValidator]}
                                    >
                                        <Input size={"lg"} label="Slug" />
                                    </Bind>
                                </Grid.Column>
                                <Grid.Column span={12}>
                                    <Bind
                                        name="description"
                                        validators={[validation.create("required")]}
                                    >
                                        <Textarea size={"lg"} rows={2} label="Description" />
                                    </Bind>
                                </Grid.Column>
                            </Grid>
                        </Dialog>
                    </>
                )}
            </Form>
        );
    }
);
