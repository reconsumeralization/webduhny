import React, { useMemo } from "react";
import { CompositionScope } from "@webiny/app-admin";
import { ModelProvider, Fields } from "@webiny/app-headless-cms-common";
import { Bind, BindPrefix } from "@webiny/form";
import styled from "@emotion/styled";
import { FolderModelDto } from "~/features";

const HideEmptyCells = styled.div`
    .mdc-layout-grid {
        margin: -24px;
        padding: 0 24px 24px;
    }

    .mdc-layout-grid__inner {
        row-gap: normal;
    }

    .mdc-layout-grid__cell {
        padding-top: 24px;
    }

    .mdc-layout-grid__cell:empty {
        display: none;
        padding: 0;
    }
`;

interface ExtensionsProps {
    model: FolderModelDto;
}

export const Extensions = ({ model }: ExtensionsProps) => {
    const extensionsField = useMemo(() => {
        return model.fields.find(f => f.fieldId === "extensions");
    }, [model]);

    if (!extensionsField) {
        return null;
    }

    const fields = extensionsField.settings?.fields || [];
    const layout = extensionsField.settings?.layout || [];

    if (!layout.length) {
        layout.push(...fields.map(field => [field.fieldId]));
    }

    return (
        <CompositionScope name={"aco.folderDetails.extensionFields"}>
            <ModelProvider model={model}>
                <BindPrefix name={"extensions"}>
                    <HideEmptyCells>
                        <Fields
                            contentModel={model}
                            // @ts-expect-error
                            Bind={Bind}
                            fields={fields}
                            layout={layout}
                        />
                    </HideEmptyCells>
                </BindPrefix>
            </ModelProvider>
        </CompositionScope>
    );
};
