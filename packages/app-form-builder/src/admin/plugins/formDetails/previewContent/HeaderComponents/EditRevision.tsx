import React from "react";
import { useRouter } from "@webiny/react-router";
import { ReactComponent as EditIcon } from "@webiny/icons/edit.svg";
import { useRevision } from "../../formRevisions/useRevision";
import { usePermission } from "~/hooks/usePermission";
import { FbRevisionModel } from "~/types";
import { Button, Tooltip } from "@webiny/admin-ui";

interface EditRevisionProps {
    revision: FbRevisionModel;
    form: FbRevisionModel;
}
const EditRevision = ({ revision, form }: EditRevisionProps) => {
    const { createRevision } = useRevision({ revision, form });
    const { history } = useRouter();
    const { canUpdate } = usePermission();

    // Render nothing is user doesn't have required permission.
    if (!canUpdate(form)) {
        return null;
    }

    if (revision.status === "draft") {
        return (
            <Tooltip
                content={`Edit revision ${revision.version}`}
                trigger={
                    <Button
                        variant={"ghost"}
                        size={"sm"}
                        data-testid={"fb.form-preview.header.edit-revision"}
                        icon={<EditIcon />}
                        text={"Edit"}
                        onClick={() =>
                            history.push(`/form-builder/forms/${encodeURIComponent(revision.id)}`)
                        }
                    />
                }
            />
        );
    }

    return (
        <Tooltip
            content={`Create new revision from v${revision.version}`}
            trigger={
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    text={"New revision"}
                    data-testid={"fb.form-preview.header.create-revision"}
                    icon={<EditIcon />}
                    onClick={() => createRevision(revision.id)}
                />
            }
        />
    );
};

export default EditRevision;
