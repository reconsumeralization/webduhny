import React from "react";
import { makeDecoratable } from "@webiny/app";
import { Content } from "@webiny/app-page-builder-elements";
import type { PbPageTemplateWithContent } from "~/types";

interface PageTemplateContentPreviewProps {
    template: PbPageTemplateWithContent;
}

export const PageTemplateContentPreview = makeDecoratable(
    "PageTemplateContentPreview",
    ({ template }: PageTemplateContentPreviewProps) => {
        return (
            <div className={"wby-overflow-y-scroll wby-overflow-x-hidden"}>
                <Content content={template.content} />
            </div>
        );
    }
);
