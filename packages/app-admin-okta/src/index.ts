export { Okta } from "./Okta";
export type { OktaProps, OktaFactory } from "./Okta";
import { UserInfo } from "./modules/userMenu/UserInfo";
import { UserImage } from "./modules/userMenu/UserImage";
import { ExitTenant } from "./modules/userMenu/ExitTenant";
import { SignOut } from "./modules/userMenu/SignOut";
import { NotAuthorizedError } from "./components";

export const Components = {
    UserInfo,
    UserImage,
    ExitTenant,
    SignOut,
    NotAuthorizedError
};
