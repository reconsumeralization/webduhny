import React from "react";
import { Main } from "./pageElements/main/website";
import { InputWebsite } from "./pageElements/formElements/input/website";
import { ButtonWebsite } from "./pageElements/formElements/button/website";

export const Extension = () => (
    <>
        <Main />

        {/* Form Elements */}
        <InputWebsite />
        <ButtonWebsite />
    </>
);
