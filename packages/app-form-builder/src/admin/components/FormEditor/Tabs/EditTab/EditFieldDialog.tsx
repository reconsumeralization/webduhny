import React, { useCallback, useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { Grid, Dialog, Drawer, Button, Tabs } from "@webiny/admin-ui";
import { Form, FormOnSubmit } from "@webiny/form";
import { plugins } from "@webiny/plugins";
import GeneralTab from "./EditFieldDialog/GeneralTab";
import ValidatorsTab from "./EditFieldDialog/ValidatorsTab";
import FieldTypeSelector from "./EditFieldDialog/FieldTypeSelector";
import { i18n } from "@webiny/app/i18n";
import { useFormEditor } from "../../Context";
import { FbBuilderFieldPlugin, FbFormModelField } from "~/types";

const t = i18n.namespace("FormEditor.EditFieldDialog");

interface SelectFieldDialogProps {
    currentField: FbFormModelField | null;
    open: boolean;
    onClose: () => void;
    onSelect: (field: FbFormModelField) => void;
}

const SelectFieldDialog = ({ currentField, open, onClose, onSelect }: SelectFieldDialogProps) => {
    if (!currentField) {
        return null;
    }

    return (
        <Dialog
            title={"Field settings"}
            open={open}
            onClose={onClose}
            actions={<Dialog.CancelButton />}
        >
            <Grid>
                {plugins
                    .byType<FbBuilderFieldPlugin>("form-editor-field-type")
                    .filter(pl => !pl.field.group)
                    .map(pl => (
                        <Grid.Column span={6} key={pl.name}>
                            <FieldTypeSelector
                                fieldType={pl.field}
                                onClick={() => {
                                    const newCurrent = pl.field.createField();
                                    if (currentField) {
                                        // User edited existing field, that's why we still want to
                                        // keep a couple of previous values.
                                        const { _id, label, fieldId, helpText } = currentField;
                                        newCurrent._id = _id;
                                        newCurrent.label = label;
                                        newCurrent.fieldId = fieldId;
                                        newCurrent.helpText = helpText;
                                    }
                                    onSelect(newCurrent);
                                }}
                            />
                        </Grid.Column>
                    ))}
            </Grid>
        </Dialog>
    );
};

interface EditFieldDrawerProps {
    open: boolean;
    onClose: () => void;
    onSubmit: FormOnSubmit;
    onBack: () => void;
    field: FbFormModelField;
    isNewField: boolean;
}

const EditFieldDrawer = ({
    field,
    isNewField,
    onBack,
    onClose,
    onSubmit,
    open
}: EditFieldDrawerProps) => {
    const { getFieldPlugin } = useFormEditor();

    const fieldPlugin = getFieldPlugin({
        name: field.name
    });

    let headerTitle = "Field Settings";
    let fieldPluginFieldValidators: string[] = [];
    if (fieldPlugin) {
        headerTitle = t`Field Settings - {fieldTypeLabel}`({
            fieldTypeLabel: fieldPlugin.field.label
        });
        fieldPluginFieldValidators = fieldPlugin.field.validators || [];
    }

    if (!field) {
        return null;
    }

    return (
        <Form data={field} onSubmit={onSubmit}>
            {form => (
                <Drawer
                    title={headerTitle}
                    open={open}
                    modal={true}
                    width={800}
                    bodyPadding={false}
                    footerSeparator={true}
                    onClose={onClose}
                    actions={
                        <>
                            <Drawer.CancelButton />
                            <Drawer.ConfirmButton onClick={form.submit} />
                        </>
                    }
                    info={
                        isNewField && <Button variant={"ghost"} text={"Go back"} onClick={onBack} />
                    }
                >
                    <Tabs
                        spacing={"lg"}
                        size={"md"}
                        separator={true}
                        tabs={[
                            <Tabs.Tab
                                trigger={t`General`}
                                value={"general"}
                                key={"general"}
                                content={<GeneralTab form={form} field={field} />}
                            />,
                            <Tabs.Tab
                                trigger={t`Validators`}
                                value={"validators"}
                                key={"validators"}
                                content={<ValidatorsTab form={form} field={field} />}
                                disabled={!fieldPluginFieldValidators.length}
                            />
                        ]}
                    />
                </Drawer>
            )}
        </Form>
    );
};

interface EditFieldDialogProps {
    field: FbFormModelField | null;
    onClose: () => void;
    onSubmit: FormOnSubmit;
}

const EditFieldDialog = ({ field, onSubmit, ...props }: EditFieldDialogProps) => {
    const [openFieldSelector, setOpenFieldSelector] = useState<boolean>(false);
    const [openFieldEditor, setOpenFieldEditor] = useState<boolean>(false);

    const [current, setCurrent] = useState<FbFormModelField | null>(null);
    const [isNewField, setIsNewField] = useState<boolean>(false);

    useEffect(() => {
        if (!field) {
            setCurrent(null);
            return;
        }
        setCurrent(cloneDeep(field));
        setIsNewField(!field._id);

        if (field.type) {
            setOpenFieldEditor(true);
        } else {
            setOpenFieldSelector(true);
        }
    }, [field]);

    const onFieldSelectorClose = useCallback(() => {
        setCurrent(null);
        props.onClose();
        setOpenFieldSelector(false);
    }, [setOpenFieldSelector]);

    const onFieldEditorClose = useCallback(() => {
        setCurrent(null);
        props.onClose();
        setOpenFieldEditor(false);
    }, [setOpenFieldEditor]);

    const onFieldEditorBack = useCallback(() => {
        setOpenFieldEditor(false);
        setOpenFieldSelector(true);
    }, [setOpenFieldEditor, setOpenFieldSelector]);

    return (
        <>
            <SelectFieldDialog
                currentField={current}
                open={openFieldSelector}
                onClose={onFieldSelectorClose}
                onSelect={field => {
                    setCurrent(field);
                    setOpenFieldSelector(false);
                    setOpenFieldEditor(true);
                }}
            />
            {current && (
                <EditFieldDrawer
                    isNewField={isNewField}
                    open={openFieldEditor}
                    field={current}
                    onBack={onFieldEditorBack}
                    onClose={onFieldEditorClose}
                    onSubmit={onSubmit}
                />
            )}
        </>
    );
};

export default EditFieldDialog;
