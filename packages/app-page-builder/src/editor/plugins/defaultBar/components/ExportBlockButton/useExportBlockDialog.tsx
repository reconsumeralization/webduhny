import React, { useEffect } from "react";
import { i18n } from "@webiny/app/i18n";
import { useDialog } from "@webiny/app-admin/hooks/useDialog";
import { CopyButton, Button, Text, OverlayLoader, Grid, Heading, Tooltip } from "@webiny/admin-ui";
import { ReactComponent as FileDownloadIcon } from "@webiny/icons/file_download.svg";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import ExportBlockLoadingDialogContent from "./ExportBlockLoadingDialogContent";
import useExportBlock from "./useExportBlock";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/exportBlockButton");

interface ExportBlockLoadingDialogProps {
    ids?: string[];
    where?: Record<string, any>;
}

const ExportBlockLoadingDialogMessage = (props: ExportBlockLoadingDialogProps) => {
    const { exportBlock } = useExportBlock();

    useEffect(() => {
        exportBlock({ variables: { ...props } });
    }, []);

    return (
        <div className={"wby-relative wby-h-[180px]"}>
            <OverlayLoader text={t`Preparing your export...`} />
        </div>
    );
};

interface ExportBlockDialogProps {
    exportUrl: string;
}

const ExportBlockDialogMessage = ({ exportUrl }: ExportBlockDialogProps) => {
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
                        <Text size={"sm"} data-testid={"pb-blocks-export-dialog-export-url"}>
                            {exportUrl}
                        </Text>
                        <span className={"wby-absolute wby-top-0 wby-right-0"}>
                            <Tooltip
                                trigger={
                                    <CopyButton
                                        variant={"ghost"}
                                        data-testid={
                                            "export-blocks.export-ready-dialog.copy-button"
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

interface UseExportBlockDialog {
    showExportBlockContentDialog: (props: ExportBlockDialogProps) => void;
    showExportBlockLoadingDialog: (taskId: string) => void;
    showExportBlockInitializeDialog: (props: ExportBlockLoadingDialogProps) => void;
    hideDialog: () => void;
}

const useExportBlockDialog = (): UseExportBlockDialog => {
    const { showDialog, hideDialog } = useDialog();

    return {
        showExportBlockContentDialog: props => {
            showDialog(<ExportBlockDialogMessage {...props} />, {
                title: t`Your export is now ready!`,
                actions: {},
                dataTestId: "export-blocks.export-ready-dialog"
            });
        },
        showExportBlockLoadingDialog: taskId => {
            showDialog(<ExportBlockLoadingDialogContent taskId={taskId} />, {
                title: t`Preparing your export...`,
                actions: {},
                dataTestId: "export-blocks.loading-dialog"
            });
        },
        showExportBlockInitializeDialog: props => {
            showDialog(<ExportBlockLoadingDialogMessage {...props} />, {
                title: t`Preparing your export...`,
                actions: {},
                dataTestId: "export-blocks.initial-dialog"
            });
        },
        hideDialog
    };
};

export default useExportBlockDialog;
