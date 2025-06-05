import React, { useMemo } from "react";
import { Heading, Icon, IconButton, Skeleton, Switch } from "@webiny/admin-ui";
import { ReactComponent as HomeIcon } from "@webiny/icons/home.svg";
import { ReactComponent as FolderIcon } from "@webiny/icons/folder.svg";
import { ReactComponent as MoreVerticalIcon } from "@webiny/icons/more_vert.svg";
import { useFileManagerView } from "~/modules/FileManagerRenderer/FileManagerViewProvider";
import { FolderProvider, useAcoConfig } from "@webiny/app-aco";
import { OptionsMenu } from "@webiny/app-admin";

export const Title = () => {
    const {
        isRootFolder,
        listTitle,
        displaySubFolders,
        setDisplaySubFolders,
        currentFolder,
        folders
    } = useFileManagerView();
    const { folder: folderConfig } = useAcoConfig();

    const icon = useMemo(() => {
        return isRootFolder ? <HomeIcon /> : <FolderIcon />;
    }, [isRootFolder]);

    return (
        <>
            {(listTitle && (
                <div className={"wby-flex wby-gap-xs wby-items-center"}>
                    <div className={"wby-flex wby-gap-sm wby-items-center wby-truncate"}>
                        <Icon icon={icon} label={listTitle} size={"md"} color={"neutral-strong"} />
                        <Heading level={4} as={"h1"} className={"wby-truncate"}>
                            {listTitle}
                        </Heading>
                    </div>
                    {currentFolder && (
                        <FolderProvider folder={currentFolder}>
                            <OptionsMenu
                                actions={folderConfig.actions}
                                data-testid={"folder.title.menu-action"}
                                trigger={
                                    <IconButton
                                        icon={<MoreVerticalIcon />}
                                        size={"sm"}
                                        iconSize={"lg"}
                                        variant={"ghost"}
                                        disabled={isRootFolder}
                                    />
                                }
                            />
                        </FolderProvider>
                    )}
                    <div className={"wby-flex wby-flex-nowrap"}>
                        <Switch
                            label={"Display subfolders"}
                            labelPosition={"end"}
                            onChange={setDisplaySubFolders}
                            checked={displaySubFolders}
                            disabled={folders.length === 0}
                        />
                    </div>
                </div>
            )) || <Skeleton size={"xl"} />}
        </>
    );
};
