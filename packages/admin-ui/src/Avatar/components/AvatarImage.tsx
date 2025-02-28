import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn, makeDecoratable } from "~/utils";

type AvatarImageProps = AvatarPrimitive.AvatarImageProps;

const AvatarImageBase = ({ className, ...props }: AvatarImageProps) => (
    <AvatarPrimitive.Image className={cn("wby-aspect-square", className)} {...props} />
);

const AvatarImage = makeDecoratable("AvatarImage", AvatarImageBase);

export { AvatarImage, type AvatarImageProps };
