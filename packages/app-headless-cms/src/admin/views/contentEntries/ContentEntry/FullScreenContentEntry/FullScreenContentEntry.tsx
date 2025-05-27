import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useContentEntry } from "~/admin/views/contentEntries/hooks";
import { RevisionListDrawer } from "./RevisionListDrawer";
import { FullScreenContentEntryHeaderLeft } from "./FullScreenContentEntryHeaderLeft";
import * as FSE from "./FullScreenContentEntry.styled";
import { FullScreenContentEntryProvider } from "./useFullScreenContentEntry";
import { ContentEntryEditorConfig } from "~/ContentEntryEditorConfig";
import { cmsLegacyEntryEditor } from "~/utils/cmsLegacyEntryEditor";
import { useContentEntryEditorConfig } from "~/admin/config/contentEntries";
import { HeaderBar, OverlayLoader } from "@webiny/admin-ui";

const { ContentEntry } = ContentEntryEditorConfig;

const FullScreenContentEntryDecorator = ContentEntry.createDecorator(Original => {
    return function ContentEntry() {
        const { width } = useContentEntryEditorConfig();
        const { loading } = useContentEntry();
        const [isRevisionListOpen, openRevisionList] = useState<boolean>(false);

        return (
            <FullScreenContentEntryProvider
                openRevisionList={openRevisionList}
                isRevisionListOpen={isRevisionListOpen}
            >
                <FSE.Container>
                    <HeaderBar
                        start={<FullScreenContentEntryHeaderLeft />}
                        end={
                            <div
                                // Empty div to relocate Entry Form Header via React Portal in full-screen mode.
                                // Ensures layout flexibility without disrupting React context and state.
                                id={"cms-content-entry-header-right"}
                            />
                        }
                    />
                    {loading && <OverlayLoader className={"wby-z-10"} />}
                    <FSE.Content>
                        <FSE.ContentFormWrapper>
                            <FSE.ContentFormInner width={width}>
                                <Original />
                            </FSE.ContentFormInner>
                        </FSE.ContentFormWrapper>
                    </FSE.Content>
                    <RevisionListDrawer />
                </FSE.Container>
            </FullScreenContentEntryProvider>
        );
    };
});

const FullScreenContentEntryFormDecorator = ContentEntry.ContentEntryForm.createDecorator(
    Original => {
        return function ContentEntryForm(props) {
            return <Original {...props} className={"wby-h-full"} />;
        };
    }
);

const FullScreenContentEntryFormHeaderDecorator =
    ContentEntry.ContentEntryForm.Header.createDecorator(Original => {
        return function ContentEntryFormHeader() {
            const headerRightElement = document.getElementById("cms-content-entry-header-right");

            if (!headerRightElement) {
                return <Original />;
            }

            return createPortal(<Original />, headerRightElement);
        };
    });

export const FullScreenContentEntry = () => {
    if (cmsLegacyEntryEditor) {
        return null;
    }

    return (
        <>
            <FullScreenContentEntryDecorator />
            <FullScreenContentEntryFormDecorator />
            <FullScreenContentEntryFormHeaderDecorator />
        </>
    );
};
