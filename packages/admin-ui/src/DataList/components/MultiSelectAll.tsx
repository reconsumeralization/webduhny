import React from "react";
import { CheckboxPrimitive } from "~/Checkbox";
import { DataListProps } from "../types";

const MultiSelectAll = (props: DataListProps) => {
    const { multiSelectActions } = props;
    if (!multiSelectActions) {
        return null;
    }
    /**
     * We can safely cast because we have defaults.
     */
    const { isAllMultiSelected, isNoneMultiSelected, multiSelectAll, data } =
        props as Required<DataListProps>;

    return (
        <>
            {typeof multiSelectAll === "function" && (
                <div className={"wby-size-lg wby-flex wby-items-center wby-justify-center"}>
                    <CheckboxPrimitive
                        indeterminate={!isAllMultiSelected(data) && !isNoneMultiSelected(data)}
                        checked={isAllMultiSelected(data)}
                        onChange={() => {
                            multiSelectAll(!isAllMultiSelected(data), data);
                        }}
                    />
                </div>
            )}
        </>
    );
};

export { MultiSelectAll };
