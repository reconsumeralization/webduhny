import React from "react";
import { validation } from "@webiny/validation";
import { Input } from "@webiny/ui/Input";
import { Bind, useForm } from "@webiny/form";
import { ButtonPrimary } from "@webiny/ui/Button";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Select } from "@webiny/ui/Select";

export const AdvancedSettings = () => {
  // In order to construct the settings form, we're using the
  // `@webiny/form`, `@webiny/ui`, and `@webiny/validation` packages.
  const { submit } = useForm();
  return (
    <Grid>
      <Cell span={12}>
          Conditional rules
      </Cell>
      <Cell span={12}>
        <ButtonPrimary onClick={submit}>Save</ButtonPrimary>
      </Cell>
    </Grid>
  );
};
