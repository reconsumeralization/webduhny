import React, { useCallback, useMemo, useState } from "react";
import { useSnackbar } from "@webiny/app-admin";
import { Bind, GenericFormData } from "@webiny/form";
import { validation } from "@webiny/validation";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";
import { Typography } from "@webiny/ui/Typography";

import { Extensions, FolderTree } from "~/components";
import { ROOT_FOLDER } from "~/constants";
import { useDialogs } from "@webiny/app-admin";
import { DialogFoldersContainer } from "~/dialogs/styled";
import { useFolderModel, useUpdateFolder } from "~/features";
import { FolderItem } from "~/types";

interface ShowDialogParams {
    folder: FolderItem;
}

interface UseEditDialogResponse {
    showDialog: (params: ShowDialogParams) => void;
}

interface FormComponentProps {
    folder: FolderItem;
}

const FormComponent = ({ folder }: FormComponentProps) => {
    const folderModel = useFolderModel();
    const [parentId, setParentId] = useState<string | null>(folder.parentId);

    const extensionFields = useMemo(() => {
        const modelFields = folderModel?.fields || [];

        const fields = modelFields.find(field => field.fieldId === "extensions");
        if (!fields?.settings?.fields) {
            return [];
        }

        return fields?.settings?.fields || [];
    }, [folderModel]);

    return (
        <>
            <Grid>
                <Cell span={12}>
                    <Bind
                        name={"title"}
                        defaultValue={folder.title}
                        validators={[validation.create("required")]}
                    >
                        <Input label={"Title"} />
                    </Bind>
                </Cell>
                <Cell span={12}>
                    <Bind
                        name={"slug"}
                        defaultValue={folder.slug}
                        validators={[validation.create("required,slug")]}
                    >
                        <Input label={"Slug"} />
                    </Bind>
                </Cell>
                <Cell span={12}>
                    <Typography use="body1">{"Parent folder"}</Typography>
                    <DialogFoldersContainer>
                        <Bind name={"parentId"} defaultValue={parentId}>
                            {({ onChange }) => (
                                <FolderTree
                                    focusedFolderId={parentId || ROOT_FOLDER}
                                    hiddenFolderIds={[folder.id]}
                                    onFolderClick={folder => {
                                        setParentId(folder.id);
                                        onChange(folder.id === ROOT_FOLDER ? null : folder.id);
                                    }}
                                    enableCreate={true}
                                />
                            )}
                        </Bind>
                    </DialogFoldersContainer>
                </Cell>
            </Grid>
            {extensionFields.length > 0 && <Extensions model={folderModel} />}
        </>
    );
};

export const useEditDialog = (): UseEditDialogResponse => {
    const dialog = useDialogs();
    const { updateFolder } = useUpdateFolder();
    const { showSnackbar } = useSnackbar();

    const onAccept = useCallback(async (folder: FolderItem, data: GenericFormData) => {
        try {
            await updateFolder({
                ...folder,
                ...data
            });
            showSnackbar(`The folder "${data.title}" was updated successfully!`);
        } catch (error) {
            showSnackbar(error.message);
        }
    }, []);

    const showDialog = ({ folder }: ShowDialogParams) => {
        dialog.showDialog({
            title: "Edit folder",
            content: <FormComponent folder={folder} />,
            formData: folder,
            acceptLabel: "Edit folder",
            cancelLabel: "Cancel",
            loadingLabel: "Editing folder...",
            onAccept: (data: GenericFormData) => onAccept(folder, data)
        });
    };

    return {
        showDialog
    };
};
