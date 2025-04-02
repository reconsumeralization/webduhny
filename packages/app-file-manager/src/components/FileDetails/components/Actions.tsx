import React from "react";
import { useFileManagerViewConfig } from "~/index";

export const Actions = () => {
    const { fileDetails } = useFileManagerViewConfig();

    return (
        <div className={"wby-flex wby-justify-center wby-p-sm"}>
            {fileDetails.actions.map(action => (
                <div className={"wby-mx-xs"} key={action.name}>
                    {action.element}
                </div>
            ))}
        </div>
    );
};
