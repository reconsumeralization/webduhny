import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Icon, Text } from "@webiny/admin-ui";
import { i18n } from "@webiny/app/i18n";
import { useDialog } from "@webiny/app-admin/hooks/useDialog";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { ReactComponent as SuccessIcon } from "@webiny/icons/check_circle_outline.svg";
import { ReactComponent as ErrorIcon } from "@webiny/icons/error_outline.svg";
import ProgressBar from "../ProgressBar";
import { LoadingDialog } from "../styledComponents";
import {
    GET_PAGES_IMPORT_TASK,
    GetPagesImportTaskResponse,
    GetPagesImportTaskResponseDataStats,
    GetPagesImportTaskVariables,
    LIST_IMPORTED_PAGES,
    ListImportedPagesResponse,
    ListImportedPagesVariables
} from "~/admin/graphql/pageImportExport.gql";
import { PbTaskStatus } from "~/admin/graphql/types";
import ImportPagesDetails from "./useImportPagesDetails";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/importPage");

const importPageDialogTitle = t`Import pages`;

const completionMessage = t`All pages have been imported`;
const errorMessage = t`Failed to import pages`;
const pendingMessage = t`Waiting for operation status`;
const processingMessage = t`Importing pages`;
const abortedMessage = t`Importing pages aborted`;

const INTERVAL = 1.5 * 1000;

const MESSAGES: Record<PbTaskStatus, string> = {
    [PbTaskStatus.success]: completionMessage,
    [PbTaskStatus.running]: processingMessage,
    [PbTaskStatus.pending]: pendingMessage,
    [PbTaskStatus.failed]: errorMessage,
    [PbTaskStatus.aborted]: abortedMessage
};

interface LoadingDialogStatsProps {
    stats: GetPagesImportTaskResponseDataStats;
}

const LoadingDialogStats = ({ stats }: LoadingDialogStatsProps) => {
    if (!stats.total) {
        return t`Waiting for the information about pages...`;
    }
    return t`{completed} of {total} completed`({
        completed: `${stats.completed}`,
        total: `${stats.total}`
    });
};

interface ImportPageLoadingDialogContentProps {
    taskId: string;
}
const ImportPageLoadingDialogContent = ({ taskId }: ImportPageLoadingDialogContentProps) => {
    const { showSnackbar } = useSnackbar();
    const [completed, setCompleted] = useState<boolean>(false);
    const [error, setError] = useState<Partial<Error> | null | undefined>(null);

    const { data } = useQuery<GetPagesImportTaskResponse, GetPagesImportTaskVariables>(
        GET_PAGES_IMPORT_TASK,
        {
            variables: {
                id: taskId
            },
            skip: taskId === null,
            fetchPolicy: "network-only",
            pollInterval: completed ? 0 : INTERVAL,
            notifyOnNetworkStatusChange: true
        }
    );

    const pollExportPageTaskStatus = useCallback((response: GetPagesImportTaskResponse) => {
        const { error, data } = response.pageBuilder.getImportPagesTask;
        if (error) {
            return showSnackbar(error.message);
        }

        // Handler failed task
        if (data?.status === "failed" || data?.data?.error) {
            setCompleted(true);
            showSnackbar("Error: Failed to import pages");
            // TODO: @ashutosh show an informative dialog about error.
            setError(data?.data?.error);
        }

        if (data?.status === "success") {
            setCompleted(true);
        }
    }, []);

    // This component will remain as long as we stick to `/page-builder/pages` route.
    useEffect(() => {
        if (!data) {
            return;
        }
        pollExportPageTaskStatus(data);
    }, [data]);

    const { status, stats } = data?.pageBuilder.getImportPagesTask.data || {
        status: "pending",
        stats: null
    };

    const skipListImportedPages = status !== PbTaskStatus.success || !taskId;
    const listImportedPages = useQuery<ListImportedPagesResponse, ListImportedPagesVariables>(
        LIST_IMPORTED_PAGES,
        {
            skip: skipListImportedPages,
            variables: {
                taskId
            }
        }
    );

    return (
        <LoadingDialog.Wrapper>
            <LoadingDialog.WrapperLeft>
                <LoadingDialog.UploadIllustration />
            </LoadingDialog.WrapperLeft>
            <LoadingDialog.WrapperRight>
                {error ? (
                    <LoadingDialog.TitleContainer>
                        <Icon
                            icon={<ErrorIcon />}
                            label="Error"
                            size={"md"}
                            className={"wby-fill-danger wby-mr-sm"}
                        />
                        <Text size={"md"}>{errorMessage}</Text>
                    </LoadingDialog.TitleContainer>
                ) : status === PbTaskStatus.success ? (
                    <LoadingDialog.TitleContainer>
                        <Icon
                            icon={<SuccessIcon />}
                            label="Success"
                            size={"md"}
                            className={"wby-fill-success wby-mr-sm"}
                        />
                        <Text size={"md"}>{MESSAGES[status]}</Text>
                    </LoadingDialog.TitleContainer>
                ) : (
                    <LoadingDialog.TitleContainer>
                        <LoadingDialog.Pulse>
                            <div className="inner" />
                        </LoadingDialog.Pulse>
                        <Text size={"md"}>{MESSAGES[status]}</Text>
                    </LoadingDialog.TitleContainer>
                )}

                <LoadingDialog.StatsContainer>
                    {error && (
                        <LoadingDialog.StatusContainer>
                            <Text size={"md"}>{t`Error`}</Text>
                            <Text size={"sm"}> {error.message}</Text>
                        </LoadingDialog.StatusContainer>
                    )}
                    {stats && (
                        <LoadingDialog.ProgressContainer>
                            <Text size={"sm"}>
                                <LoadingDialogStats stats={stats} />
                            </Text>
                            <ProgressBar
                                value={stats.completed}
                                max={stats.total}
                                color={"var(--mdc-theme-secondary)"}
                                width={"100%"}
                            />
                        </LoadingDialog.ProgressContainer>
                    )}
                </LoadingDialog.StatsContainer>
                {!skipListImportedPages && (
                    <ImportPagesDetails
                        loading={listImportedPages.loading}
                        result={listImportedPages.data}
                    />
                )}
            </LoadingDialog.WrapperRight>
        </LoadingDialog.Wrapper>
    );
};

interface UseImportPageLoadingDialogCallableResponse {
    showImportPageLoadingDialog: (props: ImportPageLoadingDialogContentProps) => void;
}
const useImportPageLoadingDialog = (): UseImportPageLoadingDialogCallableResponse => {
    const { showDialog } = useDialog();

    return {
        showImportPageLoadingDialog: props => {
            showDialog(<ImportPageLoadingDialogContent {...props} />, {
                title: importPageDialogTitle,
                actions: {
                    accept: {
                        label: t`Continue`,
                        onClick: () => {
                            window.location.reload();
                        }
                    }
                },
                onClose: () => {
                    window.location.reload();
                },
                dataTestId: "import-pages.loading-dialog"
            });
        }
    };
};

export default useImportPageLoadingDialog;
