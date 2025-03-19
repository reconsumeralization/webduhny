import React, { Fragment } from "react";
import { Layout } from "./modules/Layout";
import { Navigation } from "./modules/Navigation";
import { UserMenu } from "~/modules/UserMenu";
import { Overlays } from "./modules/Overlays";
import { NotFound } from "./modules/NotFound";
import { Dashboard } from "./modules/Dashboard";

export const AdminUI = () => {
    return (
        <Fragment>
            <Layout />
            <Dashboard />
            <NotFound />
            <Navigation />
            <UserMenu />
            <Overlays />
        </Fragment>
    );
};
