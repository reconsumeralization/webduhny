import * as React from "react";
import { cn, cva, type VariantProps, withStaticProps } from "~/utils";
import {
    Body,
    Caption,
    Cell,
    Direction,
    Footer,
    Head,
    Header,
    Resizer,
    Row
} from "~/Table/components";

const tableWrapperVariants = cva("wby-relative wby-w-full wby-overflow-auto", {
    variants: {
        sticky: {
            true: "wby-overflow-clip"
        }
    }
});

const tableVariants = cva("wby-w-full wby-caption-bottom wby-text-sm wby-bg-white", {
    variants: {
        bordered: {
            true: "wby-border-neutral-dimmed wby-border-solid wby-border-sm"
        }
    }
});

interface TableProps
    extends React.HTMLAttributes<HTMLTableElement>,
        VariantProps<typeof tableVariants> {
    sticky?: boolean;
}

const BaseTable = ({ className, bordered, sticky, ...props }: TableProps) => (
    <div className={cn(tableWrapperVariants({ sticky }))}>
        <table className={cn(tableVariants({ bordered }), className)} {...props} />
    </div>
);

const Table = withStaticProps(BaseTable, {
    Body,
    Caption,
    Cell,
    Direction,
    Footer,
    Head,
    Header,
    Resizer,
    Row
});

export { Table, type TableProps };
