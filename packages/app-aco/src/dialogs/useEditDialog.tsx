import React, { useCallback, useState } from "react";
import { Grid, Input } from "@webiny/admin-ui";
import { useSnackbar, useDialogs } from "@webiny/app-admin";
import { Bind, GenericFormData } from "@webiny/form";
import { validation } from "@webiny/validation";
import { FolderTree } from "~/components";
import { ROOT_FOLDER } from "~/constants";
import { useFolders } from "~/hooks";
import { FolderItem } from "~/types";
import { ParentFolderField } from "./ParentFolderField";

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
    const [parentId, setParentId] = useState<string | null>(folder.parentId);

    return (
        <Grid>
            <Grid.Column span={12}>
                <Bind
                    name={"title"}
                    defaultValue={folder.title}
                    validators={[validation.create("required")]}
                >
                    <Input label={"Title"} size={"lg"} required autoFocus />
                </Bind>
            </Grid.Column>
            <Grid.Column span={12}>
                <Bind
                    name={"slug"}
                    defaultValue={folder.slug}
                    validators={[validation.create("required,slug")]}
                >
                    <Input label={"Slug"} size={"lg"} required />
                </Bind>
            </Grid.Column>
            <Grid.Column span={12}>
                <ParentFolderField>
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
                </ParentFolderField>
            </Grid.Column>
        </Grid>
    );
};

export const useEditDialog = (): UseEditDialogResponse => {
    const dialog = useDialogs();
    const { updateFolder } = useFolders();
    const { showSnackbar } = useSnackbar();

    const onAccept = useCallback(async (folder: FolderItem, data: GenericFormData) => {
        try {
            const result = await updateFolder({
                ...folder,
                ...data
            });

            if (result) {
                showSnackbar(`The folder "${result.title}" was updated successfully!`);
            } else {
                throw new Error(`Error while updating folder "${folder.title}"!`);
            }
        } catch (error) {
            showSnackbar(error.message);
        }
    }, []);

    const showDialog = ({ folder }: ShowDialogParams) => {
        dialog.showDialog({
            title: "Edit folder",
            content: <FormComponent folder={folder} />,
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
