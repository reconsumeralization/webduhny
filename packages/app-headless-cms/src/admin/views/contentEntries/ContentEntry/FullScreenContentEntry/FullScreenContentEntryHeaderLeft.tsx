import React from "react";
import { ReactComponent as BackIcon } from "@material-design-icons/svg/round/arrow_back.svg";
import { useNavigateFolder } from "@webiny/app-aco";
import { makeDecoratable } from "@webiny/react-composition";
import { IconButton } from "@webiny/ui/Button";
import { Typography } from "@webiny/ui/Typography";
import { useContentEntry } from "~/admin/views/contentEntries/hooks";
import {
    EntryMeta,
    EntryTitle,
    EntryVersion,
    TitleWrapper,
    EntryName
} from "./FullScreenContentEntry.styled";
import { CmsContentEntryStatusType, CmsModel } from "@webiny/app-headless-cms-common/types";

export interface ContentEntryFormMetaProps {
    model: CmsModel;
    status: CmsContentEntryStatusType;
}

export const ContentEntryFormMeta = makeDecoratable(
    "ContentEntryFormMeta",
    ({ model, status }: ContentEntryFormMetaProps) => {
        return (
            <EntryMeta>
                <Typography use="overline">
                    {`Model: ${model.name} ${status ? `(status: ${status})` : ""}`}
                </Typography>
            </EntryMeta>
        );
    }
);

export interface ContentEntryFormTitleProps {
    title: string;
    version: number;
    newEntry: boolean;
}

export const ContentEntryFormTitle = makeDecoratable(
    "ContentEntryFormTitle",
    ({ newEntry, title, version }: ContentEntryFormTitleProps) => {
        return (
            <EntryTitle>
                <EntryName isNewEntry={newEntry}>{title}</EntryName>
                {version && <EntryVersion>{`(v${version})`}</EntryVersion>}
            </EntryTitle>
        );
    }
);

export const FullScreenContentEntryHeaderLeft = () => {
    const { entry, contentModel } = useContentEntry();
    const { navigateToFolder, currentFolderId } = useNavigateFolder();

    const title = entry?.meta?.title || `New ${contentModel.name}`;
    const isNewEntry = !entry.meta?.title;
    const version = entry.meta?.version ?? null;
    const status = entry.meta?.status ?? null;

    return (
        <>
            <IconButton onClick={() => navigateToFolder(currentFolderId)} icon={<BackIcon />} />
            <TitleWrapper>
                <ContentEntryFormMeta status={status} model={contentModel} />
                <ContentEntryFormTitle newEntry={isNewEntry} title={title} version={version} />
            </TitleWrapper>
        </>
    );
};
