import React from "react";
import { CompositionScope } from "@webiny/app-admin";
import { ModelProvider, Fields } from "@webiny/app-headless-cms-common";
import { Bind, BindPrefix } from "@webiny/form";
import styled from "@emotion/styled";
import { useFolderModel, useGetFolderExtensionsFields } from "~/features";

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

export const Extensions = () => {
    const { getFolderExtensionsFields } = useGetFolderExtensionsFields();
    const { fields } = getFolderExtensionsFields();
    const folderModel = useFolderModel();

    if (!fields.length) {
        return null;
    }

    return (
        <CompositionScope name={"aco.folderDetails.extensionFields"}>
            <ModelProvider model={folderModel}>
                <BindPrefix name={"extensions"}>
                    <HideEmptyCells>
                        <Fields
                            contentModel={folderModel}
                            // @ts-expect-error
                            Bind={Bind}
                            fields={fields}
                            layout={fields.map(field => [field.fieldId])}
                        />
                    </HideEmptyCells>
                </BindPrefix>
            </ModelProvider>
        </CompositionScope>
    );
};
