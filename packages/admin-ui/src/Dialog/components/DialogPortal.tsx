import * as DialogPrimitive from "@radix-ui/react-dialog";
import { makeDecoratable } from "~/utils";

const DialogPortalBase = DialogPrimitive.Portal;

export const DialogPortal = makeDecoratable("DialogPortal", DialogPortalBase);
