import React, { useMemo } from "react";
import { Heading, Icon, Skeleton } from "@webiny/admin-ui";
import { ReactComponent as HomeIcon } from "@webiny/icons/home.svg";
import { ReactComponent as FolderIcon } from "@webiny/icons/folder.svg";
import { useFileManagerView } from "~/modules/FileManagerRenderer/FileManagerViewProvider";

export const Title = () => {
    const { isRootFolder, listTitle } = useFileManagerView();

    const icon = useMemo(() => {
        return isRootFolder ? <HomeIcon /> : <FolderIcon />;
    }, [isRootFolder]);

    return (
        <>
            {(listTitle && (
                <div className={"wby-flex wby-gap-sm wby-items-center"}>
                    <Icon icon={icon} label={listTitle} size={"md"} color={"neutral-strong"} />
                    <Heading level={4} as={"h1"} className={"wby-truncate"}>
                        {listTitle}
                    </Heading>
                </div>
            )) || <Skeleton size={"xl"} />}
        </>
    );
};
