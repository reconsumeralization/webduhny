import React from "react";
import { Admin } from "@webiny/admin";
import { Cognito } from "@webiny/app-admin-users-cognito";
import { Extensions } from "./Extensions";

import "./App.scss";

export const App = () => {
    return (
        <Admin>
            <Cognito />
            <Extensions />
        </Admin>
    );
};
