import React, { useEffect } from "react";
import { i18n } from "@webiny/app/i18n";
import { CopyButton, Button, Text, OverlayLoader, Grid, Heading, Tooltip } from "@webiny/admin-ui";
import { ReactComponent as FileDownloadIcon } from "@webiny/icons/file_download.svg";
import { useDialog } from "@webiny/app-admin/hooks/useDialog";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { usePageBuilder } from "~/hooks/usePageBuilder";
import ExportTemplateLoadingDialogContent from "./ExportTemplateLoadingDialogContent";
import useExportTemplate from "./useExportTemplate";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/exportTemplateButton");

export interface ExportTemplatesDialogProps {
    ids?: string[];
    where?: Record<string, any>;
    sort?: string;
    search: { query: string };
}

const ExportTemplateLoadingDialogMessage = (props: ExportTemplatesDialogProps) => {
    const { exportTemplate } = useExportTemplate();
    const {
        exportPageData: { revisionType }
    } = usePageBuilder();

    useEffect(() => {
        exportTemplate({
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

interface ExportTemplateDialogProps {
    exportUrl: string;
}

const ExportTemplateDialogMessage = ({ exportUrl }: ExportTemplateDialogProps) => {
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
                        <Text size={"sm"} data-testid={"pb-templates-export-dialog-export-url"}>
                            {exportUrl}
                        </Text>
                        <span className={"wby-absolute wby-top-0 wby-right-0"}>
                            <Tooltip
                                trigger={
                                    <CopyButton
                                        variant={"ghost"}
                                        data-testid={
                                            "export-templates.export-ready-dialog.copy-button"
                                        }
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

interface UseExportTemplateDialog {
    showExportTemplateContentDialog: (props: ExportTemplateDialogProps) => void;
    showExportTemplateLoadingDialog: (taskId: string) => void;
    showExportTemplateInitializeDialog: (props: ExportTemplatesDialogProps) => void;
    hideDialog: () => void;
}

const useExportTemplateDialog = (): UseExportTemplateDialog => {
    const { showDialog, hideDialog } = useDialog();

    return {
        showExportTemplateContentDialog: props => {
            showDialog(<ExportTemplateDialogMessage {...props} />, {
                title: t`Your export is now ready!`,
                actions: {},
                dataTestId: "export-templates.export-ready-dialog"
            });
        },
        showExportTemplateLoadingDialog: taskId => {
            showDialog(<ExportTemplateLoadingDialogContent taskId={taskId} />, {
                title: t`Preparing your export...`,
                actions: {},
                dataTestId: "export-templates.loading-dialog"
            });
        },
        showExportTemplateInitializeDialog: props => {
            showDialog(<ExportTemplateLoadingDialogMessage {...props} />, {
                title: t`Preparing your export...`,
                actions: {},
                dataTestId: "export-templates.initial-dialog"
            });
        },
        hideDialog
    };
};

export default useExportTemplateDialog;
