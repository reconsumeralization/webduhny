import React from "react";
// @ts-expect-error
import { useHotkeys } from "react-hotkeyz";
import { DrawerContent } from "@webiny/ui/Drawer";
import { RevisionsList } from "~/admin/views/contentEntries/ContentEntry/RevisionsList/RevisionsList";
import { cmsLegacyEntryEditor } from "~/utils/cmsLegacyEntryEditor";
import { useFullScreenContentEntry } from "../useFullScreenContentEntry";
import { Header } from "./Header";
import { DrawerRight } from "@webiny/ui/Drawer";

export const RevisionListDrawer = () => {
    const { isRevisionListOpen, openRevisionList } = useFullScreenContentEntry();

    if (cmsLegacyEntryEditor) {
        return null;
    }

    useHotkeys({
        zIndex: 55,
        disabled: !isRevisionListOpen,
        keys: {
            esc: () => openRevisionList(false)
        }
    });

    return (
        <DrawerRight
            open={isRevisionListOpen}
            onClose={() => openRevisionList(false)}
            modal
            dismissible
            className={"wby-w-[1000px] wby-max-w-[100vw]"}
        >
            <DrawerContent>
                <Header onClose={() => openRevisionList(false)} />
                <RevisionsList />
            </DrawerContent>
        </DrawerRight>
    );
};
