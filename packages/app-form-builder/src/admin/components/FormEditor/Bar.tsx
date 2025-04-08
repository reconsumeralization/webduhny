import React from "react";
import { renderPlugins } from "@webiny/app/plugins";
import { HeaderBar } from "@webiny/admin-ui";

const Bar = () => {
    return (
        <HeaderBar
            start={
                <div className={"wby-flex wby-items-center wby-justify-self-start wby-gap-sm"}>
                    {renderPlugins("form-editor-default-bar-left")}
                </div>
            }
            end={
                <div className={"wby-flex wby-items-center wby-justify-self-end wby-gap-sm"}>
                    {renderPlugins("form-editor-default-bar-right")}
                </div>
            }
        />
    );
};

export default Bar;
