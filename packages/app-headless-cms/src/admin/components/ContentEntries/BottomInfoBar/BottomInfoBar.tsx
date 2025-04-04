import React from "react";
import { Separator } from "@webiny/admin-ui";
import { ListMeta } from "./ListMeta";
import { ListStatus } from "./ListStatus";

interface BottomInfoBarProps {
    loading: boolean;
    loadingMore: boolean;
    totalCount: number;
    currentCount: number;
}

export const BottomInfoBar = (props: BottomInfoBarProps) => {
    return (
        <div className="wby-sticky wby-bottom-0 wby-z-5 wby-bg-neutral-base wby-w-full wby-transform wby-translate-z-0 wby-overflow-hidden">
            <Separator margin={"none"} variant={"subtle"} />
            <div
                className={
                    "wby-h-xl wby-px-md wby-py-sm wby-flex wby-items-center wby-justify-between"
                }
            >
                <ListMeta
                    loading={props.loading}
                    totalCount={props.totalCount}
                    currentCount={props.currentCount}
                />
                <ListStatus loading={props.loadingMore} />
            </div>
        </div>
    );
};
