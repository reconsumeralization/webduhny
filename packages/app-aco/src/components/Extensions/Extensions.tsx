import React, { useCallback } from "react";
import { CompositionScope } from "@webiny/app-admin";
import { ModelProvider, Fields } from "@webiny/app-headless-cms-common";
import type { CmsModelField } from "@webiny/app-headless-cms-common/types";
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

export interface ExtensionsProps {
    action?: string;
}

export const Extensions = ({ action }: ExtensionsProps) => {
    const { getFolderExtensionsFields } = useGetFolderExtensionsFields();
    const { fields } = getFolderExtensionsFields();
    const folderModel = useFolderModel();

    const getFieldsWithActionContext = useCallback(
        (fields: CmsModelField[]) => {
            if (!action) {
                return fields;
            }

            return fields.map(field => ({
                ...field,
                tags: (field.tags ?? []).concat([`$action:${action}`])
            }));
        },
        [action]
    );

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
                            fields={getFieldsWithActionContext(fields)}
                            layout={fields.map(field => [field.fieldId])}
                        />
                    </HideEmptyCells>
                </BindPrefix>
            </ModelProvider>
        </CompositionScope>
    );
};
