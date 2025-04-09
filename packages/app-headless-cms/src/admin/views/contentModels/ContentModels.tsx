import React, { useCallback, useMemo, useState } from "react";
import { CloneContentModelDialog } from "./CloneContentModelDialog";
import NewContentModelDialog from "./NewContentModelDialog";
import ContentModelsDataList from "./ContentModelsDataList";
import { useSecurity } from "@webiny/app-security";
import { CmsModel, CmsSecurityPermission } from "~/types";
import { ImportContentModelsDialog } from "./importing/ImportContentModelsDialog";
import { Grid } from "@webiny/admin-ui";

const ContentModels = () => {
    const [newContentModelDialogOpened, openNewContentModelDialog] = React.useState(false);

    const [cloneContentModel, setCloneContentModel] = React.useState<CmsModel | null>(null);

    const { identity, getPermission } = useSecurity();

    const canCreate = useMemo((): boolean => {
        const permission = getPermission<CmsSecurityPermission>("cms.contentModel");
        if (!permission) {
            return false;
        }

        if (typeof permission.rwd !== "string") {
            return true;
        }

        return permission.rwd.includes("w");
    }, [identity]);

    const closeCloneModal = useCallback(() => {
        setCloneContentModel(null);
    }, []);

    const onCreate = useCallback((): void => openNewContentModelDialog(true), []);
    const onClose = useCallback((): void => openNewContentModelDialog(false), []);
    const onClone = useCallback(
        (contentModel: CmsModel): void => setCloneContentModel(contentModel),
        []
    );
    const onCloneClose = useCallback((): void => setCloneContentModel(null), []);

    const [importModels, setImportModels] = useState(false);
    const showImportModelModal = useCallback(() => {
        setImportModels(true);
    }, []);
    const closeImportModelModal = useCallback(() => {
        setImportModels(false);
    }, []);

    return (
        <div
            style={{
                height: "calc(100vh - 45px)"
            }}
            className={"wby-container wby-pt-lg"}
        >
            <Grid className="wby-h-full">
                <Grid.Column span={10} offset={1}>
                    <div className="wby-h-full wby-border-sm wby-border-b-none wby-border-neutral-smoked wby-rounded-t-3xl">
                        <ContentModelsDataList
                            showImportModelModal={showImportModelModal}
                            canCreate={canCreate}
                            onCreate={onCreate}
                            onClone={onClone}
                        />
                    </div>
                </Grid.Column>
            </Grid>
            <NewContentModelDialog open={newContentModelDialogOpened} onClose={onClose} />
            {cloneContentModel && (
                <CloneContentModelDialog
                    contentModel={cloneContentModel}
                    onClose={onCloneClose}
                    closeModal={closeCloneModal}
                />
            )}
            {importModels && <ImportContentModelsDialog onClose={closeImportModelModal} />}
        </div>
    );
};

export default ContentModels;
