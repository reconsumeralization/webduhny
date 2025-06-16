import React, { useCallback } from "react";
import { useActiveElement } from "~/editor/hooks/useActiveElement";

export const Background = () => {
    const [activeElement, setActiveElement] = useActiveElement();

    const deactivateElement = useCallback(() => {
        if (!activeElement) {
            return;
        }
        setActiveElement(null);
    }, [activeElement]);

    return (
        <div
            className={"wby-fixed wby-top-0 wby-left-0 wby-w-full wby-h-min-full"}
            onClick={deactivateElement}
        />
    );
};
