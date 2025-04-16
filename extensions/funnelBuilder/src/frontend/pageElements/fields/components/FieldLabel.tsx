import * as React from "react";
import styled from "@emotion/styled";
import { FieldElementData } from "../types";

export const FieldLabelStyled = styled.label`
    width: 100%;
    display: inline-block;
    margin: 0 0 5px 1px;

    ${props => props.theme.breakpoints["mobile-landscape"]} {
        text-align: left !important;
    }

    .asterisk {
        margin-left: 5px;
        color: ${props => props.theme.styles.colors["color1"]};
    }
`;

export const FieldLabel = ({ field }: FieldElementData) => {
    return (
        <FieldLabelStyled>
            {field.label}
            {field.validators?.some(validation => validation.name === "required") && (
                <span className="asterisk">*</span>
            )}
        </FieldLabelStyled>
    );
};
