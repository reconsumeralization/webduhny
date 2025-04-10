import React from "react";
import { Dialog, Grid, Input } from "@webiny/admin-ui";
import { Form, FormOnSubmit } from "@webiny/form";
import { i18n } from "@webiny/app/i18n";
/**
 * Package react-hotkeys does not have types.
 */
// @ts-expect-error
import { Hotkeys } from "react-hotkeyz";
import { validation } from "@webiny/validation";

const t = i18n.namespace("Forms.FormEditor.EditFieldOptionDialog");

interface EditFieldOptionDialogProps<T = any> {
    option: any;
    optionIndex: number;
    open: boolean;
    onClose: () => void;
    onSubmit: FormOnSubmit<T>;
    options: any[];
}

const EditFieldOptionDialog = (props: EditFieldOptionDialogProps) => {
    const { onClose, options, open, onSubmit, option, optionIndex } = props;

    if (!option) {
        return null;
    }

    return (
        <Hotkeys
            zIndex={115}
            keys={{
                esc(event: React.KeyboardEvent) {
                    event.preventDefault();
                    event.stopPropagation();
                    onClose();
                }
            }}
        >
            <Form data={option} onSubmit={onSubmit}>
                {({ Bind, submit }) => (
                    <Dialog
                        open={open}
                        onOpenChange={open => !open && onClose()}
                        title={t`Edit option`}
                        actions={
                            <>
                                <Dialog.CancelButton />
                                <Dialog.ConfirmButton onClick={submit} text={"Save"} />
                            </>
                        }
                    >
                        <Grid>
                            <Grid.Column span={12}>
                                <Bind name={"label"}>
                                    <Input size={"lg"} label={t`Label`} />
                                </Bind>
                            </Grid.Column>
                            <Grid.Column span={12}>
                                <Bind
                                    name={"value"}
                                    validators={(value: string) => {
                                        validation.validateSync(value, "required");
                                        if (Array.isArray(options) === false) {
                                            return true;
                                        }

                                        for (let key = 0; key < options.length; key++) {
                                            const current = options[key];
                                            if (current.value === value && key !== optionIndex) {
                                                throw new Error(
                                                    `Option with value "${value}" already exists.`
                                                );
                                            }
                                        }
                                        return true;
                                    }}
                                >
                                    <Input size={"lg"} label={t`Value`} />
                                </Bind>
                            </Grid.Column>
                        </Grid>
                    </Dialog>
                )}
            </Form>
        </Hotkeys>
    );
};

export default EditFieldOptionDialog;
