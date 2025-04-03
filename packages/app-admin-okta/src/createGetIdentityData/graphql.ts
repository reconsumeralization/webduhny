import gql from "graphql-tag";

export const LOGIN_MT = gql`
    mutation Login {
        security {
            login {
                data {
                    ... on OktaIdentity {
                        id
                        displayName
                        type
                        currentTenant {
                            id
                            name
                            description
                            image
                            parent
                        }
                        defaultTenant {
                            id
                            name
                            description
                            image
                            parent
                        }
                        permissions
                    }
                }
                error {
                    code
                    message
                    data
                }
            }
        }
    }
`;

export const LOGIN_ST = gql`
    mutation Login {
        security {
            login {
                data {
                    ... on OktaIdentity {
                        id
                        displayName
                        type
                        permissions
                    }
                }
                error {
                    code
                    message
                    data
                }
            }
        }
    }
`;
