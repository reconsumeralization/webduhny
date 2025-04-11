import React, { useCallback } from "react";
import debounce from "lodash/debounce";
import { CmsReferenceContentEntry } from "~/admin/plugins/fieldRenderers/ref/components/types";
import { Scrollbar, Text } from "@webiny/admin-ui";
import { positionValues as PositionValues } from "react-custom-scrollbars";

interface EntriesProps {
    entries: CmsReferenceContentEntry[];
    children: (entry: CmsReferenceContentEntry, index: number) => React.ReactNode;
    loadMore: () => void;
}

export const Entries = (props: EntriesProps) => {
    const { entries, children, loadMore } = props;

    const loadMoreOnScroll = useCallback(
        debounce((position: PositionValues) => {
            if (position.top <= 0.9) {
                return;
            }
            loadMore();
        }, 500),
        [entries, loadMore]
    );

    if (entries.length === 0) {
        return (
            <div
                className={
                    "wby-flex wby-justify-center wby-px-xl wby-py-md-extra wby-bg-neutral-subtle"
                }
            >
                <Text size={"sm"}>No records found.</Text>
            </div>
        );
    }

    return (
        <div
            style={{ height: "260px" }}
            className={"wby-w-full wby-overflow-x-hidden wby-overflow-y-hidden"}
        >
            <Scrollbar data-testid="advanced-ref-field-entries" onScrollFrame={loadMoreOnScroll}>
                {entries.map((entry, index) => {
                    return (
                        <div className={"wby-mb-sm wby-w-full"} key={`entry-${entry.id}`}>
                            {children(entry, index)}
                        </div>
                    );
                })}
            </Scrollbar>
        </div>
    );
};
