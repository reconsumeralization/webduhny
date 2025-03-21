import React, { memo } from "react";
import { plugins } from "@webiny/plugins";
import { LocaleSelector } from "./admin/LocaleSelector";
import contentPermissions from "./admin/contentPermissions";

const I18NContentExtension = () => {
    plugins.register(contentPermissions);

    return (
        <>
            <LocaleSelector />
        </>
    );
};

export const I18NContent: React.ComponentType = memo(I18NContentExtension);
