import React, { useEffect } from "react";
import { useStateIfMounted } from "@webiny/app-admin";
import { ReactComponent as VisibleIcon } from "@material-design-icons/svg/round/visibility.svg";
import { ReactComponent as InvisibleIcon } from "@material-design-icons/svg/round/visibility_off.svg";
import { Input } from "@webiny/ui/Input";
import styled from "@emotion/styled";

const Container = styled.div`
    position: relative;
`;

const ToggleVisibility = styled.div`
    position: absolute;
    top: 11px;
    right: 10px;
    background-color: var(--mdc-theme-background);
    border: 1px solid #cdcdcd;
    border-radius: 20px;
    padding: 3px;
    cursor: pointer;
    > svg {
        display: flex;
        align-self: center;
    }
`;

interface TextInputProps {
    label?: string;
    disabled?: boolean;
    value: string;
    onChange: (value: string) => void;
    onToggleDisabled: () => void;
    onBlur?: () => void;
}

export const TextInput = ({
    label,
    value,
    onChange,
    onToggleDisabled,
    onBlur,
    disabled = false
}: TextInputProps) => {
    const [localValue, setLocalValue] = useStateIfMounted(value);

    useEffect(() => {
        if (localValue !== value) {
            setLocalValue(value);
        }
    }, [value]);

    return (
        <Container>
            <Input
                disabled={disabled}
                label={label}
                value={localValue}
                onChange={value => {
                    onChange(value);
                    setLocalValue(value);
                }}
                onBlur={onBlur}
            />
            <ToggleVisibility onClick={onToggleDisabled}>
                {disabled ? (
                    <InvisibleIcon style={{ fill: "#bebebe" }} />
                ) : (
                    <VisibleIcon style={{ fill: "var(--mdc-theme-primary)" }} />
                )}
            </ToggleVisibility>
        </Container>
    );
};
