import React, { useCallback } from "react";
import { Tag as AdminTag } from "@webiny/admin-ui";

export interface RmwcChipProps {
    /** Text for your Chip. */
    label?: React.ReactNode;
    /** @deprecated makes the Chip appear selected. */
    selected?: boolean;
    /** @deprecated Instance of an Icon Component. */
    icon?: any;
    /** @deprecated Instance of an Icon Component. */
    trailingIcon?: any;
    /** @deprecated Defaults to true. Set this to false if your trailing icon is something other than a remove button. */
    trailingIconRemovesChip?: boolean;
    /** An optional chip ID that will be included in callback evt.detail. If this is not passed, RMWC will attempt to use the "key" prop if present.  */
    id?: string;
    /** @deprecated Includes an optional checkmark for the chips selected state. */
    checkmark?: boolean;
    /** @deprecated Additional children will be rendered in the text area. */
    children?: React.ReactNode;
    /** A callback for click or enter key. This should be used over onClick for accessibility reasons. evt.detail = { chipId: string }  */
    onInteraction?: (evt: any) => void;
    /** @deprecated A callback for click or enter key for the trailing icon. material-components-web always treats this as an intent to remove the chip. evt.detail = { chipId: string } */
    onTrailingIconInteraction?: (evt: any) => void;
    /** A callback that is fired once the chip is in an exited state from removing it. evt.detail = { chipId: string } */
    onRemove?: (evt: any) => void;
    /** @deprecated Advanced: A reference to the MDCFoundation. */
    foundationRef?: any;
}

export interface ChipProps extends Omit<RmwcChipProps, "onRemove" | "trailingIcon"> {
    onRemove: (
        ev: React.MouseEvent<HTMLSpanElement> | React.SyntheticEvent<HTMLSpanElement>
    ) => void;
    trailingIcon?: React.ReactNode;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Tag` component from the `@webiny/admin-ui` package instead.
 */
export const Chip = (props: ChipProps) => {
    const { children, label, trailingIcon, onRemove, onInteraction, ...rest } = props;

    const getEventWithDetails = useCallback(
        (ev: React.SyntheticEvent<HTMLSpanElement>) => {
            return {
                ...ev,
                detail: {
                    chipId: props.id
                }
            };
        },
        [props.id]
    );

    const onRemoveCb = useCallback(
        (ev: React.SyntheticEvent<HTMLSpanElement>) => {
            if (!onRemove) {
                return;
            }

            onRemove(getEventWithDetails(ev));
        },
        [onRemove]
    );

    const onClick = useCallback(
        (ev: React.SyntheticEvent<HTMLSpanElement>) => {
            if (!onInteraction) {
                return;
            }

            onInteraction(getEventWithDetails(ev));
        },
        [onInteraction]
    );

    const createIconElement = useCallback((icon: React.ReactNode) => {
        if (React.isValidElement(icon)) {
            return icon;
        }

        return undefined;
    }, []);

    return (
        <AdminTag
            {...rest}
            content={children || label}
            dismissIconElement={createIconElement(trailingIcon)}
            onDismiss={onRemoveCb}
            onClick={onClick}
        />
    );
};
