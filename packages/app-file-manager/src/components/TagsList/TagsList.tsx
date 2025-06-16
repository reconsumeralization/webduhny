import React from "react";
import { Loader } from "@webiny/app-aco";
import { Empty } from "./Empty";
import { FilterSelect } from "./FilterSelect";
import { FilterStatus } from "./FilterStatus";
import { Tags } from "./Tags";

import { TagItem } from "@webiny/app-aco/types";

interface TagListProps {
    loading: boolean;
    onActivatedTagsChange: (tags: string[]) => void;
    tags: TagItem[];
    activeTags: string[];
    emptyDisclaimer?: string;
}

export const TagsList = ({
    loading,
    tags,
    emptyDisclaimer,
    onActivatedTagsChange,
    activeTags
}: TagListProps) => {
    if (loading) {
        return <Loader />;
    }

    return (
        <div className={"wby-my-lg wby-px-md"}>
            {tags.length === 0 ? (
                <Empty disclaimer={emptyDisclaimer} />
            ) : (
                <>
                    {tags.length > 1 && <FilterSelect />}
                    <FilterStatus
                        activeTags={activeTags}
                        onActivatedTagsChange={onActivatedTagsChange}
                    />
                    <Tags
                        tags={tags}
                        activeTags={activeTags}
                        onActivatedTagsChange={onActivatedTagsChange}
                    />
                </>
            )}
        </div>
    );
};
