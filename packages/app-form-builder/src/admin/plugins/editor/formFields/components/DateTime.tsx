import React from "react";
import { validation } from "@webiny/validation";
import { BindComponent } from "@webiny/form/types";
import { UTC_TIMEZONES } from "@webiny/utils";
import { Grid, Input, Select } from "@webiny/admin-ui";

export const DateTime = ({ fieldFormat, Bind }: { fieldFormat: string; Bind: BindComponent }) => {
    if (fieldFormat === "time") {
        return (
            <Grid.Column span={12}>
                <Bind name={"settings.value"} validators={validation.create("required")}>
                    <Input size="lg" label={"Time"} type="time" />
                </Bind>
            </Grid.Column>
        );
    }

    if (fieldFormat === "dateTimeWithTimezone") {
        return (
            <>
                <Grid.Column span={8}>
                    <Bind name={"settings.value"} validators={validation.create("required")}>
                        <Input size="lg" label={"Date/Time"} type="datetime-local" />
                    </Bind>
                </Grid.Column>
                <Grid.Column span={4}>
                    <Bind name={"settings.timeZone"} validators={validation.create("required")}>
                        <Select
                            label={"Timezone"}
                            options={UTC_TIMEZONES.map(
                                ({ value, label }: { value: string; label: string }) => ({
                                    value,
                                    label
                                })
                            )}
                        />
                    </Bind>
                </Grid.Column>
            </>
        );
    }

    if (fieldFormat === "dateTimeWithoutTimezone") {
        return (
            <Grid.Column span={12}>
                <Bind name={"settings.value"} validators={validation.create("required")}>
                    <Input size="lg" label={"Date/Time"} type="datetime-local" />
                </Bind>
            </Grid.Column>
        );
    }

    return (
        <Grid.Column span={12}>
            <Bind name={"settings.value"} validators={validation.create("required")}>
                <Input size="lg" label={"Date"} type="date" />
            </Bind>
        </Grid.Column>
    );
};
