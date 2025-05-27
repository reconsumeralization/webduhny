import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { useRouter } from "@webiny/react-router";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { ConfirmationDialog } from "@webiny/ui/ConfirmationDialog";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import * as queries from "../../../../graphql";
import { removeFormFromListCache } from "~/admin/views/cache";
import { usePermission } from "~/hooks/usePermission";
import { FbRevisionModel } from "~/types";
import { Button, Tooltip } from "@webiny/admin-ui";

interface DeleteRevisionProps {
    form: FbRevisionModel;
    revision: FbRevisionModel;
}
const DeleteForm = ({ form, revision }: DeleteRevisionProps) => {
    const { showSnackbar } = useSnackbar();
    const client = useApolloClient();
    const { history } = useRouter();
    const { canDelete } = usePermission();

    // Render nothing is user doesn't have required permission.
    if (!canDelete(form)) {
        return null;
    }

    const message = "You are about to delete this form. Are you sure want to continue?";

    return (
        <Tooltip
            content={"Delete"}
            trigger={
                <ConfirmationDialog
                    title={"Confirmation required!"}
                    message={message}
                    data-testid={"fb.form-preview.header.delete-dialog"}
                >
                    {({ showConfirmation }) => (
                        <Button
                            variant={"ghost"}
                            size={"sm"}
                            data-testid={"fb.form-preview.header.delete"}
                            text={"Delete"}
                            icon={<DeleteIcon />}
                            onClick={() =>
                                showConfirmation(async () => {
                                    await client.mutate({
                                        mutation: queries.DELETE_FORM,
                                        variables: { id: revision.id },
                                        update: (cache, { data }) => {
                                            const { error } = data.formBuilder.deleteForm;
                                            if (error) {
                                                showSnackbar(error.message);
                                                return;
                                            }

                                            showSnackbar(`Form was deleted successfully!`);

                                            removeFormFromListCache(cache, form);

                                            // Redirect
                                            history.push("/form-builder/forms");
                                            return;
                                        }
                                    });
                                })
                            }
                        />
                    )}
                </ConfirmationDialog>
            }
        ></Tooltip>
    );
};

export default DeleteForm;
