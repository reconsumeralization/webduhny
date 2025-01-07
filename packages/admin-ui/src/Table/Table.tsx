import * as React from "react";
import { cn, cva, VariantProps, withStaticProps } from "~/utils";
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

const tableVariants = cva("w-full caption-bottom text-sm", {
    variants: {
        bordered: {
            true: "border-neutral-dimmed border-solid border-sm"
        }
    }
});

interface TableProps
    extends React.HTMLAttributes<HTMLTableElement>,
        VariantProps<typeof tableVariants> {}

const BaseTable = ({ className, bordered, ...props }: TableProps) => (
    <div className="relative w-full overflow-auto">
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

export { Table };
