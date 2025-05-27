import { ListAdminUsersGatewayFromContext } from "./ListAdminUsersGatewayFromContext";
import { ListTeamsGatewayFromContext } from "./ListTeamsGatewayFromContext";
import { ListFolderLevelPermissionsTargets } from "./ListFolderLevelPermissionsTargets";
import type { AcoContext } from "~/types";

interface GetListFolderLevelPermissionsTargetsParams {
    context: AcoContext;
}

export const getListFolderLevelPermissionsTargets = (
    params: GetListFolderLevelPermissionsTargetsParams
) => {
    const listAdminUsersGateway = new ListAdminUsersGatewayFromContext(params.context);
    const listTeamsGateway = new ListTeamsGatewayFromContext(params.context);

    const listFolderLevelPermissionsTargetsUseCase = new ListFolderLevelPermissionsTargets(
        listAdminUsersGateway,
        listTeamsGateway
    );

    return {
        listFolderLevelPermissionsTargetsUseCase
    };
};
