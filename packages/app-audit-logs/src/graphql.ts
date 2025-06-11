import gql from "graphql-tag";

const ERROR_FIELDS = /* GraphQL */ `
    code
    message
    data
`;

export const LIST_USERS: any = gql`
    query ListUsers {
        adminUsers {
            users: listUsers {
                data {
                    id
                    firstName
                    lastName
                }
                error {
                    ${ERROR_FIELDS}
                }
            }
        }
    }
`;
