import React from "react";
import { ContainerAdminPlugins } from "./frontend/pageElements/container/admin/ContainerAdminPlugins";
import { StepAdminPlugins } from "./frontend/pageElements/step/admin/StepAdminPlugins";
import { ButtonAdminPlugins } from "./frontend/pageElements/button/ButtonAdminPlugins";
import { TextFieldAdminPlugins } from "./frontend/pageElements/fields/text/TextFieldAdminPlugins";
import { TextareaFieldAdminPlugins } from "./frontend/pageElements/fields/textarea/TextareaFieldAdminPlugins";
import { FunnelBuilderPageElementGroup } from "./frontend/pageElements/FunnelBuilderPageElementGroup";
import { DecoratedElementControls } from "./frontend/pageElements/ElementControlsDecorator";
import { FieldValidatorPlugins } from "./frontend/admin/plugins/fieldValidators";

export const Extension = () => (
    <>
        {/* Container Page Element */}
        <ContainerAdminPlugins />
        <StepAdminPlugins />

        {/* Fields. */}
        <TextFieldAdminPlugins />
        <TextareaFieldAdminPlugins />
        <ButtonAdminPlugins />

        {/* Other */}
        <FieldValidatorPlugins />
        <FunnelBuilderPageElementGroup />
        <DecoratedElementControls />
    </>
);
