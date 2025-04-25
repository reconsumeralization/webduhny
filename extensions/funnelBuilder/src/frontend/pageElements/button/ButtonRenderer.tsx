import React, { useCallback, useMemo } from "react";
import { useForm } from "@webiny/form";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import { ButtonElementData } from "./types";
import styled from "@emotion/styled";

interface ButtonWrapperProps {
    fullWidth?: boolean;
    type?: "primary" | "default";
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    ${({ theme, type }) => theme.styles.elements["button"][`${type}`]}
    .button-body {
        width: ${props => (props.fullWidth ? "100%" : "auto")};
        margin-left: auto;

        &:disabled {
            opacity: 0.5;
        }
    }
`;

export const ButtonRenderer = createRenderer(props => {
    const { submit } = useForm();
    const { getElement } = useRenderer();
    const element = getElement<ButtonElementData>();
    const { action } = element.data;

    console.log('element.data', element.data);
    const buttonLabel = useMemo(() => {
        switch (action) {
            case "previousStep":
                return "Previous step";
            case "nextStep":
                return "Next step";
            default:
                return "Submit";
        }
    }, [action]);

    const onClick = useCallback(() => {
        if (action === "submit") {
            return submit();
        }

        throw new Error(`Button action "${action}" not implemented.`);
    }, [action]);

    return (
        <ButtonWrapper type={"primary"}>
            <button className={"button-body"} onClick={onClick}>
                {buttonLabel}
            </button>
        </ButtonWrapper>
    );
});
