import * as DialogPrimitive from "@radix-ui/react-dialog";
import { makeDecoratable } from "~/utils";

const DialogRootBase = DialogPrimitive.Root;
export const DialogRoot = makeDecoratable("DialogRoot", DialogRootBase);
