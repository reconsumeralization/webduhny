import React from "react";
import { guildPageSettingsBrandProviderHOC } from 'pages-brand-settings'; // GUILD

import { Admin, Provider } from "@webiny/app-serverless-cms";
import { Cognito } from "@webiny/app-admin-users-cognito";
import { Extensions } from "./Extensions";
import "./App.scss";

export const App = () => {
    return (
        <Admin>
            <Cognito />
            <Extensions />
            <Provider hoc={guildPageSettingsBrandProviderHOC} />
        </Admin>
    );
};
