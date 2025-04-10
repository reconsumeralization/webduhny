import React from "react";
import { ReactComponent as BackIcon } from "@webiny/icons/arrow_back.svg";
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

export const ContentEntryFormMeta = makeDecoratable("ContentEntryFormMeta", () => {
    const { entry, contentModel } = useContentEntry();
    const status = entry.meta?.status ?? null;

    return (
        <EntryMeta>
            <Typography use="overline">
                {`Model: ${contentModel.name} ${status ? `(status: ${status})` : ""}`}
            </Typography>
        </EntryMeta>
    );
});

export const ContentEntryFormTitle = makeDecoratable("ContentEntryFormTitle", () => {
    const { entry, contentModel } = useContentEntry();

    const title = entry?.meta?.title || `New ${contentModel.name}`;
    const isNewEntry = !entry.meta?.title;
    const version = entry.meta?.version ?? null;

    return (
        <EntryTitle>
            <EntryName isNewEntry={isNewEntry}>{title}</EntryName>
            {version && <EntryVersion>{`(v${version})`}</EntryVersion>}
        </EntryTitle>
    );
});

export const FullScreenContentEntryHeaderLeft = () => {
    const { navigateToFolder, currentFolderId } = useNavigateFolder();

    return (
        <>
            <IconButton onClick={() => navigateToFolder(currentFolderId)} icon={<BackIcon />} />
            <TitleWrapper>
                <ContentEntryFormMeta />
                <ContentEntryFormTitle />
            </TitleWrapper>
        </>
    );
};
