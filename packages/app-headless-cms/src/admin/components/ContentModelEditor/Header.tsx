import React from "react";
import { HeaderBar } from "@webiny/admin-ui";
import { renderPlugins } from "@webiny/app/plugins";

const EditorBar = () => {
    return (
        <HeaderBar
            data-testid={"cms-editor-top-bar"}
            start={
                <div className={"wby-flex wby-items-center wby-justify-start wby-gap-sm"}>
                    {renderPlugins("content-model-editor-default-bar-left")}
                </div>
            }
            end={
                <div className={"wby-flex wby-items-center wby-justify-end wby-gap-xs"}>
                    {renderPlugins("content-model-editor-default-bar-right")}
                </div>
            }
        />
    );
};

export default EditorBar;
