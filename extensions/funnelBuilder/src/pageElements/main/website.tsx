import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-website";
import { FunnelBuilderWebsite } from "./FunnelBuilderWebsite";
import { ELEMENT_TYPE } from "./constants";

export const Main = () => (
    <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={FunnelBuilderWebsite} />
);
