import React from "react";
import { useForm } from "@webiny/form";
import { createRenderer } from "@webiny/app-page-builder-elements";
import styled from "@emotion/styled";
import { useContainer } from "../container/ContainerProvider";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ControlButton = styled.div<{ disabled?: boolean }>`
    ${({ theme }) => theme.styles.elements["button"]["primary"]}
        cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
    .button-body {
        width: auto;
        margin-left: auto;
        opacity: ${props => (props.disabled ? 0.6 : 1)};
        pointer-events: ${props => (props.disabled ? "none" : "auto")};
    }
`;

export const ControlsRenderer = createRenderer(() => {
    const { submit } = useForm();
    const { funnelSubmissionVm } = useContainer();

    return (
        <Wrapper>
            <ControlButton
                disabled={funnelSubmissionVm.isFirstStep()}
                onClick={funnelSubmissionVm.activatePreviousStep.bind(funnelSubmissionVm)}
            >
                <div className={"button-body"}>Previous</div>
            </ControlButton>
            <ControlButton onClick={submit}>
                <div className={"button-body"}>
                    {funnelSubmissionVm.isFinalStep() ? "Finish" : "Next"}
                </div>
            </ControlButton>
        </Wrapper>
    );
});
