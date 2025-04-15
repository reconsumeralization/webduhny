import React from "react";
import { ContainerWebsitePlugins } from "./pageElements/container/website/ContainerWebsitePlugins";
import { InputWebsite } from "./pageElements/formElements/input/website";
import { ButtonWebsite } from "./pageElements/formElements/button/website";

export const Extension = () => (
    <>
        <ContainerWebsitePlugins />

        {/* Form Elements */}
        <InputWebsite />
        <ButtonWebsite />
    </>
);
