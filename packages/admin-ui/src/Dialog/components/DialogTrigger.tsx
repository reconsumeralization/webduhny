import * as DialogPrimitive from "@radix-ui/react-dialog";
import { makeDecoratable } from "~/utils";

const DialogTriggerBase = DialogPrimitive.Trigger;

export const DialogTrigger = makeDecoratable("DialogTrigger", DialogTriggerBase);
