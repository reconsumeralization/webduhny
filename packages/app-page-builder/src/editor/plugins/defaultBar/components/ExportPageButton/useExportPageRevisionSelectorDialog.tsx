import React from "react";
import { Alert, Grid, RadioGroup, Text } from "@webiny/admin-ui";
import { i18n } from "@webiny/app/i18n";
import { useDialog } from "@webiny/app-admin/hooks/useDialog";
import { Form } from "@webiny/form";
import { usePageBuilder } from "~/hooks/usePageBuilder";
import { PbElementDataSettingsFormType } from "~/types";
import { PbRevisionType } from "~/contexts/PageBuilder";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/exportPageButton");

interface ExportPageDialogMessageProps {
    selected: string[];
}

const ExportPageDialogMessage = ({ selected }: ExportPageDialogMessageProps) => {
    const { exportPageData } = usePageBuilder();
    const { revisionType: value, setRevisionType: setValue } = exportPageData;

    return (
        <>
            <Grid>
                <Grid.Column span={12}>
                    <Text
                        size={"md"}
                    >{t`Choose which revision of the page(s) you want to export:`}</Text>
                </Grid.Column>
                <Grid.Column span={12}>
                    <Form
                        data={{ revision: value }}
                        onChange={data => {
                            const { revision } = data as unknown as PbElementDataSettingsFormType;
                            /**
                             * We expect revision to be string.
                             */
                            return setValue(revision as PbRevisionType);
                        }}
                    >
                        {({ Bind }) => (
                            <Bind name="revision">
                                <RadioGroup
                                    label="Revision selection"
                                    note={
                                        "Note: If there is no published revision of a page the latest revision will be exported."
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
                                {t`You're about to export all pages. This operation might take a few minutes to complete.`}
                            </Alert>
                        </Grid.Column>
                    )}
                </>
            </Grid>
        </>
    );
};

interface UseExportPageRevisionSelectorDialogShowParams {
    onAccept: () => void;
    selected: string[];
}

interface UseExportPageRevisionSelectorDialog {
    showExportPageRevisionSelectorDialog: (
        params: UseExportPageRevisionSelectorDialogShowParams
    ) => void;
    hideDialog: () => void;
}

const useExportPageRevisionSelectorDialog = (): UseExportPageRevisionSelectorDialog => {
    const { showDialog, hideDialog } = useDialog();

    return {
        showExportPageRevisionSelectorDialog: ({ onAccept, selected }) => {
            showDialog(<ExportPageDialogMessage selected={selected} />, {
                title: t`Select page revision`,
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
                dataTestId: "export-pages.select-revision-type-dialog"
            });
        },
        hideDialog
    };
};

export default useExportPageRevisionSelectorDialog;
