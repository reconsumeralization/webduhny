export { Auth0 } from "./Auth0";
export type { Auth0Props } from "./Auth0";
import { UserInfo } from "./modules/userMenu/UserInfo";
import { UserImage } from "./modules/userMenu/UserImage";
import { ExitTenant } from "./modules/userMenu/ExitTenant";
import { SignOut } from "./modules/userMenu/SignOut";
import { NotAuthorizedError, LoginContent, LoginLayout } from "./components";

export const Components = {
    UserInfo,
    UserImage,
    ExitTenant,
    SignOut,
    NotAuthorizedError,
    LoginContent,
    LoginLayout
};
