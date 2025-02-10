import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { IconButton, IconButtonProps as IconButtonProps } from "~/Button";
import { ListItemSeparator } from "./ListItemSeparator";

type ListItemActionProps = IconButtonProps;

const DecoratableListItemAction = ({ onClick, ...props }: ListItemActionProps) => {
    // We need to stop the event propagation to prevent the accordion from opening/closing when the action is clicked.
    const onClickCallback = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (onClick) {
                onClick(e);
            }
        },
        [onClick]
    );

    return <IconButton variant={"ghost"} size={"sm"} {...props} onClick={onClickCallback} />;
};

const ListItemAction = withStaticProps(
    makeDecoratable("ListItemAction", DecoratableListItemAction),
    {
        Separator: ListItemSeparator
    }
);

export { ListItemAction, type ListItemActionProps };
