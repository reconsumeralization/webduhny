import React from "react";
import { ContainerWebsitePlugins } from "./frontend/pageElements/container/website/ContainerWebsitePlugins";
import { ButtonWebsitePlugins } from "./frontend/pageElements/button/ButtonWebsitePlugins";
import { TextFieldWebsitePlugins } from "./frontend/pageElements/fields/text/TextFieldWebsitePlugins";
import { TextareaFieldWebsitePlugins } from "./frontend/pageElements/fields/textarea/TextareaFieldWebsitePlugins";

export const Extension = () => (
    <>
        {/* Container Page Element */}
        <ContainerWebsitePlugins />
        <ButtonWebsitePlugins />

        {/* Fields. */}
        <TextFieldWebsitePlugins />
        <TextareaFieldWebsitePlugins />
    </>
);
