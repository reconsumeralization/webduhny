import { WebinyError } from "@webiny/error";
import { Path } from "./Path";
import { Permissions } from "./Permissions";
import type { FolderLevelPermission as IFolderLevelPermission } from "~/flp/flp.types";
import type { Folder } from "~/folder/folder.types";
import type { AcoContext } from "~/types";
import { ROOT_FOLDER } from "~/constants";

export class CreateFlp {
    private context: AcoContext;

    constructor(context: AcoContext) {
        this.context = context;
    }

    async execute(folder: Folder) {
        try {
            if (!folder) {
                throw new WebinyError(
                    "Missing `folder`, I can't create a new record into the FLP catalog.",
                    "ERROR_CREATE_FLP_USE_CASE_FOLDER_NOT_PROVIDED"
                );
            }

            const { id, type, slug, parentId, permissions } = folder;
            let parentFlp: IFolderLevelPermission | null = null;

            if (parentId) {
                parentFlp = await this.context.aco.flp.get(parentId);

                if (!parentFlp) {
                    throw new WebinyError(
                        "Parent folder level permission not found. Unable to create a new record in the FLP catalog.",
                        "ERROR_CREATE_FLP_USE_CASE_PARENT_FLP_NOT_FOUND"
                    );
                }
            }

            await this.context.aco.flp.create({
                id,
                type,
                slug,
                parentId: parentId ?? ROOT_FOLDER,
                path: Path.create(slug, parentFlp?.path),
                permissions: Permissions.create(permissions, parentFlp)
            });
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while creating FLP",
                code: "ERROR_CREATE_FLP_USE_CASE"
            });
        }
    }
}
