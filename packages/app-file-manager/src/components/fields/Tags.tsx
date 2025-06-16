import React, { useMemo } from "react";
import { Label, MultiAutoComplete } from "@webiny/admin-ui";
import { useBind } from "@webiny/form";
import { useFileManagerApi, useFileManagerView } from "~/index";
import { THREAT_SCAN } from "~/modules/Enterprise/constants";
import { useFileOrUndefined } from "./useFileOrUndefined";

export const Tags = () => {
    const { file } = useFileOrUndefined();
    const { canEdit } = useFileManagerApi();
    const { tags } = useFileManagerView();

    const bind = useBind({
        name: "tags"
    });

    const values = useMemo(() => {
        return (bind.value || []).filter((tag: string) => {
            return !tag.startsWith("mime:") || tag !== THREAT_SCAN.IN_PROGRESS;
        });
    }, [bind.value]);

    return (
        <MultiAutoComplete
            {...bind}
            values={values}
            onValuesChange={bind.onChange}
            options={tags.allTags.map(tagItem => tagItem.tag)}
            label={
                <Label text={"Tags"} hint={"Type to add a new tag or select from suggestions."} />
            }
            uniqueValues={true}
            allowFreeInput={true}
            disabled={file ? !canEdit(file) : false}
        />
    );
};
