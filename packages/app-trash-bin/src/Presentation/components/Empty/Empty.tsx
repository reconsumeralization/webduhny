import React from "react";
import { ReactComponent as SearchIcon } from "@webiny/icons/search.svg";
import { ReactComponent as TrashIcon } from "@webiny/icons/delete_forever.svg";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { useTrashBin } from "~/Presentation/hooks";

export const Empty = () => {
    const { vm } = useTrashBin();

    return (
        <div className={"wby-flex wby-items-center wby-justify-center wby-w-full wby-h-full"}>
            <div className={"wby-flex wby-items-center wby-flex-cols"}>
                {vm.isSearchView ? (
                    <EmptyView icon={<SearchIcon />} title={"No items found."} action={null} />
                ) : (
                    <EmptyView
                        icon={<TrashIcon />}
                        title={`Nothing found in the trash: items left in the trash are automatically deleted after ${vm.retentionPeriod}.`}
                        action={null}
                    />
                )}
            </div>
        </div>
    );
};
