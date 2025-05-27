import React, { useState } from "react";
import uniqid from "uniqid";
import { plugins } from "@webiny/plugins";
import MenuItemsList from "./MenuItems/MenuItemsList";
import MenuItemForm from "./MenuItems/MenuItemForm";
import findObject from "./MenuItems/findObject";
import { PbMenuItemPlugin } from "~/types";
import { MenuTreeItem } from "~/admin/views/Menus/types";
import { Button, DropdownMenu, Grid } from "@webiny/admin-ui";
import { ReactComponent as TableIcon } from "@webiny/icons/table_chart.svg";
import EmptyView from "@webiny/app-admin/components/EmptyView";

interface MenuItemsProps {
    canSave: boolean;
    onChange: (items: MenuTreeItem[]) => void;
    value: MenuTreeItem[];
}

type MenuItemsState = MenuTreeItem | null;
const MenuItems = (props: MenuItemsProps) => {
    const [currentMenuItem, setCurrentMenuItem] = useState<MenuItemsState>(null);
    const editItem = (data: MenuTreeItem | null): void => {
        setCurrentMenuItem(data);
    };
    const addItem = (plugin: PbMenuItemPlugin): void => {
        const { onChange, value } = props;
        const newItem: MenuTreeItem = { type: plugin.menuItem.type, id: uniqid(), __new: true };
        onChange([...value, newItem]);
        editItem(newItem);
    };
    const deleteItem = (item: MenuTreeItem): void => {
        const { value, onChange } = props;
        const target = findObject(value, item.id);
        target && target.source.splice(target.index, 1);
        onChange(value);
        editItem(null);
    };
    const { value: items, onChange, canSave } = props;
    const pbMenuItemPlugins = plugins.byType<PbMenuItemPlugin>("pb-menu-item");
    return (
        <>
            <Grid.Column span={7}>
                <div
                    className={
                        "wby-p-lg wby-border-sm wby-border-neutral-muted wby-rounded-md wby-bg-neutral-base wby-overflow-auto"
                    }
                >
                    <MenuItemsList
                        canSave={canSave}
                        items={items}
                        onChange={onChange}
                        editItem={editItem}
                        deleteItem={deleteItem}
                    />
                </div>
            </Grid.Column>
            <Grid.Column span={5}>
                {!currentMenuItem && canSave && (
                    <EmptyView
                        icon={<TableIcon />}
                        title={"To build your menu you need to create menu items!"}
                        action={
                            <div>
                                <DropdownMenu
                                    trigger={
                                        <Button
                                            text={"Add menu item"}
                                            data-testid="pb.menu.add.addmenuitem"
                                        />
                                    }
                                    data-testid="pb.menu.create.items.button"
                                >
                                    {pbMenuItemPlugins.map(pl => (
                                        <DropdownMenu.Item
                                            icon={pl.menuItem.icon}
                                            key={pl.name}
                                            onClick={() => addItem(pl)}
                                            text={pl.menuItem.title}
                                        />
                                    ))}
                                </DropdownMenu>
                            </div>
                        }
                    />
                )}
                {currentMenuItem && (
                    <MenuItemForm
                        currentMenuItem={currentMenuItem}
                        editItem={editItem}
                        deleteItem={deleteItem}
                        items={items}
                        onChange={onChange}
                    />
                )}
            </Grid.Column>
        </>
    );
};
export default MenuItems;
