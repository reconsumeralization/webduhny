import React from "react";
import { PublishRevision, EditRevision, DeleteForm, RevisionSelector } from "./HeaderComponents";
import { FbFormDetailsPluginRenderParams, FbRevisionModel } from "~/types";

interface HeaderProps extends FbFormDetailsPluginRenderParams {
    revision: FbRevisionModel;
    selectRevision: (revision: FbRevisionModel) => void;
}

const Header = (props: HeaderProps) => {
    const { revision } = props;
    return (
        <>
            {revision && (
                <div className={"wby-flex wby-justify-end wby-items-center wby-gap-sm wby-h-full"}>
                    <RevisionSelector {...props} />
                    <EditRevision {...props} />
                    <PublishRevision {...props} />
                    <DeleteForm {...props} />
                </div>
            )}
        </>
    );
};

export default Header;
