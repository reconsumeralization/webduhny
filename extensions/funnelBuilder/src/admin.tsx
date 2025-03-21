import React from "react";
import { Main } from "./pageElements/main/admin";

// Form elements.
import { InputAdmin } from "./pageElements/formElements/input/admin";
import { ButtonAdmin } from "./pageElements/formElements/button/admin";

export const Extension = () => (
    <>
        <Main/>

        {/* Form Elements */}
        <InputAdmin/>
        <ButtonAdmin/>
    </>
);
