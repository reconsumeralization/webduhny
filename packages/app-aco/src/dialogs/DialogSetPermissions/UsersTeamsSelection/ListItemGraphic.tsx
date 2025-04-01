import React from "react";
import { Avatar } from "@webiny/admin-ui";
import { FolderLevelPermissionsTarget } from "~/types";

interface ListItemGraphicProps {
    target: FolderLevelPermissionsTarget;
}

export const ListItemGraphic = ({ target }: ListItemGraphicProps) => {
    if (target.type === "admin") {
        return (
            <Avatar
                size={"md"}
                image={<Avatar.Image src={target.meta.image} alt={"User's avatar."} />}
                fallback={<Avatar.Fallback delayMs={0}>{target.name.charAt(0)}</Avatar.Fallback>}
            />
        );
    }

    return (
        <Avatar
            size={"md"}
            fallback={<Avatar.Fallback delayMs={0}>{target.name.charAt(0)}</Avatar.Fallback>}
        />
    );
};
