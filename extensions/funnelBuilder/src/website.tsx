import React from "react";
import { ContainerWebsitePlugins } from "./frontend/pageElements/container/website/ContainerWebsitePlugins";
import { TextFieldWebsitePlugins } from "./frontend/pageElements/fields/text/TextFieldWebsitePlugins";

export const Extension = () => (
    <>
        <ContainerWebsitePlugins />

        {/* Fields. */}
        <TextFieldWebsitePlugins/>
    </>
);
