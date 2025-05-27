import React from "react";
import { CmsReferenceContentEntry } from "~/admin/plugins/fieldRenderers/ref/components/types";
import { ReactComponent as ViewIcon } from "@webiny/icons/open_in_new.svg";
import { IconButton, Link, Tooltip } from "@webiny/admin-ui";

const createEntryUrl = (entry: CmsReferenceContentEntry) => {
    const folderId = entry.wbyAco_location?.folderId || "";
    return `/cms/content-entries/${entry.model.modelId}?id=${
        entry.id
    }&folderId=${encodeURIComponent(folderId)}`;
};

interface ViewProps {
    entry: CmsReferenceContentEntry;
}
export const View = ({ entry }: ViewProps) => {
    return (
        <Tooltip
            content={"View"}
            side={"top"}
            trigger={
                <Link to={createEntryUrl(entry)} target="_blank" rel="noopener noreferrer">
                    <IconButton variant={"ghost"} size={"sm"} iconSize={"lg"} icon={<ViewIcon />} />
                </Link>
            }
        />
    );
};
