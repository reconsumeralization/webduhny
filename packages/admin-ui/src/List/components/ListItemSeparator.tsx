import * as React from "react";
import { makeDecoratable } from "~/utils";
import { Separator, type SeparatorProps } from "~/Separator";

type ListItemSeparatorProps = SeparatorProps;

const DecoratableListItemSeparator = (props: ListItemSeparatorProps) => {
    return <Separator orientation={"vertical"} className={"wby-h-lg wby-mx-sm-plus"} {...props} />;
};

const ListItemSeparator = makeDecoratable("ListItemSeparator", DecoratableListItemSeparator);

export { ListItemSeparator, type ListItemSeparatorProps };
