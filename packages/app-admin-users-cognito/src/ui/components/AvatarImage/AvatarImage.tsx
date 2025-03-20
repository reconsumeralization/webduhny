import * as React from "react";
import { SingleImageUpload, SingleImageUploadProps } from "@webiny/app-admin";
import { AvatarImagePreview } from "./AvatarImagePreview";
import { AvatarImageTrigger } from "~/ui/components/AvatarImage/AvatarImageTrigger";
import { cn } from "@webiny/admin-ui";

export const AvatarImage = ({ round, ...props }: SingleImageUploadProps) => {
    console.log("props", props);

    return (
        <div className={"wby-w-full wby-flex-1"}>
            <div
                className={cn([
                    "wby-size-[128px] wby-mx-auto wby-relative wby-overflow-hidden",
                    round && "wby-rounded-full"
                ])}
            >
                <SingleImageUpload
                    {...props}
                    className={"wby-p-0 !wby-border-none"}
                    variant={"ghost"}
                    type={"area"}
                    renderFilePreview={({ onReplaceItem, onRemoveItem, value, disabled }) => {
                        return (
                            <AvatarImagePreview
                                onReplaceItem={onReplaceItem}
                                onRemoveItem={onRemoveItem}
                                value={value}
                                disabled={disabled}
                            />
                        );
                    }}
                    renderTrigger={({ onSelectItem, disabled }) => {
                        return (
                            <AvatarImageTrigger disabled={disabled} onSelectItem={onSelectItem} />
                        );
                    }}
                />
            </div>
        </div>
    );
};
