import React from "react";
import { Property } from "@webiny/react-properties";

interface AdminProps {
    name: string;
    src: string;
    remove?: boolean;
}

export const Admin = ({ name, src, remove }: AdminProps) => {
    const propertyName = `admin`;
    const id = `${propertyName}.${name}`;
    return (
        <Property id={id} name={propertyName} array root remove={remove}>
            <Property name={"name"} value={name} />
            <Property name={"src"} value={src} />
        </Property>
    );
};

