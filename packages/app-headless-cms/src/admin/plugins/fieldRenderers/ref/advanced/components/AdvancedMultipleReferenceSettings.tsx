import { Bind } from "@webiny/form";
import React from "react";
import { Grid, Select } from "@webiny/admin-ui";

export interface MultiRefFieldSettings {
    newItemPosition: "first" | "last";
}

export const AdvancedMultipleReferenceSettings = () => {
    return (
        <>
            <Grid.Column span={12}>
                <Bind name={"renderer.settings.newItemPosition"} defaultValue={"last"}>
                    <Select
                        label={"New item position"}
                        description={"Where should the new items be added?"}
                        options={[
                            { value: "first", label: "Top of the list" },
                            { value: "last", label: "Bottom of the list" }
                        ]}
                    />
                </Bind>
            </Grid.Column>
        </>
    );
};
