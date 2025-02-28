import React, { useState } from "react";
import { PopoverPrimitive } from "~/Popover";
import { withStaticProps } from "~/utils";
import { FilterIcon } from "~/DataList";

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
    return <FilterIcon {...props} size={"lg"} />;
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
            <PopoverPrimitive.Trigger asChild>
                <span>{props.trigger}</span>
            </PopoverPrimitive.Trigger>
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
