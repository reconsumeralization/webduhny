import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { withStaticProps, cn, makeDecoratable, cva, type VariantProps } from "~/utils";

type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

const AvatarImageBase = ({ className, ...props }: AvatarImageProps) => (
    <AvatarPrimitive.Image className={cn("wby-aspect-square", className)} {...props} />
);

const AvatarImage = makeDecoratable("AvatarImage", AvatarImageBase);

type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

const AvatarFallbackBase = ({ className, ...props }: AvatarFallbackProps) => (
    <AvatarPrimitive.Fallback
        className={cn(
            "wby-flex wby-h-full wby-w-full wby-items-center wby-justify-center wby-rounded-sm",
            className
        )}
        {...props}
    />
);

const AvatarFallback = makeDecoratable("AvatarFallback", AvatarFallbackBase);

interface AvatarProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
        VariantProps<typeof avatarVariants> {
    image: React.ReactElement<AvatarImageProps>;
    fallback?: React.ReactElement<AvatarFallbackProps>;
}

const avatarVariants = cva("wby-relative wby-flex wby-shrink-0 wby-overflow-hidden", {
    variants: {
        size: {
            sm: "wby-text-h6 wby-rounded-sm wby-size-[24px] [&_svg]:wby-size-[16px]",
            md: "wby-text-h6 wby-rounded-md wby-size-[32px] [&_svg]:wby-size-[24px]",
            lg: "wby-text-h6 wby-rounded-md wby-size-[40px] [&_svg]:wby-size-[24px]",
            xl: "wby-text-h4 wby-rounded-lg wby-size-[48px] [&_svg]:wby-size-[24px]"
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
});

const AvatarBase = ({ image, fallback, className, size, variant, ...props }: AvatarProps) => {
    return (
        <AvatarPrimitive.Root className={avatarVariants({ variant, size, className })} {...props}>
            {image}
            {fallback}
        </AvatarPrimitive.Root>
    );
};

const DecoratableAvatar = makeDecoratable("Avatar", AvatarBase);

const Avatar = withStaticProps(DecoratableAvatar, {
    Fallback: AvatarFallback,
    Image: AvatarImage
});

export { Avatar, type AvatarProps, type AvatarImageProps, type AvatarFallbackProps };
