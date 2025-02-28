import * as React from "react";
import { cn, cva, type VariantProps } from "~/utils";

const headerVariants = cva("[&_tr]:hover:wby-bg-transparent", {
    variants: {
        sticky: {
            true: "[&_tr]:wby-bg-white [&_tr]:hover:wby-bg-white wby-sticky wby-top-0"
        }
    }
});

interface HeaderProps
    extends React.HTMLAttributes<HTMLTableSectionElement>,
        VariantProps<typeof headerVariants> {}

const Header = ({ className, sticky, ...props }: HeaderProps) => (
    <thead className={cn(headerVariants({ sticky }), className)} {...props} />
);

export { Header, type HeaderProps };
