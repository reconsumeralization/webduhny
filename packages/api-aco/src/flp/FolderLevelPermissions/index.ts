import {
    CanAccessFolder,
    CanAccessFolderContent,
    type CanAccessFolderContentParams,
    type CanAccessFolderParams,
    CanCreateFolderInRoot,
    CanUseFolderLevelPermissions,
    CanUseTeams,
    CheckNotInheritedPermissions,
    GetDefaultPermissions,
    GetDefaultPermissionsWithTeams
} from "./useCases";
import type {
    AcoContext,
    AcoFolderLevelPermissionsCrud,
    Folder,
    FolderPermission,
    GetFlpParams,
    ListFlpsParams
} from "~/types";
import {
    GetIdentityGatewayFromContext,
    type IGetIdentityGateway,
    type IIsAuthorizationEnabledGateway,
    type IListIdentityTeamsGateway,
    type IListPermissionsGateway,
    IsAuthorizationEnabledGatewayFromContext,
    ListIdentityTeamsGatewayFromContext,
    ListPermissionsGatewayFromContext
} from "./gateways";
import { NotAuthorizedError } from "@webiny/api-security";

interface CreateFolderLevelPermissionsParams {
    context: AcoContext;
    crud: AcoFolderLevelPermissionsCrud;
}

export class FolderLevelPermissions {
    private readonly context: AcoContext;
    private crud: AcoFolderLevelPermissionsCrud;

    private readonly getIdentityGateway: IGetIdentityGateway;
    private readonly listPermissionsGateway: IListPermissionsGateway;
    private readonly listIdentityTeamsGateway: IListIdentityTeamsGateway;
    private readonly isAuthorizationEnabledGateway: IIsAuthorizationEnabledGateway;

    constructor(params: CreateFolderLevelPermissionsParams) {
        this.context = params.context;
        this.crud = params.crud;

        this.getIdentityGateway = new GetIdentityGatewayFromContext(params.context);
        this.listPermissionsGateway = new ListPermissionsGatewayFromContext(params.context);
        this.listIdentityTeamsGateway = new ListIdentityTeamsGatewayFromContext(params.context);
        this.isAuthorizationEnabledGateway = new IsAuthorizationEnabledGatewayFromContext(
            params.context
        );
    }

    public canUseFolderLevelPermissions(enabled?: boolean) {
        const canUseFolderLevelPermissionsUseCase = new CanUseFolderLevelPermissions(this.context);
        return canUseFolderLevelPermissionsUseCase.execute(enabled);
    }

    public canUseTeams() {
        const canUseTeamsUseCase = new CanUseTeams(this.context);
        return canUseTeamsUseCase.execute();
    }

    public canCreateFolderInRoot() {
        const canCreateFolderInRootUseCase = new CanCreateFolderInRoot();
        return canCreateFolderInRootUseCase.execute();
    }

    public permissionsIncludeNonInheritedPermissions(permissions?: FolderPermission[]) {
        const checkNotInheritedPermissionsUseCase = new CheckNotInheritedPermissions();
        return checkNotInheritedPermissionsUseCase.execute(permissions);
    }

    public async canAccessFolder(params: CanAccessFolderParams) {
        const canAccessFolderUseCase = new CanAccessFolder(this.getIdentityGateway);
        return await canAccessFolderUseCase.execute(params);
    }

    public async canAccessFolderContent(params: CanAccessFolderContentParams) {
        if (!this.canUseFolderLevelPermissions() || !this.isAuthorizationEnabledGateway.execute()) {
            return true;
        }

        const canAccessFolderContentUseCase = new CanAccessFolderContent(this.getIdentityGateway);
        return await canAccessFolderContentUseCase.execute(params);
    }

    public async ensureCanAccessFolder(params: CanAccessFolderParams) {
        const result = await this.canAccessFolder(params);
        if (!result) {
            throw new NotAuthorizedError();
        }
    }

    public async ensureCanAccessFolderContent(params: CanAccessFolderContentParams) {
        const result = await this.canAccessFolderContent(params);
        if (!result) {
            throw new NotAuthorizedError();
        }
    }

    public async canReadFolder(folder: Folder) {
        return await this.canAccessFolder({ folder, rwd: "r" });
    }

    public async canManageFolderContent(folder: Folder) {
        if (!this.canUseFolderLevelPermissions() || !this.isAuthorizationEnabledGateway.execute()) {
            return true;
        }

        return await this.canAccessFolderContent({ folder, rwd: "w" });
    }

    public async canManageFolderStructure(folder: Folder) {
        if (!this.canUseFolderLevelPermissions() || !this.isAuthorizationEnabledGateway.execute()) {
            return true;
        }

        return await this.canAccessFolder({ folder, rwd: "w" });
    }

    public async canManageFolderPermissions(folder: Folder) {
        if (!this.canUseFolderLevelPermissions()) {
            return false;
        }

        if (!this.isAuthorizationEnabledGateway.execute()) {
            return true;
        }

        return await this.canAccessFolder({ folder, rwd: "w", managePermissions: true });
    }

    public getDefaultPermissions(permissions: FolderPermission[]) {
        const getDefaultPermissionsUseCase = new GetDefaultPermissions(
            this.getIdentityGateway,
            this.listPermissionsGateway
        );

        if (this.canUseTeams()) {
            const getDefaultPermissionsWithTeams = new GetDefaultPermissionsWithTeams(
                this.getIdentityGateway,
                this.listIdentityTeamsGateway,
                getDefaultPermissionsUseCase
            );

            return getDefaultPermissionsWithTeams.execute(permissions);
        }

        return getDefaultPermissionsUseCase.execute(permissions);
    }

    public async listDescendantFolderLevelPermissions(params: ListFlpsParams) {
        return await this.crud.list(params);
    }

    public async getFolderLevelPermission(params: GetFlpParams) {
        return await this.crud.get(params);
    }
}
