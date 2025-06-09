import React from "react";
import { cn, IconButton, ProgressBar, Text } from "@webiny/admin-ui";
import { i18n } from "@webiny/app/i18n";
import { ReactComponent as CloseIcon } from "@webiny/icons/close.svg";

const t = i18n.ns("app-admin/file-manager/components/upload-status");

export interface UploadStatusProps {
    progress: number;
    numberOfFiles: number;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

export const UploadStatus = ({
    numberOfFiles,
    progress = 0,
    isVisible,
    setIsVisible
}: UploadStatusProps) => {
    if (!numberOfFiles || !isVisible) {
        return null;
    }

    return (
        <div
            className={cn([
                "wby-p-md wby-rounded-lg",
                "wby-bg-neutral-dark wby-shadow-lg",
                "wby-absolute wby-bottom-xxl wby-left-2/4 -wby-translate-x-1/2 wby-z-10",
                "wby-flex wby-items-center wby-gap-sm-extra",
                "wby-animate-in wby-slide-in-from-top-4 wby-slide-in-from-left-1/2 wby-duration-500"
            ])}
        >
            <Text as={"div"} size={"sm"} className={"wby-text-neutral-disabled wby-shrink-0"}>
                {t`Uploading {numberOfFiles} {label}`({
                    numberOfFiles: `${numberOfFiles}`,
                    label: numberOfFiles === 1 ? t`file` : t`files`
                })}
            </Text>
            <div className={"wby-w-64"}>
                <ProgressBar
                    value={progress}
                    valuePosition={"end"}
                    className={"wby-text-neutral-light"}
                />
            </div>
            <IconButton
                onClick={() => setIsVisible(false)}
                icon={<CloseIcon />}
                variant={"ghost-negative"}
                size={"sm"}
            />
        </div>
    );
};
