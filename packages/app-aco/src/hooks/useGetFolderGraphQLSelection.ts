import { createFieldsList } from "@webiny/app-headless-cms-common";
import { useFolderModel } from "~/features";

export const useGetFolderGraphQLSelection = () => {
    const model = useFolderModel();

    if (!model) {
        throw Error(`useGetFolderGraphQLSelection requires an FolderModelContext to be available!`);
    }

    const fields = createFieldsList({ model, fields: model.fields });

    return /* GraphQL */ `{
        id
        createdOn
        createdBy {
            id
            displayName
        }
        savedOn
        savedBy {
            id
            displayName
        }
        modifiedOn
        modifiedBy {
            id
            displayName
        }
         permissions {
            target
            level
            inheritedFrom
        }
        hasNonInheritedPermissions
        canManagePermissions
        canManageStructure
        canManageContent
        ${fields}
    }`;
};
