import React, { Fragment } from "react";
import { useFileManagerViewConfig } from "~/index";

export const Actions = () => {
    const { fileDetails } = useFileManagerViewConfig();

    return (
        <div
            className={
                "flex justify-center border-b-sm border-neutral-muted border-solid p-sm mb-sm"
            }
        >
            {fileDetails.actions.map(action => (
                <Fragment key={action.name}>{action.element}</Fragment>
            ))}
        </div>
    );
};
