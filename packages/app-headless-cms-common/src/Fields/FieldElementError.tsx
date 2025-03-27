import React from "react";
import styled from "@emotion/styled";

const StyledError = styled.div`
    border: 2px solid red;
    background-color: #f87e7e;
    border-radius: 5px;
    padding: 5px 10px;
`;

interface FieldElementErrorProps {
    title: string;
    description: string;
}

const showError = process.env.NODE_ENV === "development";

export const FieldElementError = (props: FieldElementErrorProps) => {
    if (!showError) {
        return null;
    }

    return (
        <StyledError>
            <h5>{props.title}</h5>
            <p>{props.description}</p>
        </StyledError>
    );
};
