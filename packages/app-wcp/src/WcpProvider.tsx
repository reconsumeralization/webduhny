import React, { useState } from "react";
import { WcpContextProvider } from "./contexts";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GetWcpProjectGqlResponse } from "~/types";
import { DecryptedWcpProjectLicense, ILicense } from "@webiny/wcp/types";
import { License, NullLicense } from "@webiny/wcp";
import { ReactLicense } from "./ReactLicense";

const LOCAL_STORAGE_KEY = `webiny_wcp_project`;

export const GET_WCP_PROJECT = gql`
    query GetWcpProject {
        wcp {
            getProject {
                data {
                    orgId
                    projectId
                    package {
                        features {
                            seats {
                                enabled
                                options
                            }
                            multiTenancy {
                                enabled
                                options
                            }
                            advancedPublishingWorkflow {
                                enabled
                            }
                            advancedAccessControlLayer {
                                enabled
                                options
                            }
                            auditLogs {
                                enabled
                            }
                            recordLocking {
                                enabled
                            }
                            fileManager {
                                enabled
                                options
                            }
                        }
                    }
                }
                error {
                    message
                    code
                    data
                }
            }
        }
    }
`;

interface WcpProviderProps {
    loader?: React.ReactElement;
    children: React.ReactNode;
}

const projectFromLocalStorage = () => {
    try {
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localData) {
            const parsedData = JSON.parse(localData) as DecryptedWcpProjectLicense;
            return new ReactLicense(License.fromLicenseDto(parsedData));
        }
    } catch {}

    // Do nothing.
    return undefined;
};

export const WcpProvider = ({ children, loader }: WcpProviderProps) => {
    // If `REACT_APP_WCP_PROJECT_ID` environment variable is missing, we can immediately exit.
    if (!process.env.REACT_APP_WCP_PROJECT_ID) {
        return (
            <WcpContextProvider project={new ReactLicense(new NullLicense())}>
                {children}
            </WcpContextProvider>
        );
    }

    const [project, setProject] = useState<ILicense | undefined>(projectFromLocalStorage);

    useQuery<GetWcpProjectGqlResponse>(GET_WCP_PROJECT, {
        context: {
            headers: {
                "x-tenant": "root"
            }
        },
        onCompleted: response => {
            setProject(new ReactLicense(License.fromLicenseDto(response.wcp.getProject.data)));
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.wcp.getProject.data));
        }
    });

    // Initially, the `project` variable is `undefined`. Once the `GET_WCP_PROJECT` GQL query
    // has been resolved, then it becomes either `null` or `WcpProject`, and that's when we can continue
    // rendering child React components.
    if (project === undefined) {
        return loader || null;
    }

    return <WcpContextProvider project={project}>{children}</WcpContextProvider>;
};
