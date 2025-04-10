import React from "react";
import { i18n } from "@webiny/app/i18n";
import { Alert, Grid, RadioGroup, Text } from "@webiny/admin-ui";
import { useDialog } from "@webiny/app-admin/hooks/useDialog";
import { Form } from "@webiny/form";
import { usePageBuilder } from "@webiny/app-page-builder/hooks/usePageBuilder";

const t = i18n.ns("app-form-builder/editor/plugins/defaultBar/exportFormButton");

interface ExportFormDialogMessageProps {
    selected: string[];
}

const ExportFormDialogMessage = ({ selected }: ExportFormDialogMessageProps) => {
    const { exportPageData } = usePageBuilder();
    const { revisionType: value, setRevisionType: setValue } = exportPageData;

    return (
        <>
            <Grid>
                <Grid.Column span={12}>
                    <Text
                        size={"md"}
                    >{t`Choose which revision of the form(s) you want to export:`}</Text>
                </Grid.Column>
                <Grid.Column span={12}>
                    <Form
                        data={{ revision: value }}
                        onChange={data => {
                            return setValue(data.revision);
                        }}
                    >
                        {({ Bind }) => (
                            <Bind name="revision">
                                <RadioGroup
                                    label="Revision selection"
                                    note={
                                        "Note: If there is no published revision of a form the latest revision will be exported."
                                    }
                                    items={[
                                        { value: "published", label: "Published" },
                                        {
                                            value: "latest",
                                            label: "Latest"
                                        }
                                    ]}
                                />
                            </Bind>
                        )}
                    </Form>
                </Grid.Column>
                <>
                    {selected.length === 0 && (
                        <Grid.Column span={12}>
                            <Alert title={t`Note`} type={"info"}>
                                {t`You're about to export all forms. This operation might take a few minutes to complete.`}
                            </Alert>
                        </Grid.Column>
                    )}
                </>
            </Grid>
        </>
    );
};

interface UseExportFormRevisionSelectorDialogShowParams {
    onAccept: () => void;
    selected: string[];
}
interface UseExportFormRevisionSelectorDialog {
    showExportFormRevisionSelectorDialog: (
        params: UseExportFormRevisionSelectorDialogShowParams
    ) => void;
    hideDialog: () => void;
}
const useExportFormRevisionSelectorDialog = (): UseExportFormRevisionSelectorDialog => {
    const { showDialog, hideDialog } = useDialog();

    return {
        showExportFormRevisionSelectorDialog: ({ onAccept, selected }) => {
            showDialog(<ExportFormDialogMessage selected={selected} />, {
                title: t`Select form revision`,
                actions: {
                    cancel: { label: t`Cancel` },
                    accept: {
                        label: t`Continue`,
                        onClick: () => {
                            // Give it sometime
                            setTimeout(onAccept, 500);
                        }
                    }
                },
                dataTestId: "export-forms.select-revision-type-dialog"
            });
        },
        hideDialog
    };
};

export default useExportFormRevisionSelectorDialog;
