import React from "react";

import { ValidatorsList } from "./ValidatorsList";
import { CmsModelFieldValidatorConfigAdapter } from "~/utils/CmsModelFieldValidatorConfigAdapter";
import { Grid, Heading, Text } from "@webiny/admin-ui";

interface ValidatorsSectionProps {
    title: string;
    fieldKey: "validators" | "listValidators";
    description: string;
    validators: CmsModelFieldValidatorConfigAdapter[];
}

const bindTo = {
    validators: "validation",
    listValidators: "listValidation"
};

export const ValidationsSection = ({
    title,
    description,
    fieldKey,
    validators
}: ValidatorsSectionProps) => {
    return (
        <div className="wby-mb-xl">
            <Grid>
                <Grid.Column span={12}>
                    <Heading text={title} level={5} />
                    <Text text={description} size={"sm"} />
                </Grid.Column>
                <Grid.Column span={12}>
                    <ValidatorsList name={bindTo[fieldKey]} validators={validators} />
                </Grid.Column>
            </Grid>
        </div>
    );
};
