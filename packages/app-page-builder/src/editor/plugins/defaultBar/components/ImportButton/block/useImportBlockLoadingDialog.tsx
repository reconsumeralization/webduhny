import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { i18n } from "@webiny/app/i18n";
import { useDialog } from "@webiny/app-admin/hooks/useDialog";
import { Icon, Text } from "@webiny/admin-ui";
import { ReactComponent as SuccessIcon } from "@webiny/icons/check_circle_outline.svg";
import { ReactComponent as ErrorIcon } from "@webiny/icons/error_outline.svg";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import ImportBlocksDetails from "./useImportBlocksDetails";
import ProgressBar from "../ProgressBar";
import { LoadingDialog } from "../styledComponents";
import {
    GET_BLOCK_IMPORT_EXPORT_TASK,
    LIST_BLOCK_IMPORT_EXPORT_SUB_TASKS,
    GetBlockImportExportTaskResponse
} from "~/admin/graphql/blockImportExport.gql";
import { ImportExportTaskStatus } from "~/types";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/importBlock");

const importBlockDialogTitle = t`Import blocks`;

const completionMessage = t`All blocks have been imported`;
const errorMessage = t`Failed to import blocks`;
const pendingMessage = t`Waiting for operation status`;
const processingMessage = t`Importing blocks`;

const INTERVAL = 0.5 * 1000;

const MESSAGES: Record<string, string> = {
    [ImportExportTaskStatus.COMPLETED]: completionMessage,
    [ImportExportTaskStatus.PROCESSING]: processingMessage,
    [ImportExportTaskStatus.PENDING]: pendingMessage
};

interface ImportBlockLoadingDialogContentProps {
    taskId: string;
}
const ImportBlockLoadingDialogContent = ({ taskId }: ImportBlockLoadingDialogContentProps) => {
    const { showSnackbar } = useSnackbar();
    const [completed, setCompleted] = useState<boolean>(false);
    const [error, setError] = useState<Record<string, string> | null>(null);

    const { data } = useQuery<GetBlockImportExportTaskResponse>(GET_BLOCK_IMPORT_EXPORT_TASK, {
        variables: {
            id: taskId
        },
        skip: taskId === null,
        fetchPolicy: "network-only",
        pollInterval: completed ? 0 : INTERVAL,
        notifyOnNetworkStatusChange: true
    });

    const [getSubTasks, getSubTasksQuery] = useLazyQuery(LIST_BLOCK_IMPORT_EXPORT_SUB_TASKS, {
        variables: {
            id: taskId,
            status: "completed"
        }
    });

    const pollExportBlockTaskStatus = useCallback((response: GetBlockImportExportTaskResponse) => {
        const { error, data } = response.pageBuilder.getImportExportTask || {};
        if (error) {
            return showSnackbar(error.message);
        }

        // Handler failed task
        if (data && data.status === "failed") {
            setCompleted(true);
            showSnackbar("Error: Failed to import blocks");
            setError(data.error);
        }

        if (data && data.status === "completed") {
            setCompleted(true);
            getSubTasks();
        }
    }, []);

    useEffect(() => {
        if (!data) {
            return;
        }
        pollExportBlockTaskStatus(data);
    }, [data]);

    const { status, stats } = data?.pageBuilder.getImportExportTask.data || {
        status: "pending",
        stats: null
    };

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
                ) : status === "completed" ? (
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
                                {t`{completed} of {total} completed`({
                                    completed: `${stats.completed}`,
                                    total: `${stats.total}`
                                })}
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
                <ImportBlocksDetails
                    loading={getSubTasksQuery.loading}
                    result={getSubTasksQuery.data}
                />
            </LoadingDialog.WrapperRight>
        </LoadingDialog.Wrapper>
    );
};

interface UseImportBlockLoadingDialogCallableResponse {
    showImportBlockLoadingDialog: (props: ImportBlockLoadingDialogContentProps) => void;
}
const useImportBlockLoadingDialog = (): UseImportBlockLoadingDialogCallableResponse => {
    const { showDialog } = useDialog();

    return {
        showImportBlockLoadingDialog: props => {
            showDialog(<ImportBlockLoadingDialogContent {...props} />, {
                title: importBlockDialogTitle,
                actions: {
                    accept: { label: t`Continue`, onClick: () => window.location.reload() }
                },
                dataTestId: "import-blocks.loading-dialog"
            });
        }
    };
};

export default useImportBlockLoadingDialog;
