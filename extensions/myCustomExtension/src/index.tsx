// extensions/adminTheme/src/index.tsx
import React from "react";
import { AdminConfig } from "@webiny/app-serverless-cms";

import {Theme} from "@webiny/app-serverless-cms/types";

export const Extension = () => {
    return (
        <AdminConfig>
            <Theme tenants={['root']}>
                <Theme.Color palette={'warning'} color={'#fffff1'} shade={100} />
                <Theme.Color palette={'warning'} color={'#fffff2'} shade={200} />
                <Theme.Color palette={'warning'} color={'#fffff3'} shade={300} />
            </Theme>
        </AdminConfig>
    );
};