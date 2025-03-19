import React, { ReactElement } from "react";
import { Plugin } from "@webiny/plugins/types";
import { ApolloClient } from "apollo-client";
import { SecurityPermission } from "@webiny/app-security/types";

export { Icon } from "~/components/IconPicker/types";

export interface AdminFileManagerFileTypePluginRenderParams {
    file: FileItem;
}

export type AdminFileManagerFileTypePlugin = Plugin & {
    type: "admin-file-manager-file-type";
    types: string[];
    render(params: AdminFileManagerFileTypePluginRenderParams): React.ReactNode;
    fileDetails?: {
        actions: Array<React.ComponentType | React.Component>;
    };
};

export interface AdminInstallationPluginRenderParams {
    onInstalled: () => Promise<void>;
}

export type AdminInstallationPlugin = Plugin & {
    type: "admin-installation";
    getInstalledVersion(params: { client: ApolloClient<object> }): Promise<string | null>;
    title: string;
    dependencies?: string[];
    secure: boolean;
    render(params: AdminInstallationPluginRenderParams): React.ReactNode;
};

export type AdminAppPermissionRendererPlugin = Plugin & {
    type: "admin-app-permissions-renderer";
    system?: boolean;
    render(params: any): ReactElement;
};

/**
 * Represents a file as we receive from the GraphQL API.
 */
export interface FileItem {
    id: string;
    name: string;
    key: string;
    src: string;
    size: number;
    type: string;
    tags: string[];
    aliases: string[];
    createdOn: string;
    createdBy: {
        id: string;
        displayName: string;
    };
    savedOn: string;
    savedBy: {
        id: string;
        displayName: string;
    };
    modifiedOn: string;
    modifiedBy: {
        id: string;
        displayName: string;
    };
    location: {
        folderId: string;
    };
    meta?: {
        private?: boolean;
        width?: number;
        height?: number;
    };
    accessControl?: {
        type: "public" | "private-authenticated";
    };
    extensions?: Record<string, any>;
}

export interface FileManagerSecurityPermission extends SecurityPermission {
    rwd?: string;
    own?: boolean;
}

export type ComponentWithChildren = React.ComponentType<{ children?: React.ReactNode }>;
