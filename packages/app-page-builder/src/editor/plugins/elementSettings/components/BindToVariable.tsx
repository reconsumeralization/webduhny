import React from "react";
import styled from "@emotion/styled";

const BindIcon = styled.div<{ isBound: boolean}>`
    position: absolute;
    z-index: 20;
    top: -10px;
    right: -10px;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    border-width: 1px;
    border-style: solid;
    background-color: ${props => props.isBound ? "#00ccb0" : "#d5d5d5"};
    border-color: ${props => props.isBound ? "#008574" : "#aaaaaa"};
`;

const RelativeDiv = styled.div`
    position: relative;
`;

export interface BindToVariableProps {
    name: string;
    label: string;
    children: React.ReactNode;
}

export const BindToVariable = ({ name, label, children }: BindToVariableProps) => {
    return (
        <RelativeDiv>
            <BindIcon isBound={false}/>
            {children}
        </RelativeDiv>
    );
};
