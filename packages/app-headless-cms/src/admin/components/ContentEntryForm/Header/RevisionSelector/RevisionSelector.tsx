import React from "react";
import get from "lodash/get";
import { useRouter } from "@webiny/react-router";
import { Button, DropdownMenu, Text } from "@webiny/admin-ui";
import { ReactComponent as DownButton } from "@webiny/icons/keyboard_arrow_down.svg";
import { useContentEntry } from "~/admin/views/contentEntries/hooks/useContentEntry";
import { statuses as statusLabels } from "~/admin/constants";
import { CmsContentEntryRevision } from "~/types";

interface CmsEntryRevision extends Pick<CmsContentEntryRevision, "id"> {
    meta: Pick<CmsContentEntryRevision["meta"], "version" | "status">;
}

const defaultRevisions: CmsEntryRevision[] = [
    {
        id: "new",
        meta: {
            version: 1,
            status: "draft"
        }
    }
];

export const RevisionSelector = () => {
    const { entry, revisions, loading } = useContentEntry();
    const { location, history } = useRouter();
    const query = new URLSearchParams(location.search);

    const currentRevision = {
        version: get(entry, "meta.version", 1) as number,
        status: get(entry, "meta.status", "draft") as CmsContentEntryRevision["meta"]["status"]
    };

    const allRevisions = revisions.length ? revisions : defaultRevisions;

    return (
        <DropdownMenu
            trigger={
                <Button
                    variant={"secondary"}
                    disabled={loading}
                    icon={<DownButton />}
                    iconPosition={"end"}
                    text={
                        <>
                            v{currentRevision.version} ({statusLabels[currentRevision.status]})
                        </>
                    }
                />
            }
        >
            {allRevisions.map(revision => (
                <DropdownMenu.Item
                    key={revision.id}
                    onClick={() => {
                        query.set("id", encodeURIComponent(revision.id));
                        history.push({ search: query.toString() });
                    }}
                    text={
                        <>
                            <Text as={"div"}>v{revision.meta.version}</Text>
                            <Text size={"sm"}>({statusLabels[revision.meta.status]})</Text>
                        </>
                    }
                />
            ))}
        </DropdownMenu>
    );
};
