import React, { useEffect } from "react";
import { i18n } from "@webiny/app/i18n";
import { CopyButton, Button, Text, OverlayLoader, Grid, Heading, Tooltip } from "@webiny/admin-ui";
import { ReactComponent as FileDownloadIcon } from "@webiny/icons/file_download.svg";
import { useDialog } from "@webiny/app-admin/hooks/useDialog";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { usePageBuilder } from "@webiny/app-page-builder/hooks/usePageBuilder";
import ExportFormLoadingDialogContent from "./ExportFormLoadingDialogContent";
import useExportForm from "./useExportForm";

const t = i18n.ns("app-form-builder/editor/plugins/defaultBar/exportFormButton");

export interface ExportFormsDialogProps {
    ids?: string[];
    where?: Record<string, any>;
    sort?: string;
    search?: { query: string };
}

const ExportFormLoadingDialogMessage = (props: ExportFormsDialogProps) => {
    const { exportForm } = useExportForm();
    const {
        exportPageData: { revisionType }
    } = usePageBuilder();

    useEffect(() => {
        exportForm({
            variables: {
                revisionType,
                ...props
            }
        });
    }, []);

    return (
        <div className={"wby-relative wby-h-[180px]"}>
            <OverlayLoader text={t`Preparing your export...`} />
        </div>
    );
};

interface ExportFormDialogProps {
    exportUrl: string;
}

const ExportFormDialogMessage = ({ exportUrl }: ExportFormDialogProps) => {
    const { showSnackbar } = useSnackbar();

    return (
        <div className={"wby-pb-lg"}>
            <Grid>
                <Grid.Column span={12}>
                    <Heading level={6} className={"wby-mb-md"}>{t`Copy the export URL:`}</Heading>
                    <div
                        className={
                            "wby-rounded-lg wby-bg-neutral-dimmed wby-p-sm wby-overflow-hidden wby-relative"
                        }
                    >
                        <Text size={"sm"} data-testid={"fb-forms-export-dialog-export-url"}>
                            {exportUrl}
                        </Text>
                        <span className={"wby-absolute wby-top-0 wby-right-0"}>
                            <Tooltip
                                trigger={
                                    <CopyButton
                                        variant={"ghost"}
                                        data-testid={"export-forms.export-ready-dialog.copy-button"}
                                        value={exportUrl}
                                        onCopy={() => showSnackbar("Successfully copied!")}
                                    />
                                }
                                content={"Copy the export URL"}
                            />
                        </span>
                    </div>
                </Grid.Column>
            </Grid>
            <Grid className={"wby-mt-lg"}>
                <Grid.Column span={12}>
                    <Heading
                        level={6}
                        className={"wby-mb-md"}
                    >{t`Or download the ZIP archive:`}</Heading>
                    <Button
                        variant={"primary"}
                        text={"Download"}
                        icon={<FileDownloadIcon />}
                        onClick={() => {
                            // Download the ZIP
                            window.open(exportUrl, "_blank", "noopener");
                        }}
                    />
                </Grid.Column>
            </Grid>
        </div>
    );
};

interface UseExportFormDialog {
    showExportFormContentDialog: (props: ExportFormDialogProps) => void;
    showExportFormLoadingDialog: (taskId: string) => void;
    showExportFormInitializeDialog: (props: ExportFormsDialogProps) => void;
    hideDialog: () => void;
}

const useExportFormDialog = (): UseExportFormDialog => {
    const { showDialog, hideDialog } = useDialog();

    return {
        showExportFormContentDialog: props => {
            showDialog(<ExportFormDialogMessage {...props} />, {
                title: t`Your export is now ready!`,
                actions: {},
                dataTestId: "export-forms.export-ready-dialog"
            });
        },
        showExportFormLoadingDialog: taskId => {
            showDialog(<ExportFormLoadingDialogContent taskId={taskId} />, {
                title: t`Preparing your export...`,
                actions: {},
                dataTestId: "export-forms.loading-dialog"
            });
        },
        showExportFormInitializeDialog: props => {
            showDialog(<ExportFormLoadingDialogMessage {...props} />, {
                title: t`Preparing your export...`,
                actions: {},
                dataTestId: "export-forms.initial-dialog"
            });
        },
        hideDialog
    };
};

export default useExportFormDialog;
