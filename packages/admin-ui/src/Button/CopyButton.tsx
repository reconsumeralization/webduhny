import React, { useCallback } from "react";
import { ReactComponent as CopyToClipboardIcon } from "@webiny/icons/content_copy.svg";
import { ButtonProps, Button } from "./Button";
import { makeDecoratable } from "../utils";

interface CopyButtonProps extends ButtonProps {
    /**
     * Value to copy to clipboard.
     */
    value: string;

    /**
     * Callback function that is executed after the value is copied to the clipboard.
     */
    onCopy?: () => void;
}

const CopyButtonBase = (props: CopyButtonProps) => {
    const { value, onCopy, ...rest } = props;

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(value);
        if (typeof onCopy === "function") {
            onCopy();
        }
    }, [value]);

    return <Button {...rest} onClick={copyToClipboard} icon={<CopyToClipboardIcon />} />;
};

const CopyButton = makeDecoratable("CopyButton", CopyButtonBase);

export { CopyButton, type CopyButtonProps };
