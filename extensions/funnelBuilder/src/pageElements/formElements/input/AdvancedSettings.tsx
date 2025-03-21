import React from "react";
import { validation } from "@webiny/validation";
import { Input } from "@webiny/ui/Input";
import { Bind, useForm } from "@webiny/form";
import { ButtonPrimary } from "@webiny/ui/Button";
import { Cell, Grid } from "@webiny/ui/Grid";

export const AdvancedSettings = () => {
    // In order to construct the settings form, we're using the
    // `@webiny/form`, `@webiny/ui`, and `@webiny/validation` packages.
    const { submit } = useForm();
    return (
        <Grid>
            <Cell span={12}>
                <Bind
                    name={"field.fieldId"}
                    validators={validation.create("required,minLength:2,maxLength:100")}
                >
                    <Input label={"Field Id"} description={"Id of the input field."} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind
                    name={"field.label"}
                    validators={validation.create("required,minLength:2,maxLength:100")}
                >
                    <Input label={"Label"} description={"Label of the input field."} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind
                    name={"field.extra.placeholderText"}
                    validators={validation.create("minLength:2,maxLength:500")}
                >
                    <Input
                        label={"Placeholder text"}
                        description={"Placeholder text for the input field."}
                    />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind
                    name={"field.helpText"}
                    validators={validation.create("minLength:2,maxLength:500")}
                >
                    <Input label={"Help text"} description={"Help text for the input field."} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <ButtonPrimary onClick={submit}>Save</ButtonPrimary>
            </Cell>
        </Grid>
    );
};
