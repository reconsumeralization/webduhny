/**
 * TODO @ts-refactor
 * verify that all types are correct.
 */
import React, { forwardRef } from "react";
// import { TreeItemComponentProps } from "dnd-kit-sortable-tree";
import classnames from "classnames";
import { ReactComponent as EditIcon } from "@webiny/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { ReactComponent as HandleIcon } from "@webiny/icons/drag_indicator.svg";
import { FolderTreeItemWrapper } from "./Styled";
import { TreeItemComponentProps, MenuTreeItem } from "~/admin/views/Menus/types";
import { cn, Icon, IconButton, Text } from "@webiny/admin-ui";
export interface NodeRendererDefaultProps {
    editItem: (item: MenuTreeItem) => void;
    deleteItem: (item: MenuTreeItem) => void;
}
const NodeRendererDefault = forwardRef<HTMLDivElement, TreeItemComponentProps>((props, ref) => {
    const { item, deleteItem, editItem, onRemove, collapsed, depth, ...rest } = props;
    const handle = (
        <Icon icon={<HandleIcon />} label={"Drag and drop indicator"} color={"neutral-strong"} />
    );
    return (
        <FolderTreeItemWrapper
            {...rest}
            item={item}
            ref={ref}
            depth={depth}
            collapsed={collapsed}
            data-testid={`pb-menu-item-render-${item.title}`}
        >
            <div
                className={cn([
                    "rst__rowWrapper",
                    "wby-flex wby-items-center wby-gap-sm",
                    "wby-pl-sm-extra wby-pr-sm wby-py-sm",
                    "wby-border-sm wby-border-neutral-muted wby-rounded-md",
                    "hover:wby-border-neutral-strong"
                ])}
            >
                {handle}
                <div>
                    <div className={cn(["rst__row", "wby-flex wby-items-center wby-gap-md"])}>
                        <div className={classnames("rst__rowLabel")}>
                            <span className={classnames("rst__rowTitle")}>
                                <Text>{item.title}</Text>
                            </span>
                        </div>
                        <div
                            className={cn([
                                "rst__rowToolbar",
                                "wby-flex wby-items-center wby-gap-xs"
                            ])}
                        >
                            <IconButton
                                variant={"ghost"}
                                size={"sm"}
                                data-testid={"pb-edit-icon-button"}
                                icon={<EditIcon />}
                                onClick={() => editItem(item)}
                            />
                            <IconButton
                                variant={"ghost"}
                                size={"sm"}
                                data-testid={"pb-delete-icon-button"}
                                icon={<DeleteIcon />}
                                onClick={e => {
                                    e.stopPropagation();
                                    if (onRemove) {
                                        onRemove();
                                        deleteItem(item);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FolderTreeItemWrapper>
    );
});
NodeRendererDefault.displayName = "NodeRendererDefault";
export default NodeRendererDefault;
