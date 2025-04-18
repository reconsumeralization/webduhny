import React from "react";
import type {
    CmsModelField,
    CmsModelFieldRendererSettingsProps
} from "@webiny/app-headless-cms-common/types";
import { Bind } from "@webiny/form";
import { Grid, Input } from "@webiny/admin-ui";

interface IMultiValueRendererSettings {
    addValueButtonLabel: string;
}

const DEFAULT_SETTINGS: IMultiValueRendererSettings = {
    addValueButtonLabel: "Add Value"
};

export const getMultiValueRendererSettings = (
    field: CmsModelField
): IMultiValueRendererSettings => {
    if (typeof field.renderer === "function") {
        return DEFAULT_SETTINGS;
    }

    return field.renderer.settings?.multiValue ?? DEFAULT_SETTINGS;
};

export const MultiValueRendererSettings = ({ field }: CmsModelFieldRendererSettingsProps) => {
    return (
        <Grid.Column span={12}>
            <Bind
                name={"renderer.settings.multiValue.addValueButtonLabel"}
                defaultValue={`Add ${field.label}`}
            >
                <Input label={`"Add Value" button label`} />
            </Bind>
        </Grid.Column>
    );
};
