import React, { useMemo } from "react";
import { ConfirmationDialog } from "@webiny/ui/ConfirmationDialog";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as BeenHereIcon } from "@webiny/icons/beenhere.svg";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { ReactComponent as EditIcon } from "@webiny/icons/edit.svg";
import { ReactComponent as GestureIcon } from "@webiny/icons/gesture.svg";
import { ReactComponent as LockIcon } from "@webiny/icons/lock.svg";
import { ReactComponent as MoreVerticalIcon } from "@webiny/icons/more_vert.svg";
import { ReactComponent as PublishIcon } from "@webiny/icons/visibility.svg";
import { ReactComponent as UnpublishIcon } from "@webiny/icons/visibility_off.svg";
import { useRevision } from "./useRevision";
import { FbFormModel, FbRevisionModel } from "~/types";
import { usePermission } from "~/hooks/usePermission";
import { DropdownMenu, Icon, IconButton, List, TimeAgo, Tooltip } from "@webiny/admin-ui";

const getIcon = (revision: Pick<FbFormModel, "status">) => {
    switch (revision.status) {
        case "locked":
            return {
                icon: <Icon label={"Locked revision"} icon={<LockIcon />} />,
                text: "This revision is locked (it has already been published)"
            };
        case "published":
            return {
                icon: (
                    <Icon label={"Published revision"} icon={<BeenHereIcon />} color={"accent"} />
                ),
                text: "This revision is currently published!"
            };
        default:
            return {
                icon: <Icon label={"Draft revision"} icon={<GestureIcon />} />,
                text: "This is a draft"
            };
    }
};

interface RevisionProps {
    form: FbFormModel;
    revision: FbRevisionModel;
}

const Revision = (props: RevisionProps) => {
    const { revision, form } = props;
    const { icon, text: tooltipText } = getIcon(revision);
    const { publishRevision, createRevision, deleteRevision, editRevision, unpublishRevision } =
        useRevision({
            revision,
            form
        });
    const { canPublish, canUnpublish, canDelete, canUpdate } = usePermission();

    const showMenu = canUpdate(form) || canDelete(form) || canPublish() || canUnpublish();

    const description = useMemo(() => {
        return (
            <>
                Last modified <TimeAgo datetime={revision.savedOn} /> (#{revision.version})
            </>
        );
    }, [revision]);

    const actions = useMemo(() => {
        if (!showMenu) {
            return null;
        }

        return (
            <DropdownMenu
                trigger={
                    <IconButton
                        variant={"ghost"}
                        size={"sm"}
                        iconSize={"lg"}
                        icon={<MoreVerticalIcon />}
                    />
                }
            >
                {canUpdate(form) && (
                    <DropdownMenu.Item
                        icon={<AddIcon />}
                        text={"New from current"}
                        onClick={() => createRevision()}
                        data-testid={"fb.form-revisions.action-menu.create-revision"}
                    />
                )}

                {revision.status === "draft" && canUpdate(form) && (
                    <DropdownMenu.Item
                        icon={<EditIcon />}
                        text={"Edit"}
                        onClick={() => editRevision(revision.id)}
                        data-testid={"fb.form-revisions.action-menu.edit"}
                    />
                )}

                {revision.status !== "published" && canPublish() && (
                    <DropdownMenu.Item
                        icon={<PublishIcon />}
                        text={"Publish"}
                        onClick={() => publishRevision(revision.id)}
                        data-testid={"fb.form-revisions.action-menu.publish"}
                    />
                )}

                {revision.status === "published" && canUnpublish() && (
                    <ConfirmationDialog
                        title="Confirmation required!"
                        message={<span>Are you sure you want to unpublish this revision?</span>}
                    >
                        {({ showConfirmation }) => (
                            <DropdownMenu.Item
                                icon={<UnpublishIcon />}
                                text={"Unpublish"}
                                onClick={() =>
                                    showConfirmation(() => unpublishRevision(revision.id))
                                }
                                data-testid={"fb.form-revisions.action-menu.unpublish"}
                            />
                        )}
                    </ConfirmationDialog>
                )}

                {canDelete(form) && (
                    <>
                        <DropdownMenu.Separator />
                        <ConfirmationDialog
                            title="Confirmation required!"
                            message={<span>Are you sure you want to delete this revision?</span>}
                        >
                            {({ showConfirmation }) => (
                                <DropdownMenu.Item
                                    icon={<DeleteIcon />}
                                    text={"Delete"}
                                    onClick={() =>
                                        showConfirmation(() => deleteRevision(revision.id))
                                    }
                                    data-testid={"fb.form-revisions.action-menu.delete"}
                                    className={
                                        "!wby-text-destructive-primary [&_svg]:wby-fill-destructive"
                                    }
                                />
                            )}
                        </ConfirmationDialog>
                    </>
                )}
            </DropdownMenu>
        );
    }, [
        showMenu,
        canUpdate,
        canDelete,
        createRevision,
        editRevision,
        deleteRevision,
        publishRevision,
        unpublishRevision,
        revision,
        canPublish,
        canUnpublish,
        form
    ]);

    return (
        <List.Item
            icon={<Tooltip content={tooltipText} trigger={icon} />}
            title={revision.name}
            description={description}
            actions={actions}
        />
    );
};

export default Revision;
