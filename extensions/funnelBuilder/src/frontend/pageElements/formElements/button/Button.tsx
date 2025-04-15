import React, { useCallback, useMemo } from "react";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import styled from "@emotion/styled";
import { useForm } from "@webiny/form";
import { ButtonElementData } from "./types";

export const ButtonWrapper = styled.div`
    ${({ theme }) => theme.styles.elements["button"]["primary"]};

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const Button = createRenderer(() => {
    const { submit } = useForm();
    const { getElement } = useRenderer();
    const element = getElement<ButtonElementData>();
    const { field } = element.data;
    const { action } = field.extra;

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
        <ButtonWrapper>
            <button className={"button-body"} onClick={onClick}>
                {buttonLabel}
            </button>
        </ButtonWrapper>
    );
});
