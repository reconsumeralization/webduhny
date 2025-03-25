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
                    <Heading level={5}>{title}</Heading>
                    <Text size={"sm"}>{description}</Text>
                </Grid.Column>
                <Grid.Column span={12}>
                    <ValidatorsList name={bindTo[fieldKey]} validators={validators} />
                </Grid.Column>
            </Grid>
        </div>
    );
};
