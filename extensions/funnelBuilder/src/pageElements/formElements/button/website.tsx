import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-website";
import { Button } from "./Button";
import { ELEMENT_TYPE } from "./constants";

export const ButtonWebsite = () => (
    <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={Button} />
);
