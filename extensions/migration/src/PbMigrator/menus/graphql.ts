import { gql } from "graphql-request";
import { GqlResponseError, Pojo } from "../../types";

export const ERROR_FIELDS = gql`
    fragment ErrorFields on PbError {
        code
        data
        message
    }
`;

const DATA_FIELDS = /* GraphQL */ gql`
    fragment DataFields on PbMenu {
        slug
        description
        title
        items
        createdOn
        createdBy {
            id
            displayName
            type
        }
    }
`;

export const CREATE_MENU = gql`
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    mutation CreateMenu($data: PbMenuInput!) {
        pageBuilder {
            createMenu(data: $data) {
                data {
                    ...DataFields
                }
                error {
                    ...ErrorFields
                }
            }
        }
    }
`;

export const LIST_MENUS = gql`
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    query ListMenus {
        pageBuilder {
            listMenus {
                data {
                    ...DataFields
                }
                error {
                    ...ErrorFields
                }
            }
        }
    }
`;

