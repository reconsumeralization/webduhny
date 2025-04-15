import React from "react";
import { ContainerWebsitePlugins } from "./frontend/pageElements/container/website/ContainerWebsitePlugins";
import { InputWebsite } from "./frontend/pageElements/formElements/input/website";
import { ButtonWebsite } from "./frontend/pageElements/formElements/button/website";

export const Extension = () => (
    <>
        <ContainerWebsitePlugins />

        {/* Form Elements */}
        <InputWebsite />
        <ButtonWebsite />
    </>
);
