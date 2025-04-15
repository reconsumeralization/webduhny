import React from "react";
import { ContainerAdminPlugins } from "./frontend/pageElements/container/admin/ContainerAdminPlugins";

// Form elements.
import { InputAdmin } from "./frontend/pageElements/formElements/input/admin";
import { ButtonAdmin } from "./frontend/pageElements/formElements/button/admin";

// Other.
import { FubPageElementGroup } from "./frontend/pageElements/FubPageElementGroup";

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
