import React from "react";
import { Dashboard, Layout, NotFound } from "~/index";
import { AdminConfig } from "~/config/AdminConfig";

const { Route } = AdminConfig;

export const Routes = React.memo(() => {
    return (
        <AdminConfig>
            <Route
                name={"home"}
                path={"/"}
                element={
                    <Layout title={"Welcome!"}>
                        <Dashboard />
                    </Layout>
                }
            />

            <Route
                name={"default"}
                path={"*"}
                element={
                    <Layout title={"Not Accessible"}>
                        <NotFound />
                    </Layout>
                }
            />
        </AdminConfig>
    );
});

Routes.displayName = "Routes";
