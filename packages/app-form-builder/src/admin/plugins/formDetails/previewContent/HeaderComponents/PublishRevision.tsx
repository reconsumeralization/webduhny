import React from "react";
import { ReactComponent as PublishIcon } from "@webiny/icons/visibility.svg";
import { ReactComponent as UnpublishIcon } from "@webiny/icons/visibility_off.svg";
import {
    PUBLISH_REVISION,
    PublishRevisionMutationResponse,
    PublishRevisionMutationVariables,
    UNPUBLISH_REVISION,
    UnpublishRevisionMutationResponse,
    UnpublishRevisionMutationVariable
} from "~/admin/graphql";
import { ConfirmationDialog } from "@webiny/ui/ConfirmationDialog";
import { useApolloClient } from "@apollo/react-hooks";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { FbRevisionModel } from "~/types";
import { usePermission } from "~/hooks/usePermission";
import { Button, Tooltip } from "@webiny/admin-ui";

interface PublishRevisionProps {
    revision: FbRevisionModel;
}

const PublishRevision = ({ revision }: PublishRevisionProps) => {
    const { showSnackbar } = useSnackbar();
    const client = useApolloClient();
    const { canPublish, canUnpublish } = usePermission();

    return (
        <>
            {revision.status !== "published" && canPublish() && (
                <Tooltip
                    content={"Publish"}
                    trigger={
                        <ConfirmationDialog
                            title={"Publish form"}
                            message={
                                "You are about to publish this form, are you sure want to continue?"
                            }
                            data-testid={"fb.form-preview.header.publish-dialog"}
                        >
                            {({ showConfirmation }) => (
                                <Button
                                    variant={"ghost"}
                                    size={"sm"}
                                    data-testid={"fb.form-preview.header.publish"}
                                    text={"Publish"}
                                    icon={<PublishIcon />}
                                    onClick={() =>
                                        showConfirmation(async () => {
                                            const { data: res } = await client.mutate<
                                                PublishRevisionMutationResponse,
                                                PublishRevisionMutationVariables
                                            >({
                                                mutation: PUBLISH_REVISION,
                                                variables: { revision: revision.id }
                                            });

                                            if (!res) {
                                                showSnackbar(
                                                    "Missing response data on Publish Revision Mutation."
                                                );
                                                return;
                                            }

                                            const { error } = res.formBuilder.publishRevision;
                                            if (error) {
                                                showSnackbar(error.message);
                                                return;
                                            }

                                            showSnackbar(
                                                <span>
                                                    Successfully published revision{" "}
                                                    <strong>#{revision.version}</strong>!
                                                </span>
                                            );
                                        })
                                    }
                                />
                            )}
                        </ConfirmationDialog>
                    }
                ></Tooltip>
            )}
            {revision.status === "published" && canUnpublish() && (
                <Tooltip
                    content={"Unpublish"}
                    trigger={
                        <ConfirmationDialog
                            title={"Un-publish form"}
                            message={
                                "You are about to unpublish this form, are you sure want to continue?"
                            }
                            data-testid={"fb.form-preview.header.unpublish-dialog"}
                        >
                            {({ showConfirmation }) => (
                                <Button
                                    variant={"ghost"}
                                    size={"sm"}
                                    data-testid={"fb.form-preview.header.unpublish"}
                                    text={"Unpublish"}
                                    icon={<UnpublishIcon />}
                                    onClick={() =>
                                        showConfirmation(async () => {
                                            const { data: res } = await client.mutate<
                                                UnpublishRevisionMutationResponse,
                                                UnpublishRevisionMutationVariable
                                            >({
                                                mutation: UNPUBLISH_REVISION,
                                                variables: { revision: revision.id }
                                            });
                                            if (!res) {
                                                showSnackbar(
                                                    "Missing response data on Unpublish Revision Mutation."
                                                );
                                                return;
                                            }

                                            const { error } = res.formBuilder.unpublishRevision;
                                            if (error) {
                                                showSnackbar(error.message);
                                                return;
                                            }

                                            showSnackbar(
                                                <span>
                                                    Successfully unpublished revision{" "}
                                                    <strong>#{revision.version}</strong>!
                                                </span>
                                            );
                                        })
                                    }
                                />
                            )}
                        </ConfirmationDialog>
                    }
                />
            )}
        </>
    );
};

export default PublishRevision;
