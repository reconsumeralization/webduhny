import React from "react";
import { Layout } from "./Layout";
import { Navigation } from "./Navigation";
import { UserMenu } from "~/UserMenu";
import { Dialog } from "./Dialog";
import { NotFound } from "./NotFound";
import { Dashboard } from "./Dashboard";

export const AdminUI = () => {
    return (
        <>
            <Dashboard />
            <Dialog />
            <Layout />
            <Navigation />
            <NotFound />
            <UserMenu />
        </>
    );
};
