import * as React from "react";
import { cn } from "~/utils";

const Header = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn("[&_tr]:hover:bg-transparent", className)} {...props} />
);

export { Header };
