import { AppPermissions } from "@webiny/api-security/utils/AppPermissions";
import type { SettingsSecurityPermission } from "~/types";

export class SettingsPermissions extends AppPermissions<SettingsSecurityPermission> {}
