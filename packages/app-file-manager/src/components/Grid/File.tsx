import React, { Fragment } from "react";
/**
 * Package react-lazy-load has no types.
 */
// @ts-expect-error
import LazyLoad from "react-lazy-load";
import { makeDecoratable } from "@webiny/app-admin";
import { TimeAgo } from "@webiny/ui/TimeAgo";
import { Typography } from "@webiny/ui/Typography";

import { ReactComponent as SelectedMarker } from "@webiny/icons/check_circle.svg";

import { FileItem } from "@webiny/app-admin/types";

import {
    FileBody,
    FileClickable,
    FileInfoIcon,
    FileControls,
    FileSelectedMarker,
    FileLabel,
    FilePreview,
    FileWrapper
} from "./styled";
import { useFileManagerViewConfig } from "~/modules/FileManagerRenderer/FileManagerView/FileManagerViewConfig";

export interface FileProps {
    file: FileItem;
    selected: boolean;
    fileBody?: JSX.Element;
    onSelect?: (event?: React.MouseEvent) => void;
    onClick?: (event?: React.MouseEvent) => void;
    multiple?: boolean;
    children: React.ReactNode;
}

export type DefaultFileBodyProps = Pick<FileProps, "selected" | "onSelect" | "children">;

const DefaultFileBody = ({ selected, onSelect, children }: DefaultFileBodyProps) => {
    const { browser } = useFileManagerViewConfig();

    const { itemActions } = browser.grid;

    return (
        <>
            <FileControls>
                <FileInfoIcon>
                    {itemActions.map(action => {
                        return <Fragment key={action.name}>{action.element}</Fragment>;
                    })}
                </FileInfoIcon>
                {onSelect ? (
                    <FileSelectedMarker className={selected ? "selected" : ""} onClick={onSelect}>
                        <div>
                            <SelectedMarker />
                        </div>
                    </FileSelectedMarker>
                ) : null}
            </FileControls>
            <LazyLoad height={200} offsetVertical={300}>
                <FilePreview
                    data-testid={"fm-file-wrapper-file-preview"}
                    className={selected ? "selected" : ""}
                >
                    <FileClickable />
                    {children}
                </FilePreview>
            </LazyLoad>
        </>
    );
};

export const File = makeDecoratable(
    "File",
    ({ file, fileBody, selected, onSelect, children }: FileProps) => {
        return (
            <FileWrapper data-testid={"fm-list-wrapper-file"} data-file-id={file.id}>
                <FileBody>
                    {fileBody ?? (
                        <DefaultFileBody selected={selected} onSelect={onSelect}>
                            {children}
                        </DefaultFileBody>
                    )}
                </FileBody>
                <FileLabel data-testid={"fm-file-wrapper-file-label"}>
                    <Typography className="type" use={"overline"} tag={"span"}>
                        {file.type}
                    </Typography>
                    <Typography className="name" use={"body2"} tag={"span"}>
                        {file.name}
                    </Typography>
                    <Typography className="createdOn" use={"caption"} tag={"span"}>
                        <TimeAgo datetime={file.createdOn} />
                    </Typography>
                </FileLabel>
            </FileWrapper>
        );
    }
);
