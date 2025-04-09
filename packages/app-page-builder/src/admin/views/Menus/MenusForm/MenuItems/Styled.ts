import styled from "@emotion/styled";
import { FolderTreeItemWrapper as DefaultFolderTreeItemWrapper } from "dnd-kit-sortable-tree";

export const FolderTreeItemWrapper = styled(DefaultFolderTreeItemWrapper)<{
    depth?: number;
    collapsed?: boolean;
}>`
    height: 56px;
    position: relative;
    & .dnd-sortable-tree_folder_line {
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><line stroke='black' style='stroke-width: 1px;' x1='50%' y1='0' x2='50%' y2='100%'/></svg>");
        width: 20px;
    }
    & .dnd-sortable-tree_folder_line-to_self {
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'>
            <line stroke='black' style='stroke-width: 1px;' x1='50%' y1='0' x2='50%' y2='100%'/>
            <line stroke='black' style='stroke-width: 1px;' x1='50%' y1='35%' x2='100%' y2='35%'/>
        </svg>
        ");
        width: 20px;
    }
    & .dnd-sortable-tree_folder_line-to_self-last {
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'>
            <line stroke='black' style='stroke-width: 1px;' x1='50%' y1='0' x2='50%' y2='36.6%'/>
            <line stroke='black' style='stroke-width: 1px;' x1='50%' y1='36%' x2='100%' y2='36%'/>
        </svg>");
        width: 20px;
    }
    & .dnd-sortable-tree_folder_tree-item-collapse_button {
        ${props =>
            props.collapsed
                ? `background: #fff url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjgiIGZpbGw9IiNGRkYiLz48ZyBzdHJva2U9IiM5ODk4OTgiIHN0cm9rZS13aWR0aD0iMS45Ij48cGF0aCBkPSJNNC41IDloOU05IDQuNXY5Ii8+PC9nPjwvc3ZnPg==") no-repeat 50%;`
                : `        background: #fff url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjgiIGZpbGw9IiNGRkYiLz48cGF0aCBkPSJNNC41IDloOSIgc3Ryb2tlPSIjOTg5ODk4IiBzdHJva2Utd2lkdGg9IjEuOSIvPjwvc3ZnPg==") no-repeat 50%;
            `};
        position: absolute;
        top: 18px;
        ${props => (props.depth !== 0 ? `left: ${47}px;` : `left: 12px;`)};
        border: 1px solid hsl(var(--border-neutral-muted));
        border-radius: 50%;
        width: 18px;
        height: 18px;
        z-index: 10;
    }
    & .dnd-sortable-tree_folder_tree-item {
        position: relative;
        ${props => props.depth && `left: ${props.depth * 15}px;`};
    }
    & .dnd-sortable-tree_folder_line-to_self {
        position: relative;
        ${props => props.depth && `left: ${props.depth * 15}px;`};
    }
    .dnd-sortable-tree_folder_line-to_self-last {
        position: relative;
        ${props => props.depth && `left: ${props.depth * 15}px;`};
    }
    & .dnd-sortable-tree_folder_line {
        position: relative;
        ${props => props.depth && `left: ${props.depth * 15 - 15}px;`};
    }
    & .dnd-sortable-tree_folder_line:first-of-type {
        left: 0;
    }
`;
