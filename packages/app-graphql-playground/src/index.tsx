import React, { memo } from "react";
import { ApolloClient } from "apollo-client";
import { plugins } from "@webiny/plugins";
import { AdminConfig, Layout } from "@webiny/app-admin";
import Playground from "./plugins/Playground";
import playgroundPlugins from "./plugins";

const { Route } = AdminConfig;

interface CreateApolloClientParams {
    uri: string;
}

interface GraphQLPlaygroundProps {
    createApolloClient(params: CreateApolloClientParams): ApolloClient<any>;
}

const GraphQLPlaygroundExtension = ({ createApolloClient }: GraphQLPlaygroundProps) => {
    plugins.register(playgroundPlugins);

    return (
        <AdminConfig>
            <Route
                name={"apiPlayground"}
                path={"/api-playground"}
                element={
                    <Layout title={"API Playground"}>
                        <Playground createApolloClient={createApolloClient} />
                    </Layout>
                }
            />
        </AdminConfig>
    );
};

export const GraphQLPlayground = memo(GraphQLPlaygroundExtension);
