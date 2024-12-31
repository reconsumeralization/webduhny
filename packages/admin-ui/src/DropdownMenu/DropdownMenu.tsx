import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { DropdownMenuRoot } from "./components/DropdownMenuRoot";
import { DropdownMenuTrigger } from "./components/DropdownMenuTrigger";
import { DropdownMenuContent } from "./components/DropdownMenuContent";
import { DropdownMenuSeparator } from "./components/DropdownMenuSeparator";
import { DropdownMenuItem } from "./components/DropdownMenuItem";
import { DropdownMenuCheckboxItem } from "./components/DropdownMenuCheckboxItem";
import { DropdownMenuLabel } from "./components/DropdownMenuLabel";
import { DropdownMenuGroup } from "./components/DropdownMenuGroup";
import { DropdownMenuPortal } from "./components/DropdownMenuPortal";

interface DropdownMenuProps
    extends React.ComponentPropsWithoutRef<typeof DropdownMenuRoot>,
        React.ComponentPropsWithoutRef<typeof DropdownMenuContent> {
    trigger: React.ReactNode;
    children: React.ReactNode;
}

const DropdownMenuBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuRoot>,
    DropdownMenuProps
>((props, ref) => {
    const { rootProps, triggerProps, contentProps } = React.useMemo(() => {
        const {
            // Root props.
            defaultOpen,
            open,
            onOpenChange,

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            modal,

            dir,

            // Trigger props.
            trigger,

            // Content props.
            ...rest
        } = props;

        return {
            rootProps: {
                defaultOpen,
                open,
                onOpenChange,
                dir,

                // Fixes the following issue:
                // https://github.com/radix-ui/primitives/issues/3141
                modal: true
            },
            triggerProps: {
                // Temporary fix.
                children: <div>{trigger}</div>
            },
            contentProps: rest
        };
    }, [props]);

    return (
        <DropdownMenuRoot {...rootProps} modal={false}>
            <DropdownMenuTrigger {...triggerProps} asChild />
            <DropdownMenuPortal>
                <DropdownMenuContent {...contentProps} ref={ref} />
            </DropdownMenuPortal>
        </DropdownMenuRoot>
    );
});

DropdownMenuBase.displayName = "DropdownMenu";

const DecoratableDropdownMenu = makeDecoratable("DropdownMenu", DropdownMenuBase);

const DropdownMenu = withStaticProps(DecoratableDropdownMenu, {
    Separator: DropdownMenuSeparator,
    Label: DropdownMenuLabel,
    Group: DropdownMenuGroup,
    Item: DropdownMenuItem,
    CheckboxItem: DropdownMenuCheckboxItem
});

export { DropdownMenu };
