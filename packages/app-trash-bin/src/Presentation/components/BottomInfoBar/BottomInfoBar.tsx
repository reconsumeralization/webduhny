import React from "react";
import { Separator } from "@webiny/admin-ui";
import { ListMeta } from "./ListMeta";
import { ListStatus } from "./ListStatus";
import { LoadingActions } from "~/types";
import { useTrashBin } from "~/Presentation/hooks";

export const BottomInfoBar = () => {
    const { vm } = useTrashBin();

    return (
        <div className="wby-sticky wby-bottom-0 wby-z-5 wby-bg-neutral-base wby-w-full wby-transform wby-translate-z-0 wby-overflow-hidden">
            <Separator margin={"none"} variant={"subtle"} />
            <div
                className={
                    "wby-h-xl wby-px-md wby-py-sm wby-flex wby-items-center wby-justify-between"
                }
            >
                <ListMeta
                    loading={vm.loading[LoadingActions.list]}
                    totalCount={vm.meta.totalCount}
                    currentCount={vm.items.length}
                />
                <ListStatus loading={vm.loading[LoadingActions.listMore]} />
            </div>
        </div>
    );
};
