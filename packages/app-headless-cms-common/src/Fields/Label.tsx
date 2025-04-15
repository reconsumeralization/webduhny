import React from "react";
import { FormComponentLabel } from "@webiny/admin-ui";

interface LabelProps {
    children?: React.ReactNode;
}

export const Label = ({ children }: LabelProps) => <FormComponentLabel text={children} />;

export default Label;
