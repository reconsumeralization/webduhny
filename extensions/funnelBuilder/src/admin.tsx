import React from "react";
import { ContainerAdminPlugins } from "./frontend/pageElements/container/admin/ContainerAdminPlugins";
import { TextFieldAdminPlugins } from "./frontend/pageElements/fields/text/TextFieldAdminPlugins";
import { FunnelBuilderPageElementGroup } from "./frontend/pageElements/FunnelBuilderPageElementGroup";
import {DecoratedElementControls} from "./frontend/pageElements/ElementControlsDecorator";

export const Extension = () => (
    <>
        {/* Container Page Element */}
        <ContainerAdminPlugins />

        {/* Fields. */}
        <TextFieldAdminPlugins />

        {/* Other */}
        <FunnelBuilderPageElementGroup />
        <DecoratedElementControls/>
    </>
);
