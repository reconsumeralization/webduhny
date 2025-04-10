import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { FileManager, SingleImageUploadProps } from "@webiny/app-admin";
import { ImageRenderer } from "@webiny/app-page-builder-elements/renderers/image";
import { ReactComponent as AddImageIcon } from "@webiny/icons/add_photo_alternate.svg";
import { Typography } from "@webiny/ui/Typography";
import { UpdateElementActionEvent } from "~/editor/recoil/actions";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler";
import { PbElement } from "~/types";

export const AddImageIconWrapper = styled("div")({
    color: "var(--mdc-theme-text-secondary-on-background)",
    ">svg": {
        width: "100%",
        height: "100%",
        maxWidth: 50,
        maxHeight: 50,
        display: "block",
        opacity: 0.5,
        margin: "0 auto"
    }
});

export const AddImageWrapper = styled("div")({
    width: "100%",
    height: "100%",
    minHeight: 50,
    minWidth: 50,
    textAlign: "center",
    backgroundColor: "var(--mdc-theme-on-background)",
    borderRadius: 0,
    borderBottom: "1px solid var(--mdc-theme-text-hint-on-background)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
    transition: "color 0.2s",
    cursor: "pointer",
    padding: 10,
    boxSizing: "border-box",
    "&:hover": {
        backgroundColor: "rgba(0,0,0, 0.5)",
        borderBottom: "1px solid var(--mdc-theme-on-surface)"
    }
});

const RenderBlank = (props: { onClick?: () => void }) => {
    return (
        <AddImageWrapper data-role={"select-image"} onClick={props.onClick}>
            <AddImageIconWrapper>
                <AddImageIcon />
                <Typography use={"caption"}>Select an image</Typography>
            </AddImageIconWrapper>
        </AddImageWrapper>
    );
};

const emptyLink = { href: "" };

interface PeImageProps {
    element: PbElement;
    [key: string]: any;
}

export const PeImage = ({ element, ...rest }: PeImageProps) => {
    const handler = useEventActionHandler();

    const id = element.id;

    const onChange = useCallback<NonNullable<SingleImageUploadProps["onChange"]>>(
        file => {
            const elementClone = structuredClone(element);
            if (file) {
                const { id, src } = file;
                elementClone.data.image = {
                    ...elementClone.data.image,
                    file: { id, src },
                    htmlTag: "auto"
                };
            }

            handler.trigger(
                new UpdateElementActionEvent({
                    element: elementClone,
                    history: true
                })
            );
        },
        [id]
    );

    return (
        <FileManager
            onChange={onChange}
            render={({ showFileManager }) => (
                <ImageRenderer
                    element={element}
                    onClick={showFileManager}
                    renderEmpty={<RenderBlank onClick={showFileManager} />}
                    // Even if the link might've been applied via the right sidebar, we still don't
                    // want to have it rendered in the editor. Because, otherwise, user wouldn't be
                    // able to click again on the component and bring back the file manager overlay.
                    link={emptyLink}
                    {...rest}
                />
            )}
        />
    );
};
