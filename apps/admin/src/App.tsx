import React from "react";
import { Admin } from "@webiny/app-serverless-cms";
import { Extensions } from "./Extensions";
import "./App.scss";
import { MyIdp } from "my-idp/src/admin";

export const App = () => {
    return (
        <Admin>
            <MyIdp />
            <Extensions />
        </Admin>
    );
};