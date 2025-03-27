import React from "react";
import { i18n } from "@webiny/app/i18n";
import { CmsModelFieldRendererPlugin, CmsModelFieldRendererProps } from "~/types";
import { MultiValueContainer } from "./MultiValueContainer";
import { MultiValueRendererSettings } from "~/admin/plugins/fieldRenderers/MultiValueRendererSettings";

const t = i18n.ns("app-headless-cms/admin/fields/text");

const ObjectsRenderer = (props: CmsModelFieldRendererProps) => {
    const { getBind } = props;

    const Bind = getBind();

    return <Bind>{bind => <MultiValueContainer bind={bind} getBind={getBind} />}</Bind>;
};

const plugin: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-objects",
    renderer: {
        rendererName: "objects",
        name: t`Inline Form`,
        description: t`Renders a set of fields.`,
        canUse({ field }) {
            return field.type === "object" && Boolean(field.multipleValues);
        },
        render(props) {
            return <ObjectsRenderer {...props} />;
        },
        renderSettings(props) {
            return <MultiValueRendererSettings {...props} />;
        }
    }
};

export default plugin;
