import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-website";
import { StepWebsiteRenderer } from "./StepWebsiteRenderer";
import { ELEMENT_TYPE } from "../constants";

export const StepWebsitePlugins = () => (
    <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={StepWebsiteRenderer} />
);
