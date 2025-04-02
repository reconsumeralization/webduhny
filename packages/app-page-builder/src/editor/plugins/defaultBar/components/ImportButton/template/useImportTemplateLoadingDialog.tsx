import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { i18n } from "@webiny/app/i18n";
import { useDialog } from "@webiny/app-admin/hooks/useDialog";
import { Icon, Text } from "@webiny/admin-ui";
import { ReactComponent as SuccessIcon } from "@webiny/icons/check_circle_outline.svg";
import { ReactComponent as ErrorIcon } from "@webiny/icons/error_outline.svg";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import ImportTemplatesDetails from "./useImportTemplatesDetails";
import ProgressBar from "../ProgressBar";
import { LoadingDialog } from "../styledComponents";
import {
    GET_TEMPLATE_IMPORT_EXPORT_TASK,
    LIST_TEMPLATE_IMPORT_EXPORT_SUB_TASKS,
    GetTemplateImportExportTaskResponse
} from "~/admin/graphql/templateImportExport.gql";
import { ImportExportTaskStatus } from "~/types";

const t = i18n.ns("app-page-builder/editor/plugins/defaultBar/importTemplate");

const importTemplateDialogTitle = t`Import templates`;

const completionMessage = t`All templates have been imported`;
const errorMessage = t`Failed to import templates`;
const pendingMessage = t`Waiting for operation status`;
const processingMessage = t`Importing templates`;

const INTERVAL = 0.5 * 1000;

const MESSAGES: Record<string, string> = {
    [ImportExportTaskStatus.COMPLETED]: completionMessage,
    [ImportExportTaskStatus.PROCESSING]: processingMessage,
    [ImportExportTaskStatus.PENDING]: pendingMessage
};

interface ImportTemplateLoadingDialogContentProps {
    taskId: string;
}
const ImportTemplateLoadingDialogContent = ({
    taskId
}: ImportTemplateLoadingDialogContentProps) => {
    const { showSnackbar } = useSnackbar();
    const [completed, setCompleted] = useState<boolean>(false);
    const [error, setError] = useState<Record<string, string> | null>(null);

    const { data } = useQuery<GetTemplateImportExportTaskResponse>(
        GET_TEMPLATE_IMPORT_EXPORT_TASK,
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

    const [getSubTasks, getSubTasksQuery] = useLazyQuery(LIST_TEMPLATE_IMPORT_EXPORT_SUB_TASKS, {
        variables: {
            id: taskId,
            status: "completed"
        }
    });

    const pollExportTemplateTaskStatus = useCallback(
        (response: GetTemplateImportExportTaskResponse) => {
            const { error, data } = response.pageBuilder.getImportExportTask || {};
            if (error) {
                return showSnackbar(error.message);
            }

            // Handler failed task
            if (data && data.status === "failed") {
                setCompleted(true);
                showSnackbar("Error: Failed to import templates");
                // TODO: @ashutosh show an informative dialog about error.
                setError(data.error);
            }

            if (data && data.status === "completed") {
                setCompleted(true);
                getSubTasks();
            }
        },
        []
    );

    // This component will remain as long as we stick to `/page-builder/templates` route.
    useEffect(() => {
        if (!data) {
            return;
        }
        pollExportTemplateTaskStatus(data);
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
                <ImportTemplatesDetails
                    loading={getSubTasksQuery.loading}
                    result={getSubTasksQuery.data}
                />
            </LoadingDialog.WrapperRight>
        </LoadingDialog.Wrapper>
    );
};

interface UseImportTemplateLoadingDialogCallableResponse {
    showImportTemplateLoadingDialog: (props: ImportTemplateLoadingDialogContentProps) => void;
}
const useImportTemplateLoadingDialog = (): UseImportTemplateLoadingDialogCallableResponse => {
    const { showDialog } = useDialog();

    return {
        showImportTemplateLoadingDialog: props => {
            showDialog(<ImportTemplateLoadingDialogContent {...props} />, {
                title: importTemplateDialogTitle,
                actions: {
                    accept: { label: t`Continue`, onClick: () => window.location.reload() }
                },
                dataTestId: "import-templates.loading-dialog"
            });
        }
    };
};

export default useImportTemplateLoadingDialog;
