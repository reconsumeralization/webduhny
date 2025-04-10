import React, { useMemo } from "react";
import { Text, IconButton, Button } from "@webiny/admin-ui";
import { ReactComponent as Close } from "@webiny/icons/close.svg";
import { Buttons } from "@webiny/app-admin";
import { useTrashBinListConfig } from "~/Presentation/configs";
import { useTrashBin } from "~/Presentation/hooks";

export const getEntriesLabel = (count: number, isSelectedAll: boolean): string => {
    if (isSelectedAll) {
        return "all entries";
    }

    return `${count} ${count === 1 ? "item" : "items"}`;
};

export const BulkActions = () => {
    const { browser } = useTrashBinListConfig();
    const { vm, selectItems, selectAllItems, unselectAllItems } = useTrashBin();

    const headline = useMemo((): string => {
        if (vm.isSelectedAll) {
            return "All items selected";
        }

        return getEntriesLabel(vm.selectedItems.length, vm.isSelectedAll) + ` selected`;
    }, [vm.selectedItems, vm.isSelectedAll]);

    if (!vm.selectedItems.length) {
        return null;
    }

    return (
        <div className={"wby-w-full wby-bg-neutral-disabled wby-px-md wby-py-sm"}>
            <div className={"wby-flex wby-items-center wby-justify-between wby-gap-sm"}>
                <div className={"wby-flex wby-items-center wby-gap-sm"}>
                    <Text size={"sm"} className={"wby-text-neutral-strong"}>
                        {headline}
                    </Text>
                    {vm.isSelectedAll ? (
                        <Button
                            text={"Clear selection"}
                            onClick={unselectAllItems}
                            size={"sm"}
                            variant={"ghost"}
                        />
                    ) : (
                        <Button
                            text={"Select all remaining items"}
                            onClick={selectAllItems}
                            size={"sm"}
                            variant={"secondary"}
                        />
                    )}
                </div>

                <div className={"wby-flex wby-items-center wby-gap-sm"}>
                    <Buttons actions={browser.bulkActions} />
                    <IconButton
                        variant={"ghost"}
                        size={"sm"}
                        icon={<Close />}
                        onClick={() => selectItems([])}
                    />
                </div>
            </div>
        </div>
    );
};
