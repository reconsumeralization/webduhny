import React from "react";
import { ReactComponent as ScanIcon } from "@material-design-icons/svg/round/policy.svg";
import styled from "@emotion/styled";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
`;

const Thumbnail = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 20px;
    svg {
        opacity: 0.35;
        fill: var(--mdc-theme-text-secondary-on-background);
        width: 50px;
        height: 50px;
    }
`;

export const ThreatScanInProgress = () => {
    return (
        <Container>
            <Thumbnail>
                <ScanIcon />
                <div>Scanning for threats...</div>
            </Thumbnail>
        </Container>
    );
};
