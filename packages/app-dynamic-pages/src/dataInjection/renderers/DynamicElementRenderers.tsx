import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-page-builder";
import { RepeaterRenderer } from "~/dataInjection/renderers/Repeater";
import { EntriesListRenderer } from "~/dataInjection/renderers/EntriesList";
import { EntriesSearchRenderer } from "~/dataInjection/renderers/EntriesSearch";
import { DynamicGrid } from "~/dataInjection/renderers/DynamicGrid";

export const DynamicElementRenderers = () => {
    return (
        <>
            <PbRenderElementPlugin elementType={"repeater"} render={RepeaterRenderer} />
            <PbRenderElementPlugin elementType={"entries-list"} render={EntriesListRenderer} />
            <PbRenderElementPlugin elementType={"entries-search"} render={EntriesSearchRenderer} />
            <DynamicGrid />
        </>
    );
};
