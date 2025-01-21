import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "class-variance-authority";
import { withStaticProps, cn } from "~/utils";

type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

const AvatarImageBase = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    AvatarImageProps
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image ref={ref} className={cn("wby-aspect-square", className)} {...props} />
));
AvatarImageBase.displayName = AvatarPrimitive.Image.displayName;

const AvatarImage = makeDecoratable("AvatarImage", AvatarImageBase);

type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

const AvatarFallbackBase = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    AvatarFallbackProps
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
            "wby-flex wby-h-full wby-w-full wby-items-center wby-justify-center wby-rounded-sm",
            className
        )}
        {...props}
    />
));

AvatarFallbackBase.displayName = AvatarPrimitive.Fallback.displayName;

const AvatarFallback = makeDecoratable("AvatarFallback", AvatarFallbackBase);

interface AvatarProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
        VariantProps<typeof avatarVariants> {
    image: React.ReactElement<AvatarImageProps>;
    fallback?: React.ReactElement<AvatarFallbackProps>;
}

const avatarVariants = cva(
    "wby-relative wby-flex wby-shrink-0 wby-overflow-hidden wby-border-sm wby-border-transparent",
    {
        variants: {
            size: {
                sm: "wby-text-h6 wby-rounded-sm wby-p-[calc(theme(padding.xs)-theme(borderWidth.sm))] [&>*]:wby-size-md",
                md: "wby-text-h6 wby-rounded-md wby-p-[calc(theme(padding.xs)-theme(borderWidth.sm))] [&>*]:wby-size-lg",
                lg: "wby-text-h6 wby-rounded-md wby-p-[calc(theme(padding.sm)-theme(borderWidth.sm))] [&>*]:wby-size-lg",
                xl: "wby-text-h4 wby-rounded-lg wby-p-[calc(theme(padding.sm)-theme(borderWidth.sm))] [&>*]:wby-size-xl"
            },
            variant: {
                strong: "wby-bg-primary wby-text-neutral-light [&_svg]:wby-fill-neutral-base",
                subtle: "wby-bg-neutral-light wby-text-neutral-primary [&_svg]:wby-fill-neutral-xstrong",
                light: "wby-bg-neutral-dimmed wby-text-neutral-primary [&_svg]:wby-fill-neutral-xstrong",
                quiet: "wby-bg-transparent wby-text-neutral-primary [&_svg]:wby-fill-neutral-xstrong",
                outlined:
                    "wby-bg-neutral-base !wby-border-neutral-muted wby-border-sm wby-text-accent-primary [&_svg]:wby-fill-neutral-xstrong"
            }
        },
        defaultVariants: {
            size: "md",
            variant: "strong"
        }
    }
);

const AvatarBase = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
    ({ image, fallback, className, size, variant, ...props }, ref) => {
        return (
            <AvatarPrimitive.Root
                ref={ref}
                className={avatarVariants({ variant, size, className })}
                {...props}
            >
                {image}
                {fallback}
            </AvatarPrimitive.Root>
        );
    }
);

AvatarBase.displayName = AvatarPrimitive.Root.displayName;

const DecoratableAvatar = makeDecoratable("Avatar", AvatarBase);

const Avatar = withStaticProps(DecoratableAvatar, {
    Fallback: AvatarFallback,
    Image: AvatarImage
});

export { Avatar, type AvatarProps, type AvatarImageProps, type AvatarFallbackProps };
