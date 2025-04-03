import React from "react";
import { makeDecoratable } from "~/index";
import { Property, useIdGenerator } from "@webiny/react-properties";
import { TenantName } from "./Tenant/TenantName";
import { TenantLogo } from "./Tenant/TenantLogo";

export interface TenantProps {
    children: React.ReactNode;
}

export type TenantConfig = {
    name: string;
    logo: React.ReactNode;
};

const BaseTenant = ({ children }: TenantProps) => {
    const getId = useIdGenerator("Tenant");

    return (
        <Property id={getId("tenant")} name={"tenant"}>
            {children}
        </Property>
    );
};

const DecoratableTenant = makeDecoratable("Tenant", BaseTenant);

export const Tenant = Object.assign(DecoratableTenant, {
    Name: TenantName,
    Logo: TenantLogo
});
