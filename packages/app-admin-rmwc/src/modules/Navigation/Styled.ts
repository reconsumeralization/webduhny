import styled from "@emotion/styled";
import { css } from "emotion";

export const MenuHeader = styled.div({
    display: "flex",
    alignItems: "center",
    padding: 5,
    backgroundColor: "var(--mdc-theme-surface)",
    borderBottom: "1px solid var(--mdc-theme-on-background)"
});

export const navHeader = css({
    padding: 0,
    "&.mdc-drawer__header": {
        padding: "0 !important",
        minHeight: 0
    }
});

export const navContent = css({
    padding: "0 !important"
});

export const MenuFooter = styled.div({
    borderTop: "1px solid var(--mdc-theme-on-background)",
    a: {
        color: "var(--mdc-theme-text-on-primary)",
        textDecoration: "none"
    }
});
