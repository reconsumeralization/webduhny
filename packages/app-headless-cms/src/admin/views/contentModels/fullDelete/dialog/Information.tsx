import React from "react";
import type { CmsModel } from "~/types";

export interface IInformationProps {
    model: Pick<CmsModel, "plugin">;
}

export const Information = (props: IInformationProps) => {
    const { model } = props;
    return (
        <>
            {model.plugin && (
                <>
                    <p>
                        This model is a plugin one, and it cannot be deleted. Only its entries can
                        be deleted.
                    </p>
                    <p>
                        <br />
                    </p>
                </>
            )}
            <p>- This action will permanently delete the model and all its associated data.</p>
            <p>- References to this model in other parts of the system will be emptied.</p>
            <p>- This action cannot be undone.</p>
            <p>- Lifecycle events will be triggered.</p>
        </>
    );
};
