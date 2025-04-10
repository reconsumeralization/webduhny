import React, { useEffect } from "react";
import { i18n } from "@webiny/app/i18n";
import { css } from "@emotion/css";
import { validation } from "@webiny/validation";
import { useBind } from "@webiny/form";
import { allowCmsLegacyRichTextInput } from "~/utils/allowCmsLegacyRichTextInput";
import { RendererOptions } from "./AppearanceTab/RendererOptions";
import { LegacyRichTextInput } from "./AppearanceTab/LegacyRichTextInput";
import { useRendererPlugins } from "./useRendererPlugins";
import { useModelField } from "~/admin/components/ModelFieldProvider";
import { RadioGroup, Text, Grid } from "@webiny/admin-ui";

const t = i18n.ns("app-headless-cms/admin/content-model-editor/tabs/appearance-tab");

const style = {
    noComponentsMessage: css({
        textAlign: "center",
        padding: 25
    }),
    radioContainer: css({
        marginBottom: 10,
        display: "flex"
    })
};

const AppearanceTab = () => {
    const renderers = useRendererPlugins();
    const { field } = useModelField();

    const rendererName = useBind({
        name: "renderer.name",
        validate: validation.create("required")
    });

    const selectedPlugin = rendererName.value
        ? renderers.find(pl => pl.renderer.rendererName === rendererName.value)
        : undefined;

    if (renderers.length === 0) {
        return (
            <Grid>
                <Grid.Column
                    span={12}
                    className={style.noComponentsMessage}
                >{t`There are no components that can render this field.`}</Grid.Column>
            </Grid>
        );
    }

    useEffect(() => {
        // If the currently selected render plugin is no longer available, select the first available one.
        if (selectedPlugin) {
            return;
        }

        if (renderers[0]) {
            rendererName.onChange(renderers[0].renderer.rendererName);
            return;
        }

        console.info(`No renderers for field ${field.fieldId} found.`, field);
    }, [field.id, field.multipleValues, field.predefinedValues?.enabled, selectedPlugin]);

    return (
        <>
            <Grid>
                <>
                    {allowCmsLegacyRichTextInput && (
                        <Grid.Column span={6}>
                            <LegacyRichTextInput />
                        </Grid.Column>
                    )}
                    <Grid.Column span={12}>
                        Choose a component that will render the field:
                    </Grid.Column>
                    <Grid.Column span={12}>
                        <RadioGroup
                            {...rendererName}
                            items={renderers.map(item => ({
                                id: item.renderer.rendererName,
                                value: item.renderer.rendererName,
                                label: (
                                    <div>
                                        <Text as={"div"} size={"md"}>
                                            {item.renderer.name}
                                        </Text>
                                        <Text
                                            as={"div"}
                                            size={"sm"}
                                            className={"wby-text-sm wby-text-neutral-strong"}
                                        >
                                            {item.renderer.description}
                                        </Text>
                                    </div>
                                )
                            }))}
                        />
                    </Grid.Column>
                </>
            </Grid>
            <RendererOptions plugin={selectedPlugin} />
        </>
    );
};

export default AppearanceTab;
