import React from "react";
import { Heading, Link, Separator, Text, Tooltip } from "@webiny/admin-ui";
import { i18n } from "@webiny/app/i18n";
import { FolderTree, useNavigateFolder } from "@webiny/app-aco";
import { useModel } from "~/admin/components/ModelProvider";
import { TrashBin } from "~/admin/components/ContentEntries/TrashBin/components/TrashBin";

const t = i18n.ns("app-headless-cms/admin/content-entries/table");

interface SidebarProps {
    folderId?: string;
}

export const Sidebar = ({ folderId }: SidebarProps) => {
    const { navigateToFolder } = useNavigateFolder();

    const { model } = useModel();

    return (
        <div className={"wby-h-full wby-relative"}>
            <div className={"wby-p-md wby-pl-lg"}>
                <Heading level={5}>{model.name}</Heading>
                <Text size={"sm"} className={"wby-text-neutral-muted"}>
                    Model ID:{" "}
                    {model.plugin ? (
                        <Tooltip
                            side={"top"}
                            content={t`Content model is registered via a plugin.`}
                            trigger={model.modelId}
                        />
                    ) : (
                        <Tooltip
                            content={t`Edit content model`}
                            side={"top"}
                            trigger={
                                <Link
                                    to={`/cms/content-models/${model.modelId}`}
                                    variant={"secondary"}
                                    className={
                                        "wby-text-neutral-muted hover:wby-text-neutral-strong"
                                    }
                                >
                                    {model.modelId}
                                </Link>
                            }
                        />
                    )}
                </Text>
            </div>
            <Separator variant={"subtle"} margin={"none"} />
            <div className={"wby-flex wby-flex-col wby-justify-between wby-h-full"}>
                <div className={"wby-px-sm-extra wby-py-sm"}>
                    <FolderTree
                        focusedFolderId={folderId}
                        onFolderClick={data => navigateToFolder(data.id)}
                        enableActions={true}
                        enableCreate={true}
                    />
                </div>
                <div
                    className={
                        "wby-absolute wby-bottom-0 wby-left-0 wby-right-0 wby-px-xs wby-py-sm"
                    }
                >
                    <TrashBin />
                </div>
            </div>
        </div>
    );
};
