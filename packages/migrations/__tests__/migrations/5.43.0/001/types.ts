export interface CreatedBy {
    id: string;
    type: string;
    displayName: string;
}

export interface LocaleDdbItem {
    PK: string;
    SK: string;
    code: string;
    default: boolean;
    createdOn: string;
    createdBy: CreatedBy;
    tenant: string;
    webinyVersion: string;
}

export interface TenantDdbItem {
    PK: string;
    SK: string;
    createdOn: string;
    description: string;
    GSI1_PK: string;
    GSI1_SK: string;
    data: {
        id: string;
        name: string;
        parent?: string | null;
        savedOn: string;
        settings: {
            domains: string[];
        };
        status: string;
        TYPE: string;
        webinyVersion: string;
        createdBy: CreatedBy;
    };
}
