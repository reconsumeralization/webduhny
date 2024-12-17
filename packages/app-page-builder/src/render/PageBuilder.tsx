import React from "react";
import { AddButtonClickHandlers } from "~/elementDecorators/AddButtonClickHandlers";
import { AddButtonLinkComponent } from "~/elementDecorators/AddButtonLinkComponent";
import { InjectElementVariables } from "~/render/variables/InjectElementVariables";

export const PageBuilder = React.memo(() => {
    return (
        <>
            <AddButtonLinkComponent />
            <AddButtonClickHandlers />
            <InjectElementVariables />
        </>
    );
});

PageBuilder.displayName = "PageBuilder";
