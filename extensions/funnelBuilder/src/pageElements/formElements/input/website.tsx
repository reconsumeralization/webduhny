import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-website";
import { Input } from "./Input";
import { ELEMENT_TYPE } from "./constants";

export const InputWebsite = () => (
    <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={Input} />
);
