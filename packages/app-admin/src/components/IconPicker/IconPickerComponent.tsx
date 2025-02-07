import React, { useEffect, useCallback, useMemo } from "react";
import { observer } from "mobx-react-lite";
import isEqual from "lodash/isEqual";
import {
    FormComponentDescription,
    FormComponentErrorMessage,
    FormComponentLabel,
    FormComponentProps,
    Popover
} from "@webiny/admin-ui";
import { IconPickerContent, IconPickerTrigger } from "./components";
import { IconPickerPresenter } from "./IconPickerPresenter";
import { IconPickerPresenterProvider } from "./IconPickerPresenterProvider";
import { Icon, ICON_PICKER_SIZE } from "./types";

export interface IconPickerProps extends FormComponentProps {
    size?: ICON_PICKER_SIZE;
    removable?: boolean;
    value?: Icon;
    onChange?: (value: Icon | undefined) => void;
}

export interface IconPickerComponentProps extends IconPickerProps {
    presenter: IconPickerPresenter;
}

export const IconPickerComponent = observer(
    ({
        presenter,
        label,
        description,
        removable,
        required,
        disabled,
        ...props
    }: IconPickerComponentProps) => {
        const { value, onChange } = props;
        const { isValid: validationIsValid, message: validationMessage } = props.validation || {};
        const invalid = useMemo(() => validationIsValid === false, [validationIsValid]);
        const { activeTab, isMenuOpened, isLoading, iconTypes, selectedIcon, size } = presenter.vm;

        useEffect(() => {
            if (onChange && selectedIcon && !isEqual(selectedIcon, value)) {
                onChange(selectedIcon);
            }
        }, [JSON.stringify(selectedIcon)]);

        const removeIcon = useCallback(() => {
            if (onChange) {
                presenter.setIcon(null);
                onChange(undefined);
            }
        }, [onChange]);

        const handleOnOpenChange = useCallback(
            (open: boolean) => {
                if (open) {
                    return presenter.openMenu();
                } else {
                    return presenter.closeMenu();
                }
            },
            [presenter.openMenu, presenter.closeMenu]
        );

        return (
            <IconPickerPresenterProvider presenter={presenter}>
                <FormComponentLabel text={label} required={required} disabled={disabled} />
                <FormComponentDescription text={description} />
                <Popover open={isMenuOpened} onOpenChange={handleOnOpenChange}>
                    <Popover.Trigger>
                        <IconPickerTrigger icon={selectedIcon} />
                    </Popover.Trigger>
                    <Popover.Content
                        style={{ width: size === ICON_PICKER_SIZE.SMALL ? "248px" : "328px" }}
                    >
                        <IconPickerContent
                            loading={isLoading}
                            removable={value && removable}
                            iconTypes={iconTypes}
                            activeTab={activeTab}
                            removeIcon={removeIcon}
                        />
                    </Popover.Content>
                </Popover>
                <FormComponentErrorMessage text={validationMessage} invalid={invalid} />
            </IconPickerPresenterProvider>
        );
    }
);
