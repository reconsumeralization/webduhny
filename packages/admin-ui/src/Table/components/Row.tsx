import * as React from "react";
import { cn, cva, type VariantProps } from "~/utils";

const rowVariants = cva(
    "wby-border-neutral-dimmed wby-border-solid wby-border-b-sm wby-transition-colors hover:wby-bg-neutral-subtle",
    {
        variants: {
            selected: {
                true: "wby-bg-neutral-light"
            }
        }
    }
);

interface RowProps
    extends React.HTMLAttributes<HTMLTableRowElement>,
        VariantProps<typeof rowVariants> {}

const Row = ({ className, selected, ...props }: RowProps) => (
    <tr className={cn(rowVariants({ selected }), className)} {...props} />
);

export { Row, type RowProps };
