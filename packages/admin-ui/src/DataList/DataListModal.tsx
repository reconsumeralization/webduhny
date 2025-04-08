import React, { useState } from "react";
import { PopoverPrimitive } from "~/Popover";
import { withStaticProps } from "~/utils";
import { SortIcon } from "~/DataList/index";
import { Tooltip } from "~/Tooltip";

interface DataListModalContentProps {
    children: React.ReactNode;
}

const DataListModalContent = ({ children }: DataListModalContentProps) => {
    return <div data-testid={"data-list-modal-wrapper"}>{children}</div>;
};

interface DataListModalTriggerProps {
    "data-testid"?: string;
}

const DataListModalTrigger = (props: DataListModalTriggerProps) => {
    return <SortIcon {...props} size={"sm"} />;
};

interface DataListModalProps {
    trigger: React.ReactElement;
    content: React.ReactElement;
}

const BaseDataListModal = (props: DataListModalProps) => {
    const [open, setOpen] = useState<boolean>(false);

    if (!props.content || !props.trigger) {
        return null;
    }

    return (
        <PopoverPrimitive open={open} onOpenChange={open => setOpen(open)}>
            <Tooltip
                trigger={<PopoverPrimitive.Trigger>{props.trigger}</PopoverPrimitive.Trigger>}
                content={"Sort list"}
            />
            <PopoverPrimitive.Content onOpenAutoFocus={e => e.preventDefault()} align={"end"}>
                <div className={"wby-bg-neutral-base wby-p-md"}>{props.content}</div>
            </PopoverPrimitive.Content>
        </PopoverPrimitive>
    );
};

const DataListModal = withStaticProps(BaseDataListModal, {
    Trigger: DataListModalTrigger,
    Content: DataListModalContent
});

export {
    DataListModal,
    type DataListModalProps,
    type DataListModalContentProps,
    type DataListModalTriggerProps
};
