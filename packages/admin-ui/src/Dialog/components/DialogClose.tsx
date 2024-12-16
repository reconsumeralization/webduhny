import * as DialogPrimitive from "@radix-ui/react-dialog";
import { makeDecoratable } from "~/utils";

const DialogCloseBase = DialogPrimitive.Close;

export const DialogClose = makeDecoratable("DialogClose", DialogCloseBase);
