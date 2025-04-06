import React from "react";
import { Main } from "./pageElements/main/admin";

// Form elements.
import { InputAdmin } from "./pageElements/formElements/input/admin";
import { ButtonAdmin } from "./pageElements/formElements/button/admin";

// Other.
import { FubPageElementGroup } from "./pageElements/FubPageElementGroup";

export const Extension = () => (
    <>
        {/* Funnel Builder Page Element */}
        <Main />

        {/* Form Elements */}
        <InputAdmin />
        <ButtonAdmin />

        {/* Other */}
        <FubPageElementGroup />
    </>
);
