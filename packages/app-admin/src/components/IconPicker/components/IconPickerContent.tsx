import React from "react";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { Button, Icon, OverlayLoader, Tabs } from "@webiny/admin-ui";
import { IconTypeProvider } from "~/components/IconPicker/config/IconType";
import { IconPickerTabRenderer } from "~/components/IconPicker/IconPickerTab";
import { IconType } from "~/components/IconPicker/config";

interface IconPickerContentProps {
    loading?: boolean;
    iconTypes: IconType[];
    activeTab?: string;
    removeIcon: () => void;
    removable?: boolean;
}

const IconPickerContent = ({
    activeTab,
    iconTypes,
    loading,
    removeIcon,
    removable
}: IconPickerContentProps) => {
    return (
        <div className={"wby-relative"}>
            {loading && <OverlayLoader size={"sm"} />}
            <Tabs
                size={"sm"}
                spacing={"sm"}
                defaultValue={activeTab}
                separator={true}
                tabs={iconTypes.map(iconType => (
                    <IconTypeProvider key={iconType.name} type={iconType.name}>
                        <IconPickerTabRenderer />
                    </IconTypeProvider>
                ))}
            />
            {removable && (
                <div
                    className={
                        "wby-flex wby-flex-col wby-px-sm wby-py-sm wby-border-solid wby-border-t-sm wby-border-neutral-muted"
                    }
                >
                    <Button
                        size={"md"}
                        variant={"secondary"}
                        text={"Remove"}
                        icon={<Icon icon={<DeleteIcon />} label={"Remove"} />}
                        onClick={removeIcon}
                    />
                </div>
            )}
        </div>
    );
};

export { IconPickerContent, type IconPickerContentProps };
