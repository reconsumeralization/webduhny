import styled from "@emotion/styled";
import { ListItemGraphic as BaseListItemGraphic, ListItem as BaseListItem } from "@webiny/ui/List";

export const MessageContainer = styled("div")`
    margin-bottom: 16px;
`;

export const ListItem = styled(BaseListItem)`
    overflow: visible;
    height: auto !important;
    align-items: flex-start;

    .mdc-deprecated-list-item__secondary-text {
        display: block;
        white-space: normal;
        overflow: visible;
        text-overflow: clip;
    }
`;

type ListItemGraphicProps = {
    status: "success" | "failure";
};

export const ListItemGraphic = styled(BaseListItemGraphic)<ListItemGraphicProps>`
    margin-top: 12px;
    color: ${props =>
        props.status === "failure"
            ? "var(--mdc-theme-error)"
            : "var(--mdc-theme-secondary)"} !important;
`;
