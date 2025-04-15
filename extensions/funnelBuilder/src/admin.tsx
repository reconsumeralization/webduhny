import React from "react";
import { ContainerAdminPlugins } from "./pageElements/container/admin/ContainerAdminPlugins";

// Form elements.
import { InputAdmin } from "./pageElements/formElements/input/admin";
import { ButtonAdmin } from "./pageElements/formElements/button/admin";

// Other.
import { FubPageElementGroup } from "./pageElements/FubPageElementGroup";

export const Extension = () => (
    <>
        {/* Funnel Builder Page Element */}
        <ContainerAdminPlugins />

        {/* Form Elements */}
        <InputAdmin />
        <ButtonAdmin />

        {/* Other */}
        <FubPageElementGroup />
    </>
);
