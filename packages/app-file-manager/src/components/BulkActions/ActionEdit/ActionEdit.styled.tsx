import styled from "@emotion/styled";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";

export const AddOperationInner = styled.div`
    padding: 24px 0 0;
    text-align: center;
`;

interface ButtonIconProps {
    disabled?: boolean;
}

export const ButtonIcon = styled(AddIcon)<ButtonIconProps>`
    fill: ${props =>
        props.disabled ? "var(--mdc-theme-text-hint-on-light)" : "var(--mdc-theme-primary)"};
    width: 18px;
    margin-right: 8px;
`;
