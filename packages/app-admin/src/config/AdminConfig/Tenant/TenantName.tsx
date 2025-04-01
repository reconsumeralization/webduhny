import React from "react";
import { makeDecoratable } from "~/index";
import { Property, useIdGenerator } from "@webiny/react-properties";

export interface TenantNameProps {
    value: string;
}

const BaseTenantName = ({ value }: TenantNameProps) => {
    const getId = useIdGenerator("Tenant");

    return <Property id={getId("name")} name={"name"} value={value} />;
};

export const TenantName = makeDecoratable("TenantName", BaseTenantName);
