import React, { useEffect } from "react";
import { i18n } from "@webiny/app/i18n";
import { CopyButton, Button, Text, OverlayLoader, Grid, Heading, Tooltip } from "@webiny/admin-ui";
import { ReactComponent as FileDownloadIcon } from "@webiny/icons/file_download.svg";
import { useDialog } from "@webiny/app-admin/hooks/useDialog";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { usePageBuilder } from "~/hooks/usePageBuilder";
import ExportPageLoadingDialogContent from "./ExportPageLoadingDialogContent";
import useExportPage from "./useExportPage";
import { PbListPagesWhereInput } from "~/admin/graphql/types";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/exportPageButton");

const createWhere = (where?: PbListPagesWhereInput, ids?: string[]) => {
    if (!ids?.length) {
        return where;
    }
    return {
        ...(where || {}),
        pid_in: ids
    };
};

export interface ExportPagesDialogProps {
    ids?: string[];
    where?: PbListPagesWhereInput;
    sort?: string;
    search?: { query: string };
}

const ExportPageLoadingDialogMessage = (props: ExportPagesDialogProps) => {
    const { exportPage } = useExportPage();
    const {
        exportPageData: { revisionType }
    } = usePageBuilder();

    const { ids, sort, ...variables } = props;

    useEffect(() => {
        exportPage({
            variables: {
                ...variables,
                where: createWhere(variables.where, ids),
                revisionType,
                sort: sort ? [sort] : undefined
            }
        });
    }, []);

    return (
        <div className={"wby-relative wby-h-[180px]"}>
            <OverlayLoader text={t`Preparing your export...`} />
        </div>
    );
};

interface ExportPageDialogProps {
    exportUrl: string;
}

const ExportPageDialogMessage = ({ exportUrl }: ExportPageDialogProps) => {
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
                        <Text size={"sm"} data-testid={"pb-pages-export-dialog-export-url"}>
                            {exportUrl}
                        </Text>
                        <span className={"wby-absolute wby-top-0 wby-right-0"}>
                            <Tooltip
                                trigger={
                                    <CopyButton
                                        variant={"ghost"}
                                        data-testid={"export-pages.export-ready-dialog.copy-button"}
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

interface UseExportPageDialog {
    showExportPageContentDialog: (props: ExportPageDialogProps) => void;
    showExportPageLoadingDialog: (taskId: string) => void;
    showExportPageInitializeDialog: (props: ExportPagesDialogProps) => void;
    hideDialog: () => void;
}

const useExportPageDialog = (): UseExportPageDialog => {
    const { showDialog, hideDialog } = useDialog();

    return {
        showExportPageContentDialog: props => {
            showDialog(<ExportPageDialogMessage {...props} />, {
                title: t`Your export is now ready!`,
                actions: {},
                dataTestId: "export-pages.export-ready-dialog"
            });
        },
        showExportPageLoadingDialog: taskId => {
            showDialog(<ExportPageLoadingDialogContent taskId={taskId} />, {
                title: t`Preparing your export...`,
                actions: {},
                dataTestId: "export-pages.loading-dialog"
            });
        },
        showExportPageInitializeDialog: props => {
            showDialog(<ExportPageLoadingDialogMessage {...props} />, {
                title: t`Preparing your export...`,
                actions: {},
                dataTestId: "export-pages.initial-dialog"
            });
        },
        hideDialog
    };
};

export default useExportPageDialog;
