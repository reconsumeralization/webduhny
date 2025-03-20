import * as React from "react";
import { SingleImageUpload, SingleImageUploadProps } from "@webiny/app-admin";
import { AvatarImagePreview } from "./AvatarImagePreview";

const AvatarImage = (props: SingleImageUploadProps) => {
    console.log("props", props);

    return (
        <SingleImageUpload
            {...props}
            variant={"ghost"}
            type={"area"}
            renderFilePreview={({ onReplaceItem, onRemoveItem, value, disabled }) => {
                return (
                    <AvatarImagePreview
                        onReplaceItem={onReplaceItem}
                        onRemoveItem={onRemoveItem}
                        value={value}
                        disabled={disabled}
                        round={props.round}
                    />
                );
            }}
        />
    );
};

export default AvatarImage;
