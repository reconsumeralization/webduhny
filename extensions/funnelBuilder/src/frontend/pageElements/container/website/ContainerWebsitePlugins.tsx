import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-website";
import { ContainerWebsite } from "./ContainerWebsite";
import { ELEMENT_TYPE } from "../constants";

export const ContainerWebsitePlugins = () => (
    <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={ContainerWebsite} />
);
