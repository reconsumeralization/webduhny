import React from "react";
import { Grid, Input, Label, Select } from "@webiny/admin-ui";
import { plugins } from "@webiny/plugins";
import { validation } from "@webiny/validation";
import {
    FbBuilderFormFieldPatternValidatorPlugin,
    FbBuilderFormFieldValidatorPlugin
} from "~/types";

const plugin: FbBuilderFormFieldValidatorPlugin = {
    type: "form-editor-field-validator",
    name: "form-editor-field-validator-pattern",
    validator: {
        name: "pattern",
        label: "Pattern",
        description: "Entered value must match a specific pattern.",
        defaultMessage: "Invalid value.",
        defaultSettings: {
            preset: "custom"
        },
        renderSettings({ Bind, setValue, setMessage, data }) {
            const inputsDisabled = data.settings.preset !== "custom";
            const presetPlugins = plugins.byType<FbBuilderFormFieldPatternValidatorPlugin>(
                "form-editor-field-validator-pattern"
            );

            const selectOptions: any = presetPlugins.map(item => ({
                label: item.pattern.label,
                value: item.pattern.name
            }));

            return (
                <>
                    <Grid.Column span={3}>
                        <Bind
                            name={"settings.preset"}
                            validators={validation.create("required")}
                            afterChange={value => {
                                if (value === "custom") {
                                    setMessage("Invalid value.");
                                    return;
                                }

                                setValue("settings.regex", null);
                                setValue("settings.flags", null);

                                const selectedPatternPlugin = presetPlugins.find(
                                    item => item.pattern.name === value
                                );
                                if (!selectedPatternPlugin) {
                                    return;
                                }

                                setMessage(selectedPatternPlugin.pattern.message);
                            }}
                        >
                            <Select
                                size={"lg"}
                                label={"Preset"}
                                options={[{ value: "custom", label: "Custom" }, ...selectOptions]}
                            />
                        </Bind>
                    </Grid.Column>
                    <Grid.Column span={7}>
                        <Bind name={"settings.regex"} validators={validation.create("required")}>
                            <Input
                                size={"lg"}
                                disabled={inputsDisabled}
                                label={<Label text={"Regex"} hint={"Regex to test the value"} />}
                            />
                        </Bind>
                    </Grid.Column>
                    <Grid.Column span={2}>
                        <Bind name={"settings.flags"} validators={validation.create("required")}>
                            <Input
                                size={"lg"}
                                disabled={inputsDisabled}
                                label={<Label text={"Flags"} hint={"Regex flags"} />}
                            />
                        </Bind>
                    </Grid.Column>
                </>
            );
        }
    }
};
export default plugin;
