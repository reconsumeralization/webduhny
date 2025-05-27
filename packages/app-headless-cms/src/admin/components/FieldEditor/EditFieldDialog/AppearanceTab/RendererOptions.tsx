import React from "react";
import { CmsModelFieldRendererPlugin } from "@webiny/app-headless-cms-common/types";
import { useModelField } from "~/admin/components/ModelFieldProvider";
import { Grid, Heading, Text } from "@webiny/admin-ui";

interface RendererOptionsProps {
    plugin: CmsModelFieldRendererPlugin | undefined;
}

export const RendererOptions = ({ plugin }: RendererOptionsProps) => {
    const { field } = useModelField();
    if (!plugin || !plugin.renderer.renderSettings) {
        return null;
    }

    const settings = plugin.renderer.renderSettings({ field });

    if (!settings) {
        return null;
    }

    return (
        <>
            <Grid.Column span={12}>
                <Heading level={5}>Renderer settings</Heading>
                <Text size={"sm"}>
                    Configure additional settings for the selected field renderer.
                </Text>
            </Grid.Column>
            {settings}
        </>
    );
};
