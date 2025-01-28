import React, { useCallback, useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import styled from "@emotion/styled";
import {
    Dialog,
    DialogActions,
    DialogButton,
    DialogCancel,
    DialogAccept,
    DialogContent,
    DialogTitle
} from "@webiny/ui/Dialog";
import { Form, FormOnSubmit } from "@webiny/form";
import { plugins } from "@webiny/plugins";
import { Tab, Tabs } from "@webiny/ui/Tabs";
import GeneralTab from "./EditFieldDialog/GeneralTab";
import ValidatorsTab from "./EditFieldDialog/ValidatorsTab";
import FieldTypeSelector from "./EditFieldDialog/FieldTypeSelector";
import { i18n } from "@webiny/app/i18n";
import { useFormEditor } from "../../Context";
import { FbBuilderFieldPlugin, FbFormModelField } from "~/types";

const t = i18n.namespace("FormEditor.EditFieldDialog");

const FbFormModelFieldList = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingTop: 25,
    backgroundColor: "var(--mdc-theme-background) !important"
});

interface EditFieldDialogProps {
    field: FbFormModelField | null;
    onClose: () => void;
    onSubmit: FormOnSubmit;
}

const EditFieldDialog = ({ field, onSubmit, ...props }: EditFieldDialogProps) => {
    const [current, setCurrent] = useState<FbFormModelField | null>(null);
    const [isNewField, setIsNewField] = useState<boolean>(false);
    const [screen, setScreen] = useState<string>();

    const { getFieldPlugin } = useFormEditor();

    useEffect(() => {
        if (!field) {
            setCurrent(null);
            return;
        }
        setCurrent(cloneDeep(field));
        setIsNewField(!field._id);
        setScreen(field.type ? "fieldOptions" : "fieldType");
    }, [field]);

    const onClose = useCallback(() => {
        setCurrent(null);
        props.onClose();
    }, []);

    let render = null;
    let headerTitle = t`Field Settings`;

    if (current) {
        const fieldPlugin = getFieldPlugin({
            name: current.name
        });
        let fieldPluginFieldValidators: string[] = [];
        if (fieldPlugin) {
            headerTitle = t`Field Settings - {fieldTypeLabel}`({
                fieldTypeLabel: fieldPlugin.field.label
            });
            fieldPluginFieldValidators = fieldPlugin.field.validators || [];
        }

        switch (screen) {
            case "fieldOptions": {
                render = (
                    <Form data={current} onSubmit={onSubmit}>
                        {form => (
                            <>
                                <DialogContent>
                                    <Tabs>
                                        <Tab label={t`General`}>
                                            <GeneralTab form={form} field={current} />
                                        </Tab>
                                        {fieldPluginFieldValidators.length > 0 && (
                                            <Tab label={"Validators"}>
                                                <ValidatorsTab form={form} field={current} />
                                            </Tab>
                                        )}
                                    </Tabs>
                                </DialogContent>
                                <DialogActions>
                                    {isNewField && (
                                        <DialogButton
                                            onClick={() => setScreen("fieldType")}
                                        >{t`Go back`}</DialogButton>
                                    )}
                                    <DialogButton onClick={onClose}>{t`Cancel`}</DialogButton>
                                    <DialogAccept onClick={form.submit}>{t`Save`}</DialogAccept>
                                </DialogActions>
                            </>
                        )}
                    </Form>
                );
                break;
            }
            default:
                render = (
                    <>
                        <DialogContent>
                            <FbFormModelFieldList>
                                {plugins
                                    .byType<FbBuilderFieldPlugin>("form-editor-field-type")
                                    .filter(pl => !pl.field.group)
                                    .map(pl => (
                                        <FieldTypeSelector
                                            key={pl.name}
                                            fieldType={pl.field}
                                            onClick={() => {
                                                const newCurrent = pl.field.createField();
                                                if (current) {
                                                    // User edited existing field, that's why we still want to
                                                    // keep a couple of previous values.
                                                    const { _id, label, fieldId, helpText } =
                                                        current;
                                                    newCurrent._id = _id;
                                                    newCurrent.label = label;
                                                    newCurrent.fieldId = fieldId;
                                                    newCurrent.helpText = helpText;
                                                }
                                                setCurrent(newCurrent);
                                                setScreen("fieldOptions");
                                            }}
                                        />
                                    ))}
                            </FbFormModelFieldList>
                        </DialogContent>
                        <DialogActions>
                            <DialogCancel onClick={onClose}>{t`Cancel`}</DialogCancel>
                        </DialogActions>
                    </>
                );
        }
    }

    return (
        <Dialog preventOutsideDismiss={true} open={!!current} onClose={onClose}>
            <DialogTitle>{headerTitle}</DialogTitle>
            {render}
        </Dialog>
    );
};

export default EditFieldDialog;
