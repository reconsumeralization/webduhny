import React from "react";
import { Admin } from "@webiny/app-serverless-cms";
import { Cognito } from "@webiny/app-admin-users-cognito";
import { Sandbox } from "@webiny/app-website-builder/sandbox";
import { Extensions } from "./Extensions";
import "./App.scss";

export const App = () => {
    return (
        <Admin>
            <Cognito />
            <Extensions />
            <Sandbox/>
        </Admin>
    );
};
