import React from "react";
import { Button, cn, Heading, Text } from "@webiny/admin-ui";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as UploadIcon } from "@webiny/icons/cloud_upload.svg";

export interface FileDropAreaProps {
    empty?: boolean;
    onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
}

export const FileDropArea = ({ empty, onClick }: FileDropAreaProps) => {
    return (
        <div
            className={cn([
                "wby-w-full wby-h-full wby-p-lg wby-flex wby-items-center wby-justify-center",
                empty ? "wby-bg-neutral-base" : "wby-bg-neutral-base/90"
            ])}
        >
            <div
                style={{
                    width: "650px",
                    height: "400px",
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23E7E7E7FF' stroke-width='4' stroke-dasharray='12' stroke-dashoffset='35' stroke-linecap='square'/%3e%3c/svg%3e")`
                }}
                className={cn([
                    "-wby-translate-y-xl",
                    "wby-flex wby-flex-col wby-items-center wby-justify-center wby-gap-lg",
                    "wby-p-lg wby-rounded-3xl",
                    "wby-bg-transparent"
                ])}
            >
                <div
                    className={
                        "wby-flex wby-flex-col wby-items-center wby-justify-center wby-gap-sm"
                    }
                >
                    <div className={"wby-fill-neutral-strong"}>
                        <UploadIcon width={75} height={75} />
                    </div>
                    <div className={"wby-text-center"}>
                        <Heading level={4} className={"wby-text-neutral-strong"}>
                            {"Drag & Drop files here"}
                        </Heading>
                        {empty && (
                            <Text
                                as={"div"}
                                style={{
                                    width: "300px"
                                }}
                                className={"wby-text-neutral-strong"}
                            >
                                {
                                    "You can also upload files from your computer by clicking the button below"
                                }
                            </Text>
                        )}
                    </div>
                </div>
                {empty && (
                    <div>
                        <Button onClick={onClick} text={"Upload files"} icon={<AddIcon />} />
                    </div>
                )}
            </div>
        </div>
    );
};
