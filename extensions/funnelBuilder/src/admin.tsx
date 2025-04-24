import React from "react";
import { ContainerAdminPlugins } from "./frontend/pageElements/container/admin/ContainerAdminPlugins";
import { TextFieldAdminPlugins } from "./frontend/pageElements/fields/text/TextFieldAdminPlugins";
import { FunnelBuilderPageElementGroup } from "./frontend/pageElements/FunnelBuilderPageElementGroup";
import { DecoratedElementControls } from "./frontend/pageElements/ElementControlsDecorator";
import { FieldValidatorPlugins } from "./frontend/admin/plugins/fieldValidators";

export const Extension = () => (
    <>
        {/* Container Page Element */}
        <ContainerAdminPlugins />

        {/* Fields. */}
        <TextFieldAdminPlugins />

        {/* Other */}
        <FieldValidatorPlugins />
        <FunnelBuilderPageElementGroup />
        <DecoratedElementControls />
    </>
);
