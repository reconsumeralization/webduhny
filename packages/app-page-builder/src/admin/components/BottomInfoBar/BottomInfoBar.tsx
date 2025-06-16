import React from "react";
import { ListMeta } from "./ListMeta";
import { Separator } from "@webiny/admin-ui";

interface BottomInfoBarProps {
    loading: boolean;
    totalCount: number;
    currentCount: number;
}

export const BottomInfoBar = (props: BottomInfoBarProps) => {
    return (
        <div className="wby-sticky wby-bottom-0 wby-z-5 wby-bg-neutral-base wby-w-full wby-transform wby-translate-z-0 wby-overflow-hidden">
            <Separator />
            <div className={"wby-h-xl wby-px-md wby-py-sm"}>
                <ListMeta
                    loading={props.loading}
                    totalCount={props.totalCount}
                    currentCount={props.currentCount}
                />
            </div>
        </div>
    );
};
