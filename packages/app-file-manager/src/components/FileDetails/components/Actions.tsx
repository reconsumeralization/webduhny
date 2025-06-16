import React from "react";
import { useFileManagerViewConfig } from "~/index";

export const Actions = () => {
    const { fileDetails } = useFileManagerViewConfig();

    return (
        <div className={"wby-flex wby-justify-start wby-gap-xs"}>
            {fileDetails.actions.map(action => (
                <React.Fragment key={action.name}>{action.element}</React.Fragment>
            ))}
        </div>
    );
};
