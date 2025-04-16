import React from "react";
import { ContainerAdminPlugins } from "./frontend/pageElements/container/admin/ContainerAdminPlugins";
import { InputAdminPlugins } from "./frontend/pageElements/fields/input/InputAdminPlugins";

// Other.
import { FubPageElementGroup } from "./frontend/pageElements/FubPageElementGroup";

export const Extension = () => (
    <>
        {/* Funnel Builder Page Element */}
        <ContainerAdminPlugins />

        {/* Fields. */}
        <InputAdminPlugins />

        {/* Other */}
        <FubPageElementGroup />
    </>
);
