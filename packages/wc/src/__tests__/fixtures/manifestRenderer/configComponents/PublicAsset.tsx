import React from "react";
import { Property } from "@webiny/react-properties";

export interface PublicAssetProps {
    name: string;
    path: string;
    remove?: boolean;
}

export const PublicAsset = ({ name, path, remove }:PublicAssetProps) => {
    const propertyName = `website.publicAsset`;
    const id = `${propertyName}.${name}`;
    return (
        <Property id={id} name={propertyName} array root remove={remove}>
            <Property name={"path"} value={path} />
        </Property>
    );
};

